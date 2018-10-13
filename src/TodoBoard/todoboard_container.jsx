import React from 'react';
import TodoBoard from './todoboard';
import './todo.css';

class TodoBoardMain extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      input0: '',
      headers: [{title:"Winnie", color:"#8E6E95"}, {title:"Bob", color:"#39A59C"}, {title:"Thomas", color:"#344759"}, { title:"George", color:"#E8741E"}],
      todos: [['one', 'two'], ['1', '3'], ['1', '4'], ['1', '5']],
      input1: '',
      input2: '',
      input3: '',
      history: []
    }
    this.addCard = this.addCard.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.undo = this.undo.bind(this);
  }

  componentDidMount(){
    if(this.props.cookie){
      this.setState(JSON.parse(this.props.cookie));
    }
  }

  componentDidUpdate(){
    let savedState = Object.assign({}, this.state);
    savedState.history = [];
    document.cookie = `data=${JSON.stringify(savedState)}`;
  }

  addCard = (position) => {
    return (e) => {
      let string = window.prompt();
      this.setState(prevState => {
        prevState.todos[position].push(string);
        prevState.history.push({ type:"add", column: position, row: prevState.todos[position].length - 1});
        return prevState;
      })
    }
  }

  moveLeft = (column_position, card_position) => {
    return () => {
      this.setState(prevState => {
        let removedElement = prevState.todos[column_position].splice(card_position, 1);
        prevState.todos[column_position - 1].push(removedElement);
        prevState.history.push({type: "moveLeft", column: column_position, row: card_position});
        return prevState;
      })
    }
  }

  moveRight = (column_position, card_position) => {
    return () => {
      this.setState(prevState => {
        let removedElement = prevState.todos[column_position].splice(card_position, 1);
        prevState.todos[column_position + 1].push(removedElement);
        prevState.history.push({type: "moveRight", column: column_position, row: card_position});
        return prevState;
      })
    }
  }

  undo = () => {
    if(this.state.history.length === 0){
      console.log("History is empty!");
      return 0;
    }
    let thingUndone = this.state.history.pop();
    console.log(thingUndone);
    if(thingUndone.type === "add"){
      this.setState(prevState => {
        return prevState.todos[thingUndone.column].splice(thingUndone.row, 1);
      })
    }else if(thingUndone.type === "moveLeft"){
      this.setState(prevState => {
        let removedElement = prevState.todos[thingUndone.column - 1].splice(this.state.todos[thingUndone.column - 1].length - 1, 1);
        prevState.todos[thingUndone.column].push(removedElement);
        return prevState
      })
    }else if(thingUndone.type === "moveRight"){
      this.setState(prevState => {
        let removedElement = prevState.todos[thingUndone.column + 1].splice(this.state.todos[thingUndone.column + 1].length - 1, 1);
        prevState.todos[thingUndone.column].push(removedElement);
        return prevState;
      })
    }
  }

  render(){
    return(
      <div className="todo-board-container">
        {
          this.state.todos.map( (todo_board, idx) => {
            return <TodoBoard position={idx} length={this.state.todos.length} addCard={this.addCard} todos={todo_board} key={idx} header={this.state.headers[idx]}
              moveLeft={this.moveLeft}
              moveRight={this.moveRight}
                    />
          })
        }
        <button onClick={this.undo}> Undo </button>
      </div>
    );
  }
}

export default TodoBoardMain;
