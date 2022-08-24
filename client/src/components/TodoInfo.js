import MainContext from '../Context'
import { useContext } from 'react'
import axios from 'axios'
import config from '../config'
import { Button } from 'antd'
import "antd/dist/antd.min.css";
const TodoInfo = () => {
  const { todos, setTodos } = useContext(MainContext)

  const deleteAllTodos = async () => {
    await todos.map((todo) => {
      axios
        .delete(config.apiUrl + todo._id)
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => console.log(error))
    })
    await axios
      .get(config.apiUrl)
      .then((response) => setTodos(response.data.reverse()))
      .catch((error) => console.log(error))
  }

  return (
    <div className="todo-info mt-3">
      {todos.length > 0 ? (
        <>
          {todos.filter((t) => !t.completed).length === 0 ? (
            <p className="d-none d-sm-block">All tasks completed</p>
          ) : (
            <p className="d-none d-sm-block">
              You have {todos.filter((t) => !t.completed).length} pending tasks
            </p>
          )}
          {/* ANTD Button with danger status */}
          <Button className="btn btn-danger" danger = 'true' onClick={() => deleteAllTodos()}>
            Clear All
          </Button>
        </>
      ) : null}
    </div>
  )
}

export default TodoInfo
