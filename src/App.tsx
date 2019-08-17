import * as React from 'react';
import './App.css';
import Details from './Components/Details/Details'; 
import * as Webcam from "react-webcam";
import Col from 'react-bootstrap/Col';


interface IState{
  refCamera: any;
  authenticated: any;
  predictionResult: any;
}


class App extends React.Component<{}, IState> {
  public constructor(props: any){
    super(props);
    this.state = {
      refCamera: React.createRef(),
      predictionResult: null,
      authenticated: false,
    }
    this.authenticate = this.authenticate.bind(this)
  }

  // public resultstate = (resultString:string,filelen:any) => {
    // this.setState({result:resultString,filelength:filelen})
  // }



  public render() {
    const { authenticated } = this.state
    return (
            <div>
                {(!authenticated) ?
                <div style = {{textAlign: "center"}}>
                      <Col md={4}>
                        <Webcam
                            audio={false}
                            screenshotFormat="image/jpeg"
                            ref={this.state.refCamera}
                            style = {{textAlign: "center"}}
                        />
                        <div className="row nav-row" style = {{justifyContent: "center", width: "auto"}}>
                            <div className="btn btn-primary bottom-button" onClick={this.authenticate} style = {{backgroundColor:"yellow", color: "black", borderColor: "black"}}>Login to FeedMe</div>
                        </div>
                        </Col>
                    </div>
                    : ""}
            {(authenticated) ?
              <div className="App">
                <header className="App-header">
            
                </header>
                <Details />
                
              </div>
              :""}
              </div>

    );
  }
        private authenticate() {
          const screenshot = this.state.refCamera.current.getScreenshot();
          this.getFaceRecognitionResult(screenshot);
        }
        
        private getFaceRecognitionResult(image: string) {
          const url = "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/d165ebc0-0556-4f65-8fad-e83525453734/classify/iterations/Iteration3/image"
          if (image === null) {
              return;
          }
          const base64 = require('base64-js');
          const base64content = image.split(";")[1].split(",")[1]
          const byteArray = base64.toByteArray(base64content);
          fetch(url, {
              body: byteArray,
              headers: {
                  'cache-control': 'no-cache', 'Prediction-Key': '5bc3507c167a40558aa87b56ddcce69d', 'Content-Type': 'application/octet-stream'
              },
              method: 'POST'
          })
              .then((response: any) => {
                  if (!response.ok) {
                      // Error State
                      alert(response.statusText)
                  } else {
                      response.json().then((json: any) => {
                          console.log(json.predictions[0])
        
                          this.setState({ predictionResult: json.predictions[0] })
                          if (this.state.predictionResult.probability > 0.7) {
                              this.setState({ authenticated: true })
                          } else {
                              this.setState({ authenticated: false })
                              console.log(json.predictions[0].tagName)
                          }
                      })
                  }
              });
        }
}


export default App;
