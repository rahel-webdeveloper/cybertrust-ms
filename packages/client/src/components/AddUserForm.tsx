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
import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
import z from 'zod';

// eslint-disable-next-line react-refresh/only-export-components
export const addUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),

  email: z.string().email('Invalid email address'),

  password: z.string().min(6, 'Password must be at least 6 characters'),

  roles: z.array(z.string()).nonempty('At least one role is required'),

  position: z.string().min(1, 'Position is required'),

  department: z.string().min(1, 'Department is required'),

  salary: z.number().positive('Salary must be a positive number'),
});

type AddUserFormData = z.infer<typeof addUserSchema>;

const roles = [
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  { label: 'Developer', value: 'developer' },
];

const AddUserForm = ({
  positionValue,
  children,
}: {
  children: ReactNode;
  positionValue: string;
}) => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
  });
  const [value, setValue] = useState<string | null>(null);

  console.log(positionValue);

  const onSubmit = (data: AddUserFormData) => {
    console.log(data);
    // mutate(data, {
    //   onSuccess: () => {
    //     navigate('/app');
    //   },
    // });
  };
  return (
    <Fieldset.Root onSubmit={handleSubmit(onSubmit)}>
      <Stack p={4} gap={2}>
        <Form>
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
                  value={value || 'developer'}
                  onValueChange={(e) => setValue(e.value)}
                  size={'sm'}
                >
                  <HStack flexWrap={'wrap'} gap="6">
                    {roles.map((role) => (
                      <RadioGroup.Item
                        key={role.value}
                        value={role.value}
                        defaultChecked={true}
                      >
                        <RadioGroup.ItemHiddenInput
                          onChange={(e) => console.log(e.target.value)}
                        />
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
              <Field.Root id="department">
                <Field.Label fontSize={'xs'}>Department</Field.Label>
                <Input
                  {...register('department')}
                  rounded="full"
                  size="sm"
                  placeholder="IT / HR / Finance"
                />
              </Field.Root>

              {/* Salary */}
              <Field.Root id="salary">
                <Field.Label fontSize={'xs'}>Salary</Field.Label>
                <InputGroup startElement="$" endElement="USD">
                  <Input
                    {...register('salary')}
                    rounded="full"
                    size="sm"
                    type="number"
                    placeholder="50000"
                  />
                </InputGroup>
              </Field.Root>
            </HStack>

            {/* Submit */}
            <Button
              type="submit"
              rounded="full"
              w="min-content"
              position={'absolute'}
              bottom={'4'}
              variant={'surface'}
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
