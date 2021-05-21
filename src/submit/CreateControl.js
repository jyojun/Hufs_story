import React,{Component} from "react";

class CreateControl extends Component{//create update delete 기능 
    render(){
        return(
            <table className="control-table"> 
                <tbody>
                    <tr >
                        <td><a href="/create" className='create-control' onClick={function(e){
                            e.preventDefault();
                            var a='create';
                            this.props.onchangeMode(a);
                        }.bind(this)}>청원하기</a></td>
                    </tr>
                </tbody>
            </table>
      
         );
       
    }
}

export default CreateControl;