var TodoItem=React.createClass({   //每一个<li>标签 数据的每一行
  getInitialState:function(){   //定义初始状态 方便在<p> 和<input> 之间转换
    return({editState:false});
  },
  onEdit:function(event){       //编辑
  if(event.nativeEvent.keyCode==13) {    //判断 回车为判断标志
    if(this.refs.onUserInput.value==""){  //判空
      alert("内容不能为空");
    }
    else{
      this.props.edit(            //回传函数参数
       this.refs.onUserInput.id,
       this.refs.onUserInput.value
      );
    }
  var state=this.state.editState;  //状态转换 编辑完成后显示为<p>标签
  this.setState({
   editState:!state
  });
  console.log(state);
  }
  },
  onCheck:function(){    //状态转换 "正在进行"和"已经完成"
    console.log(event.onClick);
    this.props.changeDone(    //回传参数
       this.props.id,
       this.props.done
      );
  },
  onDelete:function(){   //删除一行
    this.props.deleteItem(   //回传参数
      this.props.id
      );
  },
  onDoingEdit:function(){  //显示和编辑状态转换
    var state=this.state.editState;
       this.setState({
        editState:!state
       }); 
  },
 render:function(){     //渲染
  console.log(this.state.editState);
  if(this.state.editState){
  return(
     <li draggable="true">
        <input type="checkbox"  onblur={this.onCheck}  checked={this.props.done}/>
              <input type="text" ref="onUserInput" id={this.props.id}className="editState" onKeyUp={this.onEdit} />
             <a type="button" ref="button" onClick={this.onDelete}>-</a>
             </li>
    );
  }
  else{
		return(
             <li draggable="true">
             <input type="checkbox"  onClick={this.onCheck} checked={this.props.done} />                          
             <p 
             id={this.props.id}
             type="text"  
             onDoubleClick={this.onDoingEdit}
             >             
             {this.props.value}
             </p>
             <a type="button" ref="button" onClick={this.onDelete}>-</a>
             </li>
			);
	}
}
});
var List=React.createClass({   //列表项 包括“正在进行”和“已经完成” 以及clear项
    render:function(){    
      var row1=[],row2=[],row3=[],row4=[];
      var todocount=0,donecount=0;
      //var todo=JSON.parse(localStorage.getItem("todo"));
      
      var todo=this.props.todo;
       console.log(todo);
       var i=0;
       console.log("1");
      if(todo==null) {todo=[];}        
       todo.forEach(function(todoItem){   //遍历数组todo的每一项
        todoItem.id=i;  
        i++;
        if(todoItem.done){
          
          row2.push(<TodoItem id={todoItem.id} value={todoItem.value} done={todoItem.done} 
              edit={this.props.edit} changeDone={this.props.changeDone} deleteItem={this.props.deleteItem}
            key={todoItem.id} />);  //把已经完成的项放到数组row2中
          donecount++;
        }
        if(todoItem.done==false){
          row1.push(<TodoItem id={todoItem.id} value={todoItem.value} done={todoItem.done} 
            edit={this.props.edit} changeDone={this.props.changeDone} deleteItem={this.props.deleteItem}
            key={todoItem.id} />);  //没有完成的放到row1中
          todocount++;
        }
      }.bind(this)); //bind 改变上下文的this 具体的自己去查
       for(var j=row1.length-1;j>=0;j--){   //两个for循环是让新添加的放在最上边 也可以理解为按时间顺序从上到下
           row3[i]=row1[j];
          i++;
       }
       for(var j=row2.length-1;j>=0;j--){
          row4[i]=row2[j];
          i++;
       }
    	return(
            <section>
            <h2><strong>正在进行</strong><span id="todocount">{todocount}</span></h2> 
            <ol>
            {row3}
            </ol>
            <br />
            <br />
            <h2><strong>已经完成</strong><span id="donecount">{donecount}</span></h2>
            <ul>
            {row4}
            </ul>
            <a  onClick={this.props.clear} className="clear">clear</a>
            </section>
    		);
    }
});
var TitleTable=React.createClass({   //标题行
  onHandleInput:function(event){   //获取input 标签的value 以回车判断结束
    // console.log(event);
    // console.log(event.onclick);
    console.log(event.nativeEvent.onclick);
    if(event.nativeEvent.keyCode==13){ 
    console.log(event.nativeEvent);  
      if(this.refs.onUserInput.value==''){
        alert("内容不能为空");
      }
      else{
      this.props.addItem(           //传输参数
       this.refs.onUserInput.number,
       this.refs.onUserInput.value
       );       
     }
      this.refs.onUserInput.value=""; //数据传输之后把input的value设为""
   }
  },
	render:function(){
    
		return(
      <header>
			<section >
				<label htmlFor="title">TodoList</label>
				<input type="text" id="title" name="title" placeholder="添加ToDo" required="required"
                ref="onUserInput" 
                onKeyUp={this.onHandleInput}  />

			</section>
		</header>
			);
	}
});
var Feed=React.createClass({  //最外层组件
  
  getInitialState:function(){  //设立初始状态 初始数据

   return {  
    todo:JSON.parse(localStorage.getItem("todo"))
     };
  },
  onAddItem:function(id,value){   //添加新数据
   var todoItem={id:id,value:value,done:false};
   //console.log(todoItem);
  
   if(this.state.todo==null){
      this.state.todo=[];
    }   
      var todo=this.state.todo;        
      var todo1=todo.concat([todoItem]); //对数组todo添加新的数组[todoItem] 形成新的数组todo1 此为concat用法
      var todo2=JSON.stringify(todo1);   //将todo1的JSON格式文件转化为字符串形式
      localStorage.setItem("todo",todo2);//数据存放到localStorage里面
      this.setState({todo:todo1});//改变初始数据进行渲染
      
      // console.log(todo);
      // console.log(todoItems);
      // console.log(todo1);
      // console.log(todo2);
 },
  onEdit:function(id,value){   //编辑指定id的value
  var todo=this.state.todo;
  //todo.splice(id,1)[0];
  todo[id].value=value;   
  //todo.splice(id,0,todo[id]); 
    var todoupdata=JSON.stringify(todo);   
      localStorage.setItem("todo",todoupdata); 
    this.setState({
      todo:todo
    });
    console.log(id);
    console.log(value);
  },
  onChangeDone:function(id,done){  //改变指定id的done 
   //console.log(done);
   //console.log(id);
   var todo=this.state.todo; 
   todo[id].done=!done;
   var todoupdata=JSON.stringify(todo);   
      localStorage.setItem("todo",todoupdata); 

    this.setState(
      {todo:todo});
    // console.log(todo);
    // console.log(id);
    // console.log(todo[id].done);
  },
  onDeleteItem:function(id){    //删除指定id的那一行
    //console.log(id);
    var todo=this.state.todo;
    //console.log(todo);  
     todo.splice(id,1);
     var todoupdata=JSON.stringify(todoupdata);   
      localStorage.setItem("todo",todoupdata);
     this.setState({
     todo:todo
     });

  },
  onClear:function(){    //清除数据清空列表
    var todo=this.state.todo;
    localStorage.clear();
    this.setState({todo:[]});
  },
  // onMoveItem:function(id){
  //   var todo=this.state.todo;
  //   ev.prent

  // },
  // onDoubleClick:function(event){
  //  if(event.nativeEvent.ondblclick){
  //   //console.log(event.nativeEvent.ondblclick);
  //    return true;
  //  }
  //  else 
  //   return false;
  // },
  
   render:function(){
   	return(
         <div>
         <TitleTable addItem={this.onAddItem}  />
         <List  edit={this.onEdit} changeDone={this.onChangeDone} deleteItem={this.onDeleteItem}  
           todo={this.state.todo}  clear={this.onClear} />
         </div>
   		);
   }

});
    
ReactDOM.render(
     <Feed />,
     document.getElementById('example')
	)
