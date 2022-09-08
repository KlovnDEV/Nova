Properties = {}

function ProcessDBProperties(dbresponse)
	if dbresponse[1] == 200 then
		properties = json.decode(dbresponse[2])
		return ArrayToDict(properties, 'id')
	end

	return nil
end

function ReloadProperties()
	local properties = exports['db'].post(0, 'property/get', "{}")
	Properties = ProcessDBProperties(properties) or {}
	SendProperties()
end

function GetPropertyByName(name)
	local properties = exports['db'].post(0, 'property/get', json.encode({ ["name"] = name }))
	return ProcessDBProperties(properties) or {}
end

function SendProperties()
	local xPlayers = ESX.GetPlayers()

	for i=1, #xPlayers, 1 do
		local xPlayer = ESX.GetPlayerFromId(xPlayers[i])
		if xPlayer ~= nil then
			xPlayer.triggerEvent('property:updateProperties', Properties)
		end
	end
end

function IsPropertyOwnedByPlayer(property, xPlayer)
	return property.owner == xPlayer.identifier
end

function SetPropertyOwner(propertyId, identifier, rent)
	return exports['db'].post(0, 'property/setowner', json.encode({ ["id"] = propertyId, ["owner"] = identifier, ["rented"] = rent }))
end