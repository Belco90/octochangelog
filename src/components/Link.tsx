import { Link as ChakraLink, LinkProps } from '@chakra-ui/core';
import React from 'react';

const Link = (props: LinkProps) => {
  return <ChakraLink color="brand.500" {...props} />;
};

export default Link;
