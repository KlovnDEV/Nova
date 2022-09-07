function numberWithSymbols(x, sym) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sym);
}

$(window).ready(function () {
	window.addEventListener('message', function (event) {
		let data = event.data;

		if (data.setTransactions) {
			var bd = $('#transaction-table-body')[0];
			bd.innerHTML = "";
			for (let i = 0; i < data.transactions.length; i++) {
				var trans = data.transactions[i];
				var ts = new Date(trans.timestamp)

				var newRow = bd.insertRow();
				var cDate = newRow.insertCell();
				var cDesc = newRow.insertCell();
				var cAmount = newRow.insertCell();
				cDate.style.width = "200px";
				cAmount.style.width = "150px";

				cDate.innerHTML = ts.toLocaleDateString("ru-RU") + " " + ts.toLocaleTimeString("ru-RU");
				cDesc.innerHTML = trans.description;
				cAmount.innerHTML = trans.amount;
			}
		}

		if (data.showMenu) {
			$('#container').fadeIn();
			$('#menu').fadeIn();
			$('#deposit_amount').val(data.player.money);
			$('#account-value-cash').text("$"+numberWithSymbols(data.player.money," "));

			let bankAmount = 0;
			let savingsAmount = 0;
			for (let i = 0; i < data.player.accounts.length; i++) {
				if (data.player.accounts[i].name == 'bank') {
					bankAmount = data.player.accounts[i].money;
				}

				if (data.player.accounts[i].name == 'savings') {
					savingsAmount = data.player.accounts[i].money;
				}
			}

			$('#withdraw_amount').val(bankAmount);
			$('#account-value-bank').text("$"+numberWithSymbols(bankAmount," "));
			$('#account-value-savings').text("$"+numberWithSymbols(savingsAmount," "));

		} else if (data.hideAll) {
			$('#container').fadeOut();
		}
	});

	document.onkeyup = function (data) {
		if (data.which == 27) {
			$.post('http://esx_atm/escape', '{}');
		}
	};

	$('#container').hide();

	$('#button-balance').on('click', function () {
		$('#container-body-transactions').hide();
		$('#container-body-balance').show();
	})

	$('#button-transactions').on('click', function () {
		$('#container-body-transactions').show();
		$('#container-body-balance').hide();
	})

	$('#deposit_savings_btn').on('click', function () {
		$.post('http://esx_atm/deposit', JSON.stringify({
			amount: $('#deposit_savings_amount').val(),
			account: 'savings',
		}));

		$('#deposit_savings_amount').val(0);
	})

	$('#deposit_savings_amount').on("keyup", function (e) {
		if (e.keyCode == 13) {
			$.post('http://esx_atm/deposit', JSON.stringify({
				amount: $('#deposit_savings_amount').val(),
				account: 'savings',
			}));

			$('#deposit_savings_amount').val(0);
		}
	});

	$('#deposit_btn').on('click', function () {
		$.post('http://esx_atm/deposit', JSON.stringify({
			amount: $('#deposit_amount').val(),
			account: 'bank',
		}));

		$('#deposit_amount').val(0);
	})

	$('#deposit_amount').on("keyup", function (e) {
		if (e.keyCode == 13) {
			$.post('http://esx_atm/deposit', JSON.stringify({
				amount: $('#deposit_amount').val(),
				account: 'bank',
			}));

			$('#deposit_amount').val(0);
		}
	});

	$('#withdraw_btn').on('click', function () {
		$.post('http://esx_atm/withdraw', JSON.stringify({
			amount: $('#withdraw_amount').val(),
			account: 'bank',
		}));

		$('#withdraw_amount').val(0);
	});

	$('#withdraw_amount').on("keyup", function (e) {
		if (e.keyCode == 13) {
			$.post('http://esx_atm/withdraw', JSON.stringify({
				amount: $('#withdraw_amount').val(),
				account: 'bank',
			}));

			$('#withdraw_amount').val(0);
		}
	});

	$('#withdraw_savings_btn').on('click', function () {
		$.post('http://esx_atm/withdraw', JSON.stringify({
			amount: $('#withdraw_savings_amount').val(),
			account: 'savings',
		}));

		$('#withdraw_savings_amount').val(0);
	});

	$('#withdraw_savings_amount').on("keyup", function (e) {
		if (e.keyCode == 13) {
			$.post('http://esx_atm/withdraw', JSON.stringify({
				amount: $('#withdraw_savings_amount').val(),
				account: 'savings',
			}));

			$('#withdraw_savings_amount').val(0);
		}
	});

});
