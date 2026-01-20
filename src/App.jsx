import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Homepage from './components/Homepage'
import IntroPage from './components/IntroPage'
import Step1 from './components/steps/Step1'
import Step2 from './components/steps/Step2'
import Step3 from './components/steps/Step3'
import Step4 from './components/steps/Step4'
import Step5 from './components/steps/Step5'
import Step6 from './components/steps/Step6'
import Step7 from './components/steps/Step7'
import Step8 from './components/steps/Step8'
import Step9 from './components/steps/Step9'
import Conclusion from './components/Conclusion'

const INITIAL_FORM_DATA = {
  problemAndImportance: '',
  researchQuestion: '',
  priorWork: '',
  sharingPlan: '',
  simplestExperiment: '',
  baselines: '',
  computeAccess: '',
  workloadType: '',
  dependencies: '',
  resources: [{ type: '', name: '', source: '' }],
  nonGoals: '',
  scopeV1: '',
  priorities: '',
  knownLimitations: ''
}

function App() {
  const [currentStep, setCurrentStep] = useState('home')
  const [showSaved, setShowSaved] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('co-scope-data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Migrate old data structure to new one
        if (parsed.whyImportant && !parsed.problemAndImportance) {
          parsed.problemAndImportance = parsed.whyImportant
          delete parsed.whyImportant
        }
        if (parsed.publishableExplanation && !parsed.sharingPlan) {
          parsed.sharingPlan = parsed.publishableExplanation
          delete parsed.publishableExplanation
        }
        if (parsed.isPublishable) {
          delete parsed.isPublishable
        }
        if (parsed.additionalDetails && !parsed.nonGoals) {
          // Move old additionalDetails to scopeV1 as a reasonable default
          parsed.scopeV1 = parsed.additionalDetails
          delete parsed.additionalDetails
        }
        return { ...INITIAL_FORM_DATA, ...parsed }
      } catch (e) {
        console.error('Error parsing saved data:', e)
        return INITIAL_FORM_DATA
      }
    }
    return INITIAL_FORM_DATA
  })

  useEffect(() => {
    localStorage.setItem('co-scope-data', JSON.stringify(formData))
    setShowSaved(true)
    const timer = setTimeout(() => setShowSaved(false), 2000)
    return () => clearTimeout(timer)
  }, [formData])

  // Close sidebar when navigating on mobile
  const handleStepChange = (step) => {
    setCurrentStep(step)
    setSidebarOpen(false)
  }

  // Close sidebar when clicking overlay
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const completedSteps = () => {
    const completed = []
    if (formData.problemAndImportance.trim()) completed.push(1)
    if (formData.researchQuestion.trim()) completed.push(2)
    if (formData.priorWork.trim()) completed.push(3)
    if (formData.sharingPlan.trim()) completed.push(4)
    if (formData.simplestExperiment.trim()) completed.push(5)
    if (formData.baselines.trim()) completed.push(6)
    if (formData.computeAccess.trim() || formData.workloadType.trim() || formData.dependencies.trim()) completed.push(7)
    if (formData.resources.some(r => r.name.trim())) completed.push(8)
    if (formData.nonGoals.trim() || formData.scopeV1.trim() || formData.priorities.trim() || formData.knownLimitations.trim()) completed.push(9)
    return completed
  }

  const completed = completedSteps()

  const renderStep = () => {
    const props = {
      formData,
      updateFormData,
      onNext: (step) => setCurrentStep(step),
      onPrev: (step) => setCurrentStep(step)
    }

    switch (currentStep) {
      case 'home':
        return <Homepage onStart={() => setCurrentStep('intro')} />
      case 'intro':
        return <IntroPage onNext={(step) => setCurrentStep(step)} />
      case 'step1':
        return <Step1 {...props} />
      case 'step2':
        return <Step2 {...props} />
      case 'step3':
        return <Step3 {...props} />
      case 'step4':
        return <Step4 {...props} />
      case 'step5':
        return <Step5 {...props} />
      case 'step6':
        return <Step6 {...props} />
      case 'step7':
        return <Step7 {...props} />
      case 'step8':
        return <Step8 {...props} />
      case 'step9':
        return <Step9 {...props} />
      case 'conclusion':
        return <Conclusion formData={formData} onRestart={() => {
          setFormData(INITIAL_FORM_DATA)
          setCurrentStep('home')
        }} />
      default:
        return <Homepage onStart={() => setCurrentStep('intro')} />
    }
  }

  return (
    <div className="app-container">
      {/* Mobile Header */}
      <header className="mobile-header">
        <button 
          className="mobile-logo"
          onClick={() => handleStepChange('home')}
        >
          co/scope
        </button>
        <div className="mobile-header-right">
          <span className="mobile-progress">{completed.length}/9</span>
          <button 
            className={`hamburger-btn ${sidebarOpen ? 'open' : ''}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar 
        currentStep={currentStep} 
        setCurrentStep={handleStepChange}
        completedSteps={completed}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="main-content">
        {showSaved && (
          <div className="saved-indicator">
            ✓ Saved
          </div>
        )}
        {renderStep()}
      </main>
    </div>
  )
}

export default App
