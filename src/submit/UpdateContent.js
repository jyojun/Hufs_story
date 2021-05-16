import React,{Component} from "react";

class UpdateContent extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.data.id,
            title:this.props.data.title,
            desc:this.props.data.desc
        }
       
    }
    inputFormHandler(e){
 
        this.setState({[e.target.name]:e.target.value});
    }
    render(){
        console.log(this.props.data);
        return(
            <article className = "writing-form">
                <h2 className = "form-title">작성한 청원글 수정하기</h2>
                <form className = "form-content" method="post"
                    onSubmit={function(e){
                      
                        e.preventDefault();
                        
                        this.props.onSubmit(
                            this.state.id,
                            e.target.selectBox.value,
                            this.state.title,
                            this.state.desc
                        );
                        alert("submit");
                    }.bind(this)}
                >   
                    <input type="hidden" name="id" value={this.state.id}></input>
                    <p>
                        <select name="selectBox" onChange={this.inputFormHandler.bind(this)}>
                            <option value="기숙사">기숙사</option>
                            <option value="교육">교육</option>
                            <option value="편의시설">편의시설</option>
                            <option value="인권">인권</option>
                            <option value="학생">학생</option>
                            <option value="복지">복지</option>
                            <option value="기타">기타</option>
                        </select>
                    </p>
                    <p><input 
                            type="text"
                            name="title"
                            placeholder="title"
                            value={this.state.title}
                            onChange={this.inputFormHandler.bind(this)}
                        ></input></p>
                    <p>
                        <textarea 
                            name="desc" 
                            placeholder="description"
                            value={this.state.desc}  
                            onChange={this.inputFormHandler.bind(this)}
                        ></textarea>
                    </p>
                    <p>
                        <input type="submit"></input>
                    </p>
                </form>
            </article>
        );
    }
}


export default UpdateContent;