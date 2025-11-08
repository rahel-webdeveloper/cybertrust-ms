import { Outlet } from 'react-router';

function App() {
  return (
    <div className="h-screen flex items-center flex-col justify-center gap-7">
      <h1 className="text-2xl text-center mx-10">
        Welcome to <span className="font-bold">Cyber Trust MS</span> Web App
      </h1>
      <Outlet />
    </div>
  );
}

export default App;
