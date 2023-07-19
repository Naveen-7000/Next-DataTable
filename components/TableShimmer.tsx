import { Box, Flex, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'

const TableShimmer = () =>{
    return(
        <Box padding='6' boxShadow='lg' bg='white'>
            <Flex align="center" justify="space-between">
            <Skeleton height='30px' width="100px" />
            <Skeleton height='30px' width="165px" />
            </Flex>

        </Box>
    )
}

export default TableShimmer;