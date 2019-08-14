import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App'
import FoodList from "./Components/FoodList"

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (
        <BrowserRouter>
            <div>
                <main>
                    <Route exact={true} path="/" component={App} />
                    <Route path="/FoodList" component={FoodList} />
                </main>
            </div>
        </BrowserRouter>

    );
}