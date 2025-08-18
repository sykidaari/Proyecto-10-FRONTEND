import { home } from '../pages/home/home';
import { login } from '../pages/login/login';
import { profile } from '../pages/profile/profile';
import { register } from '../pages/register/register';
import { defaultProfilePicture } from './imgPaths';

export const routes = {
  home: { text: 'Eventic', function: home },
  login: { text: 'Login', function: login },
  register: { text: 'Register', function: register },
  profile: { icon: defaultProfilePicture, function: profile }
};
