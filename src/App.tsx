import * as React from 'react';
import './App.css';
// import Details from './Components/Details/Details';
// import DropArea from './Components/DropArea/DropArea';
// import logo from './logo.png';
//import FoodList from './Components/FoodList';
// import { NavLink } from 'react-router-dom';
//import {BrowserRouter, Route, NavLink} from "react-router-dom";
import ResponsiveFoodList from './Components/ResponsiveFoodList';





class App extends React.Component {
  public resultstate = (resultString:string,filelen:any) => {
    this.setState({result:resultString,filelength:filelen})
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          
          {/* <h1 className="FoodList-Title">FeedMe <a href = "http://localhost:3000/FoodList/"><img className = "logoNav" src = {logo} alt = "FeedMe Logo" height="80px"/></a></h1>     */}
        </header>
        {/* <FoodList /> */}
        <ResponsiveFoodList />
      </div>
    );
  }
}


export default App;
