import {Link} from 'react-router-dom'

function Navbar(){
    return (
        <div>
            <nav>
            <ul>
                <li><Link to = '/watchlist'>Watchlist</Link></li>
                <li><Link to = '/gainers'>Gainers</Link></li>
                <li><Link to = '/search'>Search</Link></li>
                <li><Link to = '/'>Portfolio</Link></li>
            </ul>
        </nav>
        </div>
    )
}

export default Navbar