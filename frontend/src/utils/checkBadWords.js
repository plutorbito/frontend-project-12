import leoProfanity from 'leo-profanity';

const checkBadWords = (text) => {
  const filtered = leoProfanity.clean(text);
  return filtered;
};

export default checkBadWords;
