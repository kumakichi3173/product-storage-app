import { Box, Heading, IconButton, HStack, Image, Text } from '@chakra-ui/react';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useColorModeValue } from '../components/ui/color-mode';

// const EditButton = (props) => (
//   <IconButton
//     onClick={props.onClick}
//     icon={<FiEdit />}
//     variant="ghost"
//     aria-label="Edit product"
//     size="sm"
//     fontSize="20px"
//     colorScheme={props.colorScheme}
//   />
// );

// const DeleteButton = (props) => (
//   <IconButton
//     onClick={props.onClick}
//     icon={<MdDelete />}
//     variant="ghost"
//     aria-label="Delete product"
//     size="sm"
//     fontSize="20px"
//     colorScheme={props.colorScheme}
//   />
// );

const ProductCard = ({ image, name, price }) => {
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const colorScheme = useColorModeValue('gray', 'blue');

    return (
        <Box
            maxW="450px"
            maxH="500px"
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={useColorModeValue("white", "gray.700")}
        >
            <Image src={image} alt={name} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ${price}
                </Text>
                <HStack spacing={2}>
                <IconButton
                        icon={<FiEdit />}
                        aria-label="Edit"
                        variant="ghost"
                        fontSize="24px"
                    />
                    <IconButton
                        icon={<MdDelete />}
                        aria-label="Delete"
                        variant="ghost"
                        fontSize="24px" 
                    />
                </HStack>
            </Box>
        </Box>
    );
};

export default ProductCard;