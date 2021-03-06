import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App'
// import FoodList from "./Components/FoodList"
//import Details from "./Components/Details/Details";
import ResponsiveFoodList from "./Components/ResponsiveFoodList";

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (
        <BrowserRouter>
            <div>
                <main>
                    <Route exact={true} path="/" component={ResponsiveFoodList} />
                    <Route path="/Form" component={App} />
                </main>
            </div>
        </BrowserRouter>

    );
}