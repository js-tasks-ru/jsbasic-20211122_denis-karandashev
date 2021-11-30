function sumSalary(salaries) {
  // ваш код...
  let result = 0;
  for (let k in salaries) {
    if (typeof salaries[k] === 'number' && isFinite(salaries[k])) {
      result += salaries[k];
    }
  }
  return result;
}
