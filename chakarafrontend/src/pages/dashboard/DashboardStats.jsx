'use client'

import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react'

function StatsCard({ title, stat, icon, iconSize, iconMap }) {
  const Icon = iconMap[icon]; // Get the icon component dynamically from the iconMap

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}
        >
          <Icon size={iconSize} />
        </Box>
      </Flex>
    </Stat>
  )
}

export default function BasicStatistics({ statistics, iconMap }) {
  return (
    <Box maxW="10xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
        Our company is expanding, you could be too.
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }} mb={10}>
        {statistics.map((stat, index) => (
          <StatsCard 
            key={index}
            title={stat.title}
            stat={stat.stat}
            icon={stat.icon}
            iconSize={stat.iconSize}
            iconMap={iconMap} // Passing the iconMap to each StatsCard
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}
