import React from 'react';
import Sidebar from './Sidebar';
import { getTeamNames } from '../api';

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
        </div>
    )
}

export default Teams;