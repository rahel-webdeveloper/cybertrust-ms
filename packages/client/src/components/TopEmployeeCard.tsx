/* eslint-disable @typescript-eslint/no-explicit-any */
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

const taskCountColor = (count: number) => {
  if (count >= 6) return 'green.300';
  else if (count >= 5) return 'purple.300';
  else if (count > 3) return 'blue.300';
  else if (count > 2) return 'yellow.300';
  else return 'red.300';
};

const TopEmployeeCard = ({ employee }: any) => {
  return (
    <Card.Root width="325px" rounded={'2xl'}>
      <Card.Body p={'3'}>
        <HStack justify={'space-between'} p={3}>
          <VStack mb="6" gap="3">
            <Avatar.Root size={'2xl'}>
              <Avatar.Image src={employee.user.profile.avatarUrl} />
              <Avatar.Fallback name="Nate Foss" />
            </Avatar.Root>
            <Stack gap="0">
              <Text fontWeight="semibold" textStyle="sm">
                {employee.user.name.slice(0, 17)}
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
            <Icon
              cursor={'pointer'}
              as={Ellipsis}
              alignSelf={'start'}
              ml="auto"
            >
              menu
            </Icon>
            <VStack align={'end'} gap={'0.5'}>
              <Badge
                rounded={'full'}
                // colorPalette={'purple'}
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
              {employee.user.email}
            </Strong>
            <Strong color={'fg'} fontWeight={'500'} fontSize={15}>
              <Icon as={PhoneCall} mr={3} size={'sm'} />
              {employee.user.profile.phone}
            </Strong>
          </Stack>
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
};

export default TopEmployeeCard;
