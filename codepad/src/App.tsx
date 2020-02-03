import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import HomePage from "./pages/HomePage";
import CreateSnippetPage from './pages/CreateSnippetPage'

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/:urlId" component={CreateSnippetPage}/>
                </Switch>
                {/*<CreateSnippetPage/>*/}
            </Router>
        </div>
    );
}

export default App;
