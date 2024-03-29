import React,{useEffect, useState} from 'react'
import axios from "axios"
import {server} from "../index"
import { Container, Heading, HStack, VStack ,Image, Text, Button, RadioGroup,Radio} from '@chakra-ui/react'
import Loader from "./Loader.jsx"
import Error from "./Error.jsx"
import { Link } from 'react-router-dom'

const Coins = () => {
    const [coins,setCoins]=useState([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
    const [page,setPage]=useState(1)
    const [currency,setCurrency]=useState("inr")
    const currencySymbol=currency==="inr"?"₹":currency==="eur"?"€":"$"
    const changePage=(page)=>{
        setPage(page)
        setLoading(true)
    }
    const btns=new Array(132).fill(1)
useEffect(() => {
    const fetchCoins= async()=>{
        try {
            const {data}=await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
        setCoins(data)
        
        setLoading(false)
        
        } catch (error) {
            setError(true)
            setLoading(false)
            
        }
        
    }
    fetchCoins();
  
}, [currency,page])

       if(error){
        return <Error/>

       }

  return (
    <Container maxW={"container.xl"}>
    {loading?<Loader/>:<>
    <RadioGroup value={currency} onChange={setCurrency}>
        <HStack>
            <Radio value={"inr"}>INR</Radio>
            <Radio value={"usd"}>USD</Radio>
            <Radio value={"eur"}>EURO</Radio>
        </HStack>
    </RadioGroup>
    <HStack
    justifyContent={"space-evenly"}
    wrap={"wrap"}>
        {coins.map((i)=>(
        <CoinCard
            key={i.id}
            id={i.id}
            name={i.name}
            img={i.image}
            price={i.current_price}
            symbol={i.symbol}
            currencySymbol={currencySymbol}
        />
        ))}
    </HStack>
  <HStack
  overflow={"auto"}
  w={"full"}
  p={"8"}>
    {
      btns.map((item,index)=>(
        <Button
        key={index}
        bgColor={"blackAlpha.900"}
        color={"white"}
        onClick={()=>changePage(index+1)}>{index+1}</Button>
      ))
    }
  </HStack>

    </>}

    </Container>
  )
}
const CoinCard=({id,name,img,symbol,price,currencySymbol})=>(
    <Link to={`/coin/${id}`}>
    <VStack
    w={"52"}
    shadow={"lg"}
    borderRadius={"lg"}
    p={"8"}
    m={"4"}
    transition={"all 0.5s"}
    css={{
        "&:hover":{
            transform:"scale(1.1)"
        }
    }}
    >
        <Image
            src={img}
            w={"10"}
            h={"10"}
            objectFit={"contain"}
            alt={"coin"}
        />
        <Heading 
        size={"md"}
        noOfLines={"1"}
        // fontFamily={"Roboto"}
        >{symbol}</Heading>
        <Text
        noOfLines={"1"}
        >{name}</Text>
        <Text
        noOfLines={"1"}>{price?`${currencySymbol}${price}`:"NA"}</Text>
    </VStack>

    </Link>

)



export default Coins