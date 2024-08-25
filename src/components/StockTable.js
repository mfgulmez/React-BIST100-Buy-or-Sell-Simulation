
function CurrencyTable({data, handleBuy}){
    
  
    return (
        <div className = "stocklist">
            <h2>Stock List</h2>
            <div className = "stocks">
            {data.map((stock) => (
               <div className = "stock" onClick={() => handleBuy(stock.name, stock.price, stock.status, stock.change)}>
                   <p className = "stockname">{stock.name}<p className = "stockprice">₺{stock.price}</p></p>
                   <p className = {stock.status}> {stock.change}%</p>
               </div>
             ))}
             </div>
        
        </div>
    );
}

export default CurrencyTable;