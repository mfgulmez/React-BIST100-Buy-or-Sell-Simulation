

function Wallet({balance, stocksBought, handleSell}){

   return(
      <div className = "wallet">
      <h1>Portfolio</h1>
       <p>Your Balance is {parseFloat(balance).toFixed(2)}</p>
       <div className = "stocks">
       <table>
       <tbody>
       {stocksBought.map((stockBought) => (
         <tr key = {stockBought.name}>
         <td>{stockBought.name} amount of {stockBought.amount} with price {stockBought.price}</td>
         <td><button className = "sell" onClick={() => handleSell(stockBought.name, stockBought.price, stockBought.amount)}>Sell</button></td>
         </tr>
       ))}
       </tbody>
       </table>
       </div>
   </div>
);
}

export default Wallet;