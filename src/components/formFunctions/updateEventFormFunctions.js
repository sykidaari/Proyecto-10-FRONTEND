import { fileFormatError } from '../errorHandlers/fileFormatError/fileFormatError';
import { inputValueLengthError } from '../errorHandlers/inputValueLengthError/inputValueLengthError';
import { loader } from '../loader/loader';

export const updateEventFormFunctions = (inputs, formElement) => {
  const { img, ...textInputs } = inputs;

  const { title, description } = textInputs;

  const data = new FormData();
  let hasData = false;

  for (const key in textInputs) {
    const value = textInputs[key].value;
    if (!value) continue;

    if (
      (key === 'title' &&
        inputValueLengthError(title, {
          parentContainer: formElement,
          minLength: 3,
          maxLength: 100
        })) ||
      (key === 'description' &&
        inputValueLengthError(description, {
          parentContainer: formElement,
          minLength: 10,
          maxLength: 2000
        }))
    )
      return;

    if (['address', 'city', 'postalCode', 'country'].includes(key)) {
      data.append(`location[${key}]`, value);
    } else {
      data.append(key, value);
    }
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
