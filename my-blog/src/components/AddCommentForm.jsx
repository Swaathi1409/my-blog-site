import {useState} from 'react';
import axios from 'axios';
import useUser from '../hooks/useUser';

const AddCommentForm = ({articleName, onArticleUpdated}) => {
    const [commentText, setCommentText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {user} = useUser();

    const addComment = async() => {
        // Log important variables to help debug
        console.log("Environment:", import.meta.env);
        console.log("Article name:", articleName);
        
        if (!commentText.trim()) {
            setErrorMessage('Comment cannot be empty');
            return;
        }
    
        try {
            const token = user && await user.getIdToken();
            
            if (!token) {
                setErrorMessage('You must be logged in to comment');
                return;
            }
            
            const headers = { authtoken: token };
    
            // Force production URL when on render.com domain
            const isProduction = import.meta.env.PROD || 
                                 window.location.hostname.includes('render.com');
            const API_URL = isProduction 
                           ? 'https://quill-nest.onrender.com/api'
                           : 'http://localhost:8000/api';
                           
            console.log("Using API URL:", API_URL);
            
            // Log the full URL being used
            const fullUrl = `${API_URL}/articles/${articleName}/comments`;
            console.log("Full request URL:", fullUrl);
    
            const response = await axios.post(fullUrl, {
                text: commentText.trim(),
                postedBy: user.email
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