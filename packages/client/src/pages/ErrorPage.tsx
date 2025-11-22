import { Heading, Text, Button, VStack, Icon, Flex } from '@chakra-ui/react';
import { RotateCw, Siren } from 'lucide-react';

const ErrorPage = ({ message }: { message?: string }) => {
  return (
    <Flex h="100vh" align="center" justify="center">
      <VStack gap="6" p="10" borderRadius="lg" textAlign="center" maxW="lg">
        <Icon as={Siren} w="12" h="12" color="red.500" />
        <Heading as="h2" mt="4" size="3xl" fontWeight="bold">
          Double-check your <br />
          connection
        </Heading>

        <Text fontSize="lg" fontWeight="400" color="gray.300">
          It looks like your connection is limited. Check your network and try
          again.
        </Text>

        {message && (
          <Text fontSize="sm" fontWeight="500" color="red.400">
            {message}
          </Text>
        )}

        <Button
          onClick={() => window.location.reload()}
          variant="surface"
          size="xl"
          width="full"
          mt={4}
          rounded="full"
        >
          <Icon as={RotateCw} ml="2" color="blue.300" size="md" />
          <Text as="span" fontSize="sm">
            Let's try again
          </Text>
        </Button>
      </VStack>
    </Flex>
  );
};

export default ErrorPage;
