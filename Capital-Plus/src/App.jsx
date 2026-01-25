import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './components/Dashboard'
import BudgetPlan from './components/budg_p'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/budg_p" element={<BudgetPlan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App