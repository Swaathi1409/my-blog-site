import {useState} from 'react';
import axios from 'axios';
import useUser from '../hooks/useUser';

const AddCommentForm = ({articleName, onArticleUpdated}) => {
    const [commentText, setCommentText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {user} = useUser();

    const addComment = async() => {
        if (!commentText.trim()) {
            setErrorMessage('Comment cannot be empty');
            return;
        }

        try {
            const token = user && await user.getIdToken();
            
            // If user is not logged in, handle gracefully
            if (!token) {
                setErrorMessage('You must be logged in to comment');
                return;
            }
            
            const headers = { authtoken: token };

            const API_URL = import.meta.env.PROD 
  ? 'https://quill-nest.onrender.com/api'  // Add /api here to be consistent
  : 'http://localhost:8000/api';

            const response = await axios.post(`${API_URL}/articles/${articleName}/comments`, {

                // Send only the text, server will get user info from token
                text: commentText.trim(),
                postedBy: user.email  // Keep this for backward compatibility
            }, { headers });
            
            const updatedArticle = response.data;
            onArticleUpdated(updatedArticle);
            setCommentText('');
            setErrorMessage('');
        } catch (error) {
            console.error('Error adding comment:', error);
            setErrorMessage('Failed to add comment. Please try again.');
        }
    }

    return(
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            {user && <p>You are posting as {user.email}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <label>
                <textarea 
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows="4" 
                    cols="50"
                    placeholder="Share your thoughts..."/>
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm;