function filterRange(arr, a, b) {
  // if (arr.indexOf(a) && arr.indexOf(b) && arr.indexOf(a) <= arr.indexOf(b)) {
  //   const index1 = arr.indexOf(a);
  //   const index2 = arr.indexOf(b);
  //   return arr.slice(
  //     arr[index1] === a ? index1 : index1 + 1,
  //     arr[index2] === b ? index2 + 1 : index2
  //   );
  // // } else {
  // //   return arr;
  // // }
  return arr.filter(i => (a <= i && i <= b));
}
