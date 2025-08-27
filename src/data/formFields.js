const loginFields = {
  userNameOrEmailAddress: {
    id: 'username-or-email-address'
  },
  password: { id: 'password', inputType: 'password' }
};

const fullUserFields = {
  userName: {
    id: 'username',
    placeholder: 'username123'
  },
  emailAddress: {
    id: 'email-address',
    inputType: 'email',
    placeholder: 'user@email.com'
  },
  password: {
    id: 'password',
    inputType: 'password',
    placeholder: 'Password123'
  },
  img: {
    id: 'profile-picture',
    inputType: 'file',
    placeholder: 'file.jpg'
  }
};

const eventFields = {
  title: {
    id: 'title',

    placeholder: 'My Event'
  },
  date: { id: 'date', inputType: 'date' },
  address: { id: 'address', placeholder: 'Streetname 1' },
  city: { id: 'city', placeholder: 'Madrid' },
  postalCode: { id: 'postalcode', placeholder: '000000' },
  country: { id: 'country', placeholder: 'Spain' },
  description: {
    id: 'description',
    placeholder: 'A fun event for everyone to enjoy!',
    multiLine: true
  },
  category: {
    id: 'category',
    list: [
      'music',
      'sports',
      'art',
      'education',
      'community',
      'food',
      'nightlife',
      'business',
      'wellness',
      'family'
    ]
  },
  img: {
    id: 'image',
    inputType: 'file',
    placeholder: 'file.jpg'
  }
};

export const fields = {
  login: loginFields,
  register: fullUserFields,
  edit_profile: fullUserFields,
  create_event: eventFields,
  edit_event: eventFields
};
