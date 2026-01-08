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
import Conclusion from './components/Conclusion'

const INITIAL_FORM_DATA = {
  problemAndImportance: '',
  researchQuestion: '',
  priorWork: '',
  sharingPlan: '',
  simplestExperiment: '',
  baselines: '',
  resources: [{ type: '', name: '', source: '' }],
  nonGoals: '',
  scopeV1: '',
  priorities: '',
  knownLimitations: ''
}

function App() {
  const [currentStep, setCurrentStep] = useState('home')
  const [showSaved, setShowSaved] = useState(false)
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
    if (formData.resources.some(r => r.name.trim())) completed.push(7)
    if (formData.nonGoals.trim() || formData.scopeV1.trim() || formData.priorities.trim() || formData.knownLimitations.trim()) completed.push(8)
    return completed
  }

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
      <Sidebar 
        currentStep={currentStep} 
        setCurrentStep={setCurrentStep}
        completedSteps={completedSteps()}
      />
      <main className="main-content">
        {showSaved && (
          <div style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            padding: '8px 16px',
            background: 'var(--white)',
            border: '1.5px solid var(--black)',
            fontSize: '13px',
            fontWeight: '500',
            opacity: showSaved ? 1 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: 1000
          }}>
            ✓ Saved
          </div>
        )}
        {renderStep()}
      </main>
    </div>
  )
}

export default App
