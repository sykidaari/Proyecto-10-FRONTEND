import { fullFields, loginFields } from '../../data/userFormFields';
import { create } from '../../utils/elementCreator';
import './_userForm.scss';

export const userForm = ({ parentContainer, option }) => {
  const form = create('form', {
    className: `user-form ${option}`,
    appendTo: parentContainer
  });

  const fieldSet = create('fieldset', { appendTo: form });
  const legend = create('legend', { innerText: option, appendTo: fieldSet });

  const fields = option === 'login' ? loginFields : fullFields;

  const inputs = {};

  for (const key in fields) {
    const value = fields[key];
    const { id, text, inputType, placeholder } = value;

    const label = create('label', {
      htmlFor: id,
      innerText: text,
      appendTo: fieldSet
    });

    const input = create('input', {
      type: inputType,
      id,
      placeholder,
      appendTo: fieldSet
    });

    inputs[key] = input;
  }

  const submitButton = create('button', {
    type: 'submit',
    innerText: '➜',
    appendTo: fieldSet
  });

  return { form, inputs };
};
