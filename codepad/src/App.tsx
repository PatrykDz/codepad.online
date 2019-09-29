import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateSnippetPage from './pages/CreateSnippetPage'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <Route exact path="/:urlId" component={CreateSnippetPage}/>
                {/*<CreateSnippetPage/>*/}
            </Router>
        </div>
    );
}

export default App;
