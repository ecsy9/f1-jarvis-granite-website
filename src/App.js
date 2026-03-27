import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Requirements from './pages/Requirements';
import Research from './pages/Research';
import Algorithms from './pages/Algorithms';
import UIDesign from './pages/UIDesign';
import SystemDesign from './pages/SystemDesign';
import Implementation from './pages/Implementation';
import Testing from './pages/Testing';
import Evaluation from './pages/Evaluation';
import Appendices from './pages/Appendices';
import DownloadSetup from './pages/DownloadSetup';
import GDPRPrivacy from './pages/appendices/GDPRPrivacy';
import MonthlyVideo from './pages/appendices/MonthlyVideo';
import Interviews from './pages/appendices/Interviews';
import UserManual from './pages/appendices/UserManual';
import TeamMember from './pages/team/TeamMember';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/requirements" element={<Requirements />} />
          <Route path="/research" element={<Research />} />
          <Route path="/algorithms" element={<Algorithms />} />
          <Route path="/ui-design" element={<UIDesign />} />
          <Route path="/system-design" element={<SystemDesign />} />
          <Route path="/implementation" element={<Implementation />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/appendices" element={<Appendices />} />
          <Route path="/appendices/user-manual" element={<DownloadSetup />} />
          <Route path="/appendices/gdpr-privacy" element={<GDPRPrivacy />} />
          <Route path="/appendices/monthly-video" element={<MonthlyVideo />} />
          <Route path="/appendices/interviews" element={<Interviews />} />
          <Route path="/appendices/user-guide" element={<UserManual />} />
          <Route path="/team/:slug" element={<TeamMember />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
