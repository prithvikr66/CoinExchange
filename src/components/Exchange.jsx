import React,{useEffect, useState} from 'react'
import axios from "axios"
import {server} from "../index"
import { Container, Heading, HStack, VStack ,Image, Text} from '@chakra-ui/react'
import Loader from "./Loader.jsx"
import Error from "./Error.jsx"

const Exchange = () => {
    const [exchanges,setExchanges]=useState([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)
useEffect(() => {
    const fetchExchanges= async()=>{
        try {
            const {data}=await axios.get(`${server}/exchanges`)
        setExchanges(data)
        setLoading(false)
        
        } catch (error) {
            setError(true)
            setLoading(false)
            
        }
        
    }
    fetchExchanges();
  
}, [])

       if(error){
        return <Error/>

       }

  return (
    <Container maxW={"container.xl"}>
    {loading?<Loader/>:<>
    <HStack
    wrap={"wrap"}>
        {exchanges.map((i)=>(
        <Exchangecard
            key={i.id}
            name={i.name}
            img={i.image}
            rank={i.trust_score_rank}
            url={i.url}
        />
        ))}
    </HStack>

    </>}

    </Container>
  )
}
const Exchangecard=({name,img,rank,url})=>(
    <a href={url} target={"blank"}>
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
            alt={"exchange"}
        />
        <Heading 
        size={"md"}
        noOfLines={"1"}
        >{rank}</Heading>
        <Text
        noOfLines={"1"}>{name}</Text>
    </VStack>

    </a>

)

export default Exchange