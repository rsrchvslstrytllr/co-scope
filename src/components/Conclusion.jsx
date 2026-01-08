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

    // Section 7
    text += '7. DATASETS, MODELS, AND RESOURCES\n'
    text += '-'.repeat(50) + '\n'
    const validResources = formData.resources.filter(r => r.name.trim())
    if (validResources.length > 0) {
      validResources.forEach((resource) => {
        text += `• ${resource.type ? resource.type + ': ' : ''}${resource.name}${resource.source ? ' (' + resource.source + ')' : ''}\n`
      })
    } else {
      text += '(Not provided)'
    }
    text += '\n\n'

    // Section 8
    text += '8. SCOPE, NON-GOALS & PRIORITIES\n'
    text += '-'.repeat(50) + '\n'
    
    if (formData.nonGoals && formData.nonGoals.trim()) {
      text += 'NON-GOALS:\n'
      text += formData.nonGoals + '\n\n'
    }
    
    if (formData.scopeV1 && formData.scopeV1.trim()) {
      text += 'SCOPE FOR V1:\n'
      text += formData.scopeV1 + '\n\n'
    }
    
    if (formData.priorities && formData.priorities.trim()) {
      text += 'PRIORITIES:\n'
      text += formData.priorities + '\n\n'
    }
    
    if (formData.knownLimitations && formData.knownLimitations.trim()) {
      text += 'KNOWN LIMITATIONS:\n'
      text += formData.knownLimitations + '\n\n'
    }
    
    if (!formData.nonGoals.trim() && !formData.scopeV1.trim() && !formData.priorities.trim() && !formData.knownLimitations.trim()) {
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 className="download-title" style={{ margin: 0 }}>Your Scope Document</h3>
          <button 
            className="nav-btn primary" 
            onClick={() => {
              navigator.clipboard.writeText(generateDocumentText())
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
        <p style={{ fontSize: '13px', marginBottom: '12px', color: '#666' }}>
          Copy the text below and paste it into whatever tool you use to organize your work 
          (Google Docs, Notion, etc.). Then revisit and revise as your project takes shape.
        </p>
        <textarea
          value={generateDocumentText()}
          readOnly
          style={{
            width: '100%',
            minHeight: '400px',
            padding: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            lineHeight: '1.6',
            border: '1.5px solid var(--black)',
            background: 'var(--white)',
            resize: 'vertical'
          }}
        />
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
