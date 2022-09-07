const CameraApp = new Vue({
	el: "#app",

	data: {
		camerasOpen: false,
		cameraBoxLabel: "Testing",
		cameraLabel: "Front Left Store Camera",
		cameraBroken: false,
	},

	methods: {
		OpenCameras(boxLabel, label, broken) {
			this.camerasOpen = true;
			this.cameraLabel = label;
			this.cameraBoxLabel = boxLabel;
			this.cameraBroken = broken;
		},

		CloseCameras() {
			this.camerasOpen = false;
			this.cameraBroken = false;
		},

		UpdateCamera(label, broken) {
			this.cameraLabel = label;
			this.cameraBroken = broken;
		}
	}
});

document.onreadystatechange = () => {
	if (document.readyState === "complete") {
		window.addEventListener('message', function (event) {

			if (event.data.type == "enablecam") {

				CameraApp.OpenCameras(event.data.box, event.data.label, !!event.data.broken);

			} else if (event.data.type == "disablecam") {

				CameraApp.CloseCameras();

			} else if (event.data.type == "updatecam") {

				CameraApp.UpdateCamera(event.data.label, !!event.data.broken);

			}

		});
	};
};
