import { home } from '../../pages/home/home';
import { fetchApi } from '../../utils/apiFetcher';
import { create } from '../../utils/elementCreator';
import { removeOldElement } from '../../utils/removeOldElement';
import { errorMessage } from '../errorHandlers/errorMessage/errorMessage';
import { loader } from '../loader/loader';
import './_deleteDiv.scss';

export const deleteDiv = (
  main,
  { parentContainer, target, fetchPath } = {}
) => {
  removeOldElement('delete-div');

  const deleteDiv = create('div', {
    className: 'delete-div',
    appendTo: parentContainer
  });

  const deleteButton = create('button', {
    innerText: 'Delete',
    className: 'delete-button',
    appendTo: deleteDiv
  });

  deleteButton.addEventListener('click', () => {
    const confirmationDiv = create('div', {
      className: 'confirmation-div',
      appendTo: deleteDiv
    });

    const p = create('p', {
      innerText: `Are you sure you want to delete your ${target}?`,
      appendTo: confirmationDiv
    });

    const confirmationButton = create('button', {
      innerText: 'Yes',
      className: 'yes',
      appendTo: confirmationDiv
    });

    const rejectionButton = create('button', {
      innerText: 'No',
      className: 'no',
      appendTo: confirmationDiv
    });

    rejectionButton.addEventListener('click', () => {
      confirmationDiv.remove();
    });

    confirmationButton.addEventListener('click', async () => {
      confirmationDiv.remove();

      const loaderElement = loader(parentContainer);

      const token = localStorage.getItem('token');

      try {
        const res = await fetchApi(fetchPath, { method: 'DELETE', token });

        if (res.error) {
          errorMessage({
            parentContainer,
            innerText: res.error.message
          });

          loaderElement.remove();
          return;
        }

        localStorage.clear();
        home(main, { previous: `deleted the ${target}` });

        loaderElement.remove();
      } catch (error) {
        errorMessage({
          parentContainer
        });

        loaderElement.remove();
      }
    });
  });
};
