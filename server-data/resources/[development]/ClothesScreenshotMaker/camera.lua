isCameraActive = false
cam = nil

function CreateSkinCam(pos, rot, entityRot)
    DeleteSkinCam()

    local startAngle = GetGameplayCamRot(0).z-GetEntityRotation(PlayerPedId(), 0).z - entityRot

	if not DoesCamExist(cam) then
		cam = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)
    end

    local coords = GetEntityCoords(PlayerPedId())
	SetCamCoord(cam, coords+pos)

	SetCamActive(cam, true)
	RenderScriptCams(true, true, 0, true, true)

	isCameraActive = true
	SetCamRot(cam, rot, true)
	SetEntityHeading(PlayerPedId(), entityRot)
end

function DeleteSkinCam()
	isCameraActive = false
	SetCamActive(cam, false)
	RenderScriptCams(false, true, 500, true, true)
	cam = null
end