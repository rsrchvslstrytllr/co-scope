import { useState } from 'react'

function Step9({ formData, updateFormData, onNext, onPrev }) {
  const [tipsOpen, setTipsOpen] = useState(true)
  const [example1Open, setExample1Open] = useState(false)
  const [example2Open, setExample2Open] = useState(false)
  const [example3Open, setExample3Open] = useState(false)
  const [example4Open, setExample4Open] = useState(false)

  return (
    <div className="step-container">
      <div className="step-header">
        <div className="step-number">Section 9</div>
        <h2 className="step-title">Define Scope, Non-Goals & Priorities</h2>
      </div>

      <p className="step-description">
        Define the boundaries of your project. Being explicit about what you're NOT trying to solve 
        is just as important as defining what you are solving. Clear scope helps you stay focused, 
        manage expectations, and avoid scope creep.
      </p>

      <div className="step-tips">
        <button 
          className="step-tips-toggle"
          onClick={() => setTipsOpen(!tipsOpen)}
        >
          <span className="step-tips-title">Tips</span>
          <span className="step-tips-icon">{tipsOpen ? '−' : '+'}</span>
        </button>
        {tipsOpen && (
          <ul>
            <li>Be specific and realistic about what's achievable in your project.</li>
            <li>Non-goals aren't failures—they're strategic decisions to maintain focus.</li>
            <li>Prioritization helps you make trade-offs when resources are limited.</li>
            <li>Acknowledging limitations upfront builds credibility.</li>
          </ul>
        )}
      </div>

      <div className="input-group">
        <label className="input-label">Non-goals: What are you explicitly NOT trying to solve?</label>
        <textarea
          className="textarea-medium"
          value={formData.nonGoals}
          onChange={(e) => updateFormData('nonGoals', e.target.value)}
          placeholder="List what you're explicitly not trying to solve..."
        />
        <div className="example-section">
          <button 
            className="example-toggle"
            onClick={() => setExample1Open(!example1Open)}
          >
            <span>Example</span>
            <span className="example-toggle-icon">{example1Open ? '−' : '+'}</span>
          </button>
          {example1Open && (
            <p className="example-text">
              "We're not trying to achieve state-of-the-art performance on high-resource languages. We're also not addressing model interpretability or computational efficiency in this project."
            </p>
          )}
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">Scope for v1: What's in scope for the first version of this project?</label>
        <textarea
          className="textarea-large"
          value={formData.scopeV1}
          onChange={(e) => updateFormData('scopeV1', e.target.value)}
          placeholder="Define what's in scope for v1..."
        />
        <div className="example-section">
          <button 
            className="example-toggle"
            onClick={() => setExample2Open(!example2Open)}
          >
            <span>Example</span>
            <span className="example-toggle-icon">{example2Open ? '−' : '+'}</span>
          </button>
          {example2Open && (
            <p className="example-text">
              "Focus on 5-10 low-resource languages from different language families (e.g., Swahili, Quechua, Telugu). Evaluation limited to sentiment analysis and NER tasks using existing benchmarks."
            </p>
          )}
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">Priorities: What's most critical vs. nice-to-have?</label>
        <textarea
          className="textarea-small"
          value={formData.priorities}
          onChange={(e) => updateFormData('priorities', e.target.value)}
          placeholder="Rank your priorities..."
        />
        <div className="example-section">
          <button 
            className="example-toggle"
            onClick={() => setExample3Open(!example3Open)}
          >
            <span>Example</span>
            <span className="example-toggle-icon">{example3Open ? '−' : '+'}</span>
          </button>
          {example3Open && (
            <p className="example-text">
              "Priority 1: Zero-shot performance on target languages. Priority 2: Understanding cross-lingual transfer patterns. Nice-to-have: Computational efficiency improvements."
            </p>
          )}
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">Known limitations: What trade-offs or constraints are you accepting?</label>
        <textarea
          className="textarea-medium"
          value={formData.knownLimitations}
          onChange={(e) => updateFormData('knownLimitations', e.target.value)}
          placeholder="Acknowledge known limitations and constraints..."
        />
        <div className="example-section">
          <button 
            className="example-toggle"
            onClick={() => setExample4Open(!example4Open)}
          >
            <span>Example</span>
            <span className="example-toggle-icon">{example4Open ? '−' : '+'}</span>
          </button>
          {example4Open && (
            <p className="example-text">
              "Limited to languages with at least 100 Wikipedia articles due to data availability. Using existing benchmarks which may have quality/bias issues. No human evaluation in v1 due to resource constraints."
            </p>
          )}
        </div>
      </div>

      <div className="step-navigation">
        <button className="nav-btn" onClick={() => onPrev('step8')}>
          ← back
        </button>
        <button className="nav-btn primary" onClick={() => onNext('conclusion')}>
          finish →
        </button>
      </div>
    </div>
  )
}

export default Step9
