import * as React from 'react';
import "./FoodList.css";
import Rating from '@material-ui/lab/Rating';
import { Typography, Box } from '@material-ui/core';
//import { NavLink } from 'react-router-dom';
import {FacebookShareButton, TwitterShareButton, PinterestShareButton} from 'react-share';
import {FacebookIcon, TwitterIcon, PinterestIcon} from 'react-share';
// import {FacebookShareCount, PinterestShareCount} from 'react-share';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
 import logo from '../logo.png'

interface IState{
  topics: any
}
interface IProps{
  mount:any
  play:any
}
export default class FoodList extends React.Component<IProps,IState>{
  public constructor(props: any){
      super(props);
      this.state = {
        topics: []
      }
    }


    componentDidMount() {
      fetch('https://feedmeapidevops.azurewebsites.net/api/Details').then((res)=>res.json().then((data)=>{
        const output:any[] = []
        data.forEach((food: any)=>{
          output.push(food)
        });
        this.setState({topics: output})
      })
      );
      console.log(this.state.topics) //returns [];
    }
    

    public render() {
          console.log(this.state.topics)
          
          return (
            <div>
            <header className="App-header">
                <div className = 'fbButton'>
                <FacebookShareButton url ="https://feedmefrontend.azurewebsites.net/FoodList/"><FacebookIcon round={true}/></FacebookShareButton>
                </div>
                <div className = 'pinButton'>
                <PinterestShareButton url ="https://feedmefrontend.azurewebsites.net/FoodList/" media = "https://feedmeimagestorage.blob.core.windows.net/images/a8620bc7-a9fd-4822-be6a-d9dd891f8af0.jpg"><PinterestIcon round={true}/></PinterestShareButton>
                </div>
                <div className = 'twitButton'>
                <TwitterShareButton url = "https://feedmefrontend.azurewebsites.net/FoodList/"><TwitterIcon round={true}/></TwitterShareButton>
                </div>
                <h1 className="App-title">FeedMe <a href = "http://localhost:3000/"><img className = "logoNav" src = {logo} alt = "FeedMe Logo" height="80px"/></a></h1>
                
            </header>
            <ul>
              <table>
                {this.state.topics.map((topic: any) =>(
                  <tr>
                    <td><img src={topic.img_url} alt="Food Picture"/></td>
                    <td>
                      <th>{topic.title}</th>
                      <p>Date and time eaten: {topic.date}</p>
                      <p>Restaurant: {topic.restraunt}</p>
                      <p>Address: {topic.address}</p>
                      <p>Description: {topic.description}</p>
                      <div className = "rating_component">
                      <Box component="fieldset" mb={3} borderColor="transparent">
                      <Typography component="legend">Re-eatability</Typography>
                      <Rating
                          name="simple-controlled"
                          value={topic.rating}
                      />
                      </Box>
                      <Fab disabled aria-label="delete" className="delte button">
                        <DeleteIcon />
                      </Fab>
                      </div>                      
                    </td>
                  </tr>
                  ))}
              </table>
            </ul>
          </div>
      )
  }
}