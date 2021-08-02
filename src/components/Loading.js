import React from 'react';
import PropTypes from 'prop-types';

Loading.propTypes = {
    text: PropTypes.string.isRequired
  }

export default function Loading({ text = 'Loading' }) {

    const [message, setMessage] = React.useState(text);

    React.useEffect(() => {
        const stopper = text + '...';

        const interval = setInterval(() => {
            message === stopper
              ? setMessage(text)
              : setMessage((message) => message + '.')
          }, 300)
        
        return () => window.clearInterval(interval) ;

    }, []);


    return (
      <div className='container'>
        <p className='text-center'>
          {text}
        </p>
      </div>
    )

}