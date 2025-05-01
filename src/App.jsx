import Header from "./Header/Header.jsx";
import Card from "./Card/Card.jsx";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
function App() {
  return (
   <Router>
      <div>
        <Header></Header>
        <Card></Card>
      </div>
    </Router>
  );
}

export default App
