import React from 'react';
import Sidebar from './Sidebar';
import { getTeamNames } from '../api';
import { Route, Link } from 'react-router-dom';
import TeamLogo from './TeamLogo';
import Team from './Team';

function Teams(props) {
    const [teamNames, setTeamNames] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        getTeamNames()
            .then((teamNames) => {
                setLoading(false);
                setTeamNames(teamNames);
            })
    }, []);
    return(
        <div className='container two-column'>
            <Sidebar
                loading={ loading }
                title='Teams'
                list={ teamNames }
                {...props}
            />

            {loading === false && props.location.pathname === '/teams'
                ? <div className='sidebar-instruction'>Select a Team</div>
                : null
            }

            <Route path={`${props.match.url}/:teamId`} render={({ match }) => (
                <div className='panel'>
                    <Team id={match.params.teamId}>
                    {(team) => team === null
                        ? <h1>Loading</h1>
                        : <div style={{width: '100%'}}>
                            <TeamLogo id={team.id} className='center' />
                            <h1 className='medium-header'>{team.name}</h1>
                            <ul className='info-list row'>
                            <li>Established<div>{team.established}</div></li>
                            <li>Manager<div>{team.manager}</div></li>
                            <li>Coach<div>{team.coach}</div></li>
                            </ul>
                            <Link
                                className='center btn-main'
                                to={`/${match.params.teamId}`}>
                                {team.name} Team Page
                            </Link>
                        </div>}
                    </Team>
                </div>
            )} />
        </div>
    )
}

export default Teams;