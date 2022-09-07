ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

AddEventHandler('onResourceStart', function(resource)
	if resource == GetCurrentResourceName() then
		Citizen.CreateThread(function()
			Citizen.Wait(1000)
			ReloadProperties()
			ReloadPropertyMarkers()
		end)
	end
end)

AddEventHandler('esx:playerLoaded', function(source, xPlayer)
	if xPlayer and xPlayer.identifier then
		SendProperties()
		SendPropertyMarkers()
	end
end)

RegisterServerEvent("property:onInMarkerPress")
AddEventHandler("property:onInMarkerPress", function(propertyName)
	local xPlayer = ESX.GetPlayerFromId(source)

	local marker = GetMarkerByName(propertyName)
	if marker then
		PressInMarker(xPlayer, marker)
	end
end)

RegisterServerEvent("property:onOutMarkerPress")
AddEventHandler("property:onOutMarkerPress", function(propertyName)
	local xPlayer = ESX.GetPlayerFromId(source)

	local marker = GetMarkerByName(propertyName)
	if marker then
		PressOutMarker(xPlayer, marker)
	end
end)

function PressInMarker(xPlayer, marker)
	local property = GetPropertyByName(marker.name)
	TriggerClientEvent("property:openPropertyMenu", xPlayer.source, property, xPlayer.identifier)
end

function PressOutMarker(xPlayer, marker)
	xPlayer.triggerEvent("property:returnFrom", marker)
end

RegisterServerEvent("property:buy")
AddEventHandler("property:buy", function(propertyId)
	local xPlayer = ESX.GetPlayerFromId(source)
	local property = Properties[propertyId]

	if not property then
		xPlayer.showNotification('Недвижимость не найдена!')
	end

	ESX.Money.Pay('bank', xPlayer.identifier, property.price, function(success)
		SetPropertyOwner(property.id, xPlayer.identifier, false)
		ReloadProperties()
		xPlayer.showNotification('Недвижимость приобретена!')
	end, function(failure)
		xPlayer.showNotification('Недостаточно средств!')
	end, { description = "Buy property", property = property }, 'property_tax')
end)

RegisterServerEvent("property:sell")
AddEventHandler("property:sell", function(propertyId)
	local xPlayer = ESX.GetPlayerFromId(source)
	local property = Properties[propertyId]
	if property then
		ESX.Money.Add('bank', xPlayer.identifier, math.floor(property.price * Config.SellCoefficient), function(success)
			SetPropertyOwner(property.id, nil)
			ReloadProperties()
			xPlayer.showNotification('Недвижимость продана!')
		end, function(failure)
			xPlayer.showNotification('Не удалось продать недвижимость!')
		end)
	end
end)

RegisterServerEvent("property:rent")
AddEventHandler("property:rent", function(propertyId)
	local xPlayer = ESX.GetPlayerFromId(source)
	local property = Properties[propertyId]
	if property then
		SetPropertyOwner(property.id, xPlayer.identifier, true)
		ReloadProperties()
	end

	ESX.Money.Pay('bank', xPlayer.identifier, math.floor(property.price * Config.RentCoefficient), function(success)
		SetPropertyOwner(property.id, xPlayer.identifier, true)
		ReloadProperties()
		xPlayer.showNotification('Недвижимость снята!')
	end, function(failure)
		xPlayer.showNotification('Недостаточно средств!')
	end, { description = "Rent property", property = property }, 'property_tax')

end)

RegisterServerEvent("property:breakin")
AddEventHandler("property:breakin", function(propertyId)
	local xPlayer = ESX.GetPlayerFromId(source)	
	local property = Properties[propertyId]
	if property then
		if ESX.Roles.HasRole(xPlayer.identifier, 'police') then
			xPlayer.setCoords(json.decode(property.inside_pos))
		end
	end
end)
