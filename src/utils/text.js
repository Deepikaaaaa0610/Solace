const MOJIBAKE_PATTERN = /(Ã.|Â.|â.|à.|ð.|Ù.|Ø.|Û.)/;

export function hasMojibake(value = '') {
  return typeof value === 'string' && MOJIBAKE_PATTERN.test(value);
}

export function getCleanText(...candidates) {
  for (const value of candidates) {
    if (typeof value === 'string' && value.trim() && !hasMojibake(value)) {
      return value;
    }
  }

  return '';
}
