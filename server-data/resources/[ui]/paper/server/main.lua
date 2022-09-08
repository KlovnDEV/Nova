ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

ESX.RegisterServerCallback('paper:getPaperText', function(source, cb, textid)
	local xPlayer = ESX.GetPlayerFromId(source)

	MySQL.Async.fetchAll('SELECT text FROM paper_texts WHERE id = @textid', {
		['@textid'] = textid
	}, function(result)
		if #result > 0 and result[1].text ~= nil then
			cb(result[1].text)
		else
			cb('')
		end
	end)
end)

ESX.RegisterServerCallback('paper:newPaperText', function(source, cb, text)
	local xPlayer = ESX.GetPlayerFromId(source)

	MySQL.Async.fetchScalar('INSERT INTO paper_texts (`owner`, `text`) VALUES (@owner,@text)', {
		['@owner'] = xPlayer.identifier,
		['@text'] = text,
	}, function(result)
		MySQL.Async.fetchScalar('SELECT id FROM paper_texts where `owner` = @owner AND `text` = @text', {
			['@owner'] = xPlayer.identifier,
			['@text'] = text,
		}, function(result2)
			cb(result2)
		end)
	end)
end)

RegisterServerEvent('paper:savePaperText')
AddEventHandler('paper:savePaperText', function(item_id, title, textid)
	local xPlayer = ESX.GetPlayerFromId(source)

	if not title or #title > 100 then
		ESX.Error("Incorrect title!", debug.traceback())
		return
	end

	if not tonumber(textid) then
		ESX.Error("Incorrect textid!", debug.traceback())
		return
	end

	local inv = ESX.Custom.Inventory.Get('player', xPlayer.identifier)	

	if inv then
		local item = inv.items[item_id]
		if item then
			item.paperTitle = title
			item.textid = textid
			ESX.Custom.Inventory.UpdateItem(inv, item)
		end
	end

end)
