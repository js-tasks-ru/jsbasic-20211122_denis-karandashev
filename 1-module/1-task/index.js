function factorial(n) {
  let i = n;
  let res = 1;
  if (n !== 0 && n !== 1) {
    while (i !== 0) {
      res *= i;
      i--;
    }
  }
  return res;
}
