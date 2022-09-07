PropertyMarkers = {}

function ReloadPropertyMarkers()
	local markers = exports['db'].post(0, 'property/markers/get', "{}")

	if markers[1] == 200 then
		PropertyMarkers = ArrayToDict(json.decode(markers[2]), 'id')
		SendPropertyMarkers()
	end
end

function GetMarkerByName(name)
	for k,v in pairs(PropertyMarkers) do
		if v.name == name then
			return v
		end
	end
end

function SendPropertyMarkers()
	local xPlayers = ESX.GetPlayers()

	for i=1, #xPlayers, 1 do
		local xPlayer = ESX.GetPlayerFromId(xPlayers[i])
		if xPlayer ~= nil then
			xPlayer.triggerEvent('property:updateMarkers', PropertyMarkers)
		end
	end
end
