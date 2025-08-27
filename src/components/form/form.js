import { fields } from '../../data/formFields';
import { create } from '../../utils/elementCreator';
import { removeOldElement } from '../../utils/removeOldElement';
import './_form.scss';
import './_eventForm.scss';
import './_mediaQueries.scss';

export const form = ({ parentContainer, option, type, blurParent = false }) => {
  removeOldElement(['.blur-div', '.form-wrapper', '.user-form']);

  const spacedOption = option.replace('_', ' ');

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
  } else {
    const eventCreationButtonHider = create('div', {
      className: 'hider',
      appendTo: formParent
    });
  }

  const formElement = create('form', {
    className: `${type}-form form ${option}`,
    appendTo: formParent
  });

  const fieldSet = create('fieldset', { appendTo: formElement });
  const legend = create('legend', {
    innerText: spacedOption,
    appendTo: fieldSet
  });

  const chosenFields = fields[option];

  const inputs = {};

  for (const key in chosenFields) {
    const value = chosenFields[key];
    const { id, inputType, placeholder, list, multiLine } = value;

    const text = id.replace('-', ' ');

    const formGroup = create('div', {
      className: 'form-group',
      appendTo: fieldSet
    });

    const label = create('label', {
      htmlFor: id,
      innerText: text,
      appendTo: formGroup
    });

    if (value.list) {
      const select = create('select', { id, appendTo: formGroup });

      const defaultOption = create('option', {
        value: '',
        innerText: `Choose a ${id}`,
        appendTo: select
      });

      list.forEach((element) => {
        const option = create('option', {
          value: element,
          innerText: element,
          appendTo: select
        });
      });
      inputs[key] = select;
    } else if (value.multiLine) {
      const textarea = create('textarea', {
        type: inputType,
        id,
        placeholder,
        appendTo: formGroup
      });

      inputs[key] = textarea;
    } else {
      const input = create('input', {
        type: inputType,
        id,
        placeholder,
        appendTo: formGroup
      });

      inputs[key] = input;
    }
  }

  const submitButton = create('button', {
    type: 'submit',
    innerText: '➜',
    appendTo: fieldSet
  });

  return { formElement, inputs };
};
