

  local ragdoled = false

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
	    local ped = PlayerPedId()

        if ragdoled and IsControlJustPressed(0, 73) then
            ragdoled = false
        elseif IsControlJustReleased(0, 74) and not IsPedInAnyVehicle(ped, true) then
            ragdoled = not ragdoled
        end

        if ragdoled == true then
            SetPedToRagdoll(GetPlayerPed(-1), 1000, 1000, 0, 0, 0, 0)
        end
    end
end)

