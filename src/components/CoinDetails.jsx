import { Badge, Box, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Loader from './Loader'
import { server } from "../index"
import { useParams } from "react-router-dom"

const CoinDetails = () => {
  const [coin, setCoin] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currency, setCurrency] = useState("inr")
  const params = useParams()
  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`)
        setLoading(false)
        setCoin(data)
        console.log(data)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchCoin()
  }, [params.id])

  return (
    <Container maxW={"container.xl"}>
      {loading ? <Loader /> : <>
        <Box width={"full"}
          borderWidth={"1"}>chart here</Box>


        <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
          <HStack spacing={"4"}>
            <Radio value="inr" fontFamily={"Roboto"}>INR</Radio>
            <Radio value="usd" fontFamily={"Roboto"}>USD</Radio>
            <Radio value="eur" fontFamily={"Roboto"}>EUR</Radio>
          </HStack>
        </RadioGroup>
        <VStack spacing={"4"} alignItems={"flex-start"}
          p={"16"}>
          <Text fontSize={"small"}
            alignSelf={'center'}
            opacity={"0.7"}
            fontFamily={"Roboto"}>
            Last Updated on {Date(coin.market_data.last_updated).split("G")[0]}

          </Text>
          <Image src={coin.image.large}
            alignSelf={"center"}
            w={"16"}
            h={"16"}
            objectFit={"contain"}></Image>
          <Stat>
            <StatLabel css={{
              "font":"700 1rem Roboto"
            }}
            >{coin.name}</StatLabel>
            <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
            <StatHelpText>
              <StatArrow
                type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"}

              ></StatArrow>
              {coin.market_data.price_change_percentage_24h}%

            </StatHelpText>
          </Stat>
          <Badge
            fontSize={"2xl"}
            bgColor={"blackAlpha.700"}
            color={"white"}
            // fontFamily={"Roboto"}
          >Current Rank {`#${coin.market_cap_rank}`}</Badge>
          <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
            low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />
          <Box w={"full"} p={"4"}>
            <Item title={"Max Supply"} value={coin.market_data.max_supply} />
            <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} />
            <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
            <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
            <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />

          </Box>

        </VStack>

      </>}

    </Container>
  )
}

const Item = ({ title, value }) => (
  <HStack w={"full"} justifyContent={'space-between'}
    my={"4"}>
    <Text fontFamily={"Roboto"}>{title}</Text>
    <Text fontFamily={"Roboto"}>{value}</Text>
  </HStack>
)

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}
        fontFamily={"Roboto"}
      letterSpacing={'wide'}>Variation in 24Hrs</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>

)

export default CoinDetails