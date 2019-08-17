import * as React from 'react';
import "./FoodList.css";
import {FacebookShareButton, TwitterShareButton, PinterestShareButton} from 'react-share';
import {FacebookIcon, TwitterIcon, PinterestIcon} from 'react-share';
import logo from "../logo.png";
import FoodItem from './FoodItem';

interface IState{
  topics: any,
  width: any,
  open: any
}
export default class ResponsiveFoodList extends React.Component<{},IState>{
  public constructor(props: any){
      super(props);
      this.state = {
        topics: [],
        width: window.innerWidth,
        open: false
      }
    }

    
    componentDidMount() {
      this.getFoodList();
    }
    public getFoodList = () => {
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
        console.log(this.state.topics);
        const responsive = (
        this.state.topics.map((topic: any) =>  (
            <FoodItem topic = {topic} refresh = {this.getFoodList}/>
        ))
        )
        return (
            <div>
                <header className="FoodList-header">
                <h1 className="FoodList-Title" style={{lineHeight: "90px"}}>FeedMe<a href = "https://feedmefrontend.azurewebsites.net/Form"><img className = "logoNav" src = {logo} alt = "FeedMe Logo" height="80px"/></a></h1>
                </header>
                <div style = {{position: "fixed", left: 0}}>
                    <div className = 'fbButton'>
                    <FacebookShareButton url ="https://feedmefrontend.azurewebsites.net/FoodList/" ><FacebookIcon round={true} size={32}/></FacebookShareButton>
                    </div>
                    <div className = "pinButton">
                    <PinterestShareButton url ="https://feedmefrontend.azurewebsites.net/FoodList/" media = "https://feedmeimagestorage.blob.core.windows.net/images/a8620bc7-a9fd-4822-be6a-d9dd891f8af0.jpg"><PinterestIcon round={true} size={32}/></PinterestShareButton>
                    </div>
                    <div className = "twitButton">
                    <TwitterShareButton url = "https://feedmefrontend.azurewebsites.net/FoodList/"><TwitterIcon round={true} size={32}/></TwitterShareButton>
                    </div>
                    
                    
                </div>
            <div style = {{width: "70%", margin: "0 auto"}}>
                {responsive}
            </div>
            <div className="fb-comments"  id="fb"data-href="https://feedmefrontend.azurewebsites.net/FoodList/" data-width="100%" data-numposts="5"></div>
            <footer>
                  <div className = "translateBar" id="google_translate_element"></div>
                    <p> Copyright &copy; 2019 FeedMe Inc. All rights reserved</p>
                </footer>
            </div>
        );
  }
}