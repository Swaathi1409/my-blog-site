import ArticlesList from "../components/ArticlesList.jsx";
import articles from './article-content.jsx';

const ArticleListPage = () => {
    return(
        <>
        <h1>Articles</h1>
        <ArticlesList articles = {articles} />
        </>
    )
}

export default ArticleListPage;