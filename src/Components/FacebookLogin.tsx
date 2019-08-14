import {Component} from 'react';
import * as React from 'react';
import FacebookLog from 'react-facebook-login';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import{Col,Row} from 'react-bootstrap';

export default class FacebookLogin extends Component{
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: '',
        open: false,

    }

    responseFacebook = (response:any) => {
        console.log(response);
    }

    componentClicked = () => console.log("clicked");

    /*render(){
        let fbContent;
        if(this.state.isLoggedIn){
            fbContent = null;
        } else {
            fbContent = (<FacebookLog
            appId="342211216686706"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback= {this.responseFacebook} />);
        }

        return(
            <div>{fbContent}</div>
        )
    }
}*/
public render() {

    let fbContent;

    if(this.state.isLoggedIn){
      fbContent=(
        <React.Fragment>
          <Row>
            <Col>
              <img src={this.state.picture} alt ={this.state.name} style={{marginLeft:93}}/>
            </Col>
          </Row>
          <Row>
            <Col>
              Welcome {this.state.name}
            </Col>
          </Row>
        </React.Fragment>
      )
    } else{
      fbContent=(<FacebookLog
        appId="342211216686706"
        autoLoad={true}
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook} />)
    }
      return (
          <React.Fragment>
            <Dialog open={this.props.open} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Login with Facebook</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <div>
                    {fbContent}
                  </div>
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button 
                   onClick= {() => { this.props.setOpen(false);this.props.addUser()}}  color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>

      )
  }

}