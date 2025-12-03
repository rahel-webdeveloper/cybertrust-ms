/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TopEmployeeType } from '@/pages/employee/TopEmployeesCards';
import {
  Avatar,
  Badge,
  Card,
  Flex,
  HStack,
  Icon,
  Separator,
  Stack,
  Strong,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Ellipsis, Mail, PhoneCall } from 'lucide-react';
import RoleMenu from './RoleMenu';
import type { QueryObserverResult } from '@tanstack/react-query';
import type { UserProfile } from '@/types/types';

const taskCountColor = (count: number) => {
  if (count >= 6) return 'green.300';
  else if (count >= 5) return 'purple.300';
  else if (count > 3) return 'blue.300';
  else if (count > 2) return 'yellow.300';
  else return 'red.300';
};

interface TopEmployeeCardProps {
  employee: TopEmployeeType;
  refetch: () => Promise<QueryObserverResult<any, Error>>;
  logedUser: UserProfile | null | undefined;
}

const TopEmployeeCard = ({
  employee,
  refetch,
  logedUser,
}: TopEmployeeCardProps) => {
  return (
    <Card.Root width="325px" rounded={'2xl'}>
      <Card.Body p={'3'}>
        <HStack justify={'space-between'} p={3}>
          <VStack mb="6" gap="3">
            <Avatar.Root size={'2xl'}>
              <Avatar.Image src={employee.avatarUrl} />
              <Avatar.Fallback name="Nate Foss" />
            </Avatar.Root>
            <Stack gap="0">
              <Text fontWeight="semibold" textStyle="sm">
                {employee.name.slice(0, 17)}
              </Text>
              <Text color="fg.muted" textStyle="sm">
                @{employee.position}
              </Text>
            </Stack>
          </VStack>
          <Flex
            flexDir={'column'}
            h="8rem"
            justify={'space-between'}
            textAlign={'end'}
          >
            {logedUser?.role === 'admin' ? (
              <RoleMenu
                userId={employee.userId}
                userRole={employee.role}
                refetch={refetch}
              />
            ) : (
              <Icon
                cursor={'pointer'}
                as={Ellipsis}
                alignSelf={'start'}
                ml="auto"
              />
            )}
            <VStack align={'end'} gap={'0.5'}>
              <Badge
                rounded={'full'}
                color="gray.900"
                bgColor={taskCountColor(employee.taskCount)}
                variant={'subtle'}
                px="4"
                mt={2}
              >
                {employee.taskCount}
              </Badge>
              <Separator />
              <Text color="fg.muted">Tasks Count</Text>
            </VStack>
          </Flex>
        </HStack>
        <Card.Description bgColor={'gray.800/50'} p={4} rounded={'xl'}>
          <HStack justify="space-between">
            <Stack>
              <Text fontSize={15}>Defartment</Text>
              <Strong color="fg">{employee.department}</Strong>
            </Stack>
            <Stack>
              <Text fontSize={15}>Hire Date</Text>
              <Strong color="fg">
                {new Date(employee.hireDate).toLocaleDateString()}
              </Strong>
            </Stack>
          </HStack>
          <Stack mt={'10'}>
            <Strong color={'fg'} fontWeight={'500'} fontSize={15}>
              <Icon as={Mail} mr={3} size={'sm'} />
              {employee.email}
            </Strong>
            <Strong color={'fg'} fontWeight={'500'} fontSize={15}>
              <Icon as={PhoneCall} mr={3} size={'sm'} />
              {employee.phone}
            </Strong>
          </Stack>
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
};

export default TopEmployeeCard;
