import * as React from 'react';
import './App.css';
import Details from './Components/Details/Details';
// import DropArea from './Components/DropArea/DropArea';
import logo from './logo.png';
// import { NavLink } from 'react-router-dom';





class App extends React.Component {
  public resultstate = (resultString:string,filelen:any) => {
    this.setState({result:resultString,filelength:filelen})
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="FoodList-Title">FeedMe <a href = "https://feedmefrontend.azurewebsites.net/FoodList/"><img className = "logoNav" src = {logo} alt = "FeedMe Logo" height="80px"/></a></h1>
          <Details/>
        </header>
      </div>
    );
  }
}


export default App;
