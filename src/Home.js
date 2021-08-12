import React, { Component } from "react";
import CreateControl from "./submit/CreateControl";
import UpdateControl from "./submit/UpdateControl";
import CreateContent from "./submit/CreateContent";
import ReadContent from "./submit/ReadContent";
import UpdateContent from "./submit/UpdateContent";
import ArticleTableHead from './table/ArticleTableHead';
import ArticleTableBody from './table/ArticleTableBody';
import Type from "./Type";
//import "./table/Table.css";
import "./styles/styles.css";
import HUFS from './HUFS.png';

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
        if(this.state.mode==='create' || this.state.mode==='update' || this.state.mode==='read'){
            var _type=<div></div>
            var _table=<div></div>
        }else{
            _type = //카테고리 분류 
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
                selected_category: category,
                contents: category_contents
                });
                }.bind(this)}
                data={this.state.type}/>

        _table = 
            <>
                <div className="mx-32 flex flex-col items-center justify-center text-center">
                    <div className="w-full px-4 md:px-10 py-4 md:py-7 border-b-2 border-gray-800">
                        <div className="sm:flex items-center justify-between">
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">청원 글 목록</p>
                            <div className="text-white">
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
                            </div>
                        </div>
                    </div>
                    <table className = "w-full"> 
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
            
        }
   
        if(this.state.mode==='read'){ //선택된 게시물과 리스트가 같이 뜸 

            var i=this.state.selected_content_id;
        
            _title=this.getReadContent().title;
            var _category=this.getReadContent().category;
            var _expire=this.getReadContent().expire;
            _desc=this.getReadContent().desc;
            var _category=this.getReadContent().category;
            var _expire=this.getReadContent().expire;
            var _agree=this.getReadContent().people_num;
        
            _article=<>
            <ReadContent title={_title} desc={_desc} agree={_agree} category={_category} expire={_expire}/>       
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
                               max_content_id:new_max_content_id
                            });
                            alert("삭제되었습니다.");
                        }
                    }else if(_mode==='agree'){
                       if(window.confirm("청원에 동의하시겠습니까?")){
                
                            i=this.state.selected_content_id;
                            _contents=Array.from(this.state.total_contents);
                            _contents[i].people_num+=1;
                            this.setState({
                                mode:'read',
                                total_contents:_contents,
                            });
                       };
                    
                    }
                    else{
                        this.setState({mode:_mode});
                    }
               
                }.bind(this)}/>
             
           

            </>
           
        }else if(this.state.mode==='post'){ //리스트만 뜸

            _article=<>
            </>

        }else if(this.state.mode==='create'){
            _article=<CreateContent 
            onCancel={
                function(_mode){
                    if(window.confirm("청원 글 작성을 중단하시겠습니까?")){
                        this.setState({
                            mode:_mode
                        })
                        alert("청원 글 작성이 취소되었습니다.");
                    }
                    
                }.bind(this)}
            onSubmit={
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
                    alert("청원 글이 등록되었습니다!");
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
                    var _contents=Array.from(this.state.total_contents);
                    _contents[i]={id:_id,category:_category,title:_title,expire:'2021-05-12',people_num:0,desc:_desc}
    
                    this.setState({
                        total_contents:_contents,
                        contents:_contents,
                        mode:'post',
                        selected_category: "전체",
                        
                    })
                    alert("청원 글이 수정되었습니다!");
                }.bind(this)}>
    
                </UpdateContent>
        }
        
        return(
            <div className="category">
                <div className= "sticky top-0 z-10 flex mb-0 bg-cover py-20 pt-0 items-center flex-wrap bg-teal px-0 pb-0 p-6">
                    <nav class="w-full absolute top-0 flex bg-gray-800 bg-opacity-70 items-center justify-between flex-wrap bg-teal p-6 py-1">
                        
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                            width="40.000000pt" height="40.000000pt" viewBox="0 0 500.000000 500.000000"
                            preserveAspectRatio="xMidYMid meet">

                            <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
                            fill="#000000" stroke="none">
                            <path d="M2516 4490 c-38 -5 -102 -16 -142 -25 l-74 -16 0 -76 c0 -57 5 -83
                            19 -107 18 -29 86 -190 125 -298 16 -42 20 -46 40 -38 56 21 224 32 418 28
                            195 -5 207 -6 295 -36 189 -64 281 -123 442 -283 172 -173 231 -270 297 -494
                            25 -85 25 -391 0 -485 -31 -118 -67 -224 -96 -282 -16 -31 -25 -59 -22 -63 3
                            -3 26 -15 51 -26 41 -18 45 -18 63 -3 10 10 18 22 18 27 0 6 18 45 40 87 41
                            81 98 228 124 320 70 249 58 639 -24 825 -5 11 -21 49 -35 84 -36 86 -112 227
                            -149 276 -78 101 -161 179 -361 338 -99 80 -404 199 -590 232 -108 19 -343 27
                            -439 15z"/>
                            <path d="M2053 4480 c-48 -20 -36 -83 20 -98 40 -10 47 -38 13 -53 -22 -10
                            -29 -9 -47 7 -21 19 -21 19 -18 -1 6 -28 73 -34 100 -9 29 26 20 55 -26 81
                            -54 30 -55 58 -2 57 24 -1 36 3 34 10 -5 14 -46 18 -74 6z"/>
                            <path d="M1894 4463 c-20 -4 -20 -6 -7 -75 10 -54 10 -74 2 -85 -10 -11 -5
                            -13 32 -7 24 4 51 8 59 8 18 1 35 25 25 34 -4 4 -10 1 -12 -5 -3 -7 -17 -13
                            -33 -13 -22 0 -29 5 -32 25 -6 29 -2 35 24 35 10 0 18 7 18 15 0 13 -3 13 -20
                            3 -23 -14 -26 -12 -35 24 -8 33 16 48 46 29 15 -9 19 -8 19 4 0 15 -35 18 -86
                            8z"/>
                            <path d="M1790 4440 c-14 -4 -20 -8 -13 -9 13 -1 44 -126 37 -145 -3 -9 4 -11
                            26 -8 22 3 28 8 20 16 -5 7 -17 41 -26 76 -13 52 -14 64 -2 71 17 11 -6 11
                            -42 -1z"/>
                            <path d="M1622 4398 c-35 -8 -41 -12 -30 -21 8 -7 22 -38 32 -70 14 -46 15
                            -61 5 -73 -14 -18 -12 -18 42 1 59 21 89 51 89 90 0 60 -59 91 -138 73z m81
                            -21 c10 -6 20 -28 23 -48 5 -29 2 -41 -16 -59 -17 -17 -24 -19 -36 -9 -8 6
                            -14 19 -14 28 -1 9 -7 33 -14 53 -7 21 -11 40 -8 43 10 9 48 5 65 -8z"/>
                            <path d="M1508 4363 c12 -5 36 -53 52 -105 12 -40 -10 -66 -43 -51 -27 13 -64
                            101 -53 129 4 10 2 14 -6 10 -7 -3 -20 -9 -30 -12 -15 -5 -15 -7 2 -24 9 -9
                            21 -35 24 -56 13 -69 55 -93 104 -58 28 19 28 47 1 118 -17 44 -26 56 -43 55
                            -11 0 -15 -3 -8 -6z"/>
                            <path d="M1320 4282 c-30 -15 -57 -28 -58 -29 -2 -1 0 -9 6 -18 8 -16 10 -16
                            15 -1 12 32 37 15 67 -44 17 -34 28 -65 25 -70 -9 -14 6 -12 35 5 14 8 19 14
                            12 15 -7 0 -27 29 -44 65 -28 56 -31 67 -18 75 8 6 21 8 28 5 8 -3 12 0 10 7
                            -7 20 -21 18 -78 -10z"/>
                            <path d="M1130 4279 c-71 -42 -85 -88 -40 -137 17 -18 31 -22 84 -22 44 0 67
                            -5 76 -15 33 -39 -37 -104 -82 -76 -27 17 -30 10 -8 -19 l18 -24 42 19 c78 35
                            100 91 56 142 -21 25 -30 27 -91 28 -53 0 -70 4 -79 18 -21 33 39 86 76 66 21
                            -11 23 -1 4 24 -16 21 -13 21 -56 -4z"/>
                            <path d="M1965 4135 c-296 -48 -595 -183 -810 -364 -81 -69 -212 -217 -287
                            -326 -70 -101 -176 -315 -208 -420 -32 -106 -60 -330 -60 -485 0 -159 27 -358
                            66 -482 44 -142 186 -403 277 -508 146 -170 263 -273 428 -375 127 -79 195
                            -109 319 -144 182 -50 224 -60 336 -72 102 -11 329 -8 341 5 4 3 -2 15 -12 26
                            -17 18 -31 20 -168 20 -287 0 -557 68 -749 188 -164 102 -362 260 -398 316
                            -10 17 -48 68 -82 113 -101 131 -183 283 -231 428 -69 210 -97 426 -78 613 23
                            222 66 375 162 566 55 110 148 255 204 316 177 196 396 359 558 417 271 96
                            413 124 623 125 l131 1 -11 28 -10 29 -131 -1 c-71 -1 -166 -7 -210 -14z"/>
                            <path d="M966 4041 c-18 -20 -18 -21 -1 -21 23 0 80 -64 61 -68 -8 -2 -44 1
                            -80 6 -51 7 -71 6 -84 -4 -14 -11 -15 -13 -2 -14 23 0 98 -81 102 -108 l3 -24
                            25 27 c13 14 18 24 10 20 -16 -5 -99 70 -89 80 3 3 31 0 63 -6 31 -5 69 -9 84
                            -7 l27 3 -21 20 c-25 25 -70 86 -75 103 -3 10 -10 8 -23 -7z"/>
                            <path d="M2227 3943 c-13 -13 -7 -42 11 -47 9 -3 55 -33 102 -66 71 -51 90
                            -60 114 -55 54 10 58 6 -95 110 -92 62 -117 73 -132 58z"/>
                            <path d="M2862 3888 l3 -33 83 -7 c393 -32 726 -298 846 -674 39 -121 49 -203
                            43 -333 -7 -130 -35 -249 -86 -357 -17 -36 -31 -70 -31 -74 0 -11 52 -32 61
                            -23 17 19 69 159 94 255 38 144 44 299 17 429 -24 116 -79 256 -137 353 -47
                            77 -228 265 -305 317 -153 103 -380 178 -543 179 l-48 0 3 -32z"/>
                            <path d="M778 3873 c-35 -39 -40 -59 -23 -99 17 -40 70 -68 110 -58 14 4 37
                            21 51 39 l25 33 -30 30 c-28 28 -31 28 -46 12 -18 -20 -19 -31 -2 -24 7 2 21
                            -4 32 -15 14 -17 15 -23 5 -36 -21 -25 -68 -18 -101 14 -47 47 -36 111 19 111
                            13 0 20 4 17 10 -11 17 -30 11 -57 -17z"/>
                            <path d="M1633 3827 c-22 -12 -22 -12 31 -132 29 -66 68 -154 88 -195 19 -41
                            47 -105 63 -142 15 -38 31 -68 35 -68 4 0 13 7 20 15 17 21 4 64 -72 229 -32
                            72 -63 140 -68 151 -40 92 -70 155 -72 155 -2 -1 -13 -6 -25 -13z"/>
                            <path d="M2750 3790 c-161 -21 -360 -104 -479 -199 -35 -28 -67 -51 -72 -51
                            -13 0 -673 -662 -707 -709 -18 -24 -32 -50 -32 -58 0 -29 147 -8 420 62 219
                            56 425 69 610 40 137 -23 201 -41 304 -87 122 -56 184 -58 227 -10 40 44 40
                            93 0 133 -55 54 -131 31 -131 -40 0 -20 -6 -34 -16 -38 -21 -8 -34 14 -34 59
                            0 27 7 44 30 66 83 84 230 15 230 -108 0 -99 -55 -150 -161 -150 -56 0 -85 8
                            -190 50 -73 29 -161 56 -214 65 -116 21 -326 31 -350 18 -15 -9 -12 -11 21
                            -17 57 -10 380 -120 444 -150 30 -15 75 -38 100 -53 66 -38 352 -227 370 -244
                            25 -23 84 -65 102 -72 10 -3 72 -47 138 -97 l119 -90 31 44 c16 25 30 48 30
                            53 0 5 16 33 37 63 47 72 134 254 168 355 58 174 56 358 -5 541 -108 320 -330
                            526 -655 608 -75 19 -250 27 -335 16z"/>
                            <path d="M667 3742 c-19 -21 -23 -37 -7 -27 13 8 119 -75 120 -92 0 -19 9 -16
                            31 10 22 27 24 38 4 31 -15 -6 -120 67 -127 88 -2 5 -11 1 -21 -10z"/>
                            <path d="M598 3635 c-25 -40 -26 -45 -9 -45 10 0 26 -9 35 -19 10 -11 29 -22
                            42 -25 14 -4 28 -15 32 -26 7 -18 10 -16 36 16 31 39 38 64 19 71 -7 3 -10 -3
                            -7 -15 8 -28 -21 -48 -51 -34 -29 13 -33 37 -8 50 14 9 14 11 -5 21 -17 9 -21
                            9 -16 -2 3 -8 -1 -19 -9 -25 -11 -9 -18 -8 -31 7 -18 20 -12 51 11 51 8 0 11
                            5 8 10 -11 18 -19 11 -47 -35z"/>
                            <path d="M508 3498 c-27 -42 -40 -71 -29 -64 11 7 76 -22 122 -55 26 -18 26
                            -18 37 6 9 19 8 23 -2 19 -7 -3 -24 4 -37 15 l-24 20 42 1 c41 0 73 19 73 43
                            0 8 -4 7 -12 -1 -7 -7 -29 -12 -50 -12 -31 0 -38 4 -38 19 0 36 -60 43 -82 9z
                            m60 -35 c2 -13 1 -23 -2 -23 -12 0 -56 24 -56 30 0 30 54 23 58 -7z"/>
                            <path d="M1125 3458 c-38 -170 -55 -325 -55 -510 0 -184 14 -169 -133 -142
                            -95 18 -117 15 -117 -14 0 -23 34 -33 172 -53 l88 -12 5 -36 c27 -175 67 -330
                            116 -454 59 -148 154 -335 184 -362 6 -5 19 -22 28 -37 17 -27 17 -28 -10 -34
                            -14 -4 -102 -4 -195 -1 l-169 7 3 -28 c3 -27 3 -27 108 -34 58 -4 152 -5 210
                            -2 l105 6 26 -36 c33 -46 149 -176 157 -176 4 0 7 15 7 33 0 31 -46 99 -97
                            146 -29 25 -22 41 18 41 33 0 35 2 32 28 -3 26 -5 27 -56 24 -40 -3 -58 0 -73
                            14 -10 9 -19 20 -19 24 0 3 -29 54 -64 113 -112 186 -203 432 -241 646 -8 47
                            -15 92 -15 99 0 9 34 12 139 12 l138 0 -4 24 c-5 24 -7 24 -138 28 -73 1 -137
                            6 -141 10 -11 11 -7 353 5 438 6 41 18 113 27 159 14 70 14 85 3 92 -23 15
                            -38 10 -44 -13z"/>
                            <path d="M459 3359 c-37 -14 -60 -63 -47 -101 21 -60 88 -85 138 -51 34 23 40
                            33 40 68 -1 35 -27 71 -65 85 -30 12 -31 12 -66 -1z m76 -42 c41 -21 48 -69
                            14 -88 -43 -22 -129 23 -129 68 0 6 7 18 15 27 16 16 60 13 100 -7z"/>
                            <path d="M260 3146 c-13 -39 -26 -78 -29 -86 -4 -12 -1 -12 15 1 18 16 25 15
                            112 -11 99 -30 122 -43 123 -69 0 -17 21 34 33 84 7 28 7 29 -11 13 -17 -15
                            -24 -16 -63 -4 -51 15 -61 43 -22 62 l23 12 -24 6 c-14 3 -33 9 -42 13 -15 5
                            -16 3 -8 -12 14 -25 4 -57 -16 -51 -9 3 -28 8 -43 12 -16 3 -28 13 -28 21 0
                            23 20 53 35 53 24 0 17 17 -8 22 -21 4 -26 -2 -47 -66z"/>
                            <path d="M287 2893 c-3 -10 -8 -34 -11 -53 l-6 -35 66 -2 c40 -1 75 -8 90 -18
                            23 -14 24 -14 24 4 0 11 3 28 7 38 5 15 4 16 -8 7 -22 -18 -79 -6 -79 17 0 11
                            6 19 13 19 8 0 7 4 -3 10 -22 14 -29 12 -23 -9 6 -24 -11 -35 -43 -27 -20 6
                            -24 11 -18 29 4 12 12 25 18 29 7 5 5 8 -6 8 -9 0 -19 -8 -21 -17z"/>
                            <path d="M1871 2781 c-63 -21 -54 -8 -212 -271 -62 -102 -120 -194 -130 -205
                            -37 -42 -79 -136 -73 -163 11 -48 35 -60 111 -55 95 6 102 -1 74 -76 -30 -83
                            -26 -102 26 -121 l41 -15 -19 -24 c-30 -37 -25 -68 17 -93 32 -19 35 -25 30
                            -52 -3 -17 -8 -69 -11 -116 -7 -98 1 -121 55 -158 33 -23 40 -24 150 -18 63 3
                            142 8 175 12 52 5 64 3 94 -18 30 -20 41 -40 76 -138 23 -63 54 -135 69 -159
                            43 -67 175 -227 265 -320 80 -82 81 -83 99 -63 9 11 100 86 202 167 333 263
                            326 257 295 269 -42 16 -196 126 -240 171 -71 74 -109 142 -167 306 -47 132
                            -97 229 -117 229 -14 0 -190 118 -277 186 -85 66 -141 142 -202 271 -25 54
                            -27 68 -27 188 0 72 4 158 8 191 l9 62 -54 12 c-93 22 -206 22 -267 1z m60
                            -150 c24 -15 55 -41 69 -56 22 -25 23 -27 5 -23 -11 3 -58 16 -105 29 -47 12
                            -87 24 -89 26 -9 6 43 53 59 53 9 0 36 -13 61 -29z m42 -119 c26 -9 47 -19 47
                            -22 0 -8 -123 -80 -129 -75 -7 8 -20 108 -15 117 6 9 20 6 97 -20z"/>
                            <path d="M279 2722 c-27 -24 -30 -32 -24 -60 9 -42 48 -72 95 -72 30 0 44 6
                            64 31 35 41 33 71 -5 103 -42 35 -89 35 -130 -2z m140 -27 c12 -12 12 -17 -2
                            -38 -20 -32 -68 -41 -113 -22 -30 12 -35 19 -32 42 2 19 11 29 28 35 34 10
                            102 0 119 -17z"/>
                            <path d="M2246 2742 c-11 -19 -26 -142 -26 -223 0 -95 17 -159 71 -259 44 -82
                            104 -141 249 -240 234 -162 243 -172 295 -330 85 -257 138 -326 353 -459 l83
                            -51 30 22 c16 12 29 24 29 27 0 7 -48 38 -130 87 -77 46 -183 157 -218 229
                            -17 33 -46 106 -66 162 -40 116 -54 145 -93 190 -32 36 -115 103 -188 153 -87
                            58 -189 137 -216 166 -111 121 -144 245 -119 439 5 39 6 73 2 76 -13 13 -50
                            20 -56 11z"/>
                            <path d="M2355 2700 c-3 -5 -7 -63 -8 -127 -3 -159 15 -213 100 -303 34 -37
                            90 -86 124 -111 283 -203 323 -242 365 -354 77 -209 97 -257 125 -294 45 -63
                            105 -117 168 -152 31 -18 77 -47 102 -64 l45 -32 29 23 c24 19 27 25 16 38
                            -13 16 -188 126 -200 126 -4 0 -24 17 -45 38 -44 41 -80 114 -136 272 -59 168
                            -106 230 -245 327 -44 31 -84 61 -90 67 -5 7 -26 23 -45 36 -19 13 -65 48
                            -102 78 -107 86 -146 189 -130 342 8 81 8 82 -15 91 -31 12 -50 11 -58 -1z"/>
                            <path d="M2484 2634 c-13 -86 0 -185 32 -243 15 -29 40 -62 54 -72 84 -65 175
                            -131 240 -176 173 -120 226 -195 300 -428 17 -55 40 -114 51 -132 29 -47 91
                            -98 160 -133 34 -17 84 -46 110 -66 l49 -36 30 22 c29 21 30 23 15 40 -9 10
                            -42 30 -72 45 -79 37 -168 100 -196 138 -38 50 -66 111 -113 246 -24 68 -56
                            142 -70 163 -43 62 -134 140 -260 225 -220 147 -256 194 -258 342 l-1 85 -32
                            13 -32 13 -7 -46z"/>
                            <path d="M2609 2613 c-5 -69 2 -125 19 -159 24 -48 111 -128 172 -159 123 -64
                            297 -218 331 -294 12 -25 43 -104 71 -176 74 -195 87 -210 262 -323 104 -67
                            111 -69 133 -55 13 8 23 18 23 22 0 9 -83 70 -157 115 -34 20 -78 55 -97 78
                            -31 36 -91 170 -126 280 -9 31 -37 77 -110 183 -26 37 -132 125 -200 165 -115
                            68 -209 139 -227 173 -9 17 -20 54 -23 81 -4 43 -9 53 -37 69 -32 18 -33 18
                            -34 0z"/>
                            <path d="M2720 2557 c0 -34 24 -75 63 -104 91 -70 204 -147 233 -159 18 -7 59
                            -41 93 -75 101 -101 147 -174 206 -330 30 -78 65 -157 78 -175 13 -19 70 -66
                            128 -105 57 -40 114 -81 126 -91 21 -20 21 -20 52 3 l31 23 -27 28 c-14 15
                            -71 58 -126 95 -54 37 -109 81 -122 98 -28 37 -62 111 -105 233 -55 155 -147
                            258 -355 396 -195 129 -275 177 -275 163z"/>
                            <path d="M250 2463 c0 -15 6 -23 18 -23 9 0 26 -7 36 -15 19 -14 19 -15 1 -35
                            -10 -11 -24 -20 -32 -20 -8 0 -13 -12 -13 -32 0 -18 4 -28 8 -21 4 6 25 25 46
                            42 28 23 49 31 77 31 23 0 39 -5 39 -12 0 -6 2 -9 5 -6 3 3 2 19 -1 37 -5 23
                            -10 29 -17 22 -26 -26 -131 4 -159 44 -4 5 -8 0 -8 -12z"/>
                            <path d="M276 2229 c8 -33 12 -65 8 -70 -3 -5 4 -9 15 -9 12 0 21 5 21 10 0 6
                            -4 10 -10 10 -5 0 -10 8 -10 18 0 15 13 21 71 32 60 10 73 10 81 -1 7 -10 8
                            -7 4 11 -3 14 -6 30 -6 37 0 8 -7 8 -27 -2 -16 -7 -52 -16 -82 -19 -53 -7 -54
                            -7 -49 18 4 20 1 26 -12 26 -17 0 -17 -4 -4 -61z"/>
                            <path d="M4735 2212 c-105 -140 -430 -221 -680 -168 -146 30 -278 95 -335 164
                            l-30 37 0 -111 c0 -100 3 -116 26 -159 l25 -49 -25 -50 c-100 -197 93 -424
                            297 -352 57 21 106 59 162 126 l50 60 80 -85 c86 -92 129 -115 211 -115 102 0
                            208 79 239 177 21 65 14 141 -16 189 l-19 31 25 46 c24 43 25 52 23 172 l-3
                            127 -30 -40z m-810 -420 c-3 -7 -5 -34 -5 -58 0 -41 -2 -44 -19 -34 -33 17
                            -63 70 -69 117 l-5 46 52 -28 c34 -19 50 -33 46 -43z m705 44 c0 -30 -25 -83
                            -53 -113 -17 -18 -33 -33 -37 -33 -3 0 -6 26 -6 59 l-1 59 41 20 c49 25 56 26
                            56 8z m-565 -91 c29 -13 34 -19 25 -29 -11 -15 -68 -41 -74 -35 -4 4 5 79 9
                            79 1 0 19 -7 40 -15z m361 -12 c3 -16 8 -34 10 -42 3 -10 -3 -12 -23 -6 -55
                            13 -70 44 -30 63 33 16 36 15 43 -15z"/>
                            <path d="M457 2157 c-8 -20 -139 -50 -149 -34 -10 15 -10 -8 -1 -41 3 -14 9
                            -19 13 -13 8 14 120 43 142 37 13 -3 18 2 18 17 0 31 -15 53 -23 34z"/>
                            <path d="M3350 2137 c0 -2 9 -22 20 -44 11 -23 31 -76 45 -118 48 -148 103
                            -223 204 -275 23 -12 23 -12 16 32 -4 23 -13 46 -21 51 -30 18 -74 60 -74 72
                            0 7 -6 17 -13 23 -7 6 -24 48 -37 93 -24 77 -28 84 -82 126 -32 24 -58 43 -58
                            40z"/>
                            <path d="M425 2050 c-9 -10 -20 -34 -24 -52 -6 -27 -12 -33 -31 -33 -22 0 -25
                            5 -25 33 0 17 -4 30 -10 28 -17 -6 -7 -58 15 -80 19 -19 22 -20 48 -6 15 9 32
                            30 38 48 14 45 29 58 49 42 18 -15 20 -51 4 -67 -9 -9 -6 -10 11 -6 19 5 21
                            11 17 41 -11 65 -57 91 -92 52z"/>
                            <path d="M520 1937 c0 -10 -7 -29 -16 -42 -13 -20 -25 -25 -60 -25 -37 0 -44
                            -3 -49 -23 -4 -13 3 -42 14 -67 11 -25 20 -38 20 -29 1 10 26 25 68 42 54 22
                            69 24 82 14 12 -10 14 -9 7 8 -5 11 -11 28 -13 37 -5 16 -7 16 -30 -2 -43 -33
                            -59 -25 -29 14 28 37 31 52 16 76 -8 13 -10 12 -10 -3z m-50 -102 c10 -12 8
                            -16 -15 -25 -14 -5 -31 -10 -36 -10 -13 0 -11 24 3 38 16 16 33 15 48 -3z"/>
                            <path d="M575 1779 c-16 -6 -17 -8 -3 -8 10 -1 23 -11 29 -23 10 -18 8 -24
                            -11 -40 -28 -22 -45 -18 -44 9 0 19 -2 20 -25 9 -18 -8 -21 -12 -9 -14 25 -5
                            30 -30 8 -42 -40 -21 -57 -9 -51 37 1 7 -5 10 -13 7 -12 -5 -13 -10 -3 -32 21
                            -48 47 -88 47 -71 0 15 114 77 133 71 5 -2 6 5 2 15 -4 10 -11 32 -16 50 -12
                            38 -18 43 -44 32z"/>
                            <path d="M4186 1584 l-39 -46 18 -32 c10 -17 28 -46 41 -64 l22 -33 40 62 41
                            62 -37 48 c-20 27 -39 48 -42 49 -3 0 -23 -21 -44 -46z"/>
                            <path d="M595 1584 c-33 -7 -66 -11 -72 -9 -16 5 -16 0 -2 -26 9 -18 12 -19
                            22 -5 16 21 104 35 92 15 -24 -41 -58 -79 -67 -73 -5 4 -2 -5 7 -20 16 -25 18
                            -25 31 -9 7 10 14 23 14 28 0 6 9 21 21 35 11 14 29 37 40 53 l20 27 -23 -1
                            c-13 -1 -50 -8 -83 -15z"/>
                            <path d="M4644 1490 c-51 -25 -52 -25 -82 -117 -103 -307 -291 -532 -562 -672
                            -102 -53 -153 -69 -295 -95 -173 -31 -262 -36 -681 -36 l-422 0 -40 -33 c-23
                            -17 -41 -35 -41 -39 -1 -12 947 -9 1057 3 182 20 283 46 458 121 121 52 294
                            180 344 254 8 12 43 60 78 105 75 99 120 177 161 279 28 71 84 252 79 254 -2
                            1 -26 -10 -54 -24z"/>
                            <path d="M743 1503 c7 -11 -41 -53 -61 -53 -5 0 -15 -7 -22 -15 -7 -8 -21 -15
                            -31 -15 -17 0 -17 -1 -1 -30 11 -19 18 -25 20 -15 4 18 95 85 116 85 22 0 20
                            13 -6 36 -12 10 -18 14 -15 7z"/>
                            <path d="M3730 1480 c-19 -17 -38 -30 -43 -30 -9 0 -121 -92 -146 -120 -9 -9
                            -65 -57 -126 -106 -60 -48 -132 -106 -160 -129 -27 -23 -67 -52 -87 -64 -21
                            -12 -38 -26 -38 -29 0 -4 -31 -32 -70 -62 -38 -30 -69 -59 -70 -63 0 -4 120
                            -6 268 -4 279 4 344 12 477 58 188 65 348 201 438 372 l25 48 -27 47 c-15 26
                            -35 61 -46 78 l-19 31 -45 -21 c-66 -30 -189 -29 -250 2 -25 12 -45 22 -45 22
                            -1 -1 -17 -14 -36 -30z"/>
                            <path d="M4319 1457 c-15 -23 -50 -85 -79 -138 -58 -107 -137 -218 -178 -249
                            -15 -11 -52 -40 -84 -65 -69 -54 -147 -94 -253 -129 -132 -44 -246 -56 -544
                            -56 l-270 0 -46 -40 -46 -40 328 0 c401 0 528 16 695 87 71 30 203 115 263
                            169 22 20 52 46 66 59 73 64 176 245 205 360 14 57 15 68 3 76 -24 15 -33 10
                            -60 -34z"/>
                            <path d="M4444 1458 c-3 -4 -22 -57 -44 -118 -51 -146 -109 -237 -217 -341
                            -155 -149 -309 -234 -515 -281 -85 -20 -127 -22 -503 -26 l-410 -4 -32 -24
                            c-18 -14 -33 -30 -33 -36 0 -7 136 -9 463 -5 380 4 475 8 537 22 243 53 425
                            157 593 335 72 77 93 107 150 222 55 112 97 219 97 249 0 10 -80 16 -86 7z"/>
                            <path d="M750 1390 c-30 -27 -64 -50 -74 -50 -18 0 -19 -1 -1 -20 18 -20 18
                            -20 29 1 6 12 26 34 45 48 l34 26 -7 -35 c-18 -90 -19 -145 -2 -159 14 -12 16
                            -11 16 8 0 26 96 105 118 96 13 -5 13 -3 0 17 -17 26 -41 37 -32 15 3 -9 -11
                            -28 -37 -51 -23 -20 -44 -34 -46 -33 -1 2 2 30 7 63 20 115 21 124 13 124 -4
                            0 -33 -23 -63 -50z"/>
                            <path d="M1890 1340 c-8 -5 -12 -11 -10 -13 48 -38 141 -104 197 -140 72 -46
                            76 -46 96 -10 4 7 -14 24 -45 43 -29 18 -83 54 -120 81 -68 49 -90 57 -118 39z"/>
                            <path d="M857 1175 c-52 -55 -76 -74 -89 -69 -26 8 -22 -3 10 -31 31 -28 44
                            -32 36 -11 -10 27 114 156 150 156 29 0 56 -24 56 -49 0 -44 -115 -159 -152
                            -153 -26 5 -23 1 28 -42 38 -32 45 -35 39 -17 -5 17 5 33 51 81 47 50 57 66
                            61 104 5 40 2 48 -25 76 -52 51 -81 43 -165 -45z"/>
                            <path d="M1175 1064 c15 -36 23 -99 15 -108 -5 -5 -32 -11 -60 -14 -48 -4 -49
                            -5 -30 -19 14 -10 25 -11 33 -5 16 12 77 24 77 14 -1 -14 -28 -42 -41 -42 -8
                            0 -4 -8 11 -20 30 -23 37 -25 37 -6 0 8 15 40 33 70 24 39 41 56 55 56 17 0
                            15 3 -10 20 -32 21 -50 26 -40 10 8 -13 -14 -52 -26 -45 -5 4 -9 21 -9 39 0
                            25 -7 38 -27 51 -25 17 -26 17 -18 -1z"/>
                            <path d="M1335 952 c-11 -10 -31 -39 -45 -65 -14 -26 -31 -48 -40 -50 -10 -3
                            -7 -7 10 -14 23 -10 26 -8 36 27 17 58 52 102 78 98 34 -5 32 -50 -3 -113 -30
                            -52 -30 -55 -12 -65 25 -13 34 -13 26 0 -3 5 6 32 20 59 14 28 25 61 25 74 0
                            52 -59 83 -95 49z"/>
                            <path d="M1477 898 c12 -16 46 -108 42 -112 -14 -12 -71 -36 -86 -36 -14 -1
                            -13 -4 7 -15 14 -7 26 -9 28 -4 5 13 62 42 69 35 3 -3 -2 -17 -11 -32 -10 -14
                            -16 -27 -14 -29 8 -7 48 -25 54 -25 5 0 3 5 -3 11 -9 9 -6 28 13 78 14 36 30
                            68 36 72 7 4 3 11 -10 18 -26 14 -45 14 -37 1 7 -12 -3 -50 -13 -50 -4 0 -14
                            19 -22 41 -10 27 -23 45 -39 51 -18 6 -22 6 -14 -4z"/>
                            <path d="M1645 788 c-8 -28 -15 -58 -15 -65 0 -7 -9 -22 -19 -32 -19 -19 -19
                            -20 10 -30 27 -9 41 0 20 13 -9 6 6 84 19 99 4 4 22 -26 40 -68 24 -55 38 -75
                            51 -75 13 0 19 7 19 23 0 36 27 119 42 128 8 5 4 11 -16 19 -16 6 -31 8 -34 5
                            -3 -3 0 -5 6 -5 7 0 12 -10 12 -21 0 -27 -21 -99 -29 -99 -3 0 -22 36 -41 80
                            -19 44 -38 80 -42 80 -4 0 -14 -23 -23 -52z"/>
                            <path d="M1860 751 c5 -20 11 -62 15 -94 8 -70 16 -67 74 33 31 55 36 70 24
                            74 -21 8 -23 8 -17 -7 2 -7 -2 -21 -10 -32 -12 -17 -17 -18 -41 -7 -21 10 -26
                            18 -23 37 4 16 0 25 -12 28 -15 4 -16 0 -10 -32z m64 -60 c3 -4 -1 -17 -9 -27
                            -8 -10 -15 -14 -15 -7 0 6 -3 18 -6 27 -6 17 20 23 30 7z"/>
                            <path d="M2029 738 c21 -18 23 -27 17 -72 -3 -28 -6 -73 -6 -99 0 -40 -4 -49
                            -22 -56 -18 -7 -8 -10 40 -12 34 -2 62 -1 62 4 0 4 -7 7 -15 7 -11 0 -15 12
                            -15 50 l0 50 54 0 c30 0 57 -4 60 -8 10 -16 -7 -92 -20 -92 -8 0 -14 -4 -14
                            -10 0 -5 25 -10 57 -10 54 0 55 1 40 18 -14 15 -16 34 -11 118 5 73 11 102 22
                            112 13 10 6 12 -44 12 -45 -1 -55 -3 -41 -11 12 -7 17 -23 17 -59 0 -27 -4
                            -51 -9 -54 -4 -3 -31 -3 -60 1 -49 6 -51 7 -51 37 0 46 11 76 26 76 8 0 14 5
                            14 10 0 6 -27 10 -62 10 l-62 0 23 -22z"/>
                            </g>
                            </svg>
                        <a href="/" class="flex items-center flex-no-shrink text-white mr-6">
                            <span class="font-semibold ml-3 text-xl tracking-tight">외청</span>
                        </a>
                        <div class="block lg:hidden" aria-controls="mobile-menu" aria-expanded="false">
                            <button class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
                            <svg class="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                            </button>
                        </div>
                        <div class="w-full block flex-grow md:hidden lg:flex lg:items-center lg:w-auto">
                            <div class="text-sm lg:flex-grow">
                            <a href="notice" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter text-white hover:text-opacity-50 mr-4">
                                공지사항
                            </a>
                            <a href="info" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter text-white hover:text-opacity-50 mr-4">
                                정보
                            </a>
                            <a href="qnaboard" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter text-white hover:text-opacity-50">
                                QnA 게시판
                            </a>
                            </div>
                            <div class="sm:flex-col sm:justify-center">
                            <a href="signup" class="inline-block text-sm px-4 py-2 mr-3 leading-none rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white hover:text-black mt-4 lg:mt-0">SignUp</a>
                                <a href="login" class="inline-block text-sm px-4 py-2 mr-3 leading-none rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white hover:text-black mt-4 lg:mt-0">Login</a>
                                <a href="/" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white hover:text-black mt-4 lg:mt-0">Search</a>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="w-full py-32" style={{ backgroundImage: `url('http://builder.hufs.ac.kr/user/hufs/mycodyimages/main_new/main20210622.jpg')`}}>
                </div>
                <hr className="mainline"></hr>
                
                {_type} 
                {_article}
                <div className="w-full sm:px-6">
                    {_table}
                </div>
                <div className="border-2 mt-20">
                <footer class="py-6 dark:bg-coolGray-800 dark:text-coolGray-50">
                    <div class="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
                        <div class="grid grid-cols-12">
                            <div class="pb-6 col-span-full md:pb-0 md:col-span-6">
                                <a href="/" class="flex justify-center space-x-3 md:justify-start">
                                    <div class="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-400">
                                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                        width="500.000000pt" height="500.000000pt" viewBox="0 0 500.000000 500.000000"
                                        preserveAspectRatio="xMidYMid meet">

                                        <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
                                        fill="#000000" stroke="none">
                                        <path d="M2516 4490 c-38 -5 -102 -16 -142 -25 l-74 -16 0 -76 c0 -57 5 -83
                                        19 -107 18 -29 86 -190 125 -298 16 -42 20 -46 40 -38 56 21 224 32 418 28
                                        195 -5 207 -6 295 -36 189 -64 281 -123 442 -283 172 -173 231 -270 297 -494
                                        25 -85 25 -391 0 -485 -31 -118 -67 -224 -96 -282 -16 -31 -25 -59 -22 -63 3
                                        -3 26 -15 51 -26 41 -18 45 -18 63 -3 10 10 18 22 18 27 0 6 18 45 40 87 41
                                        81 98 228 124 320 70 249 58 639 -24 825 -5 11 -21 49 -35 84 -36 86 -112 227
                                        -149 276 -78 101 -161 179 -361 338 -99 80 -404 199 -590 232 -108 19 -343 27
                                        -439 15z"/>
                                        <path d="M2053 4480 c-48 -20 -36 -83 20 -98 40 -10 47 -38 13 -53 -22 -10
                                        -29 -9 -47 7 -21 19 -21 19 -18 -1 6 -28 73 -34 100 -9 29 26 20 55 -26 81
                                        -54 30 -55 58 -2 57 24 -1 36 3 34 10 -5 14 -46 18 -74 6z"/>
                                        <path d="M1894 4463 c-20 -4 -20 -6 -7 -75 10 -54 10 -74 2 -85 -10 -11 -5
                                        -13 32 -7 24 4 51 8 59 8 18 1 35 25 25 34 -4 4 -10 1 -12 -5 -3 -7 -17 -13
                                        -33 -13 -22 0 -29 5 -32 25 -6 29 -2 35 24 35 10 0 18 7 18 15 0 13 -3 13 -20
                                        3 -23 -14 -26 -12 -35 24 -8 33 16 48 46 29 15 -9 19 -8 19 4 0 15 -35 18 -86
                                        8z"/>
                                        <path d="M1790 4440 c-14 -4 -20 -8 -13 -9 13 -1 44 -126 37 -145 -3 -9 4 -11
                                        26 -8 22 3 28 8 20 16 -5 7 -17 41 -26 76 -13 52 -14 64 -2 71 17 11 -6 11
                                        -42 -1z"/>
                                        <path d="M1622 4398 c-35 -8 -41 -12 -30 -21 8 -7 22 -38 32 -70 14 -46 15
                                        -61 5 -73 -14 -18 -12 -18 42 1 59 21 89 51 89 90 0 60 -59 91 -138 73z m81
                                        -21 c10 -6 20 -28 23 -48 5 -29 2 -41 -16 -59 -17 -17 -24 -19 -36 -9 -8 6
                                        -14 19 -14 28 -1 9 -7 33 -14 53 -7 21 -11 40 -8 43 10 9 48 5 65 -8z"/>
                                        <path d="M1508 4363 c12 -5 36 -53 52 -105 12 -40 -10 -66 -43 -51 -27 13 -64
                                        101 -53 129 4 10 2 14 -6 10 -7 -3 -20 -9 -30 -12 -15 -5 -15 -7 2 -24 9 -9
                                        21 -35 24 -56 13 -69 55 -93 104 -58 28 19 28 47 1 118 -17 44 -26 56 -43 55
                                        -11 0 -15 -3 -8 -6z"/>
                                        <path d="M1320 4282 c-30 -15 -57 -28 -58 -29 -2 -1 0 -9 6 -18 8 -16 10 -16
                                        15 -1 12 32 37 15 67 -44 17 -34 28 -65 25 -70 -9 -14 6 -12 35 5 14 8 19 14
                                        12 15 -7 0 -27 29 -44 65 -28 56 -31 67 -18 75 8 6 21 8 28 5 8 -3 12 0 10 7
                                        -7 20 -21 18 -78 -10z"/>
                                        <path d="M1130 4279 c-71 -42 -85 -88 -40 -137 17 -18 31 -22 84 -22 44 0 67
                                        -5 76 -15 33 -39 -37 -104 -82 -76 -27 17 -30 10 -8 -19 l18 -24 42 19 c78 35
                                        100 91 56 142 -21 25 -30 27 -91 28 -53 0 -70 4 -79 18 -21 33 39 86 76 66 21
                                        -11 23 -1 4 24 -16 21 -13 21 -56 -4z"/>
                                        <path d="M1965 4135 c-296 -48 -595 -183 -810 -364 -81 -69 -212 -217 -287
                                        -326 -70 -101 -176 -315 -208 -420 -32 -106 -60 -330 -60 -485 0 -159 27 -358
                                        66 -482 44 -142 186 -403 277 -508 146 -170 263 -273 428 -375 127 -79 195
                                        -109 319 -144 182 -50 224 -60 336 -72 102 -11 329 -8 341 5 4 3 -2 15 -12 26
                                        -17 18 -31 20 -168 20 -287 0 -557 68 -749 188 -164 102 -362 260 -398 316
                                        -10 17 -48 68 -82 113 -101 131 -183 283 -231 428 -69 210 -97 426 -78 613 23
                                        222 66 375 162 566 55 110 148 255 204 316 177 196 396 359 558 417 271 96
                                        413 124 623 125 l131 1 -11 28 -10 29 -131 -1 c-71 -1 -166 -7 -210 -14z"/>
                                        <path d="M966 4041 c-18 -20 -18 -21 -1 -21 23 0 80 -64 61 -68 -8 -2 -44 1
                                        -80 6 -51 7 -71 6 -84 -4 -14 -11 -15 -13 -2 -14 23 0 98 -81 102 -108 l3 -24
                                        25 27 c13 14 18 24 10 20 -16 -5 -99 70 -89 80 3 3 31 0 63 -6 31 -5 69 -9 84
                                        -7 l27 3 -21 20 c-25 25 -70 86 -75 103 -3 10 -10 8 -23 -7z"/>
                                        <path d="M2227 3943 c-13 -13 -7 -42 11 -47 9 -3 55 -33 102 -66 71 -51 90
                                        -60 114 -55 54 10 58 6 -95 110 -92 62 -117 73 -132 58z"/>
                                        <path d="M2862 3888 l3 -33 83 -7 c393 -32 726 -298 846 -674 39 -121 49 -203
                                        43 -333 -7 -130 -35 -249 -86 -357 -17 -36 -31 -70 -31 -74 0 -11 52 -32 61
                                        -23 17 19 69 159 94 255 38 144 44 299 17 429 -24 116 -79 256 -137 353 -47
                                        77 -228 265 -305 317 -153 103 -380 178 -543 179 l-48 0 3 -32z"/>
                                        <path d="M778 3873 c-35 -39 -40 -59 -23 -99 17 -40 70 -68 110 -58 14 4 37
                                        21 51 39 l25 33 -30 30 c-28 28 -31 28 -46 12 -18 -20 -19 -31 -2 -24 7 2 21
                                        -4 32 -15 14 -17 15 -23 5 -36 -21 -25 -68 -18 -101 14 -47 47 -36 111 19 111
                                        13 0 20 4 17 10 -11 17 -30 11 -57 -17z"/>
                                        <path d="M1633 3827 c-22 -12 -22 -12 31 -132 29 -66 68 -154 88 -195 19 -41
                                        47 -105 63 -142 15 -38 31 -68 35 -68 4 0 13 7 20 15 17 21 4 64 -72 229 -32
                                        72 -63 140 -68 151 -40 92 -70 155 -72 155 -2 -1 -13 -6 -25 -13z"/>
                                        <path d="M2750 3790 c-161 -21 -360 -104 -479 -199 -35 -28 -67 -51 -72 -51
                                        -13 0 -673 -662 -707 -709 -18 -24 -32 -50 -32 -58 0 -29 147 -8 420 62 219
                                        56 425 69 610 40 137 -23 201 -41 304 -87 122 -56 184 -58 227 -10 40 44 40
                                        93 0 133 -55 54 -131 31 -131 -40 0 -20 -6 -34 -16 -38 -21 -8 -34 14 -34 59
                                        0 27 7 44 30 66 83 84 230 15 230 -108 0 -99 -55 -150 -161 -150 -56 0 -85 8
                                        -190 50 -73 29 -161 56 -214 65 -116 21 -326 31 -350 18 -15 -9 -12 -11 21
                                        -17 57 -10 380 -120 444 -150 30 -15 75 -38 100 -53 66 -38 352 -227 370 -244
                                        25 -23 84 -65 102 -72 10 -3 72 -47 138 -97 l119 -90 31 44 c16 25 30 48 30
                                        53 0 5 16 33 37 63 47 72 134 254 168 355 58 174 56 358 -5 541 -108 320 -330
                                        526 -655 608 -75 19 -250 27 -335 16z"/>
                                        <path d="M667 3742 c-19 -21 -23 -37 -7 -27 13 8 119 -75 120 -92 0 -19 9 -16
                                        31 10 22 27 24 38 4 31 -15 -6 -120 67 -127 88 -2 5 -11 1 -21 -10z"/>
                                        <path d="M598 3635 c-25 -40 -26 -45 -9 -45 10 0 26 -9 35 -19 10 -11 29 -22
                                        42 -25 14 -4 28 -15 32 -26 7 -18 10 -16 36 16 31 39 38 64 19 71 -7 3 -10 -3
                                        -7 -15 8 -28 -21 -48 -51 -34 -29 13 -33 37 -8 50 14 9 14 11 -5 21 -17 9 -21
                                        9 -16 -2 3 -8 -1 -19 -9 -25 -11 -9 -18 -8 -31 7 -18 20 -12 51 11 51 8 0 11
                                        5 8 10 -11 18 -19 11 -47 -35z"/>
                                        <path d="M508 3498 c-27 -42 -40 -71 -29 -64 11 7 76 -22 122 -55 26 -18 26
                                        -18 37 6 9 19 8 23 -2 19 -7 -3 -24 4 -37 15 l-24 20 42 1 c41 0 73 19 73 43
                                        0 8 -4 7 -12 -1 -7 -7 -29 -12 -50 -12 -31 0 -38 4 -38 19 0 36 -60 43 -82 9z
                                        m60 -35 c2 -13 1 -23 -2 -23 -12 0 -56 24 -56 30 0 30 54 23 58 -7z"/>
                                        <path d="M1125 3458 c-38 -170 -55 -325 -55 -510 0 -184 14 -169 -133 -142
                                        -95 18 -117 15 -117 -14 0 -23 34 -33 172 -53 l88 -12 5 -36 c27 -175 67 -330
                                        116 -454 59 -148 154 -335 184 -362 6 -5 19 -22 28 -37 17 -27 17 -28 -10 -34
                                        -14 -4 -102 -4 -195 -1 l-169 7 3 -28 c3 -27 3 -27 108 -34 58 -4 152 -5 210
                                        -2 l105 6 26 -36 c33 -46 149 -176 157 -176 4 0 7 15 7 33 0 31 -46 99 -97
                                        146 -29 25 -22 41 18 41 33 0 35 2 32 28 -3 26 -5 27 -56 24 -40 -3 -58 0 -73
                                        14 -10 9 -19 20 -19 24 0 3 -29 54 -64 113 -112 186 -203 432 -241 646 -8 47
                                        -15 92 -15 99 0 9 34 12 139 12 l138 0 -4 24 c-5 24 -7 24 -138 28 -73 1 -137
                                        6 -141 10 -11 11 -7 353 5 438 6 41 18 113 27 159 14 70 14 85 3 92 -23 15
                                        -38 10 -44 -13z"/>
                                        <path d="M459 3359 c-37 -14 -60 -63 -47 -101 21 -60 88 -85 138 -51 34 23 40
                                        33 40 68 -1 35 -27 71 -65 85 -30 12 -31 12 -66 -1z m76 -42 c41 -21 48 -69
                                        14 -88 -43 -22 -129 23 -129 68 0 6 7 18 15 27 16 16 60 13 100 -7z"/>
                                        <path d="M260 3146 c-13 -39 -26 -78 -29 -86 -4 -12 -1 -12 15 1 18 16 25 15
                                        112 -11 99 -30 122 -43 123 -69 0 -17 21 34 33 84 7 28 7 29 -11 13 -17 -15
                                        -24 -16 -63 -4 -51 15 -61 43 -22 62 l23 12 -24 6 c-14 3 -33 9 -42 13 -15 5
                                        -16 3 -8 -12 14 -25 4 -57 -16 -51 -9 3 -28 8 -43 12 -16 3 -28 13 -28 21 0
                                        23 20 53 35 53 24 0 17 17 -8 22 -21 4 -26 -2 -47 -66z"/>
                                        <path d="M287 2893 c-3 -10 -8 -34 -11 -53 l-6 -35 66 -2 c40 -1 75 -8 90 -18
                                        23 -14 24 -14 24 4 0 11 3 28 7 38 5 15 4 16 -8 7 -22 -18 -79 -6 -79 17 0 11
                                        6 19 13 19 8 0 7 4 -3 10 -22 14 -29 12 -23 -9 6 -24 -11 -35 -43 -27 -20 6
                                        -24 11 -18 29 4 12 12 25 18 29 7 5 5 8 -6 8 -9 0 -19 -8 -21 -17z"/>
                                        <path d="M1871 2781 c-63 -21 -54 -8 -212 -271 -62 -102 -120 -194 -130 -205
                                        -37 -42 -79 -136 -73 -163 11 -48 35 -60 111 -55 95 6 102 -1 74 -76 -30 -83
                                        -26 -102 26 -121 l41 -15 -19 -24 c-30 -37 -25 -68 17 -93 32 -19 35 -25 30
                                        -52 -3 -17 -8 -69 -11 -116 -7 -98 1 -121 55 -158 33 -23 40 -24 150 -18 63 3
                                        142 8 175 12 52 5 64 3 94 -18 30 -20 41 -40 76 -138 23 -63 54 -135 69 -159
                                        43 -67 175 -227 265 -320 80 -82 81 -83 99 -63 9 11 100 86 202 167 333 263
                                        326 257 295 269 -42 16 -196 126 -240 171 -71 74 -109 142 -167 306 -47 132
                                        -97 229 -117 229 -14 0 -190 118 -277 186 -85 66 -141 142 -202 271 -25 54
                                        -27 68 -27 188 0 72 4 158 8 191 l9 62 -54 12 c-93 22 -206 22 -267 1z m60
                                        -150 c24 -15 55 -41 69 -56 22 -25 23 -27 5 -23 -11 3 -58 16 -105 29 -47 12
                                        -87 24 -89 26 -9 6 43 53 59 53 9 0 36 -13 61 -29z m42 -119 c26 -9 47 -19 47
                                        -22 0 -8 -123 -80 -129 -75 -7 8 -20 108 -15 117 6 9 20 6 97 -20z"/>
                                        <path d="M279 2722 c-27 -24 -30 -32 -24 -60 9 -42 48 -72 95 -72 30 0 44 6
                                        64 31 35 41 33 71 -5 103 -42 35 -89 35 -130 -2z m140 -27 c12 -12 12 -17 -2
                                        -38 -20 -32 -68 -41 -113 -22 -30 12 -35 19 -32 42 2 19 11 29 28 35 34 10
                                        102 0 119 -17z"/>
                                        <path d="M2246 2742 c-11 -19 -26 -142 -26 -223 0 -95 17 -159 71 -259 44 -82
                                        104 -141 249 -240 234 -162 243 -172 295 -330 85 -257 138 -326 353 -459 l83
                                        -51 30 22 c16 12 29 24 29 27 0 7 -48 38 -130 87 -77 46 -183 157 -218 229
                                        -17 33 -46 106 -66 162 -40 116 -54 145 -93 190 -32 36 -115 103 -188 153 -87
                                        58 -189 137 -216 166 -111 121 -144 245 -119 439 5 39 6 73 2 76 -13 13 -50
                                        20 -56 11z"/>
                                        <path d="M2355 2700 c-3 -5 -7 -63 -8 -127 -3 -159 15 -213 100 -303 34 -37
                                        90 -86 124 -111 283 -203 323 -242 365 -354 77 -209 97 -257 125 -294 45 -63
                                        105 -117 168 -152 31 -18 77 -47 102 -64 l45 -32 29 23 c24 19 27 25 16 38
                                        -13 16 -188 126 -200 126 -4 0 -24 17 -45 38 -44 41 -80 114 -136 272 -59 168
                                        -106 230 -245 327 -44 31 -84 61 -90 67 -5 7 -26 23 -45 36 -19 13 -65 48
                                        -102 78 -107 86 -146 189 -130 342 8 81 8 82 -15 91 -31 12 -50 11 -58 -1z"/>
                                        <path d="M2484 2634 c-13 -86 0 -185 32 -243 15 -29 40 -62 54 -72 84 -65 175
                                        -131 240 -176 173 -120 226 -195 300 -428 17 -55 40 -114 51 -132 29 -47 91
                                        -98 160 -133 34 -17 84 -46 110 -66 l49 -36 30 22 c29 21 30 23 15 40 -9 10
                                        -42 30 -72 45 -79 37 -168 100 -196 138 -38 50 -66 111 -113 246 -24 68 -56
                                        142 -70 163 -43 62 -134 140 -260 225 -220 147 -256 194 -258 342 l-1 85 -32
                                        13 -32 13 -7 -46z"/>
                                        <path d="M2609 2613 c-5 -69 2 -125 19 -159 24 -48 111 -128 172 -159 123 -64
                                        297 -218 331 -294 12 -25 43 -104 71 -176 74 -195 87 -210 262 -323 104 -67
                                        111 -69 133 -55 13 8 23 18 23 22 0 9 -83 70 -157 115 -34 20 -78 55 -97 78
                                        -31 36 -91 170 -126 280 -9 31 -37 77 -110 183 -26 37 -132 125 -200 165 -115
                                        68 -209 139 -227 173 -9 17 -20 54 -23 81 -4 43 -9 53 -37 69 -32 18 -33 18
                                        -34 0z"/>
                                        <path d="M2720 2557 c0 -34 24 -75 63 -104 91 -70 204 -147 233 -159 18 -7 59
                                        -41 93 -75 101 -101 147 -174 206 -330 30 -78 65 -157 78 -175 13 -19 70 -66
                                        128 -105 57 -40 114 -81 126 -91 21 -20 21 -20 52 3 l31 23 -27 28 c-14 15
                                        -71 58 -126 95 -54 37 -109 81 -122 98 -28 37 -62 111 -105 233 -55 155 -147
                                        258 -355 396 -195 129 -275 177 -275 163z"/>
                                        <path d="M250 2463 c0 -15 6 -23 18 -23 9 0 26 -7 36 -15 19 -14 19 -15 1 -35
                                        -10 -11 -24 -20 -32 -20 -8 0 -13 -12 -13 -32 0 -18 4 -28 8 -21 4 6 25 25 46
                                        42 28 23 49 31 77 31 23 0 39 -5 39 -12 0 -6 2 -9 5 -6 3 3 2 19 -1 37 -5 23
                                        -10 29 -17 22 -26 -26 -131 4 -159 44 -4 5 -8 0 -8 -12z"/>
                                        <path d="M276 2229 c8 -33 12 -65 8 -70 -3 -5 4 -9 15 -9 12 0 21 5 21 10 0 6
                                        -4 10 -10 10 -5 0 -10 8 -10 18 0 15 13 21 71 32 60 10 73 10 81 -1 7 -10 8
                                        -7 4 11 -3 14 -6 30 -6 37 0 8 -7 8 -27 -2 -16 -7 -52 -16 -82 -19 -53 -7 -54
                                        -7 -49 18 4 20 1 26 -12 26 -17 0 -17 -4 -4 -61z"/>
                                        <path d="M4735 2212 c-105 -140 -430 -221 -680 -168 -146 30 -278 95 -335 164
                                        l-30 37 0 -111 c0 -100 3 -116 26 -159 l25 -49 -25 -50 c-100 -197 93 -424
                                        297 -352 57 21 106 59 162 126 l50 60 80 -85 c86 -92 129 -115 211 -115 102 0
                                        208 79 239 177 21 65 14 141 -16 189 l-19 31 25 46 c24 43 25 52 23 172 l-3
                                        127 -30 -40z m-810 -420 c-3 -7 -5 -34 -5 -58 0 -41 -2 -44 -19 -34 -33 17
                                        -63 70 -69 117 l-5 46 52 -28 c34 -19 50 -33 46 -43z m705 44 c0 -30 -25 -83
                                        -53 -113 -17 -18 -33 -33 -37 -33 -3 0 -6 26 -6 59 l-1 59 41 20 c49 25 56 26
                                        56 8z m-565 -91 c29 -13 34 -19 25 -29 -11 -15 -68 -41 -74 -35 -4 4 5 79 9
                                        79 1 0 19 -7 40 -15z m361 -12 c3 -16 8 -34 10 -42 3 -10 -3 -12 -23 -6 -55
                                        13 -70 44 -30 63 33 16 36 15 43 -15z"/>
                                        <path d="M457 2157 c-8 -20 -139 -50 -149 -34 -10 15 -10 -8 -1 -41 3 -14 9
                                        -19 13 -13 8 14 120 43 142 37 13 -3 18 2 18 17 0 31 -15 53 -23 34z"/>
                                        <path d="M3350 2137 c0 -2 9 -22 20 -44 11 -23 31 -76 45 -118 48 -148 103
                                        -223 204 -275 23 -12 23 -12 16 32 -4 23 -13 46 -21 51 -30 18 -74 60 -74 72
                                        0 7 -6 17 -13 23 -7 6 -24 48 -37 93 -24 77 -28 84 -82 126 -32 24 -58 43 -58
                                        40z"/>
                                        <path d="M425 2050 c-9 -10 -20 -34 -24 -52 -6 -27 -12 -33 -31 -33 -22 0 -25
                                        5 -25 33 0 17 -4 30 -10 28 -17 -6 -7 -58 15 -80 19 -19 22 -20 48 -6 15 9 32
                                        30 38 48 14 45 29 58 49 42 18 -15 20 -51 4 -67 -9 -9 -6 -10 11 -6 19 5 21
                                        11 17 41 -11 65 -57 91 -92 52z"/>
                                        <path d="M520 1937 c0 -10 -7 -29 -16 -42 -13 -20 -25 -25 -60 -25 -37 0 -44
                                        -3 -49 -23 -4 -13 3 -42 14 -67 11 -25 20 -38 20 -29 1 10 26 25 68 42 54 22
                                        69 24 82 14 12 -10 14 -9 7 8 -5 11 -11 28 -13 37 -5 16 -7 16 -30 -2 -43 -33
                                        -59 -25 -29 14 28 37 31 52 16 76 -8 13 -10 12 -10 -3z m-50 -102 c10 -12 8
                                        -16 -15 -25 -14 -5 -31 -10 -36 -10 -13 0 -11 24 3 38 16 16 33 15 48 -3z"/>
                                        <path d="M575 1779 c-16 -6 -17 -8 -3 -8 10 -1 23 -11 29 -23 10 -18 8 -24
                                        -11 -40 -28 -22 -45 -18 -44 9 0 19 -2 20 -25 9 -18 -8 -21 -12 -9 -14 25 -5
                                        30 -30 8 -42 -40 -21 -57 -9 -51 37 1 7 -5 10 -13 7 -12 -5 -13 -10 -3 -32 21
                                        -48 47 -88 47 -71 0 15 114 77 133 71 5 -2 6 5 2 15 -4 10 -11 32 -16 50 -12
                                        38 -18 43 -44 32z"/>
                                        <path d="M4186 1584 l-39 -46 18 -32 c10 -17 28 -46 41 -64 l22 -33 40 62 41
                                        62 -37 48 c-20 27 -39 48 -42 49 -3 0 -23 -21 -44 -46z"/>
                                        <path d="M595 1584 c-33 -7 -66 -11 -72 -9 -16 5 -16 0 -2 -26 9 -18 12 -19
                                        22 -5 16 21 104 35 92 15 -24 -41 -58 -79 -67 -73 -5 4 -2 -5 7 -20 16 -25 18
                                        -25 31 -9 7 10 14 23 14 28 0 6 9 21 21 35 11 14 29 37 40 53 l20 27 -23 -1
                                        c-13 -1 -50 -8 -83 -15z"/>
                                        <path d="M4644 1490 c-51 -25 -52 -25 -82 -117 -103 -307 -291 -532 -562 -672
                                        -102 -53 -153 -69 -295 -95 -173 -31 -262 -36 -681 -36 l-422 0 -40 -33 c-23
                                        -17 -41 -35 -41 -39 -1 -12 947 -9 1057 3 182 20 283 46 458 121 121 52 294
                                        180 344 254 8 12 43 60 78 105 75 99 120 177 161 279 28 71 84 252 79 254 -2
                                        1 -26 -10 -54 -24z"/>
                                        <path d="M743 1503 c7 -11 -41 -53 -61 -53 -5 0 -15 -7 -22 -15 -7 -8 -21 -15
                                        -31 -15 -17 0 -17 -1 -1 -30 11 -19 18 -25 20 -15 4 18 95 85 116 85 22 0 20
                                        13 -6 36 -12 10 -18 14 -15 7z"/>
                                        <path d="M3730 1480 c-19 -17 -38 -30 -43 -30 -9 0 -121 -92 -146 -120 -9 -9
                                        -65 -57 -126 -106 -60 -48 -132 -106 -160 -129 -27 -23 -67 -52 -87 -64 -21
                                        -12 -38 -26 -38 -29 0 -4 -31 -32 -70 -62 -38 -30 -69 -59 -70 -63 0 -4 120
                                        -6 268 -4 279 4 344 12 477 58 188 65 348 201 438 372 l25 48 -27 47 c-15 26
                                        -35 61 -46 78 l-19 31 -45 -21 c-66 -30 -189 -29 -250 2 -25 12 -45 22 -45 22
                                        -1 -1 -17 -14 -36 -30z"/>
                                        <path d="M4319 1457 c-15 -23 -50 -85 -79 -138 -58 -107 -137 -218 -178 -249
                                        -15 -11 -52 -40 -84 -65 -69 -54 -147 -94 -253 -129 -132 -44 -246 -56 -544
                                        -56 l-270 0 -46 -40 -46 -40 328 0 c401 0 528 16 695 87 71 30 203 115 263
                                        169 22 20 52 46 66 59 73 64 176 245 205 360 14 57 15 68 3 76 -24 15 -33 10
                                        -60 -34z"/>
                                        <path d="M4444 1458 c-3 -4 -22 -57 -44 -118 -51 -146 -109 -237 -217 -341
                                        -155 -149 -309 -234 -515 -281 -85 -20 -127 -22 -503 -26 l-410 -4 -32 -24
                                        c-18 -14 -33 -30 -33 -36 0 -7 136 -9 463 -5 380 4 475 8 537 22 243 53 425
                                        157 593 335 72 77 93 107 150 222 55 112 97 219 97 249 0 10 -80 16 -86 7z"/>
                                        <path d="M750 1390 c-30 -27 -64 -50 -74 -50 -18 0 -19 -1 -1 -20 18 -20 18
                                        -20 29 1 6 12 26 34 45 48 l34 26 -7 -35 c-18 -90 -19 -145 -2 -159 14 -12 16
                                        -11 16 8 0 26 96 105 118 96 13 -5 13 -3 0 17 -17 26 -41 37 -32 15 3 -9 -11
                                        -28 -37 -51 -23 -20 -44 -34 -46 -33 -1 2 2 30 7 63 20 115 21 124 13 124 -4
                                        0 -33 -23 -63 -50z"/>
                                        <path d="M1890 1340 c-8 -5 -12 -11 -10 -13 48 -38 141 -104 197 -140 72 -46
                                        76 -46 96 -10 4 7 -14 24 -45 43 -29 18 -83 54 -120 81 -68 49 -90 57 -118 39z"/>
                                        <path d="M857 1175 c-52 -55 -76 -74 -89 -69 -26 8 -22 -3 10 -31 31 -28 44
                                        -32 36 -11 -10 27 114 156 150 156 29 0 56 -24 56 -49 0 -44 -115 -159 -152
                                        -153 -26 5 -23 1 28 -42 38 -32 45 -35 39 -17 -5 17 5 33 51 81 47 50 57 66
                                        61 104 5 40 2 48 -25 76 -52 51 -81 43 -165 -45z"/>
                                        <path d="M1175 1064 c15 -36 23 -99 15 -108 -5 -5 -32 -11 -60 -14 -48 -4 -49
                                        -5 -30 -19 14 -10 25 -11 33 -5 16 12 77 24 77 14 -1 -14 -28 -42 -41 -42 -8
                                        0 -4 -8 11 -20 30 -23 37 -25 37 -6 0 8 15 40 33 70 24 39 41 56 55 56 17 0
                                        15 3 -10 20 -32 21 -50 26 -40 10 8 -13 -14 -52 -26 -45 -5 4 -9 21 -9 39 0
                                        25 -7 38 -27 51 -25 17 -26 17 -18 -1z"/>
                                        <path d="M1335 952 c-11 -10 -31 -39 -45 -65 -14 -26 -31 -48 -40 -50 -10 -3
                                        -7 -7 10 -14 23 -10 26 -8 36 27 17 58 52 102 78 98 34 -5 32 -50 -3 -113 -30
                                        -52 -30 -55 -12 -65 25 -13 34 -13 26 0 -3 5 6 32 20 59 14 28 25 61 25 74 0
                                        52 -59 83 -95 49z"/>
                                        <path d="M1477 898 c12 -16 46 -108 42 -112 -14 -12 -71 -36 -86 -36 -14 -1
                                        -13 -4 7 -15 14 -7 26 -9 28 -4 5 13 62 42 69 35 3 -3 -2 -17 -11 -32 -10 -14
                                        -16 -27 -14 -29 8 -7 48 -25 54 -25 5 0 3 5 -3 11 -9 9 -6 28 13 78 14 36 30
                                        68 36 72 7 4 3 11 -10 18 -26 14 -45 14 -37 1 7 -12 -3 -50 -13 -50 -4 0 -14
                                        19 -22 41 -10 27 -23 45 -39 51 -18 6 -22 6 -14 -4z"/>
                                        <path d="M1645 788 c-8 -28 -15 -58 -15 -65 0 -7 -9 -22 -19 -32 -19 -19 -19
                                        -20 10 -30 27 -9 41 0 20 13 -9 6 6 84 19 99 4 4 22 -26 40 -68 24 -55 38 -75
                                        51 -75 13 0 19 7 19 23 0 36 27 119 42 128 8 5 4 11 -16 19 -16 6 -31 8 -34 5
                                        -3 -3 0 -5 6 -5 7 0 12 -10 12 -21 0 -27 -21 -99 -29 -99 -3 0 -22 36 -41 80
                                        -19 44 -38 80 -42 80 -4 0 -14 -23 -23 -52z"/>
                                        <path d="M1860 751 c5 -20 11 -62 15 -94 8 -70 16 -67 74 33 31 55 36 70 24
                                        74 -21 8 -23 8 -17 -7 2 -7 -2 -21 -10 -32 -12 -17 -17 -18 -41 -7 -21 10 -26
                                        18 -23 37 4 16 0 25 -12 28 -15 4 -16 0 -10 -32z m64 -60 c3 -4 -1 -17 -9 -27
                                        -8 -10 -15 -14 -15 -7 0 6 -3 18 -6 27 -6 17 20 23 30 7z"/>
                                        <path d="M2029 738 c21 -18 23 -27 17 -72 -3 -28 -6 -73 -6 -99 0 -40 -4 -49
                                        -22 -56 -18 -7 -8 -10 40 -12 34 -2 62 -1 62 4 0 4 -7 7 -15 7 -11 0 -15 12
                                        -15 50 l0 50 54 0 c30 0 57 -4 60 -8 10 -16 -7 -92 -20 -92 -8 0 -14 -4 -14
                                        -10 0 -5 25 -10 57 -10 54 0 55 1 40 18 -14 15 -16 34 -11 118 5 73 11 102 22
                                        112 13 10 6 12 -44 12 -45 -1 -55 -3 -41 -11 12 -7 17 -23 17 -59 0 -27 -4
                                        -51 -9 -54 -4 -3 -31 -3 -60 1 -49 6 -51 7 -51 37 0 46 11 76 26 76 8 0 14 5
                                        14 10 0 6 -27 10 -62 10 l-62 0 23 -22z"/>
                                        </g>
                                        </svg>
                                    </div>
                                    <span class="self-center text-2xl font-semibold">외청</span>
                                </a>
                            </div>
                            <div class="col-span-6 text-center md:text-left md:col-span-3">
                                <p class="pb-1 text-lg font-medium">Category</p>
                                <ul>
                                    <li>
                                        <a href="/" class="hover:dark:text-violet-400">Link</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-span-6 text-center md:text-left md:col-span-3">
                                <p class="pb-1 text-lg font-medium">Category</p>
                                <ul>
                                    <li>
                                        <a href="/" class="hover:dark:text-violet-400">Link</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="grid justify-center pt-6 lg:justify-between">
                            <div class="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
                                <span>©2021 All rights reserved</span>
                                <a href="#">
                                    <span>Privacy policy</span>
                                </a>
                                <a href="#">
                                    <span>Terms of service</span>
                                </a>
                            </div>
                            <div class="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
                                <a href="#" class="flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-400 dark:text-coolGray-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                    </svg>
                                </a>
                                <a href="#" class="flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-400 dark:text-coolGray-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="currentColor" class="w-5 h-5">
                                        <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z"></path>
                                    </svg>
                                </a>
                                <a href="#" class="flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-400 dark:text-coolGray-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
                                        <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
                </div>
                

            </div>
        );
    }
}
export default  Home;