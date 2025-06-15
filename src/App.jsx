import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import ExplorePage from './pages/ExplorePage';
import AuthPage from './pages/AuthPage';

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/login" element={<AuthPage />} />
    </Routes>
  </>
);

export default App;
