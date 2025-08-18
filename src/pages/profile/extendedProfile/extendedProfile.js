import { form } from '../../../components/form/form';
import { defaultProfilePicture } from '../../../data/imgPaths';
import { create } from '../../../utils/elementCreator';
import { editProfile } from '../editProfile/editProfile';
import './_extendedProfile.scss';

export const extendedProfile = (parentContainer, user) => {
  const {
    img = defaultProfilePicture,
    userName: name,
    emailAddress: email
  } = user;

  const infoSection = create('section', {
    className: 'info-section',
    appendTo: parentContainer
  });

  const infoArticle = create('article', { appendTo: infoSection });

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
    editProfile(parentContainer);
  });
};
