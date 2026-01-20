import { useState } from 'react'

function Conclusion({ formData, onRestart }) {
  const [copied, setCopied] = useState(false)

  const generateDocumentText = () => {
    let text = 'CO/SCOPE RESEARCH DOCUMENT\n'
    text += '='.repeat(50) + '\n'
    text += `Generated: ${new Date().toLocaleDateString()}\n\n`

    // Section 1
    text += '1. PROBLEM & WHY IT MATTERS\n'
    text += '-'.repeat(50) + '\n'
    text += (formData.problemAndImportance || '(Not provided)') + '\n\n'

    // Section 2
    text += '2. RESEARCH QUESTION\n'
    text += '-'.repeat(50) + '\n'
    text += (formData.researchQuestion || '(Not provided)') + '\n\n'

    // Section 3
    text += '3. PRIOR WORK\n'
    text += '-'.repeat(50) + '\n'
    text += (formData.priorWork || '(Not provided)') + '\n\n'

    // Section 4
    text += '4. HOW WILL YOU SHARE THIS WORK?\n'
    text += '-'.repeat(50) + '\n'
    text += (formData.sharingPlan || '(Not provided)') + '\n\n'

    // Section 5
    text += '5. SIMPLEST EXPERIMENTAL SETTING\n'
    text += '-'.repeat(50) + '\n'
    text += (formData.simplestExperiment || '(Not provided)') + '\n\n'

    // Section 6
    text += '6. KEY BASELINES AND BENCHMARKS\n'
    text += '-'.repeat(50) + '\n'
    text += (formData.baselines || '(Not provided)') + '\n\n'

    // Section 7 - NEW: Compute & Infrastructure
    text += '7. COMPUTE & INFRASTRUCTURE\n'
    text += '-'.repeat(50) + '\n'
    
    const hasComputeContent = (formData.computeAccess && formData.computeAccess.trim()) || 
                              (formData.workloadType && formData.workloadType.trim()) || 
                              (formData.dependencies && formData.dependencies.trim())
    
    if (hasComputeContent) {
      if (formData.computeAccess && formData.computeAccess.trim()) {
        text += 'COMPUTE ACCESS:\n'
        text += formData.computeAccess + '\n\n'
      }
      
      if (formData.workloadType && formData.workloadType.trim()) {
        text += 'WORKLOAD TYPE:\n'
        text += formData.workloadType + '\n\n'
      }
      
      if (formData.dependencies && formData.dependencies.trim()) {
        text += 'KEY DEPENDENCIES:\n'
        text += formData.dependencies + '\n\n'
      }
    } else {
      text += '(Not provided)\n\n'
    }

    // Section 8
    text += '8. DATASETS, MODELS, AND RESOURCES\n'
    text += '-'.repeat(50) + '\n'
    const validResources = formData.resources ? formData.resources.filter(r => r.name && r.name.trim()) : []
    if (validResources.length > 0) {
      validResources.forEach((resource) => {
        text += `• ${resource.type ? resource.type + ': ' : ''}${resource.name}${resource.source ? ' (' + resource.source + ')' : ''}\n`
      })
    } else {
      text += '(Not provided)'
    }
    text += '\n\n'

    // Section 9
    text += '9. SCOPE, NON-GOALS & PRIORITIES\n'
    text += '-'.repeat(50) + '\n'
    
    const hasNonGoals = formData.nonGoals && formData.nonGoals.trim()
    const hasScopeV1 = formData.scopeV1 && formData.scopeV1.trim()
    const hasPriorities = formData.priorities && formData.priorities.trim()
    const hasLimitations = formData.knownLimitations && formData.knownLimitations.trim()
    
    if (hasNonGoals) {
      text += 'NON-GOALS:\n'
      text += formData.nonGoals + '\n\n'
    }
    
    if (hasScopeV1) {
      text += 'SCOPE FOR V1:\n'
      text += formData.scopeV1 + '\n\n'
    }
    
    if (hasPriorities) {
      text += 'PRIORITIES:\n'
      text += formData.priorities + '\n\n'
    }
    
    if (hasLimitations) {
      text += 'KNOWN LIMITATIONS:\n'
      text += formData.knownLimitations + '\n\n'
    }
    
    if (!hasNonGoals && !hasScopeV1 && !hasPriorities && !hasLimitations) {
      text += '(Not provided)\n\n'
    }

    return text
  }

  return (
    <div className="conclusion-screen">
      <h1 className="conclusion-title">You've worked through the core questions!</h1>
      
      <p className="conclusion-text">
         Now comes the real work: take this scope document, share it with collaborators, start exploring the literature, 
        and let it evolve as you learn more.
      </p>

      <p className="conclusion-text">
        This document isn't meant to stay static. As you dig into prior work, run preliminary experiments, 
        and get feedback from others, your understanding will deepen. Your research question might sharpen. 
        Your priorities might shift. Sections might get rearranged. That's exactly what should happen. 
        Our team at Cohere Labs does this constantly. The scope docs we start with rarely look the same 
        by the time we're ready to begin a project.
      </p>

      <p className="conclusion-text">
        Remember, research is a dynamic process. You're not locking yourself into anything here. 
        You're giving yourself a structured starting point to build from.
      </p>

      <div className="download-section">
        <div className="download-header">
          <h3 className="download-title">Your Scope Document</h3>
          <button 
            className="copy-btn"
            onClick={() => {
              navigator.clipboard.writeText(generateDocumentText())
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
        <p className="download-description">
          Copy the text below and paste it into whatever tool you use to organize your work 
          (Google Docs, Notion, etc.). Then revisit and revise as your project takes shape.
        </p>
        <textarea
          className="document-output"
          value={generateDocumentText()}
          readOnly
        />
      </div>

      <div className="step-navigation">
        <button className="nav-btn" onClick={onRestart}>
          Start Over
        </button>
        <div></div>
      </div>
    </div>
  )
}

export default Conclusion
