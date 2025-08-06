import { defaultProfilePicture } from './data/imgPaths';
import { home } from './pages/home/home';
import { login } from './pages/login/login';
import { register } from './pages/register/register';

export const routes = {
  home: { text: 'Eventic', function: home },
  login: { text: 'Login', function: login },
  register: { text: 'Register', function: register },
  profile: { icon: defaultProfilePicture }
};
