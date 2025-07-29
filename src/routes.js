import { defaultProfilePicture } from './data/imgPaths';
import { home } from './pages/home/home';

export const routes = {
  home: { text: 'Eventic', function: home },
  login: { text: 'Login' },
  register: { text: 'Register' },
  profile: { icon: defaultProfilePicture }
};
