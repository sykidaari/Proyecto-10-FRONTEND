import { create } from '../../utils/elementCreator';
import './_successMessage.scss';

export const successMessage = ({
  parentContainer,
  innerText,
  temporary = true,
  lowerView = false
}) => {
  const successDiv = create('div', {
    className: 'success',
    appendTo: parentContainer
  });

  const successP = create('p', {
    innerText,
    appendTo: successDiv
  });

  if (temporary) {
    successDiv.classList.add('temporary');
    setTimeout(() => {
      successDiv.remove();
    }, 2000);
  }

  if (lowerView) {
    successDiv.classList.add('lowerview');
  }
};
