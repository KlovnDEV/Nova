let isCameraActive = false;
let cam = null;

let camTarget = [ 0, 0, 0 ]
let camDistance = { minimum: 0.0, maximum: 1.0 };
let camHeading = 0.0;
let camZoom = 0.0;
let camControlsEnabled = false;

setTick(() => {
	if (!isCameraActive) return;
	UpdateSkinCam();
})

function CreateSkinCam(coords, heading, minDist, maxDist) {
    DeleteSkinCam()

    const startAngle = GetGameplayCamRot(0).z-GetEntityRotation(PlayerPedId(), 0).z - 90

	if (!DoesCamExist(cam)) {
		cam = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)
	}

    camTarget = coords

	camDistance.minimum = minDist;
	camDistance.maximum = maxDist;
	camZoom = 1.0;

	camHeading = heading

	SetCamCoord(cam, camTarget[0], camTarget[1], camTarget[2])
	RenderScriptCams(true, true, 0, true, true)

	SetCamActive(cam, true)

	isCameraActive = true
}

function DeleteSkinCam() {
	isCameraActive = false
	SetCamActive(cam, false)
	RenderScriptCams(false, true, 500, true, true)
	cam = null
}

function SetSkinCamTarget(target) {
	camTarget = target;
}

function SetSkinCamDistance(minimum, maximum) {
	camDistance.minimum = minimum;
	camDistance.maximum = maximum;
}

function SetSkinCamControls(enabled) {
    camControlsEnabled = enabled;
}

function SkinCamControls() {
	var frameTime = GetFrameTime();

	if (IsDisabledControlPressed(24, 14)) camZoom += 20.0 * frameTime; //INPUT_WEAPON_WHEEL_NEXT
	else if (IsDisabledControlPressed(24, 15)) camZoom -= 20.0 * frameTime;  // INPUT_WEAPON_WHEEL_PREV

	if (IsDisabledControlPressed(0, 25)) { // INPUT_AIM
		camHeading -= GetDisabledControlNormal(0, 1) * frameTime * 2000.0;
	}

	if (IsDisabledControlPressed(0, 34)) camHeading -= frameTime * 200.0; //INPUT_MOVE_LEFT_ONLY
	if (IsDisabledControlPressed(0, 35)) camHeading += frameTime * 200.0; //INPUT_MOVE_RIGHT_ONLY
}

function UpdateSkinCam() {

    if (camControlsEnabled) {
        SkinCamControls();
    }

	if (camHeading > 360) camHeading -= 360;
	if (camHeading < 0) camHeading += 360;

	if (camZoom < 0) camZoom = 0;
	else if (camZoom > 1) camZoom = 1;

	var angle = camHeading * Math.PI / 180.0;
	var theta = [ Math.cos(angle), Math.sin(angle), 0 ]

	var distance = camDistance.minimum + (camDistance.maximum - camDistance.minimum) * camZoom;

	var pos = [ camTarget[0] + distance * theta[0], camTarget[1] + distance * theta[1], camTarget[2] ]

	SetCamCoord(cam, pos[0], pos[1], pos[2])
	PointCamAtCoord(cam, camTarget[0], camTarget[1], camTarget[2])
}
