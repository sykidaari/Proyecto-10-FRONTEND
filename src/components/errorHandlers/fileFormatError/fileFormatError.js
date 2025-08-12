import { errorMessage } from '../errorMessage/errorMessage';

export const fileFormatError = (file, { parentContainer }) => {
  const allowedFormats = ['jpg', 'png', 'jpeg', 'gif', 'webp'];

  const extension = file.name.split('.').pop().toLowerCase();

  if (!allowedFormats.includes(extension)) {
    errorMessage({
      parentContainer,
      innerText:
        "The image format is incorrect: Please upload one of the following:jpg', 'png', 'jpeg', 'gif', 'webp"
    });

    return true;
  }
};
