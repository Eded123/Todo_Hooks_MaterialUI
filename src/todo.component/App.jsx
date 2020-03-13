import React, { useState } from "react";
import "./App.scss";
import {
  Card,
  Container,
  Button,
  Typography,
  TextField,
  Grid,
  Checkbox
} from "@material-ui/core";

// forma de mostrar el Todo Todo en la lista de Todos
function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div className="divTodo">
      <Card className="cardListItems">
        <Checkbox className="checkItem" onClick={() => completeTodo(index)} />
        <input
          className="itemTodo"
          value={todo.text}
          style={{ textDecoration: todo.onCompleted ? "line-through" : "" }}
        ></input>
        <Typography className="DeleteItem" onClick={() => removeTodo(index)}>
          x
        </Typography>
      </Card>
    </div>
  );
}
//funcion del formulario para agregar Todos
function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    // Evaluar el Value del useState
    if (!value) return;
    addTodo(value);
    setValue("");
  }
  return (
    <div className="divFormTodo">
      <form className="formTodo" onSubmit={handleSubmit}>
        <TextField
          className="itemTodo"
          placeholder="Ingrese su tarea y presione enter..."
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        ></TextField>
      </form>
    </div>
  );
}

//funcion principal del componente App
export default () => {
  // inicializar useState
  const [todos, setTodos] = useState([{ text: "Tarea:", onCompleted: false }]);
  //Agregar un todo a la lista de todos
  function addTodo(text) {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  }
  //funcion actualizar Todos
  function completeTodo(index) {
    const newTodos = [...todos];
    newTodos[index].onCompleted = !newTodos[index].onCompleted;
    setTodos(newTodos);
  }
  // funcion para eliminar Todos
  function removeTodo(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <Container className="container">
      <Card className="card" elevation={20}>
        <div className="divAdditem">
          <Grid className="gridTitle">
            <Typography className="typographyTitle1">todo</Typography>
            <Typography className="typographyTitle2">`s</Typography>
          </Grid>
        </div>
        <TodoForm className="todoForm" addTodo={addTodo} />
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <footer className="footerTodo">
          <Typography className="textTarea">Tareas:</Typography>
          <Typography className="NoTodos">{[...todos].length}</Typography>
          <div className="buttonsFooter">
            <Button>Todas</Button>
            <Button>por hacer</Button>
            <Button>Completas</Button>
          </div>
        </footer>
      </Card>
    </Container>
  );
};
