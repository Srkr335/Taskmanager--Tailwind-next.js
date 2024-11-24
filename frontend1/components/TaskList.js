import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks, deleteTask, toggleTaskCompletion } from '../store/tasksSlice';

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch('http://localhost:5000/api/tasks');
            const data = await res.json();
            dispatch(setTasks(data));
        };
        fetchTasks();
    }, [dispatch]);

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' });
        dispatch(deleteTask(id));
    };

    const handleToggle = async (id) => {
        await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'PATCH' });
        dispatch(toggleTaskCompletion(id));
    };

    return (
        <ul>
            {tasks.map(task => (
                <li key={task._id} className="flex justify-between items-center p-2 border-b">
                    <div>
                        <h3 className={task.completed ? 'line-through' : ''}>{task.title}</h3>
                        <p>{task.description}</p>
                    </div>
                    <div>
                        <button onClick={() => handleToggle(task._id)} className="px-2 py-1 bg-green-500 text-white rounded">Complete</button>
                        <button onClick={() => handleDelete(task._id)} className="px-2 py-1 bg-red-500 text-white rounded ml-2">Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
