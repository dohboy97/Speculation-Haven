function PortfolioPage (){

    async function get(){
        const res = await fetch('/portfolio')
            
        const data = await res.json()
        console.log(data)
    }
    get()

    return (
        <div>
        <h1>Portfolio</h1>
        <h2>Owned tickers</h2>
        <p>Avg cost, quantity, total value</p>
        </div>
    )
}

export default PortfolioPage