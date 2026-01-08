import { useState } from 'react'

function CollapsibleTips({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`step-tips ${isOpen ? 'open' : ''}`}>
      <button 
        className="step-tips-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="step-tips-title">Tips</span>
        <span className="step-tips-icon">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <ul>
          {children}
        </ul>
      )}
    </div>
  )
}

export default CollapsibleTips
