var TodoItem=React.createClass({
  getInitialState:function(){
    return({editState:false});
  },
  onEdit:function(event){   
  if(event.nativeEvent.keyCode==13) {
    if(this.refs.onUserInput.value==""){
      alert("内容不能为空");
    }
    else{
      this.props.edit(
       this.refs.onUserInput.id,
       this.refs.onUserInput.value
      );
    }
  var state=this.state.editState;
  this.setState({
   editState:!state
  });
  console.log(state);
  }
  },
  onCheck:function(){
    console.log(event.onClick);
    this.props.changeDone(
       this.props.id,
       this.props.done
      );
  },
  onDelete:function(){
    this.props.deleteItem(
      this.props.id
      );
  },
  onDoingEdit:function(){
    var state=this.state.editState;
       this.setState({
        editState:!state
       });
  },
 render:function(){
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
var List=React.createClass({
    render:function(){
      var row1=[],row2=[],row3=[],row4=[];
      var todocount=0,donecount=0;
      //var todo=JSON.parse(localStorage.getItem("todo"));
      
      var todo=this.props.todo;
       console.log(todo);
       var i=0;
       console.log("1");
      if(todo==null) {todo=[];}        
       todo.forEach(function(todoItem){
        todoItem.id=i;
        i++;
        if(todoItem.done){
          
          row2.push(<TodoItem id={todoItem.id} value={todoItem.value} done={todoItem.done} 
              edit={this.props.edit} changeDone={this.props.changeDone} deleteItem={this.props.deleteItem}
            key={todoItem.id} />);
          donecount++;
        }
        if(todoItem.done==false){
          row1.push(<TodoItem id={todoItem.id} value={todoItem.value} done={todoItem.done} 
            edit={this.props.edit} changeDone={this.props.changeDone} deleteItem={this.props.deleteItem}
            key={todoItem.id} />);
          todocount++;
        }
      }.bind(this));
       for(var j=row1.length-1;j>=0;j--){
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
var TitleTable=React.createClass({
  onHandleInput:function(event){
    // console.log(event);
    // console.log(event.onclick);
    console.log(event.nativeEvent.onclick);
    if(event.nativeEvent.keyCode==13){ 
    console.log(event.nativeEvent);  
      if(this.refs.onUserInput.value==''){
        alert("内容不能为空");
      }
      else{
      this.props.addItem(
       this.refs.onUserInput.number,
       this.refs.onUserInput.value
       );       
     }
      this.refs.onUserInput.value="";
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
var Feed=React.createClass({
  
  getInitialState:function(){

   return {  
    todo:JSON.parse(localStorage.getItem("todo"))
     };
  },
  onAddItem:function(id,value){  
   var todoItem={id:id,value:value,done:false};
   //console.log(todoItem);
  
   if(this.state.todo==null){
      this.state.todo=[];
    }   
      var todo=this.state.todo;        
      var todo1=todo.concat([todoItem]);
      var todo2=JSON.stringify(todo1);   
      localStorage.setItem("todo",todo2);
      this.setState({todo:todo1});
      
      // console.log(todo);
      // console.log(todoItems);
      // console.log(todo1);
      // console.log(todo2);
 },
  onEdit:function(id,value){ 
  var todo=this.state.todo;
  //todo.splice(id,1)[0];
  todo[id].value=value;
  //todo.splice(id,0,todo[id]);   
    this.setState({
      todo:todo
    });
    console.log(id);
    console.log(value);
  },
  onChangeDone:function(id,done){ 
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
  onDeleteItem:function(id){
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
  onClear:function(){
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
