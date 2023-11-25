import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';


export default function App() {
  return (
    <Router>
      <Header />
      <SideBar />
      <Routes>
        <Route path="/" />
      </Routes>
    </Router>
  );
}
