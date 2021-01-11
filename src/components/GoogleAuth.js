import React from 'react';
import { connect } from 'react-redux';
//hooking actions with GoogleAuth Component
import { signIn,signOut} from '../actions'

class GoogleAuth extends React.Component{
    //we are putting null bcz we do not know if the user is signed in or not 
    // state ={ isSignedIn:null}

    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'1054594410587-c71v3ibp2bpq3t3dn7ek13uu5v06krt4.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth =window.gapi.auth2.getAuthInstance();
                //we are going to update our component level state with isSignedIn
                // this.setState({ isSignedIn :this.auth.isSignedIn.get()})
                //TODO not clear logic
                this.onAuthChange(this.auth.isSignedIn.get())
                //this will listen when google auth instance is being changed to different state
                //such as signed in or signed out
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    onAuthChange=(isSignedIn)=>{
            // this.setState({ isSignedIn:this.auth.isSignedIn.get()})
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());

        } else{
            this.props.signOut();
        }

    };

    onSignInClick =()=>{
        this.auth.signIn();
    }

    onSignOutClick =()=>{
        this.auth.signOut();
    }

    renderAuthButton (){
        if(this.props.isSignedIn === null){
            return null;
        }else if (this.props.isSignedIn){
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

const mapStateToProps =(state)=>{
    return { isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps,{ signIn,signOut})(GoogleAuth);