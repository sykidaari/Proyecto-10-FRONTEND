import { emptyInputError } from '../errorHandlers/emptyInputError/emptyInputError';
import { fileFormatError } from '../errorHandlers/fileFormatError/fileFormatError';
import { inputValueLengthError } from '../errorHandlers/inputValueLengthError/inputValueLengthError';
import { loader } from '../loader/loader';

export const fulLEventFormFunctions = (inputs, formElement) => {
  const { img, ...requiredInputs } = inputs;

  if (emptyInputError(requiredInputs)) return;

  const { title, description } = requiredInputs;

  if (
    inputValueLengthError(title, {
      parentContainer: formElement,
      minLength: 3,
      maxLength: 100
    }) ||
    inputValueLengthError(description, {
      parentContainer: formElement,
      minLength: 10,
      maxLength: 2000
    })
  )
    return;

  const data = new FormData();

  for (const key in requiredInputs) {
    const value = requiredInputs[key].value;

    if (['address', 'city', 'postalCode', 'country'].includes(key)) {
      data.append(`location[${key}]`, value);
    } else {
      data.append(key, value);
    }
  }

  const file = img.files[0];
  if (file) {
    if (fileFormatError(file, { parentContainer: formElement })) return;
    data.append('img', file);
  }

  const loaderElement = loader(formElement);

  return { data, loaderElement };
};
