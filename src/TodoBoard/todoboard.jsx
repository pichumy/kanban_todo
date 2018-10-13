import React from 'react';

const TodoBoard = (props) => {
  let todos = props.todos.map( (todo, idx) => {
    return (
      <div className="todo" key={idx}>
        {props.position > 0 ? <button onClick={props.moveLeft(props.position, idx)}> left </button> : null}
        {todo}
        {props.position < props.length - 1 ? <button onClick={props.moveRight(props.position, idx)}> right </button> : null}
      </div>
    )
  });
  return (
    <div className="todo-board">
      <header className="board-header" style={{backgroundColor:props.header.color}}>
        {props.header.title}
      </header>
      {todos}
      <button onClick={props.addCard(props.position)}>+ Add a card</button>
    </div>
  )
}

export default TodoBoard;
