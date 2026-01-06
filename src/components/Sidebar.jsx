function Sidebar({ currentStep, setCurrentStep, completedSteps }) {
  const navItems = [
    { id: 'intro', label: 'Intro', className: 'intro' },
    { id: 'step1', label: '1. Define your research question', step: 1 },
    { id: 'step2', label: '2. Why is this question important?', step: 2 },
    { id: 'step3', label: '3. What work does this question build on?', step: 3 },
    { id: 'step4', label: '4. Is this a publishable question?', step: 4 },
    { id: 'step5', label: '5. Simplest experimental setting', step: 5 },
    { id: 'step6', label: '6. Key baselines and benchmarks', step: 6 },
    { id: 'step7', label: '7. Datasets, models, and resources', step: 7 },
    { id: 'step8', label: '8. Additional details and experiments', step: 8 },
    { id: 'conclusion', label: 'Conclusion', className: 'conclusion' }
  ]

  return (
    <aside className="sidebar">
      <button 
        className="sidebar-logo" 
        onClick={() => setCurrentStep('home')}
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer',
          fontFamily: 'inherit',
          padding: 0,
          textAlign: 'left'
        }}
      >
        co/scope
      </button>
      <div className="sidebar-section">Steps</div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentStep === item.id ? 'active' : ''} ${
              item.step && completedSteps.includes(item.step) ? 'completed' : ''
            } ${item.className || ''}`}
            onClick={() => setCurrentStep(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
