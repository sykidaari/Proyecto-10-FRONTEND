import { deleteDiv } from '../../components/deleteButton/deleteDiv';
import { errorMessage } from '../../components/errorHandlers/errorMessage/errorMessage';
import { form } from '../../components/form/form';
import { updateEventFormFunctions } from '../../components/formFunctions/updateEventFormFunctions';
import { fetchApi } from '../../utils/apiFetcher';
import { create } from '../../utils/elementCreator';
import { removeOldElement } from '../../utils/removeOldElement';
import { home } from '../home/home';
import './_editEvent.scss';

export const editEvent = (main, id) => {
  main.innerHTML = '';

  const { formElement, inputs } = form({
    parentContainer: main,
    type: 'event',
    option: 'edit_event'
  });

  deleteDiv(main, {
    parentContainer: formElement,
    target: 'event',
    fetchPath: `events/${id}`
  });

  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    removeOldElement('.error-div');

    const result = updateEventFormFunctions(inputs, formElement);

    if (!result) return;

    const { data, loaderElement } = result;

    const token = localStorage.getItem('token');

    try {
      const res = await fetchApi(`events/${id}`, {
        method: 'PUT',
        token,
        data
      });

      if (res.error) {
        errorMessage({
          parentContainer: formElement,
          innerText: res.error.message
        });

        loaderElement.remove();
        return;
      }

      home(main, { previous: 'updated the event' });

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
