import React, { Component, Children } from 'react';

class ArticleTableHead extends Component {
  render() {
    return (
      <thead className="">
        <tr className = "text-white">
            {
              this.props.headersName.map((item, index) => {
                return(
                  <td className="bg-white text-black py-5" key={index}>{item}</td>
                )
              })
            }
        </tr>
      </thead>
    )
  }
}
 
export default ArticleTableHead;