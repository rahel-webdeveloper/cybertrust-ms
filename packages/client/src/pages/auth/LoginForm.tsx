import cyberTrustImg from '@/assets/ct-logo.webp';
import dashboardImg from '@/assets/dashboard.jpg';
import Link from '@/components/ui/Link';
import ShowPassword from '@/components/ShowPassword';
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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';
import z from 'zod';
import { useLogin } from '@/queries/useLogin';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Please write your passord'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { isPending, mutate } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    mutate(data, {
      onSuccess: () => {
        navigate('/app');
      },
    });
  };
  return (
    <Box
      display={'grid'}
      gridTemplateColumns={{ base: 'f1', md: '1fr 1fr' }}
      placeItems={'center'}
    >
      <Image src={dashboardImg} display={{ base: 'none', md: 'block' }} />
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
            <Image src={cyberTrustImg} w="5rem" mx="auto" mb="8" rounded="xl" />
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
            are not an authorized user, please do not log in or create an
            account.
          </Fieldset.HelperText>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Stack p={4} gap={6}>
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

              <Button
                type="submit"
                rounded="full"
                size="lg"
                mt="5"
                loadingText="Loging..."
                loading={isPending}
              >
                {isPending && <Spinner size="sm" mr={2} />}
                Login
              </Button>
            </Stack>
          </Form>

          <Fieldset.HelperText
            fontSize="md"
            color="gray.200"
            textAlign="center"
          >
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
    </Box>
  );
};

export default LoginForm;
