import * as yup from 'yup';

const validateChannel = (field, array) => {
  const schema = yup
    .string()
    .required('Обязательное поле')
    .trim()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .notOneOf(array, 'Должно быть уникальным');
  return schema.validate(field);
};

const signupFormSchema = yup.object().shape({
  username: yup
    .string()
    .required('Обязательное поле')
    .trim()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
  password: yup
    .string()
    .required('Обязательное поле')
    .trim()
    .min(6, 'Не менее 6 символов'),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Обязательное поле'),
});

export { validateChannel, signupFormSchema };
