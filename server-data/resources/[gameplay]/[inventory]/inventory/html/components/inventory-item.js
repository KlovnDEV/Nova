function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

class InventoryItem extends HTMLElement {

	static get observedAttributes() {
		return ['item'];
	}

	onClick() {
		document.runActions(this.item, this.inventory);
	}

	render() {
		if (this.itemLabel) {
			this.itemLabel.innerHTML = this.item.label;
			this.itemDesc.innerHTML = this.item.description;

			if ((this.item.name == "equipped_weapon" || this.item.name == "weapon") && !this.item.melee) {
				this.itemAmmo.style.display = "block";
				this.itemAmmo.innerHTML = numberWithSpaces(this.item.ammo);
			} else {
				this.itemAmmo.style.display = "none";
			}

			if (this.item.name == "money" || this.item.name == "account_money" || this.item.name == "black_money") {
				this.itemMoney.style.display = "block";
				this.itemMoney.innerHTML = numberWithSpaces(this.item.item.amount);

			} else {
				this.itemMoney.style.display = "none"
				this.itemCount.innerHTML = "";
				if (this.item.item.amount > 1) {
					this.itemCount.innerHTML = " x"+ this.item.item.amount;
				}
			}

			if (this.item.weight >= 0.01) {
				this.itemWeight.style.display = "block";
				this.itemWeight.innerHTML = (Math.ceil(this.item.weight*100)*0.01).toFixed(2);
			} else {
				this.itemWeight.style.display = "none";
			}
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name == 'item') {
			this.item = newValue;
		}

		this.render();
	}

	connectedCallback() {
		this.shadow.innerHTML = "";

		let link = document.createElement('link');
		link.rel  = 'stylesheet';
		link.type = 'text/css';
		link.href = 'components/inventory-item.css';
		link.media = 'all';
		this.shadow.appendChild(link);

		if (!this.hasAttribute('tabindex')) {
			this.tabIndex = 0;
		}

		this.container = document.createElement('div');
		this.container.classList.add('container');

		this.leftPane = document.createElement('div');
		this.leftPane.classList.add('leftPane');

		this.rightPane = document.createElement('div');
		this.rightPane.classList.add('rightPane');

		this.itemLabelContainer = document.createElement('div');

		this.itemLabel = document.createElement('span');
		this.itemLabel.classList.add('item-label');

		this.itemCount = document.createElement('span');
		this.itemCount.classList.add('item-count');

		this.itemDesc = document.createElement('div');
		this.itemDesc.classList.add('item-desc');

		this.itemMoney = document.createElement('div');
		this.itemMoney.classList.add('item-money');

		this.itemAmmo = document.createElement('div');
		this.itemAmmo.classList.add('item-ammo');

		this.itemWeight = document.createElement('div');
		this.itemWeight.classList.add('item-weight');
/*
		this.flex = document.createElement('div');
		this.val = document.createElement('div');
		this.label = document.createElement('div');

		this.container.classList.add('circle');
		this.flex.classList.add('circle-flex');
		this.val.classList.add('circle-val');
		this.label.classList.add('circle-label');

		this.flex.appendChild(this.val);
		this.container.appendChild(this.flex);
		this.container.appendChild(this.label);
*/

		this.itemLabelContainer.appendChild(this.itemLabel);
		this.itemLabelContainer.appendChild(this.itemCount);

		this.leftPane.appendChild(this.itemLabelContainer);
		this.leftPane.appendChild(this.itemDesc);

		this.rightPane.appendChild(this.itemMoney);
		this.rightPane.appendChild(this.itemAmmo);
		this.rightPane.appendChild(this.itemWeight);

		this.container.appendChild(this.leftPane);
		this.container.appendChild(this.rightPane);
		this.shadow.appendChild(this.container);

		this.render();
	}

	constructor(item, inventory) {
		// If you define a constructor, always call super() first!
		// This is specific to CE and required by the spec.
		super();
		this.item = item;
		this.inventory = inventory;
		this.shadow = this.attachShadow({mode: 'open'});

		this.addEventListener('click', e => {
			if (this.disabled) {
				return;
			}
			this.onClick();
		});
	}

}

customElements.define('inventory-item', InventoryItem);
