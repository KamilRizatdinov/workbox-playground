import React, {useState} from 'react';
import VersionUpdateHandler from '../../components/VersionUpdateHandler'

function App() {
  const [counter, setCounter] = useState(0);
  
  return (
    <VersionUpdateHandler>
      <div className='app'>
        <div>{counter}</div>
        <button onClick={() => setCounter(count => count + 1)}>Increase</button>
        <button onClick={() => setCounter(count => count - 1)}>Decrease</button>
      </div>
    </VersionUpdateHandler>
  );
}

export default App;