import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Validation from './pages/Validation.jsx';
import ICP from './pages/ICP.jsx';
import GTM from './pages/GTM.jsx';
import Revenue from './pages/Revenue.jsx';
import Investors from './pages/Investors.jsx';
import Briefing from './pages/Briefing.jsx';

const pk = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function Protected({ children }) {
  return <><SignedIn>{children}</SignedIn><SignedOut><RedirectToSignIn /></SignedOut></>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={pk}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/:id" element={<Protected><Dashboard /></Protected>} />
        <Route path="/validation/:id" element={<Protected><Validation /></Protected>} />
        <Route path="/icp/:id" element={<Protected><ICP /></Protected>} />
        <Route path="/gtm/:id" element={<Protected><GTM /></Protected>} />
        <Route path="/revenue/:id" element={<Protected><Revenue /></Protected>} />
        <Route path="/investors/:id" element={<Protected><Investors /></Protected>} />
        <Route path="/briefing/:id" element={<Protected><Briefing /></Protected>} />
      </Routes>
    </BrowserRouter>
  </ClerkProvider>
);
