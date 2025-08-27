import { errorMessage } from '../errorMessage/errorMessage';

// inputs is an object {}
export const emptyInputError = (inputs) => {
  let hasEmpty = false;

  for (const key in inputs) {
    const input = inputs[key];

    if (!input.value) {
      hasEmpty = true;

      const error = errorMessage({
        parentContainer: input.parentElement,
        innerText: 'This field is required',
        temporary: true
      });
    }
  }
  if (hasEmpty) {
    return true;
  }
};
