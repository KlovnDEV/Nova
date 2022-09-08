local handProps = { ['hand_l'] = nil, ['hand_r'] = nil }

RegisterNetEvent('inventory:setHandProp')
AddEventHandler('inventory:setHandProp', function(area, prop)
	newHandProp(PlayerPedId(), area, GetHashKey(prop))
end)

function deleteHandProp(area)
	if DoesEntityExist(handProps[area]) then
		DeleteEntity(handProps[area])
	end

	handProps[area] = 0
end

function newHandProp(ped, area, propModel)
	deleteHandProp(area)

	RequestModel(propModel)

	while not HasModelLoaded(propModel) do
		Citizen.Wait(0)
	end

	handProps[area] = CreateObject(propModel, GetEntityCoords(ped), true, true, false)

	local areaInfos = {
		["hand_l"] = {
			["boneId"] = 60309,
			["pos"] = vector3(0.09, -0.1, 0.05),
			["rot"] = vector3(-100.0, 0.0, 0.0),
		},
		["hand_r"] = {
			["boneId"] = 28422,
			["pos"] = vector3(0.09, -0.1, -0.05),
			["rot"] = vector3(-80.0, 0.0, 0.0),
		},
	}

	local areaInfo = areaInfos[area]
	local bone = GetPedBoneIndex(ped, areaInfo.boneId)

	AttachEntityToEntity(handProps[area], ped, bone,
            areaInfo.pos,
            areaInfo.rot,
            1, 1, 0, 0, 2, 1)
end
