import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';


//styles
import './App.css';

//pages & components
import { Create, Dashboard, Login, Project, Signup } from './pages';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OnlineUsers from './components/OnlineUsers'

function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
            <div className="container">
              <Navbar />
              <Routes>
                <Route path='/' element={user ? <Dashboard /> : <Navigate to="/login" />}></Route>
                <Route path='login' element={user ? <Navigate to="/" /> : <Login />}></Route>
                <Route path='signup' element={user ? <Navigate to="/" /> : <Signup />}></Route>
                <Route path='create' element={user ? <Create /> : <Navigate to="/login" />}></Route>
                <Route path='projects/:id' element={user ? <Project /> : <Navigate to="/login" />}></Route>
              </Routes>
            </div>
            {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
