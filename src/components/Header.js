
function Header({balance}){
   return(
    <>
    <h1>BIST100 Buy/Sell Simulation</h1>
    <h2 className = "subtitle">Your Balance is {parseFloat(balance).toFixed(2)}</h2>
    </>
   );
}

export default Header;