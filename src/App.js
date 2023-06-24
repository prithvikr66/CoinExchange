import {BrowserRouter as Router , Routes,Route} from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import Coins from "./components/Coins"
import Exchange from "./components/Exchange"
import CoinDetails from "./components/CoinDetails"
import News from "./components/News"

function App() {
  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/coins" element={<Coins/>}></Route>
        <Route path="/exchanges" element={<Exchange/>}></Route>
        <Route path="/coin/:id" element={<CoinDetails/>}></Route>
        <Route path="/news" element={<News/>}></Route>
        

        
      </Routes>
    </Router>
    
  );
}

export default App;
