
import { useContext } from 'react'
import MainContext from '../Context'
import config from '../config'
import axios from 'axios'
import "antd/dist/antd.min.css";
import {Button, Input} from 'antd';
import { EditTwoTone} from '@ant-design/icons';
const TodoForm = () => {
  const { todo, setTodo } = useContext(MainContext)
  const { todos, setTodos } = useContext(MainContext)
  const { update, setUpdate } = useContext(MainContext)

  const addTodo = async (data) => {
    if (data !== null)
      await axios
        .post(config.apiUrl, { content: data })
        .then((response) => {
          console.log(response.data)
          document.getElementById('todo-form').value = null
          setTodo(null)
          document.location.reload()
        })
        
        .catch((error) => console.log(error))
        
    else return false
  }

  const updateTodo = async (data) => {
    setTodo(null)
    if (data !== null) {
      const content = document.getElementById('todo-form').value
      await axios
        .put(config.apiUrl + data._id, {
          content: content !== null ? content : data.content,
          date: new Date(),
        })
        .then((response) => {
          console.log(response.data)
          document.getElementById('todo-form').value = null
          setUpdate(null)
        })
        .catch((error) => console.log(error))
    }
    document.location.reload()
  }

  return (
    <div className="todo-form mt-3">
      
      {/*ANTD Input Component*/}
      <Input
        className="form-control"
        id="todo-form"
        type="text"
        placeholder="Add new todo"
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={(k) =>
          k.keyCode === 13
            ? update !== null
              ? updateTodo(update)
              : addTodo(todo)
            : null
        }
      >
      </Input>
        {/* ANTD Buttons with same logic */}
      {update === null ? (
        <Button className="btn btn-info" onClick={() => addTodo(todo)}>
           + 
        </Button>
      ) : (
        <Button className="btn btn-warning" onClick={() => updateTodo(update)}>
          {/* edit icon*/}
          <EditTwoTone classname style={{ fontSize: '20px'}}/>
          
        </Button>
        
      )}
      
    </div>
  )
}

export default TodoForm
