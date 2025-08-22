import { errorMessage } from '../errorMessage/errorMessage';

export const authError = ({
  parentContainer,
  additionalClasses,
  popUp,
  removeOld,
  temporary
}) => {
  errorMessage({
    parentContainer,
    innerText: 'Please login for access!',
    additionalClasses,
    temporary,
    popUp,
    removeOld
  });
};
