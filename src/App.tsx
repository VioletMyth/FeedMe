import * as React from 'react';
import './App.css';
import Details from './Components/Details/Details';
// import DropArea from './Components/DropArea/DropArea';
import logo from './logo.png';
import { NavLink } from 'react-router-dom';



class App extends React.Component {
  public resultstate = (resultString:string,filelen:any) => {
    this.setState({result:resultString,filelength:filelen})
  }

  public render() {
    return (
      <div className="App">
             
        <header className="App-header">
          <h1 className="App-title">FeedMe <NavLink to = '/FoodList'>asdasdas</NavLink></h1>
          <img src={logo} alt="Logo" style={{maxHeight: "50px", maxWidth: "50px", marginTop: "-20px"}}></img>
          <Details/>
        </header>
      </div>
    );
  }
}



export default App;
