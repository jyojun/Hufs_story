import React, { Component } from "react";

class Type extends Component{
  
    render(){
        var lists=[];
        var data=this.props.data;
        var i=0;
        while(i<data.length){
            lists.push(
                <li className='category_link' key={data[i].id}>
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
                </li>
            )
            i=i+1;
        }
        return(
            <div class="category_div">
                <h2>청원 분야별 보기</h2>
                <ul class="category_area">
                    {
                        lists
                    }
                </ul>
            </div>
        );
    }
};

export default Type;