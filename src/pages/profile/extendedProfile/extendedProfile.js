import { form } from '../../../components/form/form';
import { defaultProfilePicture } from '../../../data/imgPaths';
import { create } from '../../../utils/elementCreator';
import { home } from '../../home/home';
import { editProfile } from '../editProfile/editProfile';
import './_extendedProfile.scss';

export const extendedProfile = (main, user, token) => {
  const {
    img = defaultProfilePicture,
    userName: name,
    emailAddress: email,
    _id: id
  } = user;

  const userProfileSection = create('section', {
    className: 'user-profile-section',
    appendTo: main
  });

  const infoArticle = create('article', { appendTo: userProfileSection });

  const profilePicture = create('img', {
    className: 'profile-picture',
    src: img,
    alt: 'your profile-picture',
    appendTo: infoArticle
  });

  const userName = create('h3', {
    innerText: `Username: ${name}`,
    className: 'username',
    appendTo: infoArticle
  });

  const emailAddress = create('p', {
    innerText: `Email-address: ${email}`,
    className: 'email-address',
    appendTo: infoArticle
  });

  const editButton = create('button', {
    className: 'edit-button',
    innerText: 'Edit profile',
    appendTo: infoArticle
  });

  editButton.addEventListener('click', () => {
    editProfile(main, id, token);
  });

  const logOutButton = create('button', {
    innerText: 'Log out',
    className: 'log-out-button',
    appendTo: userProfileSection
  });

  logOutButton.addEventListener('click', () => {
    localStorage.clear();
    home(main);
  });

  return userProfileSection;
};
