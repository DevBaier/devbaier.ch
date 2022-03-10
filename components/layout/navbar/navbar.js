import React, { useState, useEffect } from 'react';

import {
    Container,
    Box,
    Flex,
    Image,
    SimpleGrid

} from "@chakra-ui/react";

import { 
    MoonIcon,
    SunIcon 
} from "@chakra-ui/icons";

import { useColorMode,} from '@chakra-ui/react'

export default function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const [ scrolled, setScrolled ] = useState(false);

    const bg = () => {
        if(colorMode === 'light') {
            return 'white';
        }
        else {
            return 'gray.800';
        }
    }

    const handleScroll=() => {
      const offset=window.scrollY;
      if(offset > 100 ){
        setScrolled(true);
      }
      else{
        setScrolled(false);
      }
    }
    useEffect(() => {
      window.addEventListener('scroll',handleScroll)
    })
  
    let x=['navbar'];
    if(scrolled){
      x.push('navbar--scrolled');
    }

    return (
        <Container maxW='container.xl' bg={bg} className={x.join(" ")}>
            <Box>
                <SimpleGrid h="20" columns={2}>
                    <Flex alignItems="center">
                        <Image width={8} alt="Logo" style={{filter: colorMode === 'light' ? 'invert(0)' : 'invert(1)'}} src="https://res.cloudinary.com/danib/image/upload/v1622916721/Baier/logoNew.svg" />
                    </Flex>
                    <Flex alignItems="center" justifyContent="right">
                        {colorMode === 'light' ? (
                            <MoonIcon onClick={toggleColorMode} />
                        ) : (
                            <SunIcon onClick={toggleColorMode} />
                        )}
                    </Flex>
                </SimpleGrid>
            </Box>
        </Container>
    )
}