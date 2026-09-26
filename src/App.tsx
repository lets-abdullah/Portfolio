import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ChatbotWidget } from './components/ChatbotWidget';
import { Home } from './pages/Home';
import { Aurora } from './components/react-bits';

export const App: React.FC = () => {
  return (
    <Router>
      {/* Global Ambient Aurora Background Animation Across Full Viewport */}
      <Aurora
        colorStops={['#2D313A', '#3C414A', '#C99327']}
        amplitude={0.8}
        blend={0.45}
        speed={0.4}
      />
      <div
        className="app-layout"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        <CustomCursor />
        <Navbar />
        
        <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
        <ChatbotWidget />
      </div>
    </Router>
  );
};

export default App;
