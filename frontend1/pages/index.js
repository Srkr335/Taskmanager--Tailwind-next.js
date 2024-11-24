import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Home = () => (
    <div className="max-w-md mx-auto p-4">
        <TaskForm />
        <TaskList />
    </div>
);

export default Home;
