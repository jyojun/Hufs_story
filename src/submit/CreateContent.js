import React,{Component} from "react";

class CreateContent extends Component{
    render(){
        return(
            <article className = 'writing-form'>
                <h2 className = "form-title">청원하기</h2>
                <hr className="Tline"></hr>
                <form className = "form-content" method="post"
                    onSubmit={function(e){
                      
                        e.preventDefault();
                        
                        this.props.onSubmit(
                            e.target.selectBox.value,
                            e.target.title.value,
                            e.target.desc.value
                        );
                      
                    }.bind(this)}
                >   
                  
                        <p className="createFont">청원 분야</p >
                        <select name="selectBox" style={{width:'90%'}}>
                            <option value="기숙사">기숙사</option>
                            <option value="교육">교육</option>
                            <option value="편의시설">편의시설</option>
                            <option value="인권">인권</option>
                            <option value="학생">학생</option>
                            <option value="복지">복지</option>
                            <option value="기타">기타</option>
                        </select>
                    

                    
                        <p  className="createFont">청원 제목</p >
                        <input type="text" 
                        name="title" 
                        placeholder="제목을 입력해주세요"
                        style={{width:'90%'}}
                        >

                        </input>
                
                        <p  className="createFont">청원 내용</p >
                        <textarea name="desc" placeholder="청원 내용을 입력해주세요" style={{width:'90%',height:'437px'}} ></textarea>
                    

                       <p>
                        <input type="submit"
                            value="작성 완료"
                            style={{backgroundColor:' #013642',color:'white'}}
                            ></input>
                            <button value="cancel" onClick={function(e){
                                    var a='post';
                                    e.preventDefault();
                                    this.props.onCancel(a);
                                }.bind(this)}>작성 취소</button>
                       </p>
                    
                </form>
            </article>
        );
    }
}


export default CreateContent;