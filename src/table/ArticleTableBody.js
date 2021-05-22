import React, { Component, Children } from 'react';

class ArticleTableBody extends Component {
  render() {
    var i = 0;
    var lists = [];
    var data = this.props.data;
    while(i < data.length){
      lists.push(
        <tr className = "table-row" key={data[i].id}>
          <td className="table-column">
            <a
              href={"/contents/"+data[i].category}
              data-id={data[i].id}
              onClick={function(e){
                e.preventDefault();
                this.props.onchangePage(e.target.dataset.id);
              }.bind(this)}
            >{data[i].id}</a>
          </td>
          <td className="table-column">
            <a 
              href={"/contents/"+data[i].category}
              data-id={data[i].id}
              onClick={function(e){
                e.preventDefault();
                this.props.onchangePage(e.target.dataset.id);
              }.bind(this)}
            >{data[i].category}</a>
          </td>
          <td className="table-column">
            <a 
              href={"/contents/"+data[i].category}
              data-id={data[i].id}
              onClick={function(e){
                e.preventDefault();
                this.props.onchangePage(e.target.dataset.id);
              }.bind(this)}
            >{data[i].title}</a>
          </td>
          <td className="table-column">
            <a 
              href={"/contents/"+data[i].category}
              data-id={data[i].id}
              onClick={function(e){
                e.preventDefault();
                this.props.onchangePage(e.target.dataset.id);
              }.bind(this)}
            >{data[i].expire}</a>
          </td>
          <td className="table-column">
            <a 
              href={"/contents/"+data[i].category}
              data-id={data[i].id}
              onClick={function(e){
                e.preventDefault();
                this.props.onchangePage(e.target.dataset.id);
              }.bind(this)}
            >{data[i].people_num}</a>
          </td>
        </tr>
      )
      i = i + 1;
    }
    //console.log(lists);
    return (
      <tbody>
        {lists}
      </tbody>
    )
  }
}
 
export default ArticleTableBody;