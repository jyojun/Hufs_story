import React,{Component} from "react";
import Control from "./control";
import ReadContent from "./ReadContent";
import CreateContent from "./CreateContent";
import UpdateContent from "./UpdateContent";

class Subject extends Component{
   render(){
    return(
        <header>
            <h1><a href="/" onClick={function(event){
                    console.log(event);
                    event.preventDefault();
                    this.props.onchangePage();
                }.bind(this)}>{this.props.title}</a></h1>
                {this.props.sub}
        </header>
    );
   }
};



class TOC extends Component{
    shouldComponentUpdate(newProps,newState){
      if(this.props.data===newProps.data){
          return false;
      }
      return true;
    }
  
    render(){
        var lists=[];
        var data=this.props.data;
        var i=0;
        while(i<data.length){
            lists.push(
            <li key={data[i].id} >
                <a 
                href={"/content/"+data[i].id}
                data-id={data[i].id}
                onClick={function(e){
                    console.log(e.target.dataset);
                    e.preventDefault();
                    this.props.onchangePage(e.target.dataset.id);
                }.bind(this)}
                >
                {data[i].title}</a>
            </li>)
            i=i+1;
        }
        return(
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>

        );
    }

};
class im extends Component{
   constructor(props){
        super(props);

        this.state={
            mode:'welcome',
            max_content_id:3,
            subject:{title:"WEb",sub:"world wide web!"},
            welcome:{title:'welcome',desc:"hello, react"},
            contents:[
                {id:1,title:"HTML",desc:"HTML is for information"},
                {id:2,title:"CSS",desc:"CSS is for design"},
                {id:3,title:"JavaScript",desc:"JavaScript is for interaction"}
            ],
            selected_content_id:3,
        }
   }
   getReadContent(){
        var i=0;
        while(i<this.state.contents.length){
            var data=this.state.contents[i];
            if(data.id===this.state.selected_content_id){
                return data;
                break;
            }
            i=i+1;
        }   
   }
   getContent(){
    var _title,_desc,_article=null;
    if(this.state.mode==='welcome'){
        _title=this.state.welcome.title;
        _desc=this.state.welcome.desc;
        _article=<ReadContent title={_title} desc={_desc}/>
    }else if(this.state.mode==='read'){
        
        var _content=this.getReadContent();
        _article=<ReadContent title={_content.title} desc={_content.desc}/>
        
    }else if(this.state.mode==='create'){
        _article=<CreateContent onSubmit={
            function(_title,_desc){
                var new_max_content_id=this.state.max_content_id+1;
                var _contents=Array.from(this.state.contents)
                _contents.push({id:this.max_content_id,title:_title,desc:_desc});
          
                this.setState({
                    max_content_id:new_max_content_id,
                    contents:_contents,
                    mode:'read',
                    selected_content_id:this.state.max_content_id
                
                })
                
            }.bind(this)}>

            </CreateContent>
    }else if(this.state.mode==='update'){
        _content=this.getReadContent();
        _article=<UpdateContent data={_content} onSubmit={
            function(_id,_title,_desc){
                var _contents=Array.from(this.state.contents)
                var i=0;
                while(i<_contents.length){
                    if(_contents[i].id===_id){
                        _contents[i]={id:_id,title:_title,desc:_desc}
                        break;
                    }
                    i=i+1;
                }
                this.setState({
                    contents:_contents,
                    mode:'read'
                })
                
            }.bind(this)}>

            </UpdateContent>
    }
    return _article;
   }
   render(){
   
    return(
        <div className="App">
           <Subject 
           title={this.state.subject.title} 
           sub={this.state.subject.sub} 
           onchangePage={function(){
               this.setState({mode:'welcome'});
           }.bind(this)}/>
           <Control  onchangeMode={function(_mode){
            
               if (_mode === 'delete' ){
                    if(window.confirm("이 게시물을 삭제하시겠습니까?")){
                        var i=this.state.selected_content_id-1;
          
                        var new_max_content_id=this.state.max_content_id-1;
                        var _contents=Array.from(this.state.contents);
                        _contents.splice(i,1);
                        this.setState({
                            mode:'welcome',
                            contents:_contents,
                            max_content_id:new_max_content_id
                        });
                        alert("삭제되었습니다.");

                    }
               }else{
                this.setState({mode:_mode});
               }
               
            }.bind(this)}/>
           
           <TOC onchangePage={function(id){
               this.setState({
                   mode:'read',
                   selected_content_id:Number(id)
                });
           }.bind(this)}
            data={this.state.contents}/>
            
           
           {this.getContent()}
        </div>
    );
   }
};

export default im;