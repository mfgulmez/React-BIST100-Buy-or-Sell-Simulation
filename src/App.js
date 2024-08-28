
import './App.css'
import useSWR from 'swr';
import CurrencyTable from './components/Main/StockTable.js';
import Header from './components/Main/Header.js';
import Wallet from './components/Main/Wallet.js';
import React, {useState, useEffect, useMemo} from 'react';

// created function to handle API request
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function App() {
  const [stocksBought, setStocksBought] = useState([])
  const [balance, setBalance] = useState(3000.0)

  const {
      data: stocks,
      error,
  } = useSWR('https://doviz-api.onrender.com/api/borsa', fetcher, {
      revalidateOnFocus : false,
      refreshInterval: 1000,
  });
  
  // Ensure stocks is defined before accessing its data property
   const data = useMemo(() => {
      if (!stocks || !stocks.data) return []; // Safely handle undefined or null stocks

      return stocks.data.map(stock => {
        const realPrice = stock.price.replaceAll(".", "").replaceAll(",", ".");
        const realChange = stock.change.replaceAll(".", "").replaceAll(",", ".");
        let stockStatus = "";
        if(realChange > 0){
         stockStatus = "increasing"
        }
        else if(realChange < 0){
         stockStatus = "decreasing"
        }
        else{
         stockStatus = "neutral"
        }
        console.log(stock.name + " " + stockStatus);
        return { ...stock, price: realPrice, status: stockStatus, change: realChange}; // Return the transformed stock object
      });
 }, [stocks]);
   
   useEffect(() => {
      if (data) {
         const updatedBoughtArray = stocksBought.map(boughtStock => {
            const matchingStock = data.find(stock => (stock.name === boughtStock.name) && (stock.price !== boughtStock.price));

            if(matchingStock){
               return{
                  ...boughtStock,
               };
            }
           
            return boughtStock;
         })

         setStocksBought(updatedBoughtArray);
      }}, [data]);
  // Handles error and loading state
  if (error) return <div className='failed'>failed to load</div>;
  //if (isValidating) return <div className="Loading">Loading...</div>;

  function handleBuy(stockName, stockPrice, stockStatus, stockChange){
        const remain = parseFloat(balance - stockPrice);
        if(remain >= 0){
        
        setStocksBought((prevStocks) => {
           const stock = prevStocks.find(stock => stock.name === stockName);
           if(stock === undefined){
              prevStocks = [{name: stockName, amount: 1, price: stockPrice, status: stockStatus, change: stockChange}, ...prevStocks];
              return prevStocks;
           }
           else{
              return prevStocks.map(s => s.name === stockName ? { ...s, amount: s.amount + 1 } : s);
            }

        });
        setBalance(remain);
       }
       else{
          alert('Insufficient balance')
       }
    }
    
   function handleSell(stockName, stockPrice, stockAmount){
      stockPrice = parseFloat(stockPrice);
      const newBalance = parseFloat(balance + stockPrice);
      stockAmount -= 1;
      setBalance(newBalance);
      setStocksBought((prevStocks) => {
         if(stockAmount === 0){
            return prevStocks.filter(stock => stock.name !== stockName);
         }
         else{
            return prevStocks.map(s => s.name === stockName ? { ...s, amount: s.amount - 1 } : s);
         }
         
      });
   }
  return (
   <div className = "main">
   <Header balance = {balance}/>
   <div className = "row">
   <Wallet balance = {balance} stocksBought = {stocksBought} handleSell = {handleSell}/>
   <CurrencyTable data = {data} handleBuy = {handleBuy}/>
   </div>
   </div>
  );
}

export default App;
