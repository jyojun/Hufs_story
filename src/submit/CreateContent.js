import React,{Component} from "react";

class CreateContent extends Component{
    render(){
        return(
            <article className = 'writing-form'>
                <h2 className = "form-title">청원글 작성하기</h2>
                <form className = "form-content" method="post"
                    onSubmit={function(e){
                      
                        e.preventDefault();
                        
                        this.props.onSubmit(
                            e.target.selectBox.value,
                            e.target.title.value,
                            e.target.desc.value
                        );
                        //console.log(e.target[0].value, e.target[1].value, e.target[2].value);
                        //alert("submit");
                    }.bind(this)}
                >   
                    <p>
                        <select name="selectBox">
                            <option value="기숙사">기숙사</option>
                            <option value="교육">교육</option>
                            <option value="편의시설">편의시설</option>
                            <option value="인권">인권</option>
                            <option value="학생">학생</option>
                            <option value="복지">복지</option>
                            <option value="기타">기타</option>
                        </select>
                    </p>
                    <p><input type="text" name="title" placeholder="title"></input></p>
                    <p>
                        <textarea name="desc" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit"></input>
                    </p>
                </form>
            </article>
        );
    }
}


export default CreateContent;