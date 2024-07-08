//import './App.css';
import { AuthProvider } from './context/AuthProvider';
import './prueba.css';
import Approuter from './routes/Approuter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  
  return (
    <>
        <ToastContainer/>
        <Approuter/>
    </>
  );
}

export default App;
