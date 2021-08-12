import React,{Component} from "react";

class UpdateControl extends Component{//create update delete 기능 
    render(){
        return(
            <div className="mx-60">
            <table className="w-full"> 
                <tbody className="">
                    <tr className="">
                        <td className="flex w-full justify-end">
                            <button className="p-3 py-2 mr-3 bg-gray-800 text-white rounded"value="agree" onClick={function(e){
                                var a='agree';
                                e.preventDefault();
                                this.props.onchangeMode(a);
                            }.bind(this)}>청원 동의하기</button>
                            <button className="p-3 py-2 mr-3 bg-gray-100 border-2 rounded hover:bg-gray-800 hover:text-white" value="update" onClick={function(e){
                                var mode='update';
                                e.preventDefault();
                                this.props.onchangeMode(mode);
                            }.bind(this)}>글 수정하기 </button>
                            <button className="p-3 py-2 mr-3 bg-gray-100 border-2 rounded hover:bg-gray-800 hover:text-white" value="delete" onClick={function(e){
                                var a='delete';
                                e.preventDefault();
                                this.props.onchangeMode(a);
                            }.bind(this)}>글 삭제하기</button>
                            <a href="/post" className="p-3 py-2 bg-gray-100 border-2 rounded hover:bg-gray-800 hover:text-white" onClick={function(e){
                                var a='post';
                                e.preventDefault();
                                this.props.onchangeMode(a);
                            }.bind(this)}>글 목록</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>

      
         );
       
    }
}

export default UpdateControl;