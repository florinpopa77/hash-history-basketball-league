import React from 'react';
import TeamLogo from './TeamLogo';
import { Link } from 'react-router-dom';
import { getTeamNames } from '../api';

function Home() {
    const [teamNames, setTeamNames] = React.useState([]);

    React.useEffect(() => {
        getTeamNames()
            .then((teamNames) => setTeamNames(teamNames))
    }, []);

    return(
        <div className='container'>
            <h1 className='large-header'> Hash History Basketball League</h1>
            <h3 className='header text-center'> Select a team</h3>
            <div className='home-grid'>
                { teamNames.map((id) => (
                    <Link key={ id } to={`/${id}`}>
                        <TeamLogo id={ id } width='125px'/>
                    </Link>
                )) }
            </div>
        </div>
    )
}

export default Home;