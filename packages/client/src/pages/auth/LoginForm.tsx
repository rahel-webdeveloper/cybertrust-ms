import Link from '@/components/Link';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
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
import { Form, useNavigate } from 'react-router-dom';
import API from '@/api/axios-Instance';
import { useAuth, type User } from '@/context/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginData = z.infer<typeof loginSchema>;

type ResponseLoginType = {
  token: string;
  user: User;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginData) => {
    console.log(data);
    const {
      data: { token, user },
    } = await API.post<ResponseLoginType>('api/auth/login', data);

    loginSuccess(token);
    navigate('/app');

    console.log(user);
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
    >
      <Stack p={4} gap={2}>
        <Fieldset.Legend fontSize="1.3rem" textAlign="center">
          <Image src={reactImg} w="3rem" mx="auto" mb="8" />
          Welcome Back to{' '}
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

            <Button
              type="submit"
              rounded="full"
              size="lg"
              mt="5"
              loadingText="Loging..."
              loading={isSubmitting}
            >
              {isSubmitting && <Spinner size="sm" mr={2} />}
              Login
            </Button>
          </Stack>
        </Form>

        <Fieldset.HelperText fontSize="md" color="gray.200" textAlign="center">
          Don't have an account?{' '}
          <Link
            to="/auth/signup"
            color="blue.400"
            _disabled={{ cursor: 'disabled' }}
            _focus={{ outline: 'none' }}
          >
            Sign Up
          </Link>
        </Fieldset.HelperText>
      </Stack>
    </Fieldset.Root>
  );
};

export default LoginForm;
