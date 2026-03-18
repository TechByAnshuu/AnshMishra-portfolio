import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { useTheme } from './ThemeContext';
import Loading from './components/Loading';
import Controller from './components/Controller';
import MeetMe from './components/MeetMe';
import Navbar from './components/Navbar';
// HeroIntro is the LANDING PAGE — import eagerly so it's never behind a lazy boundary
import HeroIntro from './components/HeroIntro';

// Remaining heavy sections — lazy loaded for fast initial paint
const LiquidEther = lazy(() => import('./components/LiquidEther'));
const Skills = lazy(() => import('./components/Skills'));
const Education = lazy(() => import('./components/Education'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const CodingActivity = lazy(() => import('./components/CodingActivity'));
const Certifications = lazy(() => import('./components/Certifications'));
const Socials = lazy(() => import('./components/Socials'));
const AllProjectsPage = lazy(() => import('./pages/AllProjects'));
const AllCertificationsPage = lazy(() => import('./pages/AllCertifications'));
const ResumePage = lazy(() => import('./pages/Resume'));

function AppContent() {
    const { theme } = useTheme();

    return (
        <div className="relative min-h-screen">
            {/* LiquidEther canvas — fixed z-0, HeroIntro at z-10 blocks it */}
            <div className="fixed inset-0 z-0">
                <Suspense fallback={null}>
                    <LiquidEther
                        colors={theme === 'dark' ? ['#B388FF'] : ['#4FC3F7']}
                        mouseForce={20}
                        cursorSize={100}
                        isViscous={false}
                        viscous={30}
                        iterationsViscous={32}
                        iterationsPoisson={32}
                        resolution={0.5}
                        isBounce={false}
                        autoDemo={true}
                        autoSpeed={0.5}
                        autoIntensity={2.2}
                        takeoverDuration={0.25}
                        autoResumeDelay={3000}
                        autoRampDuration={0.6}
                    />
                </Suspense>
            </div>

            <Navbar />
            <Controller />

            {/* NOTE: NO overflow-hidden here — it would break position:sticky inside HeroIntro */}
            <main className="relative z-10">
                {/* HeroIntro is the LANDING PAGE — first thing visitors see */}
                <HeroIntro photoSrc="/photo.jpg" />
                <MeetMe />
                <Suspense fallback={<Loading />}>
                    <Skills />
                    <Education />
                    <Projects />
                    <Experience />
                    <CodingActivity />
                    <Certifications />
                    <Socials />
                </Suspense>
            </main>
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <Routes>
                <Route path="/" element={<AppContent />} />
                <Route path="/projects" element={
                    <Suspense fallback={<Loading />}>
                        <AllProjectsPage />
                    </Suspense>
                } />
                <Route path="/certifications" element={
                    <Suspense fallback={<Loading />}>
                        <AllCertificationsPage />
                    </Suspense>
                } />
                <Route path="/resume" element={
                    <Suspense fallback={<Loading />}>
                        <ResumePage />
                    </Suspense>
                } />
            </Routes>
        </ThemeProvider>
    );
}