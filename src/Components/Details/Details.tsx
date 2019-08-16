
import {TextField} from '@material-ui/core'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import * as React from 'react';
import './Details.css';
import logo from './logo.png';


interface IState{
    address: string,
    date: string
    title: string,
    rating: number,
    restraunt: string,
    description: string,
    image: any,
    resultString: string,
    filelen: any,
    result: any,
    filelength: any,
    imageFiles: any,
    dropzone: any
}

export default class Details extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = {
            address: "",
            date: "",
            description: "",
            rating: 0,
            restraunt: "",
            title: "",
            image: null,
            result: null,
            resultString: "",
            filelength: null,
            filelen: null,
            dropzone: "",
            imageFiles: null
            
        }
    };


    public resultstate = (resultString:string,filelen:any) => {
        this.setState({result:resultString,filelength:filelen})
      }

    public render(){
        return(
            <div className = "everything">
                <header className="FoodList-header">
                <h1 className="FoodList-Title" style={{lineHeight: "90px"}}>FeedMe<a href = "https://feedmefrontend.azurewebsites.net/FoodList"><img className = "logoNav" src = {logo} alt = "FeedMe Logo" height="80px"/></a></h1>
                
                
                </header>
                <div style = {{textAlign: "center", padding: "20px"}}>
                <input type="file" onChange={this.handleFileUpload} className="form-control-file" id="image-input"/>

                <TextField
                id="outlined-uncontrolled"
                label="Title"
                margin="normal"
                variant="outlined"
                value= {this.state.title}
                onChange={ (e) => this.onChangeInput(e, "title")}
                /> <br/> 


                <form className={"date"} noValidate = {true}>
                    <TextField
                        id="datetime-local"
                        label="Date and time when eaten"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        onChange={ (e) => this.onChangeInput(e, "date")}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </form>


                <TextField
                id="outlined-uncontrolled"
                label="Restaurant name"
                margin="normal"
                variant="outlined"
                value = {this.state.restraunt}
                onChange={ (e) => this.onChangeInput(e, "restraunt")}
                />

                <br/>

                <TextField
                id="outlined-uncontrolled"
                label="Address"
                margin="normal"
                variant="outlined"
                value = {this.state.address}
                onChange={ (e) => this.onChangeInput(e, "address")}
                />

                <br/>

                <TextField
                id="outlined-uncontrolled"
                label="Description"
                multiline = {true} 
                margin="normal"
                variant="outlined"
                value={this.state.description}
                onChange={ (e) => this.onChangeInput(e, "description")}
                rowsMax="4"
                />

                <br/>
                <div className = "rating_component">
                    <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">Re-eatability</Typography>
                    <Rating 
                        style = {{justifyContent: "center"}}
                        name="simple-controlled"
                        value={this.state.rating}
                        onChange = {(e) => this.onChangeInput(e, "rating")}
                    />
                    </Box>                    
                    </div> 

                <Button onClick={this.onSubmit} className={"submit-button"}>
                    Submit
                </Button>
                </div>
                
                <footer> 
                    <div className = "translateBar" id="google_translate_element"></div>
                    <p> Copyright &copy; 2019 FeedMe Inc. All rights reserved</p>
                </footer>
            </div>
            
                     )
        }

    private onChangeInput = (e:any, type: string) => {
        switch (type){
            case "title":
                return(this.setState({title: e.target.value}));
            case "description":
                return(this.setState({description: e.target.value}));
            case "rating":
                return(this.setState({rating: e.target.value}));
            case "restraunt":
                return(this.setState({restraunt: e.target.value}));
            case "date":
                return(this.setState({date: e.target.value}));
            case "address":
                return(this.setState({address: e.target.value}));
        }
    }
	private handleFileUpload = (fileList: any) => {
		this.setState({
			imageFiles: fileList.target.files
		})
	}

    private onSubmit =(b64string:any)=>{
        const formData = new FormData()
         formData.append("title", this.state.title)
         formData.append("address",this.state.address )
         formData.append("Image",this.state.imageFiles[0])
         formData.append("date", this.state.date)
         formData.append("description", this.state.description)
         formData.append("rating", this.state.rating.toString())
         formData.append("restraunt", this.state.restraunt)

        fetch("https://feedmeapidevops.azurewebsites.net/api/Details/upload", {
            body: formData,
            headers: {
                Accept: "text/plain"
                // "Content-Type": "multipart/form-data",
            },
            method: "POST"
        })
        .then((response: any) => {
            // console.log
            if (response.ok){
                alert("Details uploaded");
                location.reload();
            } else {
                console.log(response);
                alert("You are missing one or more fields")
            }
        })
    }
}