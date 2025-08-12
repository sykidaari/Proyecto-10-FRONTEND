import { emptyInputError } from '../errorHandlers/emptyInputError/emptyInputError';
import { fileFormatError } from '../errorHandlers/fileFormatError/fileFormatError';
import { inputValueLengthError } from '../errorHandlers/inputValueLengthError/inputValueLengthError';
import { loader } from '../loader/loader';

export const fullUserFormFunctions = (inputs, formElement) => {
  const { img, ...requiredInputs } = inputs;

  if (emptyInputError(requiredInputs)) return;

  const { userName, password } = requiredInputs;

  if (
    inputValueLengthError(userName, {
      parentContainer: formElement,
      minLength: 3,
      maxLength: 30
    }) ||
    inputValueLengthError(password, {
      parentContainer: formElement,
      minLength: 8,
      maxLength: 30
    })
  )
    return;

  if (!/^(?![.])[a-z0-9._]+$/.test(userName.value)) {
    errorMessage({
      parentContainer: formElement,
      innerText: "Invalid username. Use a–z, 0–9, . _ ; not starting with '.'",
      removeOld: true
    });

    return;
  }

  const data = new FormData();

  for (const key in requiredInputs) {
    const value = requiredInputs[key].value;

    data.append(key, value);
  }

  const file = img.files[0];
  if (file) {
    data.append('img', file);

    if (fileFormatError(file, { parentContainer: formElement })) {
      return;
    }
  }

  const loaderElement = loader(formElement);

  return { data, loaderElement };
};
