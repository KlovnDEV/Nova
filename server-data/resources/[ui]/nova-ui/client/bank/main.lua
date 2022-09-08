function updateBankData()
  local money = LocalPlayer.state.money
  local bank = money.bank or 0
  local cash = LocalPlayer.state['money:cash'] or 0

  SendNUIMessage({
    query = 'bank/update',
    bank = bank,
    cash = cash
  })
end

RegisterNetEvent('nova-ui:showBank')
AddEventHandler('nova-ui:showBank', function(zone)

  OpenScreen('bank')

  updateBankData()

  SendNUIMessage({
    query = 'bank/show'
  })

end)

RegisterNUICallback('query_api', function(data, cb)
	if data.cmd == "bank/withdraw" then
		local amount = tonumber(data.args.amount)
		TriggerServerEvent('atm:withdraw', amount)
	end	

	if data.cmd == "bank/deposit" then
		local amount = tonumber(data.args.amount)
		TriggerServerEvent('atm:deposit', amount)
	end	

end)


RegisterNetEvent('nova-ui:updateBank')
AddEventHandler('nova-ui:updateBank', function()
	for i = 1,3 do
		updateBankData()
		Citizen.Wait(100)
	end
end)
