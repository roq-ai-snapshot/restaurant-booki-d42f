import * as yup from 'yup';

export const grocerieValidationSchema = yup.object().shape({
  vegetables: yup.string().nullable(),
  total_amount: yup.string().nullable(),
  date: yup.date().nullable(),
});
