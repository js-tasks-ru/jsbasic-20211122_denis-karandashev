function getMinMax(str) {
  let arr = str.split(' ')
    .filter(el => !isNaN(parseInt(el)))
    .map(el => parseFloat(el));
  let min = arr[0];
  let max = arr[0];
  for (let e of arr) {
    if (e > max) {
      max = e;
    }
    if (e < min) {
      min = e;
    }
  }
  return {min, max};
}
