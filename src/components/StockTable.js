
function CurrencyTable({data, handleBuy}){
    
  
    return (
        <div className = "center">
        <table>
            <thead>
            <tr className = "title">
                <th className = "name">Name</th>
                <th className = "price">Price</th>
                <th className = "change">Change</th>
                <th className = "time">Time</th>
                <th>Opr</th>
            </tr>
            </thead>
            <tbody>
            {data.map((stock) => (
             <tr key = {stock.name}>
             <td className = "name">{stock.name}</td>
             <td className = "price">{stock.price}</td>
             <td className = "change">{stock.change}</td>
             <td className = "time">{stock.time}</td>
             <td><button className = "buy" onClick={() => handleBuy(stock.name, stock.price)}>Buy</button></td>
             </tr>
             ))}
             </tbody>
        </table>
        
        </div>
    );
}

export default CurrencyTable;