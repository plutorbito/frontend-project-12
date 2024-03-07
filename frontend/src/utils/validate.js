import * as yup from 'yup';

const validateChannel = (array, t) => yup.object().shape({
  name: yup
    .string()
    .required(t('channelModals.validation.required'))
    .trim()
    .min(3, t('channelModals.validation.channelLength'))
    .max(20, t('channelModals.validation.channelLength'))
    .notOneOf(array, t('channelModals.validation.channelExists')),
});

const validateSignupForm = (t) => yup.object().shape({
  username: yup
    .string()
    .required(t('signup.validation.required'))
    .trim()
    .min(3, t('signup.validation.userNameLength'))
    .max(20, t('signup.validation.userNameLength')),
  password: yup
    .string()
    .required(t('signup.validation.required'))
    .trim()
    .min(6, t('signup.validation.passwordLength')),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password')], t('signup.validation.passwordsMatch'))
    .required(t('signup.validation.required')),
});

export { validateChannel, validateSignupForm };
