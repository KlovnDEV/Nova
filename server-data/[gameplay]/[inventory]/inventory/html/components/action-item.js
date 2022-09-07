class ActionItem extends HTMLElement {

	static get observedAttributes() {
		return ['item'];
	}

	onClick() {
		let data = {
			item: this.item,
			inventory: this.inventory,
			action: this.action.key,
		}

//		console.log(JSON.stringify(data))

		$.post('http://inventory/do_action', JSON.stringify(data));

		document.setState("inventory");
	}

	render() {
		if (this.actionLabel) {
			this.actionLabel.innerHTML = this.action.label;
//			this.actionDesc.innerHTML = this.item.description;
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
		link.href = 'components/action-item.css';
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

		this.actionLabel = document.createElement('div');
		this.actionLabel.classList.add('item-label');

		this.actionDesc = document.createElement('div');
		this.actionDesc.classList.add('item-desc');

		this.leftPane.appendChild(this.actionLabel);
		this.leftPane.appendChild(this.actionDesc);

		this.container.appendChild(this.leftPane);
		this.container.appendChild(this.rightPane);
		this.shadow.appendChild(this.container);

		this.render();
	}

	constructor(item, inventory, action) {
		// If you define a constructor, always call super() first!
		// This is specific to CE and required by the spec.
		super();
		this.item = item;
		this.inventory = inventory;
		this.action = action;
		this.shadow = this.attachShadow({mode: 'open'});

		this.addEventListener('click', e => {
			if (this.disabled) {
				return;
			}
			this.onClick();
		});
	}

}

customElements.define('action-item', ActionItem);
