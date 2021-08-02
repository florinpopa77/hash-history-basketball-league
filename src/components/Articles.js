import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getTeamsArticles } from '../api';
import Article from './Article';

export default function Articles(props) {
    const [loading, setLoading] = React.useState(true);
    const [teamsArticles, setTeamsArticles] = React.useState([]);

    React.useEffect(() => {
        getTeamsArticles(props.match.params.teamId)
            .then((teamArticles) => {
                setLoading(false);
                setTeamsArticles(teamArticles.map((article) => article.title));
            })
    }, [props.match.params.teamId]);


    return loading === true
      ? <h1>LOADING</h1>
      : <div className='container two-column'>
          <Sidebar
            loading={loading}
            title='Articles'
            list={teamsArticles}
            {...props}
          />

            <Route path={`${props.match.url}/:articleId`} render={({ match }) => (
                <Article articleId={match.params.articleId} teamId={props.match.params.teamId}>
                    {(article) => !article ? <h1>Loading</h1> : (
                        <div className='panel'>
                        <article className='article' key={article.id}>
                            <h1 className='header'>{article.title}</h1>
                            <p>{article.body}</p>
                        </article>
                        </div>
                    )}
                </Article>
            )}/>
        </div>
}