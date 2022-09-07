local function RotationToDirection(rotation)
	local adjustedRotation =  vector3(
		(math.pi / 180) * rotation.x,
		(math.pi / 180) * rotation.y,
		(math.pi / 180) * rotation.z
	)

	local direction = vector3(
		-math.sin(adjustedRotation.z) * math.abs(math.cos(adjustedRotation.x)),
		math.cos(adjustedRotation.z) * math.abs(math.cos(adjustedRotation.x)),
		math.sin(adjustedRotation.x)
	)

	return direction
end

function GetWorldCoordFromScreenCoord(screen_x, screen_y)
		screen_x = math.min(math.max(screen_x, 0.001), 0.999)
		screen_y = math.min(math.max(screen_y, 0.001), 0.999)

		local cameraRotation = GetFinalRenderedCamRot()
		local cameraCoord = GetFinalRenderedCamCoord()

--		print(cameraRotation)

		local forward = RotationToDirection(cameraRotation)

		local right = RotationToDirection(cameraRotation - vector3(cameraRotation.x,0,90))
		local up = RotationToDirection(cameraRotation - vector3(90+cameraRotation.x,0,0))

		local goodRight = 0.0
		local goodUp = 0.0
		local destination = cameraCoord + forward * GetFinalRenderedCamNearClip()*3
		local retval,_,_ = GetScreenCoordFromWorldCoord(destination.x, destination.y, destination.z)

		if not retval then
			return nil
		end

		local step = 1.0
		while math.abs(step) > 1e-6 do
			local newDest = destination + (goodRight + step) * right

--			DrawBox(newDest-0.01, newDest+0.01, 255, 0, 0, 100)

			local retval,x,y = GetScreenCoordFromWorldCoord(newDest.x, newDest.y, newDest.z)

			if (retval == false) or (step > 0 and x > screen_x) or (step < 0 and x < screen_x) then
				step = -(step / 2.0)
			else
				goodRight = goodRight + step
			end
		end

		destination = destination + goodRight * right
		step = 1.0
		while math.abs(step) > 1e-6 do
			local newDest = destination + (goodUp + step) * up

--			DrawBox(newDest-0.01, newDest+0.01, 255, 0, 0, 100)

			local retval,x,y = GetScreenCoordFromWorldCoord(newDest.x, newDest.y, newDest.z)

			if (retval == false) or (step > 0 and y > screen_y) or (step < 0 and y < screen_y) then
				step = -(step / 2.0)
			else
				goodUp = goodUp + step
			end
		end

		destination = destination + goodUp * up

	return destination, forward
end

local function RayCastGamePlayCamera(screen_x, screen_y, distance)

	local cursorCoord, forward = GetWorldCoordFromScreenCoord(screen_x, screen_y)
	local cameraCoord = GetFinalRenderedCamCoord()

	if not cursorCoord then
		return nil, nil, nil
	end

	local destination = cameraCoord + (cursorCoord-cameraCoord)*distance


	local a, b, c, d, e = GetShapeTestResult(StartShapeTestRay(cameraCoord.x, cameraCoord.y, cameraCoord.z, destination.x, destination.y, destination.z, -1, -1, 1))
	return cameraCoord, b, c, d, e
end


function NUICursorRaycast(dist)
	local rx, ry = GetActiveScreenResolution()
	local cx, cy = GetNuiCursorPosition()
	local screen_x = cx*1.0/rx
	local screen_y = cy*1.0/ry

	local hit, coords, normal, entity = ScreenToWorld(31, 0)
	local cameraCoord = GetGameplayCamCoord()

--	local cameraCoord, hit, coords, normal, entity = RayCastGamePlayCamera(screen_x, screen_y, dist)
	return cameraCoord, hit, coords, normal, entity
end
--[[
function NUICursorRaycast_my(dist)
	local rx, ry = GetActiveScreenResolution()
	local cx, cy = GetNuiCursorPosition()
	local screen_x = cx*1.0/rx
	local screen_y = cy*1.0/ry

--	local hit, coords, normal, entity = ScreenToWorld(7, PlayerPedId())
--	local cameraCoord = GetGameplayCamCoord()

	local cameraCoord, hit, coords, normal, entity = RayCastGamePlayCamera(screen_x, screen_y, dist)
	return cameraCoord, hit, coords, normal, entity
end
]]--
function RayCastCapsule(pos1, pos2, radius, flag)

	local a, b, c, d, e = GetShapeTestResult(StartShapeTestCapsule(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z, radius, flag, PlayerPedId(), 7))
	return b, c, e
end

----------------------

function ScreenToWorld(flags, toIgnore)
    local camRot = GetGameplayCamRot(0)
    local camPos = GetGameplayCamCoord()
    local posX = GetControlNormal(0, 239)
    local posY = GetControlNormal(0, 240)
    local cursor = vector2(posX, posY)
    local cam3DPos, forwardDir = ScreenRelToWorld(camPos, camRot, cursor)
    local direction = camPos + forwardDir * 150.0
    local rayHandle = StartShapeTestRay(cam3DPos, direction, flags, toIgnore, 0)
    local _, hit, endCoords, surfaceNormal, entityHit = GetShapeTestResult(rayHandle)
    if entityHit > 0 then
        entityType = GetEntityType(entityHit)
    end
    return hit, endCoords, surfaceNormal, entityHit, entityType, direction
end

function ScreenRelToWorld(camPos, camRot, cursor)
    local camForward = RotationToDirection(camRot)
    local rotUp = vector3(camRot.x + 1.0, camRot.y, camRot.z)
    local rotDown = vector3(camRot.x - 1.0, camRot.y, camRot.z)
    local rotLeft = vector3(camRot.x, camRot.y, camRot.z - 1.0)
    local rotRight = vector3(camRot.x, camRot.y, camRot.z + 1.0)
    local camRight = RotationToDirection(rotRight) - RotationToDirection(rotLeft)
    local camUp = RotationToDirection(rotUp) - RotationToDirection(rotDown)
    local rollRad = -(camRot.y * math.pi / 180.0)
    local camRightRoll = camRight * math.cos(rollRad) - camUp * math.sin(rollRad)
    local camUpRoll = camRight * math.sin(rollRad) + camUp * math.cos(rollRad)
    local point3DZero = camPos + camForward * 1.0
    local point3D = point3DZero + camRightRoll + camUpRoll
    local point2D = World3DToScreen2D(point3D)
    local point2DZero = World3DToScreen2D(point3DZero)
    local scaleX = (cursor.x - point2DZero.x) / (point2D.x - point2DZero.x)
    local scaleY = (cursor.y - point2DZero.y) / (point2D.y - point2DZero.y)
    local point3Dret = point3DZero + camRightRoll * scaleX + camUpRoll * scaleY
    local forwardDir = camForward + camRightRoll * scaleX + camUpRoll * scaleY
    return point3Dret, forwardDir
end

function RotationToDirection(rotation)
    local x = rotation.x * math.pi / 180.0
    --local y = rotation.y * math.pi / 180.0
    local z = rotation.z * math.pi / 180.0
    local num = math.abs(math.cos(x))
    return vector3((-math.sin(z) * num), (math.cos(z) * num), math.sin(x))
end

function World3DToScreen2D(pos)
    local _, sX, sY = GetScreenCoordFromWorldCoord(pos.x, pos.y, pos.z)
    return vector2(sX, sY)
end
