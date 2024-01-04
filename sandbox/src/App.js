import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import { PizzaCreatePage } from "./PizzaCreatePage";
import { PizzaListPage } from "./PizzaListPage";
import { PizzaSinglePage } from "./PizzaSinglePage";
import { PizzaModPage } from "./PizzaModPage";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="active">
                <span className="nav-link">Pizzák</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/uj-pizza" className="active">
                <span className="nav-link">Új pizza</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<PizzaListPage />} />
        <Route path="/pizza/:pizzaId" element={<PizzaSinglePage />} />
        <Route path="/uj-pizza" element={<PizzaCreatePage />} />
        <Route path="/mod-pizza/:pizzaId" element={<PizzaModPage />} />
      </Routes>
    </Router>
  );
}

export default App;
