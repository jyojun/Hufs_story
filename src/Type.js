import React, { Component } from "react";

class Type extends Component{
  
    render(){
        var lists=[];
        var data=this.props.data;
        var i=0;
        while(i<data.length){
            lists.push(
                <td className='table-column' key={data[i].id}>
                <a 
                href={"/content/"+data[i].id}
                data-id={data[i].id}
                onClick={function(e){
                    //console.log(e.target.dataset);
                    e.preventDefault();
                    //console.log(e.target.text);
                    this.props.onchangePage(e.target.text);
                }.bind(this)}
                >
                {data[i].desc}
                </a>
                </td>
            )
            i=i+1;
        }
        return(
            <table className="table"> 
                <tbody>
                    <tr className='table-row'>
                        {lists}
                    </tr>
                </tbody>
            </table>

        );
    }
};

export default Type;