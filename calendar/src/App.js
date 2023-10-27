import logo from './logo.svg';
import './App.css';
import Calendar from './Calendar'; // Import your Calendar component




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Calendar /> {/* Replace default content with your Calendar component */}
      </header>
    </div>
  );
}

export default App;