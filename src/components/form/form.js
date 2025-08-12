import { fields } from '../../data/formFields';
import { create } from '../../utils/elementCreator';
import { removeOldElement } from '../../utils/removeOldElement';
import './_form.scss';

export const form = ({ parentContainer, option, type, blurParent = false }) => {
  removeOldElement(['.blur-div', '.form-wrapper', '.user-form']);

  let formParent = parentContainer;

  if (blurParent) {
    const blurDiv = create('div', {
      className: 'blur-div',
      appendTo: parentContainer.parentElement
    });

    const formWrapper = create('div', {
      className: `${option} form-wrapper`,
      appendTo: parentContainer
    });

    formParent = formWrapper;
  }

  const formElement = create('form', {
    className: `${type}-form form ${option}`,
    appendTo: formParent
  });

  const fieldSet = create('fieldset', { appendTo: formElement });
  const legend = create('legend', { innerText: option, appendTo: fieldSet });

  const chosenFields = fields[option];

  const inputs = {};

  for (const key in chosenFields) {
    const value = chosenFields[key];
    const { id, text, inputType, placeholder } = value;

    const formGroup = create('div', {
      className: 'form-group',
      appendTo: fieldSet
    });

    const label = create('label', {
      htmlFor: id,
      innerText: text,
      appendTo: formGroup
    });

    const input = create('input', {
      type: inputType,
      id,
      placeholder,
      appendTo: formGroup
    });

    inputs[key] = input;
  }

  const submitButton = create('button', {
    type: 'submit',
    innerText: '➜',
    appendTo: fieldSet
  });

  return { formElement, inputs };
};
