import React from 'react';
import Sidebar from './Sidebar';
import { Route, Link, useParams } from 'react-router-dom';
import { getPlayers } from '../api';
import { parse } from 'query-string';
import slug from 'slug';

function Players(props) {
    const [players, setPlayers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const fetchPlayers = (teamId) => {
        getPlayers(teamId)
            .then((players) => {
                setLoading(false);
                setPlayers(players);
            })
    }

    React.useEffect(() => {

        props.location.search
            ? fetchPlayers(parse(props.location.search).teamId)
            : fetchPlayers()
    }, [props,players])

    return(
        <div className='container two-column'>
            <Sidebar
                loading={loading}
                title='Players'
                list={players.map((player) => player.name)}
                {...props}
            />

            {loading === false && props.location.pathname === '/players'
                ? <div className='sidebar-instruction'>Select a Player</div>
                : null
            }

            <Route path={ `${props.match.url}/:playerId` } render={ ({ match }) => {
                if (loading === true) return null;

                const { name, position, teamId, number, avatar, apg, ppg, rpg, spg } = players.find((player) => slug(player.name) === match.params.playerId)
            
                return (
                    <div className='panel'>
                      <img className='avatar' src={`${avatar}`} alt={`${name}'s avatar`} />
                      <h1 className='medium-header'>{name}</h1>
                      <h3 className='header'>#{number}</h3>
                      <div className='row'>
                        <ul className='info-list' style={{marginRight: 80}}>
                          <li>Team
                            <div>
                              <Link style={{color: '#68809a'}} to={`/${teamId}`}>
                                {teamId[0].toUpperCase() + teamId.slice(1)}
                              </Link>
                            </div>
                          </li>
                          <li>Position<div>{position}</div></li>
                          <li>PPG<div>{ppg}</div></li>
                        </ul>
                        <ul className='info-list'>
                          <li>APG<div>{apg}</div></li>
                          <li>SPG<div>{spg}</div></li>
                          <li>RPG<div>{rpg}</div></li>
                        </ul>
                      </div>
                    </div>
                  )
            }}/>
        </div>
    )
}

export default Players;