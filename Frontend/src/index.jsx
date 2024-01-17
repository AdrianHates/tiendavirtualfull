import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Scroll from './Componentes/Componentes/Scroll';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     
    <BrowserRouter>
      <Scroll />
      <App />
    </BrowserRouter>
  
);
