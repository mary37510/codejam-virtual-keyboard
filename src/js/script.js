const KEYBOARD = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard');

    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll('.keyboard_textarea').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          // eslint-disable-next-line no-param-reassign
          element.value = currentValue;
        });
      });
    });
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      '~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}',
      'caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
      'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'expand_less', 'shift',
      'ctrl', 'alt', 'space', 'chevron_left', 'expand_more', 'chevron_right',
    ];

    const createIconHTML = (iconName) => `<i class="material-icons">${iconName}</i>`;

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', '}', 'enter', 'shift'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key_special');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value
              .substring(0, this.properties.value.length - 1);
            this.triggerEvent('oninput');
          });

          break;

        case 'tab':
          keyElement.classList.add('keyboard__key_special');
          keyElement.innerHTML = ('<p>Tab</p>');

          keyElement.addEventListener('click', () => {
            this.properties.value += '    ';
            this.triggerEvent('oninput');
          });

          break;

        case 'expand_less':
          keyElement.classList.add('keyboard__key_special');
          keyElement.innerHTML = createIconHTML('expand_less');

          keyElement.addEventListener('click', () => {
            this.properties.value += '↑';
            this.triggerEvent('oninput');
          });

          break;

        case 'chevron_left':
          keyElement.classList.add('keyboard__key_special');
          keyElement.innerHTML = createIconHTML('chevron_left');

          keyElement.addEventListener('click', () => {
            this.properties.value += '←';
            this.triggerEvent('oninput');
          });

          break;

        case 'expand_more':
          keyElement.classList.add('keyboard__key_special');
          keyElement.innerHTML = createIconHTML('expand_more');

          keyElement.addEventListener('click', () => {
            this.properties.value += '↓';
            this.triggerEvent('oninput');
          });

          break;

        case 'chevron_right':
          keyElement.classList.add('keyboard__key_special');
          keyElement.innerHTML = createIconHTML('chevron_right');

          keyElement.addEventListener('click', () => {
            this.properties.value += '→';
            this.triggerEvent('oninput');
          });

          break;

        case 'ctrl':
          keyElement.classList.add('keyboard__key_special');
          keyElement.innerHTML = ('<p>Ctrl</p>');

          break;

        case 'alt':
          keyElement.classList.add('keyboard__key_special');
          keyElement.innerHTML = ('<p>Alt</p>');

          break;

        case 'shift':
          keyElement.classList.add('keyboard__key_special');
          keyElement.innerHTML = ('<p>Shift</p>');

          break;

        case 'caps lock':
          keyElement.classList.add('keyboard__key_special');
          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard__key_special');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard__key_extra_special');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent('oninput');
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? (key.toUpperCase()
            ) : (
              key.toLowerCase()
            );
            this.triggerEvent('oninput');
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    // eslint-disable-next-line no-restricted-syntax
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? (
          key.textContent.toUpperCase()
        ) : (
          key.textContent.toLowerCase()
        );
      }
    }
  },

  open(initialValue, oninput) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
  },

};


function focusOnForm() {
  document.querySelector('.keyboard_textarea').focus();
}


window.addEventListener('DOMContentLoaded', () => {
  KEYBOARD.init();
  focusOnForm();
});
