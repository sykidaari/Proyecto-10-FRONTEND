import { emptyInputError } from '../../components/errorHandlers/emptyInputError/emptyInputError';
import { errorMessage } from '../../components/errorHandlers/errorMessage/errorMessage';
import { loader } from '../../components/loader/loader';
import { form } from '../../components/form/form';
import { fetchApi } from '../../utils/apiFetcher';
import { removeOldElement } from '../../utils/removeOldElement';
import { home } from '../home/home';

export const login = async (main) => {
  const { formElement, inputs } = form({
    parentContainer: main,
    option: 'login',
    type: 'user',
    blurParent: true
  });

  const { userNameOrEmailAddress, password } = inputs;

  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    removeOldElement('.error-div');

    if (emptyInputError(inputs)) return;

    const loaderElement = loader(formElement);

    const userValue = userNameOrEmailAddress.value;
    const passwordValue = password.value;

    const isEmail = userValue.includes('@');

    const userKey = isEmail ? 'emailAddress' : 'userName';

    const data = {
      [userKey]: userValue,
      password: passwordValue
    };

    try {
      const user = await fetchApi('users/login', {
        method: 'POST',
        data,
        json: true
      });

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
      errorMessage({ parentContainer: formElement, removeOld: true });

      loaderElement.remove();
    }
  });
};
