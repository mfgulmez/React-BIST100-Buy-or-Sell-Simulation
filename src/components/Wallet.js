

function Wallet({stocksBought, handleSell}){

   return(
      <div className = "wallet">
      <h2>Portfolio</h2>
       <div className = "stocks">
       {stocksBought.map((stockBought) => (
         <div className = "stock" onClick={() => handleSell(stockBought.name, stockBought.price, stockBought.amount)}>
         <p className = "stockname">{stockBought.name}:{stockBought.amount}<p className = "stockprice">₺{stockBought.price}</p></p>
         <p className = {stockBought.status}> {stockBought.change}%</p>
         </div>
       ))}
       </div>
   </div>
);
}

export default Wallet;