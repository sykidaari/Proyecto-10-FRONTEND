import { errorMessage } from '../../components/errorHandlers/errorMessage/errorMessage';
import { form } from '../../components/form/form';
import { fulLEventFormFunctions } from '../../components/formFunctions/fullEventFormFunctions';
import { fetchApi } from '../../utils/apiFetcher';
import { create } from '../../utils/elementCreator';
import { removeOldElement } from '../../utils/removeOldElement';
import { home } from '../home/home';

export const createEvent = (main) => {
  main.innerHTML = '';

  const { formElement, inputs } = form({
    parentContainer: main,
    type: 'event',
    option: 'create_event'
  });

  const locationP = create('p', {
    className: 'location',
    innerText: 'location',
    appendTo: formElement
  });

  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    removeOldElement('.error-div');

    const formFilled = fulLEventFormFunctions(inputs, formElement);

    if (!formFilled) {
      return;
    }

    const { data, loaderElement } = formFilled;

    const token = localStorage.getItem('token');

    const currentUserId = localStorage.getItem('user-id');

    data.append('creator', currentUserId);

    try {
      const res = await fetchApi('events', { method: 'POST', token, data });

      if (res.error) {
        errorMessage({
          parentContainer: formElement,
          innerText: res.error.message
        });

        loaderElement.remove();
        return;
      }

      home(main, { previous: 'created the event' });

      loaderElement.remove();
    } catch (error) {
      if (error.message.includes('future')) {
        errorMessage({
          parentContainer: formElement,
          innerText: 'The event date must be in the future'
        });
      } else {
        errorMessage({
          parentContainer: formElement
        });
      }

      loaderElement.remove();
    }
  });
};
