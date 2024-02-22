import * as yup from 'yup';
import i18n from '../i18n';

const validateChannel = (field, array) => {
  const schema = yup
    .string()
    .required(i18n.t('channelModals.validation.required'))
    .trim()
    .min(3, i18n.t('channelModals.validation.channelLength'))
    .max(20, i18n.t('channelModals.validation.channelLength'))
    .notOneOf(array, i18n.t('channelModals.validation.channelExists'));
  return schema.validate(field);
};

const signupFormSchema = yup.object().shape({
  username: yup
    .string()
    .required(i18n.t('signup.validation.required'))
    .trim()
    .min(3, i18n.t('signup.validation.userNameLength'))
    .max(20, i18n.t('signup.validation.userNameLength')),
  password: yup
    .string()
    .required(i18n.t('signup.validation.required'))
    .trim()
    .min(6, i18n.t('signup.validation.passwordLength')),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password')], i18n.t('signup.validation.passwordsMatch'))
    .required(i18n.t('signup.validation.required')),
});

export { validateChannel, signupFormSchema };
