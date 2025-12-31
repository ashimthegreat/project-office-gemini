import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Website (We will build this in Phase 3) */}
        <Route path="/" element={
          <div className="p-20 text-center">
            <h1 className="text-4xl font-bold">Public Website Under Construction</h1>
            <p className="mt-4">Go to <a href="/admin" className="text-blue-600 underline">/admin</a> to manage data.</p>
          </div>
        } />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
