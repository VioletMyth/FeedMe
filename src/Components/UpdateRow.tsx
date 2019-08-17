import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Box, Typography } from "@material-ui/core";
import * as React from 'react';
import Rating from '@material-ui/lab/Rating';

interface IProps {
    open: boolean,
    toggleOpen: any;
    currentInfo: any,
    refresh: any,
}

interface IState {
    rating: any
}
class UpdateRow extends React.Component<IProps, IState>
{
    constructor(props: IProps) {
        super(props);
        this.state = {
            rating: this.props.currentInfo.rating
        };
    }

    public updateFoodItem = () => {

        const titleElement = document.getElementById("title") as HTMLInputElement;
        const addressElement = document.getElementById("address") as HTMLInputElement;
        const dateElement = document.getElementById("date") as HTMLInputElement;
        const restaurantElement = document.getElementById("restaurant") as HTMLInputElement;
        const descriptionElement = document.getElementById("description") as HTMLInputElement;
    
        const body = {
            address: addressElement.value,
            date: dateElement.value,
            description: descriptionElement.value,
            id:  this.props.currentInfo.id,
            img_url: this.props.currentInfo.img_url,
            rating:this.state.rating.toString(),
            restraunt: restaurantElement.value,
            title: titleElement.value
        }


       fetch("https://feedmeapidevops.azurewebsites.net/api/Details/" + this.props.currentInfo.id, {
           body: JSON.stringify(body),
           headers: {
               Accept: "application/json",
               "Content-Type": "application/json-patch+json"
            //    "Content-Type": "multipart/form-data",
           },
           method: "PUT"
       })
       .then((response: any) => {
           // console.log
           if (response.ok){
               alert("Details uploaded");
               this.props.refresh();
           } else {
               console.log(response);
               alert("Error")
           }
       })
    }

    public deleteFoodItem = () => {
    fetch("https://feedmeapidevops.azurewebsites.net/api/Details/" + this.props.currentInfo.id, {
        method: "DELETE"
    })
    .then((response: any) => {
        // console.log
        if (response.ok){
            alert("delete uploaded");
            this.props.refresh();
        } else {
            console.log(response);
            alert("Error")
        }
    })
    }

    render() {
        return(
            <Dialog open={this.props.open} onClose={this.props.toggleOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Details</DialogTitle>
            <DialogContent>
            <TextField
                id="title"
                label="Title"
                margin="normal"
                variant="outlined"
                defaultValue = {this.props.currentInfo.title}
                /> <br/> 


                <form className={"date"} noValidate = {true}>
                    {console.log(this.props.currentInfo.date)}
                    <TextField
                        id="date"
                        label="Date and time when eaten"
                        type="datetime-local"
                        defaultValue={this.props.currentInfo.date == null ? this.props.currentInfo.date : "2017-05-24T10:30"}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </form>

                <br/>

                <TextField
                id="restaurant"
                label="Restaurant name"
                margin="normal"
                variant="outlined"
                defaultValue = {this.props.currentInfo.restraunt}
                />

                <br/>

                <TextField
                id="address"
                label="Address"
                margin="normal"
                variant="outlined"
                defaultValue = {this.props.currentInfo.address}
                />

                <br/>

                <TextField
                id="description"
                label="Description"
                multiline = {true} 
                margin="normal"
                variant="outlined"
                defaultValue = {this.props.currentInfo.description}
                rowsMax="4"
                />

            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend" style = {{textAlign: "center"}}>Re-eatability</Typography>
                <Rating 
                    style = {{justifyContent: "center"}}
                    name="simple-controlled"
                    value={this.state.rating}
                />
                </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.toggleOpen} color="primary">
                Cancel
              </Button>
              <Button onClick={this.updateFoodItem} color="primary">
                Update
              </Button>
              <Button onClick = {this.deleteFoodItem}> Delete </Button>
            </DialogActions>
          </Dialog>
          
        )
    }
}
export default UpdateRow;