isCameraActive = false
cam = nil

function CreateSkinCam(pos, rot)
    DeleteSkinCam()

    local startAngle = GetGameplayCamRot(0).z-GetEntityRotation(PlayerPedId(), 0).z - 90

	if not DoesCamExist(cam) then
		cam = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)
    end

    local coords = GetEntityCoords(PlayerPedId())
	SetCamCoord(cam, coords+pos)

	SetCamActive(cam, true)
	RenderScriptCams(true, true, 0, true, true)

	isCameraActive = true
	SetCamRot(cam, rot, true)
	SetEntityHeading(PlayerPedId(), 90.0)
end

function DeleteSkinCam()
	isCameraActive = false
	SetCamActive(cam, false)
	RenderScriptCams(false, true, 500, true, true)
	cam = null
end