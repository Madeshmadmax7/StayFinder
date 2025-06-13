import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Booking from './pages/Booking';
import ExplorePage from './pages/ExplorePage';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/booking" element={<Booking />} />
    </Routes>
  </>
);

export default App;
