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

    const userKey = userValue.includes('@') ? 'emailAddress' : 'userName';

    const data = {
      [userKey]: userValue,
      password: passwordValue
    };

    console.log(data);

    // fetchApi();
  });
};
