import { createEvent } from '../../pages/createEvent/createEvent';
import { create } from '../../utils/elementCreator';
import { authError } from '../errorHandlers/authError/authError';
import './_eventCreationButton.scss';

export const eventCreationButton = (app, main) => {
  const wrapper = create('div', {
    className: 'event-creation-wrapper',
    appendTo: app
  });

  const button = create('button', {
    innerText: '+',
    className: 'creation-button',
    appendTo: wrapper
  });

  const span = create('span', {
    innerText: 'Create new event',
    appendTo: wrapper
  });

  button.addEventListener('click', () => {
    const token = localStorage.getItem('token');
    if (!token) {
      authError({
        parentContainer: wrapper,
        removeOld: true,
        additionalClasses: 'create-event',
        temporary: true
      });

      return;
    }

    createEvent(main);
  });
};
