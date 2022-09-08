var original = null;

function numberWithSymbols(x, sym) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sym);
}

$(window).ready(function () {
      tinymce.init({
        selector: '#editor',
	plugins : 'advlist link image lists',
	toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | fontsizeselect",
	inline: true,
	language: 'ru',
/*
	plugins: [ 'quickbars', 'quick' ],
	toolbar: false,
	menubar: false,
*/
      });

	window.addEventListener('message', function (event) {
		let data = event.data;

		if (data.showMenu) {
			original = data;
			$('#titleText').val(data.title);
			$('#btnSave').toggle(!data.readonly);

			tinymce.activeEditor.getBody().innerHTML = data.text;
			tinymce.activeEditor.setMode(data.readonly?'readonly':'design');

			$('#container').fadeIn();

		} else if (data.hideAll) {
			$('#container').fadeOut();
		}
	});

	window.addEventListener('onkeyup', function (data) {
		if (data.which == 27) {
			$.post('http://paper/escape', '{}');
		}
	});

	$('#container').hide();
});

function onCloseClicked() {
	$.post('http://paper/escape', '{}');
}

function onSaveClicked() {
	let data = tinymce.activeEditor.getBody().innerHTML; 
	let title = $('#titleText').val();
	$.post('http://paper/save', JSON.stringify({title: title, text: data, original: original}));
}

