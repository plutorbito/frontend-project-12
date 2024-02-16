import * as yup from 'yup';

const validate = (field, array) => {
  const schema = yup
    .string()
    .required('Обязательное поле')
    .trim()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .notOneOf(array, 'Должно быть уникальным');
  return schema.validate(field);
};

export default validate;
