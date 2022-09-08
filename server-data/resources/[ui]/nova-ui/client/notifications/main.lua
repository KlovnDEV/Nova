ESX = nil

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end

	ESX.SetPlayerData('nui_state', nil)
end)

function convertNotificationMessage(msg)
	local function count(base, pattern)
	    return select(2, string.gsub(base, pattern, ""))
	end

	local function convert_color_to_html(str, from ,to, endtag)
		local result = str
		result = result:gsub(from, to)
		for i=1,count(str,from) do
			result = result .. endtag
		end
		return result
	end

	local str = msg;
	str = str:gsub("&", "&amp;")
	str = str:gsub("<", "&lt;")
	str = str:gsub(">", "&gt;")
	str = str:gsub("\"", "&quot;")
	str = str:gsub("~n~","<br>")
	str = convert_color_to_html(str, "~r~", "<span style='color: #F92652'>", "</span>")
	str = convert_color_to_html(str, "~b~", "<span style='color: #66D9EF'>", "</span>")
	str = convert_color_to_html(str, "~g~", "<span style='color: #A6E22E'>", "</span>")
	str = convert_color_to_html(str, "~y~", "<span style='color: #E6DB74'>", "</span>")
	str = convert_color_to_html(str, "~p~", "<span style='color: #AE81FF'>", "</span>")
	str = convert_color_to_html(str, "~o~", "<span style='color: #FD971F'>", "</span>")
	str = convert_color_to_html(str, "~c~", "<span style='color: #BCA3A3'>", "</span>")
	str = convert_color_to_html(str, "~m~", "<span style='color: #8F8F8F'>", "</span>")
	str = convert_color_to_html(str, "~u~", "<span style='color: #666'>", "</span>")
	str = convert_color_to_html(str, "~w~", "<span style='color: #fff'>", "</span>")
	str = convert_color_to_html(str, "~s~", "<span>", "</span>")
	str = convert_color_to_html(str, "~h~", "<span style='font-weight: 100'>", "</span>")

	return str
end

RegisterNetEvent('ui:showNotification')
AddEventHandler('ui:showNotification', function(args)
	SendNUIMessage({
		query = 'notifications/add',
		text = convertNotificationMessage(args.text),
	})
end)
