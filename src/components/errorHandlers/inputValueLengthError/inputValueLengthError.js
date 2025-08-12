import { errorMessage } from '../errorMessage/errorMessage';

export const inputValueLengthError = (
  input,
  { parentContainer, minLength, maxLength }
) => {
  if (input.value.length < minLength || input.value.length > maxLength) {
    errorMessage({
      parentContainer,
      innerText: `The ${input.id} must be between ${minLength} and ${maxLength} characters long.`,
      removeOld: true
    });

    return true;
  }
};
