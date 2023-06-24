import React,{useState,useEffect} from 'react'
import axios from "axios"

const options = {
  method: 'GET',
  url: 'https://bing-news-search1.p.rapidapi.com/news',
  params: {count: '35', category: 'Cryptocurrency', safeSearch: 'Off', textFormat: 'Raw'},
  headers: {
    'Accept-Language': 'English',
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'f0ed9adbf2msh3c850acb38f54c0p1a2987jsne7f2a1827bb2',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }
};

const News = () => {
  const [news,setNews]=useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(false)

  useEffect(()=>{
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
    



axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
  })

  return (
    <div>Necdnws</div>
  )
}

export default News