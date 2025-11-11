import Link from '@/components/Link';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Field,
  FieldErrorText,
  Fieldset,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import reactImg from '@/assets/react.svg';
import { Form } from 'react-router-dom';

const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(20, 'Name is too long.'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    // reset();
  };

  return (
    <Fieldset.Root
      p={4} // padding
      maxWidth="md" // max-width
      borderWidth={1}
      borderRadius="lg"
      m="auto"
      border="none"
      my={10}
      rounded="xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack p={4} gap={2}>
        <Fieldset.Legend fontSize="1.3rem" textAlign="center">
          <Image src={reactImg} w="3rem" mx="auto" mb="8" />
          Create Acount in{' '}
          <Text as="span" color="lightskyblue">
            Cybertrust
          </Text>
        </Fieldset.Legend>
        <Fieldset.HelperText
          color="gray.400"
          textAlign="center"
          fontWeight="400"
          mt="3"
        >
          This is a private Internal Management System for Cyber Trust IT
          Services. Access is restricted to authorized personnel only. If you
          are not an authorized user, please do not log in or create an account.
        </Fieldset.HelperText>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack p={4} gap={6}>
            <Field.Root
              id="name"
              invalid={Boolean(errors.name)}
              disabled={isSubmitting}
            >
              <Field.Label>Name</Field.Label>
              <Input
                {...register('name')}
                rounded="full"
                type="text"
                size="lg"
                placeholder="Jhon Doe"
              />
              <FieldErrorText>{errors.name?.message}</FieldErrorText>
            </Field.Root>

            <Field.Root
              id="email"
              invalid={Boolean(errors.email)}
              disabled={isSubmitting}
            >
              <Field.Label>Email</Field.Label>
              <Input
                {...register('email')}
                rounded="full"
                size="lg"
                type="email"
                placeholder="example@gmail.com"
              />
              <FieldErrorText>{errors.email?.message}</FieldErrorText>
            </Field.Root>

            <Box display="flex" columns="2" columnGap="4">
              <Field.Root
                id="password"
                invalid={Boolean(errors.password)}
                disabled={isSubmitting}
              >
                <Field.Label>Password</Field.Label>

                <Input
                  {...register('password')}
                  rounded="full"
                  size="lg"
                  py="5"
                  type="password"
                  placeholder="***********"
                />
                <FieldErrorText>{errors.password?.message}</FieldErrorText>
              </Field.Root>

              <Field.Root
                id="confirmPassword"
                invalid={Boolean(errors.confirmPassword)}
                disabled={isSubmitting}
              >
                <Field.Label>Confirm Password</Field.Label>

                <Input
                  {...register('confirmPassword')}
                  rounded="full"
                  size="lg"
                  py="5"
                  type="password"
                  placeholder="***********"
                />
                <FieldErrorText>
                  {errors.confirmPassword?.message}
                </FieldErrorText>
              </Field.Root>
            </Box>

            <Button
              type="submit"
              rounded="full"
              size="lg"
              loadingText="Signing up..."
              loading={isSubmitting}
            >
              {isSubmitting && <Spinner size="sm" mr={2} />}
              Sign Up
            </Button>
          </Stack>
        </Form>

        <Text fontSize="md" color="gray.200" textAlign="center">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            color="blue.500"
            _disabled={{ cursor: 'disabled' }}
            _focus={{ outline: 'none' }}
          >
            Log in
          </Link>
        </Text>
      </Stack>
    </Fieldset.Root>
  );
};

export default SignupForm;
