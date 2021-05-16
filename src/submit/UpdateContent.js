import React,{Component} from "react";

class UpdateContent extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.data.id,
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
        console.log(selected_options);
        return(
            <article className = "writing-form">
                <h2 className = "form-title">작성한 청원글 수정하기</h2>
                <form className = "form-content" method="post"
                    onSubmit={function(e){
                      
                        e.preventDefault();
                        
                        this.props.onSubmit(
                            this.state.id,
                            this.state.category,
                            this.state.title,
                            this.state.desc
                        );
                        document.getElementById('')
                    }.bind(this)}
                >   
                    <input type="hidden" name="id" value={this.state.id}></input>
                    <p>
                        <select name="selectBox" defaultValue={this.state.category} onChange={this.inputFormHandler.bind(this)}>
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