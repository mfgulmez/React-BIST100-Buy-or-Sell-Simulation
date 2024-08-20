
function CurrencyTable({data, handleBuy}){
    
  
    return (
        <div className = "center">
        <table>
            <tr className = "title">
                <th>Name</th>
                <th>Price</th>
                <th>Change</th>
                <th>Time</th>
                <th>Opr</th>
            </tr>
            
            {data.map((stock) => (
             <tr key = {stock.name}>
             <td>{stock.name}</td>
             <td>{stock.price}</td>
             <td>{stock.change}</td>
             <td>{stock.time}</td>
             <td><button className = "buy" onClick={() => handleBuy(stock.name, stock.price)}>Buy</button></td>
             </tr>
             ))}
        </table>
        
        </div>
    );
}

export default CurrencyTable;