import './App.css';

function App() {
  const hello = 1;

  return (
    <div>
      <h1 className="App">
        Hello World! {hello}
      </h1>
      
      <div className="App">
        Hello World! {hello}
      </div>
    </div>
  );
}

export default App;
