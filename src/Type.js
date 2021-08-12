import React, { Component } from "react";
import { list } from "postcss";

class Type extends Component{
  
    render(){
        var lists=[];
        var data=this.props.data;
        var i=0;
        while(i<data.length){
            if(i==0){
                lists.push(
                    <div className='bg-gray-100 w-full py-3' key={data[i].id}>
                    <a 
                    class="px-3"
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
                    </div>
                )
            }
            else{
                lists.push(
                    <div className='hover:bg-gray-200 w-full hover:bg-opacity-50 py-3' key={data[i].id}>
                    <a 
                    class="px-3"
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
                    </div>
                )
            }
            i=i+1;
        }
        return(
            <div class="mx-40 my-20 flex flex-col items-center justify-around bg-center bg-cover">
                <div class="w-full px-4 md:px-4 py-4 md:py-7">
                    <h2 class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">청원 분야별 보기</h2>
                </div>
                
                <div class="text-blue-900 w-full flex justify-between border-2 border-gray-500 p-5">
                    {
                        lists
                    }
                </div>
            </div>
        );
    }
};

export default Type;