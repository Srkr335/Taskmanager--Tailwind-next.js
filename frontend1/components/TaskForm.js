import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTasks, addTask } from '../store/tasksSlice';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert('Title is required');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }),
            });

            if (response.ok) {
                const newTask = await response.json();
                dispatch(addTask(newTask));

                const res = await fetch('http://localhost:5000/api/tasks');
                const updatedTasks = await res.json();
                dispatch(setTasks(updatedTasks));

                setTitle('');
                setDescription('');
            } else {
                const errorData = await response.json();
                console.error('Error adding task:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-gray-50 rounded shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Add a New Task</h2>
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
