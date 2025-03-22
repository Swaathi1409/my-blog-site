import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NotFoundPage from './NotFoundPage.jsx';
import CommentsList from '../components/CommentsList.jsx';
import AddCommentForm from '../components/AddCommentForm.jsx';
import useUser from '../hooks/useUser.jsx';
import articles from './article-content.jsx';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [], canUpvote: false, upvotedBy:[] });
    const [errorMessage, setErrorMessage] = useState('');
    const { articleId } = useParams();
    const { user, isLoading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const loadArticleInfo = async () => {
            try {
                const headers = {};
                
                if (user) {
                    const token = await user.getIdToken();
                    headers.authtoken = token;
                }

                // Updated relative URL
                const response = await axios.get(`/api/articles/${articleId}`, { headers });
                setArticleInfo(response.data);
                setErrorMessage('');
            } catch (error) {
                console.error("Error fetching article info:", error);
                setErrorMessage('Failed to load article information');
            }
        };

        if (!isLoading) {
            loadArticleInfo();
        }
    }, [articleId, isLoading, user]);

    const addUpvote = async () => {
        try {
            if (!user) {
                setErrorMessage('Please log in to upvote');
                return;
            }
    
            const token = await user.getIdToken();
            const headers = { authtoken: token };
    
            // Updated relative URL
            const response = await axios.put(
                `/api/articles/${articleId}/upvote`, 
                {}, // Empty body is fine as we're using the auth token
                { headers }
            );
    
            if (response.data) {
                setArticleInfo(response.data);
                setErrorMessage('');
            }
        } catch (error) {
            console.error("Upvote failed:", error);
            if (error.response && error.response.status === 400) {
                setErrorMessage('You have already upvoted this article');
            } else {
                setErrorMessage('Failed to upvote the article');
            }
        }
    };
    
    const redirectToLogin = () => {
        navigate('/login');
    };

    const article = articles.find(article => article.name === articleId);
    if (!article) return <NotFoundPage />;

    return (
        <>
            <h1>{article.title}</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="upvotes-section">
                {user ? (
                    <button 
                        onClick={addUpvote} 
                        disabled={!articleInfo.canUpvote}
                    >
                        {articleInfo.canUpvote ? 'Upvote' : 'Already Upvoted'}
                    </button>
                ) : (
                    <button onClick={redirectToLogin}>
                        Log in to upvote
                    </button>
                )}
                <p>This article has {articleInfo.upvotes} upvote(s)</p>
            </div>

            {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}

            {user ? (
                <AddCommentForm
                    articleName={articleId}
                    onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}
                />
            ) : (
                <button onClick={redirectToLogin}>
                        Log in to Add Comment
                    </button>
            )}

            <CommentsList comments={articleInfo.comments} />
        </>
    );
};

export default ArticlePage;