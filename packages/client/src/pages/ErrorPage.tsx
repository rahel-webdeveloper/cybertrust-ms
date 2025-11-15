import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Icon,
  Flex,
} from '@chakra-ui/react';
import Link from '@/components/ui/Link';
import { Annoyed, Bug, Smile } from 'lucide-react';

const ErrorPage = () => {
  const error = useRouteError();

  // Determine if we can get a specific status code/text
  const isRouteError = isRouteErrorResponse(error);
  const status = isRouteError ? error.status : 500;
  const statusText = isRouteError ? error.statusText : 'Internal Server Error';
  const errorTitle = status === 404 ? 'Page Not Found' : 'An Error Occurred';

  return (
    <Flex h="100vh" align="center" justify="center">
      <VStack gap="6" p="10" borderRadius="lg" textAlign="center" maxW="lg">
        <Icon as={Bug} w="12" h="12" color="red.500" />
        <Heading as="h1" mt="4" size="3xl" fontWeight="bold">
          {errorTitle}
        </Heading>

        <Text fontSize="lg" color="gray.400">
          Error:{' '}
          <Box as="span" fontWeight="bold">
            {status}
          </Box>{' '}
          - {statusText}
        </Text>

        <VStack>
          <Button variant="surface" size="lg" mt={4} rounded="full">
            <Link to="/app" _focus={{ outline: 'none' }}>
              Go to Home page
              <Icon as={Smile} ml="2" color="blue.300" size="md" />
            </Link>
          </Button>

          <Button variant="surface" size="lg" mt={4} rounded="full">
            <Link to="/auth/login" _focus={{ outline: 'none' }}>
              Go to Login Page
              <Icon as={Annoyed} ml="2" color="yellow.300" size="md" />
            </Link>
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default ErrorPage;
