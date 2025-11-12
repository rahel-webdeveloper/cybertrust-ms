import API from '@/api/axios-Instance';
import reactImg from '@/assets/react.svg';
import Link from '@/components/ui/Link';
import ShowPassword from '@/components/ShowPassword';
import { toaster } from '@/components/ui/toaster';
import type { User } from '@/context/AuthContext';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';
import z from 'zod';

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

type SignupFormData = z.infer<typeof signupSchema>;

export type APIErrorType = {
  message: string;
  status: number;
};

type SignupResponseType = {
  token: string;
  user: User;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation<
    SignupResponseType,
    APIErrorType,
    SignupFormData
  >({
    mutationFn: (formData: SignupFormData) =>
      API.post('api/auth/sign-up', formData).then((res) => res.data),
    onSuccess: (newUser: SignupResponseType) => {
      localStorage.setItem('ct-token', newUser.token.toString());
      queryClient.setQueryData(['user'], () => newUser.user);
      navigate('/app/dashboard');
    },
    onError: (error: { message: string; status: number }) => {
      console.log(error.status);
      toaster.create({
        closable: true,
        type: 'error',
        title: 'Sign Up Failed',
        description:
          (error.status === 409 && 'User with this email already exist') ||
          'Something went wrong. Please try again later.',
      });
    },
  });

  return (
    <Fieldset.Root
      p={4}
      maxWidth="md"
      borderWidth={1}
      borderRadius="lg"
      m="auto"
      border="none"
      my={10}
      rounded="xl"
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

        <Form
          onSubmit={handleSubmit((formData: SignupFormData) =>
            mutate(formData)
          )}
        >
          <Stack p={4} gap={6}>
            <Field.Root
              id="name"
              invalid={Boolean(errors.name)}
              disabled={isPending}
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
              disabled={isPending}
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
                disabled={isPending}
              >
                <Field.Label>Password</Field.Label>

                <Input
                  {...register('password')}
                  rounded="full"
                  size="lg"
                  py="5"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="***********"
                />
                <ShowPassword
                  onToggle={() => setShowPassword(!showPassword)}
                  isVisible={showPassword}
                />
                <FieldErrorText>{errors.password?.message}</FieldErrorText>
              </Field.Root>

              <Field.Root
                id="confirmPassword"
                invalid={Boolean(errors.confirmPassword)}
                disabled={isPending}
              >
                <Field.Label>Confirm Password</Field.Label>

                <Input
                  {...register('confirmPassword')}
                  rounded="full"
                  size="lg"
                  py="5"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="***********"
                />
                <ShowPassword
                  onToggle={() => setShowPassword(!showPassword)}
                  isVisible={showPassword}
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
              loading={isPending}
            >
              {isPending && <Spinner size="sm" mr={2} />}
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
