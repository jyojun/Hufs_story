import React,{Component} from "react";
import "./read.css";
class ReadContent extends Component{
    render(){
        return(
            <article className="article_box">
                <div className="article_title">
                    <h2>{this.props.title}</h2>
                </div>
                <div className="article_header">
                    <ul>
                        <li>
                            <div className="status_box">카테고리</div>
                            <p>{this.props.category}</p>
                        </li>
                        <li>
                            <div className="status_box">청원 마감</div>
                            <p>{this.props.expire}</p>
                        </li>
                        <li>
                            <div className="status_box">참여 인원</div>
                            <p>{this.props.agree}명</p>
                        </li>
                        <li>
                            <div className="status_box">진행 상태</div>
                            <p>청원 진행중</p>
                        </li>
                    </ul>
                </div>

                <h2 className="article_content_title">청원 내용</h2>
                <div className="article_content">
                    
               
                    <p>{this.props.desc}</p>
                    <p></p>
                   
                </div>
                
            
            </article>
        );
    }
}

export default ReadContent;