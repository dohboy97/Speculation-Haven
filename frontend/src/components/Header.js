function Header (props){
    console.log(props.log)
return(
    <header>
        <h1>Speculation Station</h1>
        <nav>
            <ul>
                <li>Watchlist</li>
                <li>Gainers</li>
                <li>Search</li>
                <li>Social</li>
            </ul>
        </nav>
    </header>
)
}

export default Header