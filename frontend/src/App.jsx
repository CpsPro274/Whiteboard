import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    socket.on('sync-click', (data) => {
      setPoints((prev) => [...prev, data]);
    });

    return () => socket.off('sync-click');
  }, []);

  const handleClick = () => {
    const newPoint = { x: Math.floor(Math.random() * 200), y: Math.floor(Math.random() * 200) };
    socket.emit('test-click', newPoint);
    setPoints((prev) => [...prev, newPoint]);
  };
  return (
    <div style={{ padding: '20px' }}>
      <h1>Vertical Slice Test</h1>
      <button onClick={handleClick} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Send Data to Backend
      </button>
      <div style={{ marginTop: '20px', border: '1px solid #ccc', height: '300px', position: 'relative' }}>
        {points.map((p, i) => (
          <div key={i} style={{
            position: 'absolute', left: p.x, top: p.y,
            width: '10px', height: '10px', background: 'red', borderRadius: '50%'
          }} />
        ))}
      </div>
    </div>
  );
}

export default App;