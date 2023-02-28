import React, { useState, useEffect } from 'react';

import {
    Container,
    Box,
    Button,
    IconButton,
    Flex,
    Image,
    SimpleGrid

} from "@chakra-ui/react";

import { 
    MoonIcon,
    SunIcon,
    HamburgerIcon,
    CloseIcon 
} from "@chakra-ui/icons";

import { useColorMode,} from '@chakra-ui/react';

import NextLink from 'next/link';

export default function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const [ scrolled, setScrolled ] = useState(false);
    const [display, changeDisplay] = useState('none')

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
                <SimpleGrid h="20" columns={3}>
                    <Flex alignItems="center">
                        <Image width={8} alt="Logo" style={{filter: colorMode === 'light' ? 'invert(0)' : 'invert(1)'}} src="https://res.cloudinary.com/danib/image/upload/v1622916721/Baier/logoNew.svg" />
                    </Flex>
                    <Flex>
                        <Flex
                            display={['none', 'none', 'flex','flex']}
                            alignItems={'center'}
                        >
                            <NextLink href="/" passHref>
                                <Button display={'flex'} as="a" variant="unstyled" aria-label="Home" mr={5} w="100%">
                                    Home
                                </Button>
                            </NextLink>

                            <NextLink href="/about" passHref>
                                <Button display={'flex'} as="a" variant="unstyled" aria-label="About" mr={5} w="100%">
                                    About
                                </Button>
                            </NextLink>
                        </Flex>
                        <IconButton
                            aria-label="Open Menu"
                            size="lg"
                            mr={2}
                            icon={<HamburgerIcon />}
                            onClick={() => changeDisplay('flex')}
                            display={['flex', 'flex', 'none', 'none']}
                        />
                    </Flex>
                    {/* Mobile Content */}
                    <Flex
                        w='100vw'
                        display={display}
                        bgColor="gray.50"
                        h="100vh"
                        pos="fixed"
                        top="0"
                        left="0"
                        zIndex={20}
                        overflowY="auto"
                        flexDir="column"
                    >
                        <Flex justify="flex-end">
                        <IconButton
                            mt={2}
                            mr={2}
                            aria-label="Open Menu"
                            size="lg"
                            icon={
                            <CloseIcon />
                            }
                            onClick={() => changeDisplay('none')}
                        />
                        </Flex>

                        <Flex
                        flexDir="column"
                        align="center"
                        >
                        <NextLink href="/" passHref>
                            <Button
                            as="a"
                            variant="ghost"
                            aria-label="Home"
                            my={5}
                            w="100%"
                            >
                            Home
                                    </Button>
                        </NextLink>

                        <NextLink href="/about" passHref>
                            <Button
                            as="a"
                            variant="ghost"
                            aria-label="About"
                            my={5}
                            w="100%"
                            >
                            About
                                    </Button>
                        </NextLink>

                        <NextLink href="/contact" passHref>
                            <Button
                            as="a"
                            variant="ghost"
                            aria-label="Contact"
                            my={5}
                            w="100%"
                            >
                            Contact
                            </Button>
                        </NextLink>
                        </Flex>
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