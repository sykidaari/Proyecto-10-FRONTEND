import { userForm } from '../../components/userForm/userForm';

export const register = async (main) => {
  main.innerHTML = '';

  userForm({ parentContainer: main, option: 'register' });
};
