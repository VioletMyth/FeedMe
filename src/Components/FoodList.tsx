import * as React from 'react';
import "./FoodList.css";
import Rating from '@material-ui/lab/Rating';
import { Typography, Box, Grid } from '@material-ui/core';
//import { NavLink } from 'react-router-dom';
import {FacebookShareButton, TwitterShareButton, PinterestShareButton} from 'react-share';
import {FacebookIcon, TwitterIcon, PinterestIcon} from 'react-share';
//import {FacebookShareCount, PinterestShareCount} from 'react-share';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import logo from '../logo.png'
//import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import Paper from '@material-ui/core/Paper';


interface IState{
  topics: any,
  width: any
}
interface IProps{
  mount:any
  play:any
}
export default class FoodList extends React.Component<IProps,IState>{
  public constructor(props: any){
      super(props);
      this.state = {
        topics: [],
        width: window.innerWidth
      }
    }
    componentWillMount() {
      window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
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
    
    handleWindowSizeChange = () => {
      this.setState({ width: window.innerWidth });
    };

    public render() {
          const { width } = this.state;
          const isMobile = width <= 500;
          console.log(this.state.topics)
          if (isMobile) {
            return (
              <div>
              <header className="App-header">
                <h1 className="FoodList-Title">FeedMe <a href = "https://feedmefrontend.azurewebsites.net"><img className = "logoNav" src = {logo} alt = "FeedMe Logo" height="80px"/></a></h1>
                <div className = 'fbButton'>
                  <FacebookShareButton url ="https://feedmefrontend.azurewebsites.net/FoodList/"><FacebookIcon round={true}/></FacebookShareButton>
                </div>
                <div className = "pinButton">
                  <PinterestShareButton url ="https://feedmefrontend.azurewebsites.net/FoodList/" media = "https://feedmeimagestorage.blob.core.windows.net/images/a8620bc7-a9fd-4822-be6a-d9dd891f8af0.jpg"><PinterestIcon round={true}/></PinterestShareButton>
                </div>
                <div className = "twitButton">
                  <TwitterShareButton url = "https://feedmefrontend.azurewebsites.net/FoodList/"><TwitterIcon round={true}/></TwitterShareButton>

                </div>
                <div className = "translateBar" id="google_translate_element"></div>
                </header>
                <Grid container justify = "center">
                {this.state.topics.map((topic: any) =>(
                        <Grid container justify = "center">
                        <Table>
                          <TableBody>
                            <TableRow>
                              <Grid container justify = "center">
                              <TableCell align = "center">
                              <img src={topic.img_url} alt="Food Picture"/>
                              </TableCell>
                              </Grid>
                            <Grid container justify = "center">
                              <TableCell align="center">
                              
                              <h3>{topic.title}</h3>
                              <p>Date and time eaten:{topic.date}</p>
                              <p>Restaurant: {topic.restraunt}</p>
                              <p>Address: {topic.address}</p>
                              <p>Description: {topic.description}</p>
                              
                              </TableCell>
                              </Grid>
                            </TableRow>
                          </TableBody>
                        </Table>
                        </Grid>
                        ))}
                        </Grid>
                  </div>
          )
          }
          
          else{
          
          return (
            <div>
              <header className="App-header">
                <h1 className="FoodList-Title">FeedMe <a href = "https://feedmefrontend.azurewebsites.net"><img className = "logoNav" src = {logo} alt = "FeedMe Logo" height="80px"/></a></h1>
                <div className = 'fbButton'>
                  <FacebookShareButton url ="https://feedmefrontend.azurewebsites.net/FoodList/"><FacebookIcon round={true}/></FacebookShareButton>
                </div>
                <div className = "pinButton">
                  <PinterestShareButton url ="https://feedmefrontend.azurewebsites.net/FoodList/" media = "https://feedmeimagestorage.blob.core.windows.net/images/a8620bc7-a9fd-4822-be6a-d9dd891f8af0.jpg"><PinterestIcon round={true}/></PinterestShareButton>
                </div>
                <div className = "twitButton">
                  <TwitterShareButton url = "https://feedmefrontend.azurewebsites.net/FoodList/"><TwitterIcon round={true}/></TwitterShareButton>

                </div>
                <div className = "translateBar" id="google_translate_element"></div>
            </header>
            <Grid container justify = "center">
                    <table>
                    {this.state.topics.map((topic: any) =>(
                          <tr>
                            <td><img src={topic.img_url} alt="Food Picture"/></td>
                            <td>
                              <h3><b>{topic.title}</b></h3>
                              <br/>
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
                      </Grid>
              <div className="fb-comments" data-href="https://developers.facebook.com/docs/plugins/comments#configurator" data-width="" data-numposts="5"></div>
          </div>
      )
  }
}
}