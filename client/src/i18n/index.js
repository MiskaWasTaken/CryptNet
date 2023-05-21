import en from './en';


const languagesMap = {
  en,
};

/**
 * Return best match for lang and variant.
 * @param {string} language string from navigator configuration or cookie.
 * @returns the translation dict
 */
export function getTranslations(language = '') {
  const [lang, variant] = language.split('-');

  if (Object.prototype.hasOwnProperty.call(languagesMap, `${lang}${variant}`)) {
    return languagesMap[`${lang}${variant}`];
  }

  if (Object.prototype.hasOwnProperty.call(languagesMap, `${lang}`)) {
    return languagesMap[lang];
  }

  return languagesMap['en'];
}
