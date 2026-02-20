import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Requirements from './pages/Requirements';
import Research from './pages/Research';
import UIDesign from './pages/UIDesign';
import SystemDesign from './pages/SystemDesign';
import Implementation from './pages/Implementation';
import Testing from './pages/Testing';
import Evaluation from './pages/Evaluation';
import Appendices from './pages/Appendices';
import UserManual from './pages/appendices/UserManual';
import GDPRPrivacy from './pages/appendices/GDPRPrivacy';
import MonthlyVideo from './pages/appendices/MonthlyVideo';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/requirements" element={<Requirements />} />
          <Route path="/research" element={<Research />} />
          <Route path="/ui-design" element={<UIDesign />} />
          <Route path="/system-design" element={<SystemDesign />} />
          <Route path="/implementation" element={<Implementation />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/appendices" element={<Appendices />} />
          <Route path="/appendices/user-manual" element={<UserManual />} />
          <Route path="/appendices/gdpr-privacy" element={<GDPRPrivacy />} />
          <Route path="/appendices/monthly-video" element={<MonthlyVideo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
