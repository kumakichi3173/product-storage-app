import { Box, Heading, HStack, IconButton, Image } from '@chakra-ui/react'
import React from 'react'
import { ImTextColor } from 'react-icons/im';

const ProductCard = (product) => {
    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textcolor} mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} colorScheme='red' />
                </HStack>
            </Box>
        </Box>
    )
};

export default ProductCard
