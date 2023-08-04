import * as yup from 'yup';

export const reservationValidationSchema = yup.object().shape({
  date: yup.date().required(),
  time: yup.date().required(),
  table_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
