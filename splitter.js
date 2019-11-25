module.exports = str => {
  let result = [];
  let index = 0;
  while (index < str.length) {
    let temp = [];
    temp.push(str[index]);
    index++;
    while (str[index] !== '.' && str[index] !== '#' && index < str.length) {
      temp.push(str[index]);
      index++;
    }
    result.push(temp.join(''));
    temp.length = 0;
  }
  return result;
};
