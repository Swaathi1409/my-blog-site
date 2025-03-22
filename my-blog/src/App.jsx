import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import firebaseApp from './firebase';
import NavBar from './pages/NavBar.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx'; 
import ArticleListPage from './pages/ArticleListPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CreateAccountPage from './pages/CreateAccountPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <NavBar />
       <div id="page-body">
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/articles" element={<ArticleListPage />}/>
        <Route path="/articles/:articleId" element={<ArticlePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/create-account" element={<CreateAccountPage />}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
       </div>
      </div>
    </BrowserRouter>
  )
}
export default App