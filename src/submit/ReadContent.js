import React,{Component} from "react";

class ReadContent extends Component{
    render(){
        return(
            <article className="mx-60 my-20 py-20 px-20 flex flex-col justify-center items-center border-2 rounded">
                <div className="text-4xl mb-10 text-center w-full font-bold">
                    <h2>{this.props.title}</h2>
                </div>
                <div className="w-full mb-10 text-lg border-2 border-gray-300 rounded">
                    <ul className="flex justify-between bg-gray-200 py-5">
                        <li className="flex pl-10">
                            <div className="font-bold mr-3">카테고리</div>
                            <p>{this.props.category}</p>
                        </li>
                        <li className="flex">
                            <div className="font-bold mr-3">청원 마감</div>
                            <p>{this.props.expire}</p>
                        </li>
                        <li className="flex">
                            <div className="font-bold mr-3">참여 인원</div>
                            <p>{this.props.agree}명</p>
                        </li>
                        <li className="flex pr-10">
                            <div className="font-bold mr-3">진행 상태</div>
                            <p>청원 진행중</p>
                        </li>
                    </ul>
                </div>

                <h2 className="w-full font-bold text-2xl border-b-2 mb-5">
                    <div className="mb-2">
                        청원 내용
                    </div>
                </h2>
                <div className="w-full h-96 font-medium text-gray-800">
                    
               
                    <p className="">{this.props.desc}</p>
                    <p></p>
                   
                </div>
                
            
            </article>
        );
    }
}

export default ReadContent;