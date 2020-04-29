const defaultSettings = {
  placeholderClassName: 'contact-form__label--placeholder',
  invalidFieldClassName: 'contact-form__input--invalid',
  fieldSelector: '.contact-form__input',
  submitSelector: '.contact-form__submit',
  formSelector: '.contact-form',
  emailFieldSelector: '#cf-email',
  messageFieldSelector: '#cf-content',
}
const emailRegex = /\S+@\S+\.\S+/;
let placeholderClassName;
let invalidFieldClassName;
let fieldSelector;
let submit;
let form;
let emailField;
let messageField;
let fields;

export default ( settings = {} ) => {
  applySettings(settings);
  setListeners();
  wait(100).then(initPlaceholders);
}

function applySettings(settings){
  settings = Object.assign(defaultSettings, settings);
  const { formSelector, submitSelector, emailFieldSelector, messageFieldSelector} = settings;
  ({placeholderClassName, invalidFieldClassName, fieldSelector} = settings);

  form = document.querySelector(formSelector);
  submit = document.querySelector(submitSelector);
  emailField = document.querySelector(emailFieldSelector);
  messageField = document.querySelector(messageFieldSelector);
  fields = form.querySelectorAll(fieldSelector);
}

function setListeners() {
  form.addEventListener('focusin', handleField);
  form.addEventListener('focusout', handleField);
  form.addEventListener('animationstart', handleAutofill);
  submit.addEventListener('click', handleSubmit);
}

/* validation */
function handleSubmit(event){
  if(!dataAreValid()){
    event.preventDefault();
    displayValidityIndicator();
  }
}

function dataAreValid(){
  return hasValidMail(emailField) && !isEmpty(messageField);
}

function displayValidityIndicator(){
  if(! hasValidMail(emailField)){
    emailField.classList.add(invalidFieldClassName);
  }
  if(isEmpty(messageField)){
    messageField.classList.add(invalidFieldClassName);
  }
}

function hasValidMail(field){
  return emailRegex.test(field.value);
}

function isEmpty(field){
  return field.value.length === 0;
}

/* inputs and placeholder */
function handleField({target, type}){
  if(target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'){
    checkPlaceholder(target, type);
    disableValidityIndicator(target);
  }
  handleEdgeAutofill(target);
}

function disableValidityIndicator(target) {
  target.classList.remove(invalidFieldClassName);
}

function checkPlaceholder(target, type){
  if(type === 'focusout'){
    handlePlaceholders(target);
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

function handleEdgeAutofill(field){
  if(field.classList.contains('edge-autofilled')){
    initPlaceholders();
  }
}

function initPlaceholders(){
  fields.forEach(field => {
    handlePlaceholders(field);
  });
}

function handlePlaceholders(field){
  !isEmpty(field) ? hidePlaceholder(field) : showPlaceholder(field);
}

/* autofill */
function handleAutofill({ target, animationName }){
  switch(animationName){
    case 'onAutoFillStart':
      hidePlaceholder(target); break;
    case 'onAutoFillCancel':
      handlePlaceholders(target);
  }
}

function wait(ms){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    },ms)
  });
}