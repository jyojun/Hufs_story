import React, { Component } from 'react';
import ArticleTableHead from './ArticleTableHead';
import ArticleTableBody from './ArticleTableBody';
 
class Articles extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected_content_id:1,
      contents:[
        {id:1, category:'library',title:'도서관 자리', expire:'2021-05-12', people_num:15}
      ]
    }
  }
  getReadContent() {
    var i = 0;
    while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
            return data;
        }
        i = i + 1;
    }
  }
  getContent() {

  }

  
  render() {
    return(
      <div>
        <table className = "w-full"> 
          <ArticleTableHead headersName = {['글번호', '분류', '제목', '만료일', '청원인원']}></ArticleTableHead>
          
        </table>
      </div>
    );
  }
}
 
export default Articles;