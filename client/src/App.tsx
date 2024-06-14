import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Todo {
  id: number;
  name: string;
  status: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [switchOn, setSwitchOn] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get<Todo[]>('http://localhost:8080/api/v1/tasks'); // Thay đổi endpoint phù hợp với server của bạn
      setTodos(response.data);
      console.log('todos',todos);
      
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleCheckboxChange = async (id: number) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      const updatedTodo = { ...todoToUpdate, status: !todoToUpdate.status };
      await axios.put(`http://localhost:8080/api/v1/tasks/${id}`, updatedTodo);
      fetchTodos(); // Cập nhật lại danh sách sau khi thay đổi trạng thái
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/tasks/${id}`);
      fetchTodos(); // Cập nhật lại danh sách sau khi xóa
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleSwitchChange = () => {
    setSwitchOn(!switchOn);
    // Tạm thời chưa xử lý sắp xếp lại danh sách theo switch
  };

  const handleAddTodo = async () => {
    try {
      await axios.post('http://localhost:8080/api/v1/tasks', { name: newTodo, status: false });
      fetchTodos(); // Cập nhật lại danh sách sau khi thêm mới
      setNewTodo(''); // Xóa nội dung trong input
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className='box1'>
      <div className='box2'>
        <h1 className='font-mono'>Todo List</h1>
        <p className='box9'>Get things done, one item at a time</p>
        <p>__________________________________</p>
      </div>

      <ul className='box3'>
        {todos.map(todo => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.status ? 'line-through' : 'none' }}>
              {todo.name}
            </span>
            <div className='box5'>
              <input
                checked={todo.status}
                className='box7'
                type='checkbox'
                onChange={() => handleCheckboxChange(todo.id)}
              />
              <span className='box6 material-symbols-outlined' onClick={() => handleDeleteClick(todo.id)}>
                delete
              </span>


            </div>
          </li>
        ))}
      </ul>

      <div className='box8'>
        <p>Move done items at the end?</p>
        <div className='switch'>
          <input
            type='checkbox'
            id='toggleSwitch'
            checked={switchOn}
            onChange={handleSwitchChange}
          />
          <label htmlFor='toggleSwitch'></label>
        </div>
      </div>

      <h3>Add to the todo list</h3>
      <div>
        <input
          type='text'
          className='box4'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>ADD ITEM</button>
      </div>
    </div>
  );
}

export default App;
