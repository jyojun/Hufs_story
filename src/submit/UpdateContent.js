import React,{Component} from "react";

class UpdateContent extends Component{
    constructor(props){
        super(props);
        this.state={
       
            category:this.props.data.category,
            title:this.props.data.title,
            desc:this.props.data.desc
        }
       
    }
    inputFormHandler(e){
 
        this.setState({[e.target.name]:e.target.value});
    }
    render(){
        var i = 0;
        var selected_options = [['기숙사', false], ['교육', false], ['편의시설', false], ['인권', false], ['학생', false], ['복지', false], ['기타', false]]

        while(i < 7){
            if(this.state.category === selected_options[i][0]){
                selected_options[i][1] = true;
                break;
            }
            i = i + 1;
        }
        return(
            <article className = "mx-80 p-5 flex flex-col justify-center items-center mt-20">
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
                            //this.state.id,
                            this.state.category,
                            this.state.title,
                            this.state.desc
                        );
                        document.getElementById('')
                    }.bind(this)}
                >   
                    <input type="hidden" name="id" value={this.state.id}></input>
                    
                    <p className="mb-2 font-medium text-lg">청원 분야</p >
                    <select
                    className="p-3 bg-gray-100 border-2 border-gray-200 shadow-inner mb-16 hover:border-gray-400" 
                    name="selectBox" 
                    defaultValue={this.state.category}
                    style={{width:'60%'}}
                    onChange={this.inputFormHandler.bind(this)} 
                    >

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
                        className="p-3 bg-gray-100 border-2 border-gray-200 shadow-inner mb-16 hover:border-gray-400"
                        type="text"
                        name="title"
                        placeholder="제목을 입력해주세요"
                        value={this.state.title}
                        onChange={this.inputFormHandler.bind(this)}
                    ></input>

                    <p  className="mb-2 font-medium text-lg">청원 내용</p >
                    <textarea 
                        className="p-3 bg-gray-100 border-2 border-gray-200 h-96 shadow-inner mb-5 hover:border-gray-400"
                        name="desc" 
                        placeholder="청원 내용을 입력해주세요"
                        value={this.state.desc}  
                        onChange={this.inputFormHandler.bind(this)}
                    ></textarea>
                    <div className="my-6 border-b-2 border-gray-800"></div>
                    <p className="flex justify-end">
                        <input
                        className="p-3 py-2 border-2 bg-gray-800 text-white rounded" 
                        type="submit"
                        value="수정 완료"
                        ></input>
                        
                    </p>
                </form>
            </article>
        );
    }
}


export default UpdateContent;