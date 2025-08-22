import { eventsList } from '../../components/events/eventsList/eventsList';
import { filterSection } from '../../components/filterSection/filterSection';
import { successMessage } from '../../components/successMessage/successMessage';

import { removeOldElement } from '../../utils/removeOldElement';

export const home = async (main, { identified } = {}) => {
  removeOldElement('.blur-div');

  main.innerHTML = '';

  const filters = filterSection(main);

  const token = localStorage.getItem('token');
  const profilePicture = localStorage.getItem('profile-picture');

  const headerAnchorsVisibilityOptions = {
    loggedIn: {
      '#login-link': 'add',
      '#register-link': 'add',
      '#profile-link': 'remove'
    },
    loggedOut: {
      '#login-link': 'remove',
      '#register-link': 'remove',
      '#profile-link': 'add'
    }
  };

  const state = token ? 'loggedIn' : 'loggedOut';
  const option = headerAnchorsVisibilityOptions[state];

  for (const selector in option) {
    document.querySelector(selector).classList[option[selector]]('invisible');
  }

  if (token && profilePicture) {
    document.querySelector('#profile-link .profile-picture').src =
      profilePicture;
  }

  if (identified) {
    successMessage({
      parentContainer: main,
      innerText: `You've ${identified} correctly!`
    });
  }

  if (!(await eventsList(main))) {
    filters.classList.add('error');
  }
};
