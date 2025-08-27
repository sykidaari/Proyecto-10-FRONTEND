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
      const res = await fetchApi('users/login', {
        method: 'POST',
        data,
        json: true
      });

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

        home(main, { previous: 'logged in' });
      }

      loaderElement.remove();
    } catch (error) {
      errorMessage({ parentContainer: formElement });

      loaderElement.remove();
    }
  });
};
