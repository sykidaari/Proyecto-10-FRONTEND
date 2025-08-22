import { errorMessage } from '../errorHandlers/errorMessage/errorMessage';
import { fileFormatError } from '../errorHandlers/fileFormatError/fileFormatError';
import { inputValueLengthError } from '../errorHandlers/inputValueLengthError/inputValueLengthError';
import { loader } from '../loader/loader';

export const updateUserFormFunctions = (inputs, formElement) => {
  const { img, ...textInputs } = inputs;
  const data = new FormData();
  let hasData = false;

  for (const key in textInputs) {
    const value = textInputs[key].value;
    if (!value) continue;

    if (key === 'userName') {
      if (!/^(?![.])[a-z0-9._]+$/.test(value)) {
        errorMessage({
          parentContainer: formElement,
          innerText:
            "Invalid username. Use a–z, 0–9, . _ ; not starting with '.'",
          removeOld: true
        });
        return;
      }
      if (
        inputValueLengthError(textInputs[key], {
          parentContainer: formElement,
          minLength: 3,
          maxLength: 30
        })
      ) {
        return;
      }
    }

    if (
      key === 'password' &&
      inputValueLengthError(textInputs[key], {
        parentContainer: formElement,
        minLength: 8,
        maxLength: 30
      })
    ) {
      return;
    }

    data.append(key, value);
    hasData = true;
  }

  const file = img.files[0];
  if (file) {
    if (fileFormatError(file, { parentContainer: formElement })) return;
    data.append('img', file);
    hasData = true;
  }

  if (!hasData) return;

  const loaderElement = loader(formElement);

  return { data, loaderElement };
};
