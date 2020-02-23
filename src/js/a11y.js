const buttonText = {
  enabled: 'Disable visible focus',
  disabled: 'Enable visible focus'
}
let button;
let isActive;

export default (selector, state=false) => {
  button = document.querySelector(selector);
  isActive = state;

  isActive ? enableVisibleFocus() : disableVisibleFocus();
  button.addEventListener('click', toggleState);
}

function toggleState(){
  isActive = !isActive;
  isActive ? enableVisibleFocus() : disableVisibleFocus();
}

function enableVisibleFocus(){
  button.innerText = buttonText.enabled;
  document.body.classList.add('a11y');
}

function disableVisibleFocus(){
  button.innerText = buttonText.disabled;
  document.body.classList.remove('a11y');
}