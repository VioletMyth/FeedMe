
import * as React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Typography, Button, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
// import DeleteIcon from '@material-ui/icons/Delete';
import UpdateRow from './UpdateRow';
import "./FoodList.css";

interface IState {
    open: boolean;
    likes: number;
}
interface IProps {
    topic: any,
    refresh: any
}
class FoodItem extends React.Component<IProps, IState>
{
    constructor(props: IProps) {
        super(props);
        this.state = {
            open: false,
            likes: 0,
        }
    }

    public toggleOpen = () => {
        this.setState((prevState: any) => { return {
            open: !prevState.open
        }});
    }

    public incrementLikes = () => {
        this.setState({likes: this.state.likes + 1})
    }


    render() {
        return(
            <Row className = "rowEntry" style={{alignItems: "center"}}>
            <Col md = {3}>
                <img className = "rowImages" src = {this.props.topic.img_url} alt = "Food picture" />
            </Col>
            <Col md = {9}>
                <div>
                <h3><b>{this.props.topic.title}</b></h3>
                <br/>
                <p>Date and time eaten: {this.props.topic.date}</p>
                <p>Restaurant: {this.props.topic.restraunt}</p>
                <p>Address: {this.props.topic.address}</p>
                <p>Description: {this.props.topic.description}</p>
                <div className = "rating_component" style={{justifyContent: 'center'}}>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend" align='center'>Re-eatability</Typography>
                    <Rating 
                        style = {{justifyContent: "center"}}
                        name="simple-controlled"
                        value={this.props.topic.rating}
                    />
                    </Box>
                    </div>
                    <div style = {{textAlign: 'center'}}>
                    <Button onClick = {this.toggleOpen}> Edit </Button>
                    <Button onClick = {this.incrementLikes}> Like {this.state.likes}</Button>
                    </div>

                    <UpdateRow refresh = {this.props.refresh} currentInfo = {this.props.topic} open = {this.state.open} toggleOpen = {this.toggleOpen}/>

                    
                </div>
            </Col>
            </Row>
        )
    }
}
export default FoodItem;