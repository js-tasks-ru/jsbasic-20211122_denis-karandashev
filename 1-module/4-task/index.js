function checkSpam(str) {
  // ваш код...
  if (str.toUpperCase().indexOf('1xBet'.toUpperCase()) > -1) {
    return true;
  }
  if (str.toUpperCase().indexOf('XXX') > -1) {
    return true;
  }
  return false;
}
