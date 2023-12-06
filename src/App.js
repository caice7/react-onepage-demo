import { useEffect } from 'react';
import './App.scss';
import { msg } from '@/tools';
import Login from './login';

function App() {
  useEffect(() => {
    msg.success('引入ant');
  }, []);
  return (
    <div className="App">
      <Login />
      123
      <a>222</a>
    </div>
  );
}

export default App;
