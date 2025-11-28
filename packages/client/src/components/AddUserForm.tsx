import { useAddUser } from '@/queries/users';
import {
  Button,
  Field,
  FieldErrorText,
  Fieldset,
  HStack,
  Input,
  InputGroup,
  RadioGroup,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type ReactNode } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { Form } from 'react-router-dom';
import z from 'zod';
import { toaster } from './ui/toaster';

const addUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  role: z.string().optional(),
  position: z.string().optional(),
  department: z.string().min(1, 'Department is required'),
  salary: z.coerce.number().min(0, 'Salary must be positive or zero'),
});

export type AddUserFormData = z.infer<typeof addUserSchema>;

const roles = [
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  { label: 'Developer', value: 'developer' },
];

const AddUserForm = ({
  positionValue,
  children,
  refetchEmployees,
}: {
  children: ReactNode;
  positionValue: string;
  refetchEmployees: () => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema) as Resolver<AddUserFormData>,
  });

  const [roleValue, setRoleValue] = useState<string>('developer');
  const { mutate } = useAddUser();

  const onSubmit = (data: AddUserFormData) => {
    data.role = roleValue;
    data.position = positionValue;

    mutate(data, {
      onSuccess: () => {
        reset();
        refetchEmployees();
        toaster.create({
          closable: true,
          type: 'success',
          title: 'Creating User Successed',
          description: 'New user create successfully',
        });
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        toaster.create({
          closable: true,
          type: 'error',
          title: 'Create User Faild',
          description:
            error.status === 409
              ? 'User with this email already exist'
              : `Something went wrong. Please try again later. ${error.message}`,
        });
      },
    });
  };
  return (
    <Fieldset.Root>
      <Stack p={4} gap={2}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack p={4} gap={6}>
            <HStack>
              <Field.Root
                id="name"
                invalid={Boolean(errors.name)}
                disabled={isSubmitting}
              >
                <Field.Label fontSize={'xs'}>Name</Field.Label>
                <Input
                  {...register('name')}
                  rounded="full"
                  size="sm"
                  placeholder="John Doe"
                />
                <FieldErrorText>{errors.name?.message}</FieldErrorText>
              </Field.Root>

              <Field.Root
                id="email"
                invalid={Boolean(errors.email)}
                disabled={isSubmitting}
              >
                <Field.Label fontSize={'xs'}>Email</Field.Label>
                <Input
                  {...register('email')}
                  rounded="full"
                  size="sm"
                  type="email"
                  placeholder="example@gmail.com"
                />
                <FieldErrorText>{errors.email?.message}</FieldErrorText>
              </Field.Root>
            </HStack>

            <HStack>
              <Field.Root id="roles">
                <Field.Label fontSize={'xs'}>Roles</Field.Label>
                <RadioGroup.Root
                  value={roleValue || 'developer'}
                  onValueChange={(e) => e.value && setRoleValue(e.value)}
                  size={'sm'}
                >
                  <HStack flexWrap={'wrap'} gap="6">
                    {roles.map((role) => (
                      <RadioGroup.Item
                        key={role.value}
                        value={role.value}
                        defaultChecked={true}
                      >
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText fontSize={'xs'}>
                          {role.label}
                        </RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </HStack>
                </RadioGroup.Root>
              </Field.Root>

              <Field.Root id="position">
                <Field.Label fontSize={'xs'}>Position</Field.Label>
                {children}
                <Field.ErrorText>{errors.position?.message}</Field.ErrorText>
              </Field.Root>
            </HStack>

            <HStack>
              <Field.Root id="department" invalid={Boolean(errors.department)}>
                <Field.Label fontSize={'xs'}>Department</Field.Label>
                <Input
                  {...register('department')}
                  rounded="full"
                  type="text"
                  size="sm"
                  placeholder="IT / HR / Finance"
                />
                <Field.ErrorText>{errors.department?.message}</Field.ErrorText>
              </Field.Root>

              {/* Salary */}
              <Field.Root id="salary" invalid={Boolean(errors.salary)}>
                <Field.Label fontSize={'xs'}>Salary</Field.Label>
                <InputGroup startElement="$" endElement="USD">
                  <Input
                    {...register('salary')}
                    rounded="full"
                    size="sm"
                    type="number"
                    placeholder="0"
                  />
                </InputGroup>
                <Field.ErrorText>{errors.salary?.message}</Field.ErrorText>
              </Field.Root>
            </HStack>

            {/* Submit */}
            <Button
              type="submit"
              rounded="full"
              w="min-content"
              position={'absolute'}
              bottom={'4'}
              variant={'solid'}
              py={'4'}
              colorPalette={'teal'}
              size="sm"
              mt="5"
              loadingText="Saving..."
              loading={isSubmitting}
            >
              {isSubmitting && <Spinner size="sm" mr={2} />}
              Add User
            </Button>
          </Stack>
        </Form>
      </Stack>
    </Fieldset.Root>
  );
};

export default AddUserForm;
