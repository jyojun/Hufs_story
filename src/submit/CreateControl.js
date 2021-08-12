import React,{Component} from "react";

class CreateControl extends Component{//create update delete 기능 
    render(){
        return(
            <a href="/create" className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded" onClick={function(e){
                e.preventDefault();
                var a='create';
                this.props.onchangeMode(a);
            }.bind(this)}>
                청원하기
            </a>
         );
       
    }
}

export default CreateControl;