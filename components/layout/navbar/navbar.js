import React, { useState, useEffect } from 'react';

import {
    Container,
    Box,
    Flex,
    Image,
    SimpleGrid

} from "@chakra-ui/react";

import { 
    MoonIcon 
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
                        {colorMode === 'light' ? (
                        <Image width={8} alt="Logo" src="https://res.cloudinary.com/danib/image/upload/v1622916721/Baier/logoNew.svg" />
                        ) : (
                            <Image width={8} alt="Logo" src="https://res.cloudinary.com/danib/image/upload/v1622917008/Baier/logoNew_white.svg" />
                        )}
                    </Flex>
                    <Flex alignItems="center" justifyContent="right">
                        {colorMode === 'light' ? (
                            <MoonIcon onClick={toggleColorMode} />
                        ) : (
                            <MoonIcon onClick={toggleColorMode} />
                        )}
                    </Flex>
                </SimpleGrid>
            </Box>
        </Container>
    )
}