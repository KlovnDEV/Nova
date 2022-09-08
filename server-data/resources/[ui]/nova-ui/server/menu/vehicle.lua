
RegisterNetEvent('nova-ui:switchVehicleDoor')
AddEventHandler('nova-ui:switchVehicleDoor', function(veh, door)
	TriggerClientEvent('nova-ui:switchVehicleDoor', -1, veh, door)
end)
