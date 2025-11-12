import { Icon } from '@chakra-ui/react';
import { Eye, EyeClosed } from 'lucide-react';

type ShowPasswordProps = {
  isVisible: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md';
};

const ShowPassword = ({
  isVisible,
  onToggle,
  size = 'md',
}: ShowPasswordProps) => {
  return (
    <Icon
      as={isVisible ? Eye : EyeClosed}
      position="absolute"
      right="4"
      top="2.4rem"
      cursor="pointer"
      _hover={{ opacity: 0.7 }}
      transition="all"
      onClick={onToggle}
      size={size}
    />
  );
};

export default ShowPassword;
