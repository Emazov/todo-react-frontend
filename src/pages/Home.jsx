import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
	const [todo, setTodo] = useState({
		task: '',
	});

	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const fetchAllTodos = async () => {
			try {
				const res = await axios.get('/todos');
				setTodos(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchAllTodos();
	}, []);

	const handlerChange = async (e) => {
		setTodo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handlerSubmit = async (e) => {
		e.preventDefault();
		const todoInput = document.querySelector('.todo_input');
		try {
			if (!todoInput.value) {
				return console.log('Write task!');
			}
			await axios.post('/todos', todo);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const handlerDelete = async (id) => {
		try {
			await axios.delete('/todos/' + id);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='container'>
			<h2 className='title'>To Do List</h2>
			<form className='todo_form'>
				<input
					required
					type='text'
					className='todo_input'
					placeholder='Write new task...'
					onChange={handlerChange}
					name='task'
				/>
				<button className='todo_btn' onClick={handlerSubmit}>
					Add
				</button>
			</form>
			<p></p>
			<div className='todo_list'>
				{todos.map((task, index) => (
					<div
						className={`list_item isDone_${task.isDone}`}
						key={task.id}
						id={task.id}
					>
						<div className='left'>
							<span>{index + 1}.</span>
							<h4 className='list_item__text'>{task.task}</h4>
						</div>
						<div className='list_item__btns'>
							{/* <button className='list_item__btn'>Done</button> */}
							<button
								className='list_item__btn'
								onClick={() => handlerDelete(task.id)}
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
			{/* <button className='todo_btn'>Delete All</button> */}
		</div>
	);
};

export default Home;
