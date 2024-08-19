import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Input,
  Text,
  Select,
  Heading,
  Container,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  IconButton,
  Flex,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

const MotionBox = motion(Box);

const clientsData = [
  {
    "Clients Name": "mia",
    "Project Owner": "ELON",
    "QA Team Member": "A",
    "Primary Resource": "",
    "Secondary Resource": "",
    "Deployment Type": "Jenkins"
  },
  {
    "Clients Name": "neo",
    "Project Owner": "MUSH",
    "QA Team Member": "B",
    "Primary Resource": "jen",
    "Secondary Resource": "pio",
    "Deployment Type": "AD"
  },
  {
    "Clients Name": "je",
    "Project Owner": "Steve",
    "QA Team Member": "C",
    "Primary Resource": "",
    "Secondary Resource": "",
    "Deployment Type": "Jenkins"
  },
  {
    "Clients Name": "gen",
    "Project Owner": "Mark",
    "QA Team Member": "D",
    "Primary Resource": "",
    "Secondary Resource": "",
    "Deployment Type": "Jenkins"
  },
  {
    "Clients Name": "kok",
    "Project Owner": "Modi",
    "QA Team Member": "E",
    "Primary Resource": "",
    "Secondary Resource": "",
    "Deployment Type": "Jenkins"
  },
  {
    "Clients Name": "goe",
    "Project Owner": "Neon",
    "QA Team Member": "F",
    "Primary Resource": "men",
    "Secondary Resource": "wat",
    "Deployment Type": "Jenkins"
  },
  {
    "Clients Name": "kia",
    "Project Owner": "Liya",
    "QA Team Member": "J",
    "Primary Resource": "",
    "Secondary Resource": "",
    "Deployment Type": ""
  },
  {
    "Clients Name": "nan",
    "Project Owner": "priya",
    "QA Team Member": "H",
    "Primary Resource": "",
    "Secondary Resource": "tes",
    "Deployment Type": "Manual"
  },
  {
    "Clients Name": "lio",
    "Project Owner": "Gwi",
    "QA Team Member": "I",
    "Primary Resource": "nen",
    "Secondary Resource": "geo",
    "Deployment Type": "Jenkins"
  },
  {
    "Clients Name": "luge",
    "Project Owner": "Jen",
    "QA Team Member": "",
    "Primary Resource": "",
    "Secondary Resource": "",
    "Deployment Type": "Jenkins"
  }
]

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');
  const inputBgColor = useColorModeValue('white', 'gray.700');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setSelectedClient(null);
  };

  const handleClientSelect = (event) => {
    const client = clientsData.find(c => c["Clients Name"] === event.target.value);
    setSelectedClient(client);
    onOpen();
  };

  const filteredClients = clientsData.filter(client =>
    client["Clients Name"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ChakraProvider>
      <Box minHeight="100vh" bg={bgColor} color={color} transition="all 0.2s">
        <Container maxW="container.md" py={8}>
          <VStack spacing={6} align="stretch">
            <Flex justifyContent="space-between" alignItems="center">
              <Heading as="h1" size="xl" textAlign="center">
                Client Data Search
              </Heading>
              <Tooltip label={`Switch to ${colorMode === 'light' ? 'Dark' : 'Light'} Mode`}>
                <IconButton
                  icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                  onClick={toggleColorMode}
                  variant="ghost"
                />
              </Tooltip>
            </Flex>
            
            <MotionBox
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Input
                placeholder="Search by Client Name"
                value={searchTerm}
                onChange={handleSearch}
                size="lg"
                borderRadius="full"
                bg={inputBgColor}
                _focus={{ boxShadow: 'outline' }}
                leftElement={<SearchIcon color="gray.300" />}
              />
            </MotionBox>
            
            <AnimatePresence>
              {filteredClients.length > 0 && (
                <MotionBox
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Select
                    placeholder="Select a client"
                    onChange={handleClientSelect}
                    value={selectedClient?.["Clients Name"] || ""}
                    size="lg"
                    borderRadius="md"
                    bg={inputBgColor}
                  >
                    {filteredClients.map(client => (
                      <option key={client["Clients Name"]} value={client["Clients Name"]}>
                        {client["Clients Name"]}
                      </option>
                    ))}
                  </Select>
                </MotionBox>
              )}
            </AnimatePresence>
          </VStack>
        </Container>

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Client Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedClient && (
                <VStack align="stretch" spacing={4}>
                  <Text><strong>Client Name:</strong> {selectedClient["Clients Name"]}</Text>
                  <Text><strong>Project Owner:</strong> {selectedClient["Project Owner"]}</Text>
                  <Text><strong>QA Team Member:</strong> {selectedClient["QA Team Member"]}</Text>
                  <Text><strong>Primary Resource:</strong> {selectedClient["Primary Resource"] || "N/A"}</Text>
                  <Text><strong>Secondary Resource:</strong> {selectedClient["Secondary Resource"] || "N/A"}</Text>
                  <Text><strong>Deployment Type:</strong> {selectedClient["Deployment Type"]}</Text>
                </VStack>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default App;