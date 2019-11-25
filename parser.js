const splitter = require('./splitter');

const parse = (object, selectors, result = new Set()) => {
  selectors = splitter(selectors);
  let selector = selectors.shift();
  if (Array.isArray(object)) {
    for (let el of object) {
      if (el.class === selector && selector[0] !== '.' && selector[0] !== '#') {
        result.add(el);
      }

      if (selector[0] === '.') {
        if (el.classNames && el.classNames.includes(selector.slice(1))) {
          result.add(el);
        }
      }
      if (selector[0] === '#' && el.identifier === selector.slice(1)) {
        result.add(el);
      }
      if (el.hasOwnProperty('control')) {
        if (selector[0] === '#') {
          if (el.control.identifier === selector.slice(1)) {
            result.add(el);
          }
        }
        if (el.control.class === selector) {
          result.add(el);
        }
      }

      if (el.hasOwnProperty('subviews')) {
        const next = el.subviews;
        parse(next, selector, result);
      }
      if (el.hasOwnProperty('contentView')) {
        const next = el.contentView.subviews;
        parse(next, selector, result);
      }
    }
  }

  if (selectors.length === 0) {
    return Array.from(result);
  } else {
    return parse(Array.from(result), selectors.join(''));
  }
};

module.exports = parse;
