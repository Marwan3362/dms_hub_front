import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/Toast';

// Pages
import { LandingPage } from './modules/landing/LandingPage';
import { DocsHub } from './modules/docs/DocsHub';
import { SandboxPage } from './modules/sandbox/SandboxPage';
import { QueryRunnerPage } from './modules/query-runner/QueryRunnerPage';
import { AiPlaygroundPage } from './modules/ai/AiPlaygroundPage';
import { MarketplacePage } from './modules/marketplace/MarketplacePage';
import { RevenueCalculatorPage } from './modules/calculator/RevenueCalculatorPage';
import { AcademyPage } from './modules/academy/AcademyPage';
import { ForumPage } from './modules/forum/ForumPage';
import { GamificationPage } from './modules/gamification/GamificationPage';
import { PartnerDashboardPage } from './modules/partner/PartnerDashboardPage';
import { AdminPage } from './modules/admin/AdminPage';
import { ProfilePage } from './modules/profile/ProfilePage';

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <div className="min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-night-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-primary selection:text-white transition-colors duration-150">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/docs" element={<DocsHub />} />
                    <Route path="/sandbox" element={<SandboxPage />} />
                    <Route path="/query-runner" element={<QueryRunnerPage />} />
                    <Route path="/ai-hub" element={<AiPlaygroundPage />} />
                    <Route path="/marketplace" element={<MarketplacePage />} />
                    <Route path="/calculator" element={<RevenueCalculatorPage />} />
                    <Route path="/academy" element={<AcademyPage />} />
                    <Route path="/forum" element={<ForumPage />} />
                    <Route path="/gamification" element={<GamificationPage />} />
                    <Route path="/dashboard" element={<PartnerDashboardPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
                <ToastContainer />
              </div>
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
