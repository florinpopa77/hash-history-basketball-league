import PropTypes from 'prop-types';
import React from 'react';
import { getArticle } from '../api';

Article.propTypes = {
    teamId: PropTypes.string.isRequired,
    articleId: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
  }

export default function Article(props) {
    const [article, setArticle] = React.useState(null);

    React.useEffect(() => {
        getArticleT(props.teamId, props.articleId)
    }, [props.teamId, props.articleId]);

  const getArticleT = (teamId, articleId) => {
    setArticle(null);

    getArticle(teamId, articleId)
      .then((article) => setArticle(article))
  };

    return props.children(article)

}