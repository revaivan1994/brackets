module.exports = function check(str, bracketsConfig) {
  const box = [];

  const pairs = {};
  const opens = new Set();
  const same = new Set();

  bracketsConfig.forEach(([openBracket, closeBracket]) => {
    pairs[closeBracket] = openBracket;
    opens.add(openBracket);

    if (openBracket === closeBracket) {
      same.add(openBracket);
    }
  });

  const valid = str.split('').every((symbol) => {
    if (same.has(symbol)) {
      if (box[box.length - 1] === symbol) {
        box.pop();
      } else {
        box.push(symbol);
      }

      return true;
    }

    if (opens.has(symbol)) {
      box.push(symbol);
      return true;
    }

    const last = box.pop();

    return last === pairs[symbol];
  });

  return valid && box.length === 0;
};
