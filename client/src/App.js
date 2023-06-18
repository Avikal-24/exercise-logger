import './App.css';
import NavBar from './components/NavBar';
import ExerciseLog from './components/ExerciseLog';
import AddUser from './components/AddUser';
import AddExercise from './components/AddExercise';
import EditExercise from './components/EditExercise';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>

      <NavBar />

      <div className="container">
        <Routes>
          <Route exact path='/' element={<ExerciseLog />} />
          <Route exact path='/user' element={<AddUser />} />
          <Route exact path='/exercise' element={<AddExercise />} />
          <Route exact path='/edit/:id' element={<EditExercise />} />

        </Routes>

      </div>

    </Router>

  );
}

export default App;
