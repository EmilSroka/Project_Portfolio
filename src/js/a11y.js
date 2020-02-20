export function handleVisibleFocus(buttonSelector, defaultState){
  button = document.querySelector(buttonSelector);
  state = defaultState;

  state ? enableVisibleFocus() : disableVisibleFocus();
  button.addEventListener('click', toggleState);
}

let button;
let state;

function toggleState(){
  state = !state;
  state ? enableVisibleFocus() : disableVisibleFocus();
}

function enableVisibleFocus(){
  button.innerText = 'Wyłącz widoczny focus';
  document.body.classList.add('a11y');
}

function disableVisibleFocus(){
  button.innerText = 'Włącz widoczny focus';
  document.body.classList.remove('a11y');
}