const showInputError = (validationConfig, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};
const hideInputError = (validationConfig, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (validationConfig, formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(validationConfig, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(validationConfig, formElement, inputElement);
  }
};

const setEventListeners = (validationConfig, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(validationConfig, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(validationConfig, formElement, inputElement);
      toggleButtonState(validationConfig, inputList, buttonElement);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(validationConfig, formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (validationConfig, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, validationConfig);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

const clearValidation = (validationConfig, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  inputList.forEach((inputElement) => {
    hideInputError(validationConfig, formElement, inputElement);
  });
  disableSubmitButton(
    formElement.querySelector(validationConfig.submitButtonSelector),
    validationConfig
  );
}

const disableSubmitButton = (button, config) => {
  button.disable == true;
  button.classList.add(config.inactiveButtonClass);
};

export { enableValidation, clearValidation };
