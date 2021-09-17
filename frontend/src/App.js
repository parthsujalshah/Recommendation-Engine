import Home from './pages/Home';
import Readername from './pages/Readername';
import 'antd/dist/antd.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div style={{justifyContent: "center", alignItems: "center", display: "flex", marginTop: 50}}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Readername} />
          <Route path="/books" exact component={Home}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
