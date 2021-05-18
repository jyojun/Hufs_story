import React, { Component } from "react";
import { Link } from "react-router-dom";
import CreateControl from "./submit/CreateControl";
import UpdateControl from "./submit/UpdateControl";
import CreateContent from "./submit/CreateContent";
import PostContent from "./submit/PostContent";
import ReadContent from "./submit/ReadContent";
import UpdateContent from "./submit/UpdateContent";
import ArticleTableHead from './table/ArticleTableHead';
import ArticleTableBody from './table/ArticleTableBody';
import Type from "./Type";
import "./table/Table.css";


class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            max_content_id:4,//전체 게시물 번호 매김
            mode:'post',
            selected_content_id:0,//선택된 게시글 번호
            selected_type_id:0,//카테고리 id
            selected_category: "전체",
            type:[
                {id:0,title:"total",desc:'전체'},
                {id:1,title:"dormitory",desc:"기숙사"},
                {id:2,title:"education",desc:"교육"},
                {id:3,title:"facility",desc:"편의시설"},
                {id:4,title:"human",desc:"인권"},
                {id:5,title:"student",desc:"학생"},
                {id:6,title:"welfare",desc:"복지"},
                {id:7,title:"etc",desc:"기타"}
            ],
            contents:[ // 보여지는 게시글 리스트 
                {id:0, category:'복지',title:'도서관 시설 관련 청원', expire:'2021-05-12', people_num:15, desc:"도서관 자리 늘려주세요!!"},
                {id:1, category:'기숙사',title:'기숙사 규칙 관련 청원', expire:'2021-05-12', people_num:15, desc:"기숙사 통금시간 늘려주세요!"},
                {id:2, category:'교육',title:'교육 제도 관련 청원', expire:'2021-05-12', people_num:15, desc:"교육 제도를 바꿔주세요!"},
                {id:3, category:'편의시설',title:'편의 시설 관련 청원', expire:'2021-05-12', people_num:15, desc:"식당 메뉴 다양화를 원합니다!"},
                {id:4, category:'학생',title:'학생 관련 청원', expire:'2021-05-12', people_num:15, desc:"학생 인권에 대해 생각해주세요!"}
            ],
            total_contents:[ // 전체글 리스트 
                {id:0, category:'복지',title:'도서관 시설 관련 청원', expire:'2021-05-12', people_num:15, desc:"도서관 자리 늘려주세요!!"},
                {id:1, category:'기숙사',title:'기숙사 규칙 관련 청원', expire:'2021-05-12', people_num:15, desc:"기숙사 통금시간 늘려주세요!"},
                {id:2, category:'교육',title:'교육 제도 관련 청원', expire:'2021-05-12', people_num:15, desc:"교육 제도를 바꿔주세요!"},
                {id:3, category:'편의시설',title:'편의 시설 관련 청원', expire:'2021-05-12', people_num:15, desc:"식당 메뉴 다양화를 원합니다!"},
                {id:4, category:'학생',title:'학생 관련 청원', expire:'2021-05-12', people_num:15, desc:"학생 인권에 대해 생각해주세요!"}
            ]
        }
    }
    getReadContent() {
        var i = 0;
        while(i < this.state.total_contents.length) {
            var data = this.state.total_contents[i];
            if(data.id === this.state.selected_content_id) {
                return data;
            }
            i = i + 1;
        }
    }
    render(){
        var _title,_desc,_article=null;

        var _type = //카테고리 분류 
            <Type onchangePage={function(category){
                var _category = category;
                var _contents = Array.from(this.state.total_contents);
                var category_contents = [];
                var i = 0;

                if(_category === "전체") {
                    category_contents = _contents;
                } else {
                    while(i < _contents.length) {
                        if(_contents[i].category === _category){
                            category_contents.push(_contents[i]);
                        }
                        i = i + 1;
                    }
                }
                    

                this.setState({
                mode:'post',
                //selected_type_id:Number(id),
                selected_category: _category,
                contents: category_contents
                });
                console.log(_category);
                }.bind(this)}
                data={this.state.type}/>

        var _table = 
            <>
                <div>
                    <table className = "table"> 
                        <ArticleTableHead headersName = {['글번호', '분류', '제목', '만료일', '청원인원']}></ArticleTableHead>
                        <ArticleTableBody data = {this.state.contents} onchangePage= {function(id){
                            this.setState({
                                mode:'read',
                                selected_content_id:Number(id)
                                });
                        }.bind(this)}></ArticleTableBody>
                    </table>
                </div>
            </>
        if(this.state.mode==='welcome'){
            _article=
            <>

            </>
            console.log(this.state.contents);
               
        }
        else if(this.state.mode==='read'){ //선택된 게시물과 리스트가 같이 뜸 

            var i=this.state.selected_content_id;
            var data=this.state.contents[i];
            
            console.log(data);
            _title=this.getReadContent().title;
            _desc=this.getReadContent().desc;
            //console.log(this.getReadContent());
            //console.log(_title, _desc);
            _article=<>
               
                
            {/* <PostContent onchangePage={function(id){
                this.setState({
                    mode:'read',
                    selected_content_id:Number(id)
                    });
            }.bind(this)}
            data={this.state.contents}/> */}
                    
            <ReadContent title={_title} desc={_desc}/>        
            <UpdateControl  onchangeMode={function(_mode){
                    if(_mode==='delete'){
                        if(window.confirm("이 게시물을 삭제하시겠습니까?")){
                            var i=this.state.selected_content_id;
                            var new_max_content_id=this.state.max_content_id-1;
                            var _contents=Array.from(this.state.total_contents);
                            _contents.splice(i,1);
                            this.setState({
                                contents:_contents,
                                selected_category: "전체",
                                mode:'post', 
                                total_contents:_contents,
                               // max_content_id:new_max_content_id
                            });
                            alert("삭제되었습니다.");
                        }
                    }else{
                        this.setState({mode:_mode});
                    }
               
                }.bind(this)}/>

            </>
           
        }else if(this.state.mode==='post'){ //리스트만 뜸

            _article=<>
                {/* <PostContent onchangePage={function(id){
                    this.setState({
                        selected_content_id:Number(id),
                        mode:'read'
                 });
                }.bind(this)}
                data={this.state.contents}/> */}
                <CreateControl  onchangeMode={function(_mode){
                
                    if(_mode==='delete'){
                        if(window.confirm("이 게시물을 삭제하시겠습니까?")){
                            var i=this.state.selected_content_id;
                            var new_max_content_id=this.state.max_content_id-1;
                            var _contents=Array.from(this.state.total_contents);
                            _contents.splice(i,1);
                            this.setState({
                                mode:'read',
                                total_contents:_contents,
                                max_content_id:new_max_content_id,
                            });
                            alert("삭제되었습니다.");
                        }
                    }else{
                        this.setState({mode:_mode});
                    }
               
                }.bind(this)}/>

                
            </>

        }else if(this.state.mode==='create'){
            _article=<CreateContent onSubmit={
                function(_category, _title, _desc){
                    var new_max_content_id=this.state.max_content_id+1;
                    //var _type=this.state.selected_type_id;
                    var _contents=Array.from(this.state.total_contents);
                    _contents.push({id:new_max_content_id, category:_category, title:_title, expire:'2021-05-21',people_num:0, desc:_desc});
                    console.log(_contents);
                    this.setState({
                        total_contents:_contents,
                        contents:_contents,
                        selected_category: "전체",
                        mode:'post', 
                        max_content_id:new_max_content_id
                    })

                }.bind(this)}>
    
                </CreateContent>

        }else if(this.state.mode==='update'){
            i=this.state.selected_content_id;
            var _content=this.state.total_contents[i];
            _article=<UpdateContent data={_content} onSubmit={
                function(_category,_title,_desc){
                    var _id=_content.id;
                    console.log(_id, _category, _title, _desc);
                    i=this.state.selected_content_id;
                    var _type=this.state.selected_type_id;
                    var _contents=Array.from(this.state.total_contents);
                    _contents[i]={id:_id,category:_category,title:_title,expire:'2021-05-12',people_num:0,desc:_desc}
    
                    this.setState({
                        total_contents:_contents,
                        contents : _contents,
                        mode:'post',
                        selected_category: "전체"
                    })
                    
                }.bind(this)}>
    
                </UpdateContent>
        }
        
        return(
            <div className="category">
          
                <h1 className="main-title">
                    <img src="http://hufsjournal.com/wp-content/uploads/2015/08/%EB%AF%B8%EB%84%A4%EB%A5%B4%EB%B0%94-%EC%97%AC%EC%8B%A0%EA%B3%BC-%EB%B6%80%EC%97%89%EC%9D%B4.jpg" width="80" height="80" alt="로고"/>
                    <p></p>     
                    <a href="/" >
                        한국외국어대학교 청원 홈페이지
                    </a> 
                    
                </h1>
                
                
                {/* <Type onchangePage={function(category){
                    var _category = this.state.selected_category;
                    var _contents = Array.from(this.state.total_contents);
                    var category_contents = [];
                    var i = 0;
                    if(_category === "전체") {
                        category_contents = _contents;
                    } else {
                        while(i < _contents.length) {
                            if(_contents[i].category === _category){
                                category_contents.push(_contents[i]);
                            }
                            i = i + 1;
                        }
                    }
                        
                    this.setState({
                    mode:'post',
                    //selected_type_id:Number(id),
                    selected_category: category,
                    contents: category_contents
                    });
                    }.bind(this)}
                    data={this.state.type}/> */}
                
                {_type} 
                {_article}
                {_table}
                

            </div>
        );
    }
}
export default  Home;