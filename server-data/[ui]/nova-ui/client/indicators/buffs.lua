local sentBuffs = ""

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(1000)
		local buffs = LocalPlayer.state.buffs
		local buffsStr = json.encode(buffs)

		if buffs ~= nil and buffsStr ~= sentBuffs then
			sentBuffs = buffsStr
			SendNUIMessage({query = "indicators/buffs", buffs = buffs})
		end
	end
end)
