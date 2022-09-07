/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
import axios from 'axios';
import $ from 'jquery';

import 'bootstrap';

global.jQuery = $;
global.$ = $;

const BASE_URI = 'http://localhost:4000';

const html = {
  templates: {},
  wrapEl: document.querySelector('#content'),
  parser: function (data) {
    const type = data.type;
    const children = data.children;
    const temp = [];

    if (children) {
      for (let i = 0; i < children.length; i += 1) {
        temp.push(html.parser(children[i]));
      }
    }

    switch (type) {
      // tables
      case 'table':
        return html.renderTable(temp, data);
      case 'head':
        return html.renderHead(temp, data, 'thead');
      case 'row':
        return html.renderAny(temp, data, 'tr');
      case 'col':
        return html.renderAny(temp, data, 'td');
      case 'body':
        return html.renderAny(temp, data, 'tbody');
      // basic elements
      case 'div':
        return html.renderAny(temp, data, 'div');
      case 'span':
      case 'text':
        return html.renderAny(temp, data, 'span');
      // forms
      case 'form':
        return html.renderForm(temp, data);
      case 'input':
        return html.renderInput(temp, data);
      case 'button':
        return html.renderButton(temp, data, 'button');
      case 'submit':
        return html.renderButton(temp, data, 'submit');
      case 'reset':
        return html.renderButton(temp, data, 'reset');
      case 'button-group':
        return html.renderButtonGroup(temp, data);
      // tabs
      case 'tabs':
        return html.renderTabs(temp, data);
      case 'tab':
        return html.renderTab(temp, data);
      case 'tab-content':
        return html.renderTabContent(temp, data);
      case 'tab-pane':
        return html.renderTabPane(temp, data);
      // misc
      case 'card':
        return html.renderCard(temp, data);
      case 'ref':
        return html.renderRef(temp, data);

      default:
        return html.renderAny(temp, data, 'unknown');
    }
  },

  renderTabs: function (childs, data) {
    const tabsWr = this.renderAny(childs, data, 'ul', true, false);
    tabsWr.classList.add('nav');
    tabsWr.classList.add('nav-tabs');
    tabsWr.setAttribute('role', 'tablist');

    return tabsWr;
  },

  renderTab: function (childs, data) {
    const tabWr = this.renderAny(childs, data, 'li', true, false);
    tabWr.classList.add('nav-item');
    const a = document.createElement('a');
    a.classList.add('nav-link');

    a.setAttribute('href', `#${data.href}`);
    a.setAttribute('data-toggle', 'tab');
    a.setAttribute('role', 'tab');
    a.setAttribute('aria-selected', false);
    a.setAttribute('aria-controls', data.href);
    a.setAttribute('data-height', true);
    a.innerHTML = data.text;

    if (data.active) {
      a.classList.add('active');
      a.setAttribute('aria-selected', true);
    }

    tabWr.appendChild(a);

    return tabWr;
  },

  renderTabContent: function (childs, data) {
    const tabContentWr = this.renderAny(childs, data, 'div', true, false);
    tabContentWr.classList.add('tab-content');

    return tabContentWr;
  },

  renderTabPane: function (childs, data) {
    const tabContentWr = this.renderAny(childs, data, 'div', true, true);
    tabContentWr.classList.add('tab-pane');
    //    tabContentWr.classList.add('fade');
    tabContentWr.setAttribute('role', 'tabpanel');
    tabContentWr.setAttribute('aria-labelledby', `${data.id}-tab`);

    if (data.active) {
      tabContentWr.classList.add('active');
      tabContentWr.classList.add('show');
    }

    return tabContentWr;
  },

  renderHead: function (childs, data) {
    const TableWr = this.renderAny(childs, data, 'thead', true, false);

    // dark
    if (data.dark) TableWr.classList.add('thead-dark');

    return TableWr;
  },

  renderRef: function (childs, data) {
    if (this.templates[data.name]) {
      return this.templates[data.name];
    }

    throw Error(`Template ${data.name} not initialized!`);
  },

  renderAny: function (childs, data, tag, allowChildren, allowText) {
    const AnyElem = document.createElement(tag);

    if (data.children && (allowChildren || allowChildren === undefined)) {
      for (let i = 0; i < childs.length; i += 1) {
        AnyElem.appendChild(childs[i]);
      }
    }

    if (data.id) AnyElem.id = data.id;
    if (data.class) {
      data.class.split(' ').forEach((c) => AnyElem.classList.add(c));
    }

    if (data.width) {
      AnyElem.style.width = data.width;
    }

    if (data.height) {
      AnyElem.style.height = data.height;
    }

    if (!data.children && (allowText || allowText === undefined)) {
      if (data.html) {
        AnyElem.innerHTML = data.html;
      } else if (data.text) {
        AnyElem.innerText = data.text;
      }
    }

    return AnyElem;
  },

  renderCard: function (childs, data) {
    const CardWr = this.renderAny(childs, data, 'card', false, false);
    CardWr.classList.add('card');

    if (data.title) {
      const header = document.createElement('h5');
      header.classList.add('card-header');
      const headerText = document.createElement('span');
      headerText.innerHTML = data.title;
      const closeButton = document.createElement('button');
      closeButton.setAttribute('type', 'button');
      closeButton.classList.add('close');
      closeButton.innerHTML = '&times;';
      header.appendChild(headerText);
      headerText.appendChild(closeButton);
      CardWr.appendChild(header);

      closeButton.addEventListener('click', () => {
        this.postData('http://forms/onClose', {});
      });
    }

    const body = document.createElement('div');
    body.classList.add('card-body');

    if (data.children) {
      for (let i = 0; i < childs.length; i += 1) {
        body.appendChild(childs[i]);
      }
    }

    CardWr.appendChild(body);

    return CardWr;
  },
  renderTable: function (childs, data) {
    const TableWr = this.renderAny(childs, data, 'table', true, false);
    TableWr.classList.add('table');

    // dark
    if (data.dark) TableWr.classList.add('table-dark');

    return TableWr;
  },
  renderForm: function (childs, data) {
    const formWr = this.renderAny(childs, data, 'form', true, false);

    // name
    if (data.name) formWr.setAttribute('name', data.name);

    // action
    if (data.action) formWr.setAttribute('action', data.action);

    return formWr;
  },
  renderInput: function (childs, data) {
    const formInp = this.renderAny(childs, data, 'input', false, false);
    formInp.className = 'form-control';
    if (data.name) formInp.name = data.name;
    formInp.setAttribute('type', 'text');

    // text
    if (data.text) {
      formInp.value = data.text;
    }

    // label
    if (data.label) {
      const group = document.createElement('div');
      group.className = 'form-group';
      group.innerHTML = data.label;

      const label = document.createElement('label');
      label.setAttribute('for', data.name);

      group.appendChild(label);
      group.appendChild(formInp);

      return group;
    }

    return formInp;
  },
  renderButton: function (childs, data, type) {
    const Btn = this.renderAny(childs, data, 'button', false, false);
    Btn.classList.add('btn');
    // type
    Btn.setAttribute('type', type);

    // size
    if (data.size === 'small') {
      Btn.classList.add('btn-sm');
    } else if (data.size === 'large') {
      Btn.classList.add('btn-lg');
    }

    // modifier
    if (data.modifier) {
      Btn.classList.add(`btn-${data.modifier}`);
    } else {
      Btn.classList.add('btn-primary');
    }

    // disabled
    if (data.disabled) {
      Btn.setAttribute('disabled', 'disabled');
    }

    Btn.innerHTML = data.text;

    Btn.addEventListener('click', (e) => {
      // e.preventDefault();
      this.postData(data.target, data);
    });

    return Btn;
  },
  renderButtonGroup: function (childs, data) {
    const BtnGrp = this.renderAny(childs, data, 'div', true, false);
    BtnGrp.classList.add('btn-group');
    BtnGrp.setAttribute('role', 'group');

    for (let i = 0; i < childs.length; i += 1) {
      BtnGrp.appendChild(childs[i]);
    }

    return BtnGrp;
  },

  processTemplates: function (json) {
    let changed = false;
    Object.entries(json).forEach((entry) => {
      try {
        const key = entry[0];
        const val = entry[1];

        if (this.templates[key]) return;

        if (key !== 'index') {
          this.templates[key] = html.parser(val);
          changed = true;
        }
      } catch (err) {
        /* do nothing */
      }
    });

    return changed;
  },

  processJson: function (json) {
    this.templates = {};

    for (let i = 0; i < 10; i += 1) {
      if (!this.processTemplates(json)) break;
    }

    const index = html.parser(json.index);
    html.wrapEl.innerHTML = '';
    html.wrapEl.appendChild(index);
  },

  postData: (target, data) => {
    axios.post(target, JSON.stringify(data)).then(function (response) {
      //      console.log(response);
    });
  },

  init_debug: function () {
    html.wrapEl.innerHTML = '';

    axios
      .get(`${BASE_URI}/db`)
      .then((res) => {
        const event = new CustomEvent('message');
        event.data = { show: true, json: JSON.stringify(res.data) };

        window.dispatchEvent(event);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  init: function () {
    window.addEventListener('message', function (event) {
      const data = event.data;

      if (data.show) {
        html.wrapEl.innerHTML = '';
        html.processJson(JSON.parse(data.json));
      }

      if (data.hide) {
        html.wrapEl.innerHTML = '';
      }
    });

    this.init_debug();
  },
};

export default html;
