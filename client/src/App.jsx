import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/OthersPage/Home';
import About from './pages/OthersPage/About'; // Add this line
import PageNotFound from './pages/OthersPage/PageNotFound';
import Navbar from './components/Navbar';
import TouristRegistration from './pages/TouristPages/TouristRegistration';
import TouristDashboard from './pages/TouristPages/TouristDashboard';
import ToutristSignIn from './pages/TouristPages/ToutristSignIn';
import TouristNewJourney from './pages/TouristPages/TouristNewJourney';
import TravelPlanner from './pages/TouristPages/TravelPlanner';
import PlannedJourney from './pages/TouristPages/PlannedJourney';
import TouristProfile from './pages/TouristPages/TouristProfile';
import Complaint from './pages/TouristPages/Complaint';
import Guide from './pages/TouristPages/guide';
import AuthoritySigin from './pages/AuthorityPages/AuthoritySigin';
import Translator from './components/Translator';
import AuthorityDashBoard from './pages/AuthorityPages/AuthorityDashBoard';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path='/tourist/registration' element={<TouristRegistration/>}/>
        <Route path='/tourist/signin' element={<ToutristSignIn/>}/>
        <Route path='/tourist/dashboard' element={<TouristDashboard/>}/>
        <Route path="/tourist/new-journey" element={< PlannedJourney/>} />
        <Route path="/tourist/travel-planner" element={<TravelPlanner />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/tourist/planned-journey" element={<PlannedJourney />} />
        <Route path="/tourist/profile" element={<TouristProfile />} />
        <Route path="/tourist/complaint" element={<Complaint />} />
        <Route path="/tourist/guide" element={<Guide/>} />


        {/* authority */}
        <Route path='/authority/signin' element={<AuthoritySigin/>}/>
        <Route path='/authority/dashboard' element={<AuthorityDashBoard/>}/>

        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App;