ESX.RegisterUsableItem('cigarette', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('cigarette', 1)
    TriggerClientEvent('esx_animations:startScenario', source, "WORLD_HUMAN_SMOKING")
end)

ESX.RegisterUsableItem('cigarette_pack', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('cigarette_pack', 1)
    xPlayer.addInventoryItem('cigarette', 20)
end)

--[[
ESX.RegisterUsableItem('energy', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('energy', 1)

    TriggerClientEvent('esx_status:add', source, 'thirst', 400000)
    TriggerClientEvent('esx_basicneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_energy'))

end)

ESX.RegisterUsableItem('vodka', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('vodka', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_vodka'))

end)

ESX.RegisterUsableItem('jager', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('jager', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 320000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_jager'))

end)

ESX.RegisterUsableItem('rhum', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('rhum', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 240000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_rhum'))

end)

ESX.RegisterUsableItem('mojito', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('mojito', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 240000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_mojito'))

end)

ESX.RegisterUsableItem('whisky', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('whisky', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 350000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_whisky'))

end)

ESX.RegisterUsableItem('martini', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('martini', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 220000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_martini'))

end)

ESX.RegisterUsableItem('vodkaenergy', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('vodkaenergy', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 500000)
    TriggerClientEvent('esx_status:remove', source, 'hunger', 1000)
    TriggerClientEvent('esx_status:remove', source, 'thirst', 7000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_vodkaenergy'))

end)

ESX.RegisterUsableItem('tequila', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('tequila', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_tequila'))

end)

ESX.RegisterUsableItem('jagerbomb', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('jagerbomb', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_jagerbomb'))

end)

ESX.RegisterUsableItem('jagerbomb', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('jagerbomb', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_jagerbomb'))

end)

ESX.RegisterUsableItem('golem', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('golem', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_golem'))

end)

ESX.RegisterUsableItem('whiskycoca', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('whiskycoca', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_whiskycoca'))

end)

ESX.RegisterUsableItem('vodkafruit', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('vodkafruit', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_vodkafruit'))

end)

ESX.RegisterUsableItem('rhumfruit', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('rhumfruit', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_rhumfruit'))

end)

ESX.RegisterUsableItem('teqpaf', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('teqpaf', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_teqpaf'))

end)

ESX.RegisterUsableItem('rhumcoca', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('rhumcoca', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_rhumcoca'))

end)

ESX.RegisterUsableItem('metreshooter', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('metreshooter', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_metreshooter'))

end)

ESX.RegisterUsableItem('jagercerbere', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('jagercerbere', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_jagercerbere'))

end)

ESX.RegisterUsableItem('drug1', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('drug1', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_drug1'))

end)

ESX.RegisterUsableItem('drug2', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('drug2', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_drug2'))

end)

ESX.RegisterUsableItem('drug3', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('drug3', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_drug3'))

end)

ESX.RegisterUsableItem('beer', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('beer', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_beer'))

end)

ESX.RegisterUsableItem('perfume', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('perfume', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 500000)
    TriggerClientEvent('esx_status:remove', source, 'hunger', 1000)
    TriggerClientEvent('esx_status:remove', source, 'thirst', 7000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_perfume'))

end)

ESX.RegisterUsableItem('adicalone', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('adicalone', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 700000)
    TriggerClientEvent('esx_status:remove', source, 'hunger', 1000)
    TriggerClientEvent('esx_status:remove', source, 'thirst', 7000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_adicalone'))

end)

ESX.RegisterUsableItem('shampain', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('shampain', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_shampain'))

end)

ESX.RegisterUsableItem('goodvine', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('goodvine', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_goodvine'))

end)

ESX.RegisterUsableItem('odekalonhigh', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('odekalonhigh', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 700000)
    TriggerClientEvent('esx_status:remove', source, 'hunger', 1000)
    TriggerClientEvent('esx_status:remove', source, 'thirst', 7000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_odekalonhigh'))

end)

ESX.RegisterUsableItem('3adic', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('3adic', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 1000000)
    TriggerClientEvent('esx_status:remove', source, 'hunger', 1000)
    TriggerClientEvent('esx_status:remove', source, 'thirst', 7000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_3adic'))

end)

ESX.RegisterUsableItem('vine', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.removeInventoryItem('vine', 1)

    TriggerClientEvent('esx_status:add', source, 'drunk', 300000)
    TriggerClientEvent('esx_status:remove', source, 'hunger', 1000)
    TriggerClientEvent('esx_status:remove', source, 'thirst', 7000)
    TriggerClientEvent('esx_optionalneeds:onDrink', source)
    TriggerClientEvent('esx:showNotification', source, _U('used_vine'))

end)
]]--
