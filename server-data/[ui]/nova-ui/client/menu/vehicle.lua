function switchVehicleDoor(veh, door)
--[[
    for i = 0, 10 do
        if NetworkHasControlOfEntity(veh) then
            break
        end

        NetworkRequestControlOfEntity(veh)
        Citizen.Wait(0)
    end
]]--
    if GetVehicleDoorAngleRatio(veh, door) > 0.1 then
        SetVehicleDoorShut(veh, door, false, false)
    else
        local locked = GetVehicleDoorLockStatus(veh)
        if locked == 1 then
            SetVehicleDoorOpen(veh, door, false, false)
        end
    end
end

function vehicleControl(veh, coords)
    local ped = PlayerPedId()

    local closestBone = nil
    local minDist = 9999.9
    local hasBoot = true

    local boneDists = {}

    for _,BoneName in pairs({ 'bonnet', 'boot', 'handle_pside_f', 'handle_pside_r', 'handle_dside_f', 'handle_dside_r' }) do
        local BonePos = GetWorldPositionOfEntityBone(veh, GetEntityBoneIndexByName(veh, BoneName))
        local dist = #(coords-BonePos)

        if #BonePos > 0 then
            boneDists[BoneName] = dist
        end
    end

    if IsVehicleDoorDamaged(veh,5) then
        hasBoot = false
    end

    local isInside = IsPedInVehicle(ped, veh, true)
    local vehNet = VehToNet(veh)

    if boneDists['boot'] and hasBoot and boneDists['boot'] < 0.8 and not isInside then
        lastVehicle = veh
--			openBoot(veh)
        TriggerServerEvent('nova-ui:switchVehicleDoor', vehNet, 5)
    elseif boneDists['handle_dside_f'] and boneDists['handle_dside_f'] < 0.5 then
        TriggerServerEvent('nova-ui:switchVehicleDoor', vehNet, 0)
    elseif boneDists['handle_pside_f'] and boneDists['handle_pside_f'] < 0.5 then
        TriggerServerEvent('nova-ui:switchVehicleDoor', vehNet, 1)
    elseif boneDists['handle_dside_r'] and boneDists['handle_dside_r'] < 0.5 then
        TriggerServerEvent('nova-ui:switchVehicleDoor', vehNet, 2)
    elseif boneDists['handle_pside_r'] and boneDists['handle_pside_r'] < 0.5 then
        TriggerServerEvent('nova-ui:switchVehicleDoor', vehNet, 3)
    elseif boneDists['bonnet'] and boneDists['bonnet'] < 0.8 and not isInside then
        TriggerServerEvent('nova-ui:switchVehicleDoor', vehNet, 4)

--		elseif dist < 2.5 then
--			lastVehicle = veh
--			openBoot(veh)
    end
end

RegisterNetEvent('nova-ui:switchVehicleDoor')
AddEventHandler('nova-ui:switchVehicleDoor', function(veh, door)
    local veh = NetToVeh(veh)
    if DoesEntityExist(veh) then
        switchVehicleDoor(veh, door)
    end
end)
