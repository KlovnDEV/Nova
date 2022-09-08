local Tasks = {}

local global_id = 0

function dbPost(query, args)
    local res = exports['db'].post(0, query, json.encode(args))

    local status = res[1]
    local data = res[2]

    if data then
        data = json.decode(data)
    end

    return {status, data}
end

function onTaskComplete(task)
--	print('COMPLETE', json.encode(task))
	local inv = ESX.Custom.Inventory.Get(task.category, task.identifier)
	if not inv then
		return
	end

	local itemCounts = {}

	for k,item in pairs(inv.items) do
		if not itemCounts[item.name] then
			itemCounts[item.name] = 0
		end

		itemCounts[item.name] = itemCounts[item.name] + item.amount
	end

	local ingFound = true

	for k,item in pairs(task.recipe.ingredients) do
		if not itemCounts[item.name] or itemCounts[item.name] < item.amount then
			ingFound = false
			break
		end
	end

	if not ingFound then
		print('Not enough ingredients!')
		return
	end

	local resItem = ESX.Custom.Inventory.Item.Create(task.recipe.output)
	if not resItem then
		print('Craft: unable to create output item! Item: '..tostring(task.recipe.output))
		return
	end

	if not ESX.Custom.Inventory.AddItem(inv, resItem, 1, true, true) then
		print('Craft: unable to add item! Item: '..tostring(task.recipe.output))
		return
	end

	ingFound = true

	for k, item in pairs(task.recipe.ingredients) do
		local amountRemain = item.amount

		while amountRemain > 0 do
			local foundItem = ESX.Custom.Inventory.SearchFirst(inv, { name = item.name })
			if not foundItem then
				print('notfound1')
				ingFound = false
				break
			end

			if not ESX.Custom.Inventory.RemoveItem(inv, { name = item.name }, math.min(foundItem.amount, amountRemain), true) then
				print('notfound2')
				ingFound = false
				break
			end

			amountRemain = amountRemain - foundItem.amount
		end	
	end

	if not ingFound then
		ESX.Custom.Inventory.RemoveItem(inv, { uid = resItem.uid }, resItem.amount, true)
		print('Craft: unable to find ingredients! '..tostring(task.recipe.output))
	end	
end

Citizen.CreateThread(function()
while true do
	Citizen.Wait(100)

	for category_identifier,inv in pairs(Tasks) do
		for k,task in pairs(inv) do
			if not task.timePassed then
				task.timePassed = 100
			else
				task.timePassed = task.timePassed + 100
			end

			if task.timePassed >= task.timeToCraft then
				onTaskComplete(task)

				task.amount = task.amount - 1
				task.timePassed = 0
			end

			if task.amount < 1 then
				deleteTask(category_identifier, task.id)
			end

			break
		end
	end
end
end)


function addTask(category, identifier, recipeId, label, amount)
	if not Tasks[category .. '/' .. identifier] then
		Tasks[category .. '/' .. identifier] = {}
	end

	local recipeRes =  dbPost('craft/recipes/getById', { id = recipeId })

	if recipeRes[1] ~= 200 then
		print('Unable to fetch recipe id! Id: '..tostring(recipeId))
		return
	end

	local recipes = recipeRes[2]
	if #recipes == 0 then
		print('Recipe not found! Id: '..tostring(recipeId))
		return
	end

	local recipe = recipes[1]

	local ingredientsRes =  dbPost('craft/ingredients/get', { recipeId = recipeId })

	if ingredientsRes[1] ~= 200 then
		print('Unable to ferch ingredients! Id: '..tostring(recipeId))
		return
	end

	recipe.ingredients = ingredientsRes[2]

	global_id = global_id + 1

	table.insert(Tasks[category .. '/' .. identifier], {
		id = global_id,
		category = category,
		identifier = identifier,
		recipeId = recipeId,
		recipe = recipe,
		label = label,
		amount = amount,
		timeToCraft = recipes[1].timeToCraft,
	})

	return global_id
end

function getTasks(category, identifier)
	return Tasks[category .. '/' .. identifier] or {}
end

function deleteTask(category_identifier, id)
	local T = Tasks[category_identifier]
	if not T then return false end

	local taskIndex = nil
	for k,v in pairs(T) do
		if v.id == id then
			taskIndex = k
			break
		end
	end

	if taskIndex then		
		table.remove(Tasks[category_identifier], taskIndex)
		return true
	end

	return false
end
