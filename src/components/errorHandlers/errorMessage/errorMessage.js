import './_errorMessage.scss';
import { create } from '../../../utils/elementCreator';
import { removeOldElement } from '../../../utils/removeOldElement';

export const errorMessage = ({
  parentContainer,
  innerText = 'Something went wrong, please refresh the page or try again later.',
  popUp = false,
  removeOld = false
}) => {
  if (removeOld) {
    removeOldElement('.error-div');
  }

  const errorDiv = create('div', {
    className: 'error-div',
    appendTo: parentContainer
  });

  const errorText = create('p', {
    className: 'error-text',
    innerText,
    appendTo: errorDiv
  });

  if (popUp) {
    errorDiv.classList.add('popup');

    const closeButton = create('button', {
      classList: 'close-button',
      innerText: 'X',
      appendTo: errorDiv
    });

    closeButton.addEventListener('click', () => {
      errorDiv.remove();
    });
  }

  return errorDiv;
};
