import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Flex,
  Icon,
} from '@chakra-ui/react';
// Import a suitable Lucide icon
import { EarthIcon, Rocket } from 'lucide-react';
import Link from '@/components/ui/Link'; // Your custom Link component

const NotFoundPage = () => {
  return (
    <Flex h="100vh" align="center" justify="center" color="white">
      <VStack gap={6} p={10} textAlign="center" maxW="lg">
        <Box animation="floating 3s ease-in-out infinite" color="pink.500">
          <Rocket size={100} />
        </Box>

        <Heading as="h1" mt="4" size="3xl" fontWeight="bold">
          404 - Lost in Space
        </Heading>

        <Text fontSize="lg" color="gray.400">
          The page you are looking for has taken off and can't be reached.
        </Text>

        <Button size="lg" mt={4} variant="surface" rounded="full">
          <Link to="/app" _focus={{ outline: 'none' }}>
            Return to Earth{' '}
            <Icon as={EarthIcon} ml="2" color="green.400" size="md" />
          </Link>
        </Button>
      </VStack>
    </Flex>
  );
};

export default NotFoundPage;
