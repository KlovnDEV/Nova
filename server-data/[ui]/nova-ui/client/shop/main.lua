local function closeShop()
	CloseScreen('shop')
	SendNUIMessage({ query = 'close' })
end

RegisterNetEvent('ui:showShop')
AddEventHandler('ui:showShop', function(shop, items, wareItems)
	local bank = LocalPlayer.state['money:bank'] or 0
	local cash = LocalPlayer.state['money:cash'] or 0

	local mappedItems = {}
	local mappedWareItems = {}

	for k,v in pairs(items) do
		table.insert(mappedItems, {
			name = v.name,
			displayName = v.label,
			quantity = v.amount,
			price = v.price,
			category = v.category,
			uid = v.id,
			owner = shop.label,
		})
	end

	for k,v in pairs(wareItems) do
		table.insert(mappedWareItems, {
			name = v.name,
			displayName = v.label,
			quantity = v.amount,
			price = v.price,
			category = v.category,
			uid = k,
			owner = shop.label,
		})
	end

	OpenScreen('shop')
	SendNUIMessage({
		query = "shop/show",
		shopId = shop.id,
		items = mappedItems,
		warehouse = mappedWareItems,
		money = {
			cash = cash,
			bank = bank,
		},
	})
end)


RegisterNUICallback('query_api', function(data, cb)
	local cmd = data.cmd
	local args = data.args

	if cmd == 'shop/close' then
		closeShop()
	end

	if cmd == 'shop/buy' then
		local shopId = 1 -- FIXME
		print(json.encode(args.cart))
		TriggerEvent('esx:showNotification', json.encode(args.cart))

		for k,v in pairs(args.cart) do
			TriggerServerEvent('shops:buy', shopId, v.uid, v.quantity, args.account)
		end

		closeShop()
	end
end)
