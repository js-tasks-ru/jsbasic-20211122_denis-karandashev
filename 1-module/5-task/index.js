function truncate(str, maxlength) {
  return str.length > maxlength ? str.substring(0, maxlength - 1) + '\u{2026}' : str;
}
