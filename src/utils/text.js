const MOJIBAKE_PATTERN = /(Ãƒ.|Ã‚.|Ã¢.|Ã .|Ã°.|Ã™.|Ã˜.|Ã›.)/;

export function hasMojibake(value = '') {
  return typeof value === 'string' && MOJIBAKE_PATTERN.test(value);
}

export function repairMojibake(value = '') {
  if (typeof value !== 'string' || !value.trim() || !hasMojibake(value)) {
    return value;
  }

  try {
    return decodeURIComponent(escape(value));
  } catch {
    return value;
  }
}

export function getCleanText(...candidates) {
  for (const value of candidates) {
    if (typeof value === 'string' && value.trim() && !hasMojibake(value)) {
      return value;
    }
  }

  return '';
}
