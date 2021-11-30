function isEmpty(obj) {
  // ваш код...
  for (const k in obj) {
    return false;
  }
  return true;
}
