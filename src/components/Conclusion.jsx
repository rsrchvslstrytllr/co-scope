import { useState } from 'react'

function Conclusion({ formData, onRestart }) {
  const [copied, setCopied] = useState(false)

  const generateSummary = () => {
    const lines = []
    
    lines.push('CO/SCOPE RESEARCH DOCUMENT')
    lines.push('='.repeat(40))
    lines.push(`Generated: ${new Date().toLocaleDateString()}`)
    lines.push('')
    
    lines.push('1. RESEARCH QUESTION')
    lines.push('-'.repeat(40))
    lines.push(formData.researchQuestion || '(Not provided)')
    lines.push('')
    
    lines.push('2. WHY IS THIS QUESTION IMPORTANT?')
    lines.push('-'.repeat(40))
    lines.push(formData.whyImportant || '(Not provided)')
    lines.push('')
    
    lines.push('3. PRIOR WORK')
    lines.push('-'.repeat(40))
    lines.push(formData.priorWork || '(Not provided)')
    lines.push('')
    
    lines.push('4. IS THIS A PUBLISHABLE QUESTION?')
    lines.push('-'.repeat(40))
    if (formData.isPublishable || formData.publishableExplanation) {
      if (formData.isPublishable) lines.push(formData.isPublishable)
      if (formData.publishableExplanation) lines.push(formData.publishableExplanation)
    } else {
      lines.push('(Not provided)')
    }
    lines.push('')
    
    lines.push('5. SIMPLEST EXPERIMENTAL SETTING')
    lines.push('-'.repeat(40))
    lines.push(formData.simplestExperiment || '(Not provided)')
    lines.push('')
    
    lines.push('6. KEY BASELINES AND BENCHMARKS')
    lines.push('-'.repeat(40))
    lines.push(formData.baselines || '(Not provided)')
    lines.push('')
    
    lines.push('7. DATASETS, MODELS, AND RESOURCES')
    lines.push('-'.repeat(40))
    const validResources = formData.resources?.filter(r => r.name?.trim()) || []
    if (validResources.length > 0) {
      validResources.forEach(resource => {
        const type = resource.type ? `${resource.type}: ` : ''
        const source = resource.source ? ` (${resource.source})` : ''
        lines.push(`• ${type}${resource.name}${source}`)
      })
    } else {
      lines.push('(Not provided)')
    }
    lines.push('')
    
    lines.push('8. ADDITIONAL DETAILS AND EXPERIMENTS')
    lines.push('-'.repeat(40))
    lines.push(formData.additionalDetails || '(Not provided)')
    
    return lines.join('\n')
  }

  const summaryText = generateSummary()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      const textarea = document.querySelector('.summary-textarea')
      textarea.select()
      document.execCommand('copy')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="conclusion-screen">
      <h1 className="conclusion-title">Congratulations!</h1>
      
      <p className="conclusion-text">
        By completing this scoping tool, you've taken the first step in your research journey. 
        This framework, used by our team to kickstart every project, ensures you have a clear, 
        actionable plan grounded in best practices.
      </p>

      <p className="conclusion-text">
        Now that you have a well-defined research question, a justified approach, and a roadmap 
        for experimentation, you're ready to dive deeper. Share this scope document with collaborators, 
        start designing experiments, and iterate as you learn.
      </p>

      <p className="conclusion-text">
        Remember, research is a dynamic process. This tool is your compass, but you're the navigator.
      </p>

      <div className="summary-section">
        <div className="summary-header">
          <h3 className="summary-title">Your Scope Document</h3>
          <button 
            className={`copy-btn ${copied ? 'copied' : ''}`} 
            onClick={handleCopy}
          >
            {copied ? '✓ Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
        <textarea
          className="summary-textarea"
          value={summaryText}
          readOnly
        />
      </div>

      <div className="next-steps">
        <h3 className="next-steps-title">Next Steps</h3>
        <ul>
          <li>Share your scope document with collaborators.</li>
          <li>Begin setting up experiments using the resources you've outlined.</li>
          <li>Revisit and update this document as your project evolves.</li>
        </ul>
      </div>

      <div className="step-navigation" style={{ marginTop: '48px' }}>
        <button className="nav-btn" onClick={onRestart}>
          Start Over
        </button>
      </div>
    </div>
  )
}

export default Conclusion
