import React,{Component} from "react";
import "./read.css";
class ReadContent extends Component{
    render(){
        
        return(
            <article className="article_box">
                <div className="article_title">
                    <h2>{this.props.title}</h2>
                </div>
                <div className="article_content">
                    <p></p>
                    <h3>청원 내용</h3>
                    <p></p>
                    {this.props.desc}
                </div>
    
            
            </article>
        );
    }
}

export default ReadContent;