var state = "inventory"
var inventorySelectedName = ""
var currentInventory = null

function updateSelectedItem(s) {
	inventorySelectedName = s.item.name;
}

function focusToItemName(name) {
	$('#inventory').children('inventory-item').each(function(i){
		let item_name = this.item.name;

		if (item_name == name) {
			this.scrollIntoView({block: "center", inline: "nearest"});
			this.focus();
			return false;
		}
	});
}

document.doEscape = function(which) {
	if (state == "inventory") {
		$.post('http://inventory/escape', '{}');
	} else if (state == "actions") {
		document.setState('inventory');
		focusToItemName(inventorySelectedName);

	} else if (state == "input" && which != 8) {
		document.setState("inventory");
	}
}

$(window).ready(function () {
	let timerId = setInterval(() => {

		if (document.activeElement.tagName == "BODY") {
			if (state == "inventory") {
				var elems = document.getElementsByTagName("inventory-item");
				if (elems.length > 0) {
					elems[0].focus();
				}
			}
		}
	}, 100);

	$('#inputdialog-input').on('keyup', function (e) {
		if (e.keyCode === 13) {
			if (state == "input") {
				$('#inputdialog-button').click();
			}
		}
	});

	window.addEventListener('message', function (event) {
		let data = event.data;

		if (data.action == "showInputBox") {
			$('#inputdialog-header-row').text(data.title);
			$('#inputdialog-desc-row').text(data.hint);
			$('#inputdialog-input').val("");

			$('#inputdialog-button').off('click');

			document.setState("input");

			$('#inputdialog-button').on('click', function() {
				let text = $('#inputdialog-input').val();
				if (text.length > 0) {
					$.post('http://inventory/inputbox', JSON.stringify({ "id": data.id, "text": text }));
					document.setState("inventory");
				}
			})
		}

		if (data.action == "showInventory") {
			if (!data.value) {
				$('body').fadeOut('fast');
				currentInventory = null;
				return
			}

			document.setState('inventory');
			currentInventory = data.inventory;

			$('#inventory-label').text(currentInventory.title || "Инвентарь");

			$('body').fadeIn('fast');
		}

		if (data.action == "updateInventory") {

			if (!currentInventory || currentInventory.category != data.inventory.category || currentInventory.identifier != data.inventory.identifier) {
				return;
			}

			let prnt = $('#inventory')[0];
			prnt.innerHTML = "";

			for (let k in data.items) {
				var item = data.items[k];
				let itemObj = new InventoryItem(item, data.inventory);

				itemObj.tabIndex = k*1+1;
				prnt.appendChild(itemObj);

				if (k == 0) {
					itemObj.focus();
				}
			}

			focusToItemName(inventorySelectedName);

			let weight = (Math.ceil(data.weight*10)*0.1).toFixed(1)
			if (data.inventory.maxWeight) {
				let maxWeight = (Math.ceil(data.inventory.maxWeight*10)*0.1).toFixed(1)
				$('#inventory-weight-val').text(`${weight} / ${maxWeight}`);
			} else {
				$('#inventory-weight-val').text(`${weight}`);
			}

//			$('#inventory').text(JSON.stringify(data.items));
		}

	});

	document.onkeyup = function (data) {
		if (data.which == 27 || data.which == 8) { // ESC, Backspace
			document.doEscape(data.which);
		}
	};

	document.onkeydown = function (data) {
		if([32, 37, 38, 39, 40].indexOf(data.keyCode) > -1) {
			data.preventDefault();
		}

		if (data.which == 13) { // ENTER
			document.activeElement.click();
		}

		if (state == "inventory") {
			if (data.which == 40) { // DOWN
				let items = document.getElementsByTagName("inventory-item");
				if (items.length > 0) {
					let nextItems = Array.from(items).filter(x => x.tabIndex == document.activeElement.tabIndex + 1)
					if (nextItems.length > 0) {
						nextItems[0].focus();
					} else {
						items[0].focus();
					}

					updateSelectedItem(document.activeElement);
				}
			}

			if (data.which == 38) { // UP
				let items = document.getElementsByTagName("inventory-item");
				if (items.length > 0) {
					let nextItems = Array.from(items).filter(x => x.tabIndex == document.activeElement.tabIndex - 1)
					if (nextItems.length > 0) {
						nextItems[0].focus();
					} else if (items.length > 0) {
						items[items.length-1].focus();
					}

					updateSelectedItem(document.activeElement);
				}
			}
		}

		if (state == "actions") {
			if (data.which == 40) { // DOWN
				let items = document.getElementsByTagName("action-item");
				let nextItems = Array.from(items).filter(x => x.tabIndex == document.activeElement.tabIndex + 1)
				if (nextItems.length > 0) {
					nextItems[0].focus();
					nextItems[0].scrollIntoView();
				} else {
					items[0].focus();
					items[0].scrollIntoView();
				}
			}

			if (data.which == 38) { // UP
				let items = document.getElementsByTagName("action-item");
				let nextItems = Array.from(items).filter(x => x.tabIndex == document.activeElement.tabIndex - 1)
				if (nextItems.length > 0) {
					nextItems[0].focus();
					nextItems[0].scrollIntoView();
				} else if (items.length > 0) {
					items[items.length-1].focus();
					items[items.length-1].scrollIntoView();
				}
			}
		}

	};


	$('#inventory-back')[0].addEventListener('click', e => {
		document.doEscape();
	});

});

document.runActions = function(item, inventory) {
	document.setState('actions');

	let cnt = $('#inventory-actions')[0];
	cnt.innerHTML = "";

	item.actions.sort(function(a, b) {
		return b.priority - a.priority;
	});

	for (let k in item.actions) {
		let action = item.actions[k];
		let actionObj = new ActionItem(item, inventory, action);
		actionObj.tabIndex = k*1+1;
		cnt.appendChild(actionObj);

		if (k == 0) {
			actionObj.focus();
		}
	}
}

document.setState = function(st) {

	if (st == "inventory") {
		$('#inputdialog-container').hide();
		$('#inventory-actions').hide();
		$('#inventory').show();
//		$('#inventory-back').hide();
	}

	if (st == "actions") {
		$('#inputdialog-container').hide();
		$('#inventory').hide();
		$('#inventory-actions').show();
//		$('#inventory-back').show();
	}

	if (st == "input") {
		$('#inputdialog-container').show();
		$('#inputdialog-container').css('display', 'flex');
		$('#inputdialog-input').focus();
	}

	state = st;
}
