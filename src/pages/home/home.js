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

  if (token) {
    [
      ['#login-link', 'add'],
      ['#register-link', 'add'],
      ['#profile-link', 'remove']
    ].forEach(([selector, action]) =>
      document.querySelector(selector).classList[action]('invisible')
    );

    if (profilePicture) {
      const userProfilePicture = document.querySelector(
        '#profile-link .profile-picture'
      );
      userProfilePicture.src = profilePicture;
    }
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
