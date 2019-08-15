import * as React from 'react';
import {TextField} from '@material-ui/core'

interface IState{
    isAdmin: any,
    userName: any,
    password: any,
}

export default class loginForm extends React.Component<IState>{
    constructor(props : any){
        super(props);
        this.state = {
            isAdmin: false,
            userName: "",
            password: ""
        }

    };

    public Authenticate = (userName: string, password: string) =>{
        if(userName === "admin" && password === "admin"){
            this.setState({isAdmin: true})
        }
    }

    public render(){
        return(
        <div>
        <TextField
        id="outlined-uncontrolled"
        label="Title"
        margin="normal"
        variant="outlined"
        value= {"Enter username"}
        onChange={ (e) => this.onChangeInput(e, "username")}
        />

        <TextField
        id="outlined-uncontrolled"
        label="Title"
        margin="normal"
        variant="outlined"
        value= {"Enter password"}
        onChange={ (e) => this.onChangeInput(e, "password")}
        />
        </div>
            
        )
    }

    private onChangeInput = (e:any, type: string) => {
        switch (type){
            case "username":
                return(this.setState({title: e.target.value}));
            case "password":
                return(this.setState({description: e.target.value}));
}
