export const create = (tagName, options = {}) => {
  const element = document.createElement(tagName);

  const { appendTo, ...rest } = options;

  Object.entries(rest).forEach(([key, value]) => {
    if (value !== undefined) element[key] = value;
  });

  if (appendTo instanceof Element) {
    appendTo.appendChild(element);
  } else if (typeof appendTo === 'string') {
    const target = document.querySelector(appendTo);
    if (target) target.appendChild(element);
  }

  return element;
};
