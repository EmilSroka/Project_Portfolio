const defaultSettings = {
  placeholderClassName: 'contact-form__label--placeholder',
  invalidFieldClassName: 'contact-form__input--invalid',
  submitSelector: '.contact-form__submit',
  formSelector: '.contact-form',
  emailFieldSelector: '#cf-email',
  messageFieldSelector: '#cf-content',
}
const emailRegex = /\S+@\S+\.\S+/;
let placeholderClassName;
let invalidFieldClassName;
let submit;
let form;
let emailField;
let messageField;

export default ( settings = {} ) => {
  applySettings(settings);
  setListeners();
}

function applySettings(settings){
  settings = Object.assign(defaultSettings, settings);
  const { formSelector, submitSelector, emailFieldSelector, messageFieldSelector} = settings;
  ({placeholderClassName, invalidFieldClassName} = settings);

  form = document.querySelector(formSelector);
  submit = document.querySelector(submitSelector);
  emailField = document.querySelector(emailFieldSelector);
  messageField = document.querySelector(messageFieldSelector);
}

function setListeners() {
  form.addEventListener('focusin', handleField);
  form.addEventListener('focusout', handleField);
  submit.addEventListener('click', handleSubmit)
}

/* validation */
function handleSubmit(event){
  if(!dataAreValid()){
    event.preventDefault();
  }
}

function dataAreValid(){
  let emailIsCorrect = validateField(emailField, field => emailRegex.test(field.value));
  let messageIsNotEmpty = validateField(messageField, field => field.value.length > 0);
  return emailIsCorrect && messageIsNotEmpty;
}

function validateField(field, condition){
  if(condition(field)){
    return true;
  } else {
    field.classList.add(invalidFieldClassName);
    return false;
  }
}

/* inputs and placeholder */
function handleField({target, type}){
  if(target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'){
    handlePlaceholder(target, type);
    handleValidityIndicator(target, type);
  }
}

function handleValidityIndicator(target, type){
  if(type === 'focusin'){
    target.classList.remove(invalidFieldClassName);
  }
}

function handlePlaceholder(target, type){
  if(type === 'focusout' && target.value.length === 0){
    showPlaceholder(target);
  } else if(type === 'focusin'){
    hidePlaceholder(target);
  }
}

function showPlaceholder(input){
  input.previousElementSibling.classList.add(placeholderClassName);
}

function hidePlaceholder(input){
  input.previousElementSibling.classList.remove(placeholderClassName);
}

