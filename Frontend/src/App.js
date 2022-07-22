
import './App.css';
import Header from './components/header/header';
import AddSecrets from './components/addSecrets/addSecrets';
import ShowSecrets from './components/showSecrets/showSecrets';
import {useState, useEffect} from 'react';
import axios from 'axios';


function App() {

  const [allSecrets, setAllSecrets] = useState([]);


  useEffect(() => {

    axios.get("http://localhost:3001/home")
    .then(res => setAllSecrets(res.data))
  }, [])



  return (
    <div className="App">
      <Header />
      <AddSecrets setAllSecrets={setAllSecrets}/>
      <ShowSecrets allSecrets={allSecrets} setAllSecrets={setAllSecrets}/>
    </div>
  );
}

export default App;