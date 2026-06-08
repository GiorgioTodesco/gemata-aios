import { Routes, Route } from 'react-router-dom'
import { Navigation } from './components/layout/Navigation'
import { HeroPage } from './pages/HeroPage'
import { ArchitecturePage } from './pages/ArchitecturePage'
import { ContextOSPage } from './pages/ContextOSPage'
import { DataOSPage } from './pages/DataOSPage'
import { IntelOSPage } from './pages/IntelOSPage'
import { AutomatePage } from './pages/AutomatePage'
import { BuildPage } from './pages/BuildPage'
import { TechStackPage } from './pages/TechStackPage'
import { RoadmapPage } from './pages/RoadmapPage'
import { ReportPage } from './pages/ReportPage'

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/contextos" element={<ContextOSPage />} />
        <Route path="/dataos" element={<DataOSPage />} />
        <Route path="/intelos" element={<IntelOSPage />} />
        <Route path="/automateos" element={<AutomatePage />} />
        <Route path="/build" element={<BuildPage />} />
        <Route path="/tech-stack" element={<TechStackPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </>
  )
}
