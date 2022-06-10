const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__user',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
};

enableValidation(config); 

function enableValidation (setting) {
  const formElements = document.querySelectorAll(setting.formSelector);
  formElements.forEach((formElement) => {

    const inputElements = formElement.querySelectorAll(setting.inputSelector);

    inputElements.forEach((element) => {
      element.addEventListener('input', (evt) => handleFormInput(evt, formElement, setting));
    });
    
    toggleButton(formElement, setting);
  })
}

function handleFormInput(evt, formElement, setting) {
  const inputElement = evt.target;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = inputElement.validity.valid ? '' : inputElement.validationMessage;

  toggleButton(formElement, setting);
}

function toggleButton(formElement, setting) {
  const btnElement = formElement.querySelector(setting.submitButtonSelector);
  btnElement.disabled = !formElement.checkValidity();

  btnElement.classList.toggle(setting.inactiveButtonClass, !formElement.checkValidity());
}