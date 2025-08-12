import { form } from '../../components/form/form';
import { fetchApi } from '../../utils/apiFetcher';
import { errorMessage } from '../../components/errorHandlers/errorMessage/errorMessage';
import { fullUserFormFunctions } from '../../components/fullUserFormFunctions/fullUserFormFunctions';

export const register = async (main) => {
  const { formElement, inputs } = form({
    parentContainer: main,
    type: 'user',
    option: 'register',
    blurParent: true
  });

  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formFilled = fullUserFormFunctions(inputs, formElement);

    if (!formFilled) return;

    const { data, loaderElement } = formFilled;

    try {
      const user = await fetchApi('users/register', { method: 'POST', data });

      if (user.error) {
        errorMessage({
          parentContainer: formElement,
          innerText: user.error.message,
          removeOld: true
        });
      }

      if (user.token) {
        localStorage.setItem('token', user.token);

        home(main, user.token);
      }

      loaderElement.remove();
    } catch (error) {
      console.log(error.message);

      errorMessage({
        parentContainer: formElement,
        removeOld: true
      });

      loaderElement.remove();
    }
  });
};
