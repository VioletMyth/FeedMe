import * as React from 'react';
import "./FoodList.css";
import Rating from '@material-ui/lab/Rating';
import { Typography, Box } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import {FacebookShareButton, TwitterShareButton, PinterestShareButton} from 'react-share';
import {FacebookIcon, TwitterIcon, PinterestIcon} from 'react-share';
// import {FacebookShareCount, PinterestShareCount} from 'react-share';

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
                <h1 className="App-title">FeedMe <NavLink to = '/'>Details</NavLink></h1>
                <div>
                <FacebookShareButton url ="https://feedmefrontend.azurewebsites.net/FoodList/"><FacebookIcon/></FacebookShareButton>
                </div>
                <div>
                <PinterestShareButton url ="https://feedmefrontend.azurewebsites.net/FoodList/" media = "https://feedmeimagestorage.blob.core.windows.net/images/a8620bc7-a9fd-4822-be6a-d9dd891f8af0.jpg"><PinterestIcon/></PinterestShareButton>
                </div>
                <TwitterShareButton url = "https://feedmefrontend.azurewebsites.net/FoodList/"><TwitterIcon/></TwitterShareButton>
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