import { deleteDiv } from '../../../components/deleteButton/deleteDiv';
import { errorMessage } from '../../../components/errorHandlers/errorMessage/errorMessage';
import { form } from '../../../components/form/form';
import { fullUserFormFunctions } from '../../../components/formFunctions/fullUserFormFunctions';
import { updateUserFormFunctions } from '../../../components/formFunctions/updateUserFormFunctions';
import { successMessage } from '../../../components/successMessage/successMessage';
import { fetchApi } from '../../../utils/apiFetcher';
import { create } from '../../../utils/elementCreator';
import { removeOldElement } from '../../../utils/removeOldElement';
import { profile } from '../profile';
import './_editProfile.scss';

export const editProfile = (main, id, token) => {
  const { formElement, inputs } = form({
    parentContainer: main,
    type: 'user',
    option: 'edit_profile',
    blurParent: true
  });

  deleteDiv(main, {
    parentContainer: formElement,
    target: 'profile',
    fetchPath: `users/${id}`
  });

  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    removeOldElement('.error-div');

    const result = updateUserFormFunctions(inputs, formElement);

    if (!result) return;

    const { data, loaderElement } = result;

    try {
      const res = await fetchApi(`users/${id}`, { method: 'PUT', token, data });

      if (res.error) {
        errorMessage({
          parentContainer: formElement,
          innerText: res.error.message
        });
      }

      if (res.user.img) {
        localStorage.setItem('profile-picture', res.user.img);

        document.querySelector('#profile-link .profile-picture').src =
          res.user.img;
      }

      await profile(main);

      removeOldElement('.blur-div');

      successMessage({
        parentContainer: main,
        innerText: "You've updated your profile correctly",
        lowerView: true
      });

      loaderElement.remove();
    } catch (error) {
      console.log(error);
      errorMessage({ parentContainer: formElement });

      loaderElement.remove();
    }
  });
};
