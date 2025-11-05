import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen flex items-center flex-col justify-center gap-7">
      <h1 className="">
        Welcome to <span className="font-bold">Cyber Trust MS</span> Web App
      </h1>
      <div className="card">
        <button
          className="btn btn-info rounded-full mx-auto shadow-none"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
