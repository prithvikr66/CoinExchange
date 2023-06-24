import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from "react-router-dom"


const Header = () => {
  return (<HStack
    bgColor={"blackAlpha.800"}
    p={"4"}
    shadow={"base"}

  >

    <Button variant={"unstyled"}
      left={"8"}
      color={"whiteAlpha.900"}
    >
      <Link to="/">Home</Link>
    </Button>

    <Button
      left={"16"}
      variant={"unstyled"}
      color={"whiteAlpha.900"}
    >
      <Link to="/exchanges">Exchanges</Link>
    </Button>
    <Button left={"24"} variant={"unstyled"}
      color={"whiteAlpha.900"}
    >
      <Link to="/coins">Coins</Link>
    </Button>
  </HStack>
  )
}

export default Header