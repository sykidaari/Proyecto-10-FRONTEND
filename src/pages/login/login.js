import { userForm } from '../../components/userForm/userForm';
import { fetchApi } from '../../utils/apiFetcher';

export const login = async (main) => {
  main.innerHTML = '';

  const {
    form,
    inputs: { userNameOrEmailAddress, password }
  } = userForm({ parentContainer: main, option: 'login' });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const userValue = userNameOrEmailAddress.value;
    const passwordValue = password.value;

    const isEmail = userValue.includes('@');

    const userKey = isEmail ? 'emailAddress' : 'userName';

    const data = {
      [userKey]: userValue,
      password: passwordValue
    };

    console.log(data);

    try {
      const user = fetchApi('users/login', {
        method: 'POST',
        data,
        json: true
      });
    } catch (error) {}
  });
};
