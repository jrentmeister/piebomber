import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import EventsPage from './pages/EventsPage';
import CateringPage from './pages/CateringPage';
import OurStoryPage from './pages/OurStoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/catering" element={<CateringPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
