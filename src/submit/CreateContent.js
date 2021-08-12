import React,{Component} from "react";

class CreateContent extends Component{
    render(){
        return(
            <article className ="mx-80 p-5 flex flex-col justify-center items-center mt-20">
                <h2 className = "w-full mb-16 font-medium text-2xl">
                    <div>
                        청원 하기
                    </div>
                    <div className="mt-6 border-b-2 border-gray-800">
                    </div>
                </h2>
                <form className = "w-full flex flex-col" method="post"
                    onSubmit={function(e){
                      
                        e.preventDefault();
                        
                        this.props.onSubmit(
                            e.target.selectBox.value,
                            e.target.title.value,
                            e.target.desc.value
                        );
                      
                    }.bind(this)}
                >   
                  
                        <p className="mb-2 font-medium text-lg">청원 분야</p >
                        <select className="p-3 bg-gray-100 border-2 border-gray-200 shadow-inner mb-16 hover:border-gray-400 focus:border-gray-200" name="selectBox">
                            <option value="기숙사">기숙사</option>
                            <option value="교육">교육</option>
                            <option value="편의시설">편의시설</option>
                            <option value="인권">인권</option>
                            <option value="학생">학생</option>
                            <option value="복지">복지</option>
                            <option value="기타">기타</option>
                        </select>
                    

                    
                        <p  className="mb-2 font-medium text-lg">청원 제목</p >
                        <input
                        className="p-3 bg-gray-100 border-2 border-gray-200 shadow-inner mb-16 hover:border-gray-400 focus:border-gray-200" 
                        type="text" 
                        name="title" 
                        placeholder="제목을 입력해주세요"
                        >

                        </input>
                
                        <p  className="mb-2 font-medium text-lg">청원 내용</p >
                        <textarea className="p-3 bg-gray-100 border-2 border-gray-200 h-96 shadow-inner mb-5 hover:border-gray-400 focus:border-gray-200" name="desc" placeholder="청원 내용을 입력해주세요" ></textarea>
                    
                        <div className="my-6 border-b-2 border-gray-800"></div>

                        <p className="flex justify-end">
                            <input
                                className="p-3 py-2 mr-3 border-2 bg-gray-800 text-white" 
                                type="submit"
                                value="작성 완료">
                            </input>
                            <button className="p-3 py-2 border-2 hover:bg-gray-800 hover:text-white" value="cancel" onClick={function(e){
                                    var a='post';
                                    e.preventDefault();
                                    this.props.onCancel(a);
                                }.bind(this)}>작성 취소
                            </button>
                       </p>
                    
                </form>
            </article>
        );
    }
}


export default CreateContent;