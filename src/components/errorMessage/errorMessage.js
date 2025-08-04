import './_errorMessage.scss';
import { create } from '../../utils/elementCreator';

export const errorMessage = ({ parentContainer, innerText, popUp = false }) => {
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
};
