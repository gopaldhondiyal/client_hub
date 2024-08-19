import React from 'react';
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Image,
  keyframes,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="white"
        color="black"
        boxShadow="0 2px 4px rgba(0,0,0,0.1)"
      >
        <Flex align="center" mr={5}>
          <Image src="https://www.sew.ai/themes/custom/sewtheme/images/logo2.png" alt="SEW Logo" height="40px" />
        </Flex>

        <Box
          width="100%"
          height="60px"
          bgImage="https://ibb.co/NxScKYf"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          borderRadius="md"
          overflow="hidden"
        />

        <Box>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              onClick={onOpen}
              bg="blue.500"
              color="white"
              _hover={{ bg: 'blue.600' }}
            >
              Learn More
            </Button>
          </motion.div>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connecting People With Energy and Water Providers</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              SEW (Smart Energy Water) is dedicated to bridging the gap between people and their energy and water providers. 
              Our innovative solutions help create more efficient and sustainable resource management.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box
        as={motion.div}
        animation={`${pulseAnimation} 2s ease-in-out infinite`}
        textAlign="center"
        mt={4}
        fontWeight="bold"
        color="gray.600"
      >
        Created by Gopal Dutt
      </Box>
    </Box>
  );
};

export default Navbar;