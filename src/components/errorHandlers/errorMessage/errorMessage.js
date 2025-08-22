import './_errorMessage.scss';
import { create } from '../../../utils/elementCreator';
import { removeOldElement } from '../../../utils/removeOldElement';

export const errorMessage = ({
  parentContainer,
  innerText = 'Something went wrong, please refresh the page or try again later.',
  additionalClasses,
  popUp = false,
  removeOld = false,
  temporary = false
}) => {
  const className = additionalClasses
    ? `error-div ${additionalClasses}`
    : 'error-div';

  const selector = additionalClasses
    ? `.error-div.${additionalClasses.split(' ').join('.')}`
    : '.error-div';

  if (removeOld) {
    removeOldElement(selector);
  }

  const errorDiv = create('div', {
    className,
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

  if (temporary) {
    errorDiv.classList.add('temporary');
    setTimeout(() => {
      errorDiv.remove();
    }, 2000);
  }

  return errorDiv;
};
