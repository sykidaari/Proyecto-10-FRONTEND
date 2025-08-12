const loginFields = {
  userNameOrEmailAddress: {
    id: 'username-or-email-address',
    text: 'Username or Email Address'
  },
  password: { id: 'password', text: 'Password', inputType: 'password' }
};

const fullUserFields = {
  userName: {
    id: 'username',
    text: 'Username',
    placeholder: 'username123'
  },
  emailAddress: {
    id: 'email-address',
    text: 'Email Address',
    inputType: 'email',
    placeholder: 'user@email.com'
  },
  password: {
    id: 'password',
    text: 'Password',
    inputType: 'password',
    placeholder: 'Password123'
  },
  img: {
    id: 'profile-picture',
    text: 'Profile Picture',
    inputType: 'file',
    placeholder: 'file.jpg'
  }
};

export const fields = {
  login: loginFields,
  register: fullUserFields,
  update: fullUserFields
};
