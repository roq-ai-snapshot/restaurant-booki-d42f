import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getGrocerieById, updateGrocerieById } from 'apiSdk/groceries';
import { grocerieValidationSchema } from 'validationSchema/groceries';
import { GrocerieInterface } from 'interfaces/grocerie';

function GrocerieEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<GrocerieInterface>(
    () => (id ? `/groceries/${id}` : null),
    () => getGrocerieById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: GrocerieInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateGrocerieById(id, values);
      mutate(updated);
      resetForm();
      router.push('/groceries');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<GrocerieInterface>({
    initialValues: data,
    validationSchema: grocerieValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Groceries',
              link: '/groceries',
            },
            {
              label: 'Update Grocerie',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Grocerie
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.vegetables}
            label={'Vegetables'}
            props={{
              name: 'vegetables',
              placeholder: 'Vegetables',
              value: formik.values?.vegetables,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.total_amount}
            label={'Total Amount'}
            props={{
              name: 'total_amount',
              placeholder: 'Total Amount',
              value: formik.values?.total_amount,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.date ? new Date(formik.values?.date) : null}
              onChange={(value: Date) => formik.setFieldValue('date', value)}
            />
          </FormControl>

          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/groceries')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'grocerie',
    operation: AccessOperationEnum.UPDATE,
  }),
)(GrocerieEditPage);
