import leoProfanity from 'leo-profanity';

const ruDictionary = leoProfanity.getDictionary('ru');
leoProfanity.add(ruDictionary);

const checkBadWords = (text) => {
  const filtered = leoProfanity.clean(text);
  return filtered;
};

export default checkBadWords;
