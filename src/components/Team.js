import PropTypes from 'prop-types';
import React from 'react';
import { getTeam } from '../api';

Team.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
}

export default function Team(props) {
    const [team, setTeam] = React.useState(null);

    const fetchTeam = (id) => {
        setTeam(null);
        getTeam(id)
          .then((team) => setTeam(team));
      };

    React.useEffect(() => {
        fetchTeam(props.id);
    },[props.id]);


    return props.children(team);
}