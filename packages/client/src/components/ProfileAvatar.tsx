import { useAuth } from '@/context/AuthContext';
import { Avatar, Circle, Float } from '@chakra-ui/react';

const ProfileAvatar = () => {
  const { user } = useAuth();

  return (
    <Avatar.Root
      shape="full"
      size="lg"
      cursor="pointer"
      _hover={{ opacity: 0.8 }}
    >
      <Avatar.Fallback name={user!.name} />
      <Avatar.Image src="https://bit.ly/sage-adebayo" />
      <Float placement="bottom-start" offsetX="2" offsetY="1">
        <Circle
          bg="green.500"
          size="8px"
          outline="0.2em solid"
          outlineColor="bg"
        />
      </Float>
    </Avatar.Root>
  );
};

export default ProfileAvatar;
