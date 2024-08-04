import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Posts from './components/Posts';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';
import Tasks from './components/Task';
import Albums from './components/Albums';
import Todos from './components/Todos';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="container mt-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/create" element={<CreateTask />} />
        <Route path="/tasks/edit/:id" element={<EditTask />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </div>
  );
}

export default App;
