import React from 'react';


class GoogleAuth extends React.Component{
    //we are putting null bcz we do not know if the user is signed in or not 
    state ={ isSignedIn:null}

    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'1054594410587-c71v3ibp2bpq3t3dn7ek13uu5v06krt4.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth =window.gapi.auth2.getAuthInstance();
                //we are going to update our component level state with isSignedIn
                this.setState({ isSignedIn :this.auth.isSignedIn.get()})
                //this will listen when google auth instance is being changed to different state
                //such as signed in or signed out
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    onAuthChange=()=>{
            this.setState({ isSignedIn:this.auth.isSignedIn.get()})
    };

    onSignInClick =()=>{
        this.auth.signIn();
    }

    onSignOutClick =()=>{
        this.auth.signOut();
    }

    renderAuthButton (){
        if(this.state.isSignedIn === null){
            return null;
        }else if (this.state.isSignedIn){
            return (<button  onClick={this.onSignOutClick} className="ui red google button"><i className="google icon"/>Sign Out</button>)
        }else{
            return (<button  onClick={this.onSignInClick} className="ui green google button">
                        <i className="google icon"/>Sign-In</button>)
        }
    }

    render(){

        return(<div>{this.renderAuthButton()}</div>)
    }
}


export default GoogleAuth;