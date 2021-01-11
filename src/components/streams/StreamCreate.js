import React from 'react';
import { Field,reduxForm} from 'redux-form';

class StreamCreate extends React.Component{

    renderError=({ error,touched})=>{

        if(touched && error){
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }



    renderInput=({input,label,meta})=>{
        //console.log(formProps)
        // return (<input 
        //     // onChange={formProps.input.onChange}
        //     // value={formProps.input.value}
        //     {...input}
        // />);

        // console.log(meta)

        const className=`field ${meta.error && meta.touched ?'error':''}`
        return( <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {/* <div>{meta.error}</div> */}
                {this.renderError(meta)}
        </div>)
    }

    onSubmit(formvalues){
        console.log(formvalues)

    }

    render(){
        // console.log(this.props)
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error ">
                <Field name="title" component={this.renderInput} label ="Enter Title"/>
                <Field name="description" component={this.renderInput} label={"Enter Description"}/>
                <button className="button ui primary">Submit</button>

            </form>
        ) 

    }
}

const validate =(formValues)=>{
    const errors ={};
    if(!formValues.title){
        //only ran if the user did not enter the title
        errors.title='You must enter a title';
    }

    if(!formValues.description){
        errors.description='You must enter a description'
    }


    return errors;

}


export default reduxForm({
    form:'streamCreate',
    validate
})(StreamCreate);