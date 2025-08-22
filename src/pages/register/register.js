import { form } from '../../components/form/form';
import { fetchApi } from '../../utils/apiFetcher';
import { errorMessage } from '../../components/errorHandlers/errorMessage/errorMessage';
import { fullUserFormFunctions } from '../../components/formFunctions/fullUserFormFunctions';
import { home } from '../home/home';
import { removeOldElement } from '../../utils/removeOldElement';

export const register = async (main) => {
  const { formElement, inputs } = form({
    parentContainer: main,
    type: 'user',
    option: 'register',
    blurParent: true
  });

  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    removeOldElement('.error-div');

    const formFilled = fullUserFormFunctions(inputs, formElement);

    if (!formFilled) return;

    const { data, loaderElement } = formFilled;

    try {
      const res = await fetchApi('users/register', { method: 'POST', data });

      if (res.error) {
        errorMessage({
          parentContainer: formElement,
          innerText: res.error.message
        });
      }

      if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user-id', res.user._id);

        if (res.user.img) {
          localStorage.setItem('profile-picture', res.user.img);
        }

        home(main, { identified: 'registered' });
      }

      loaderElement.remove();
    } catch (error) {
      errorMessage({
        parentContainer: formElement
      });

      loaderElement.remove();
    }
  });
};
