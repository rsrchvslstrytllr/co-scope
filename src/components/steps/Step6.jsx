import { useState } from 'react'

function Step6({ formData, updateFormData, onNext, onPrev }) {
  const [tipsOpen, setTipsOpen] = useState(true)
  const [exampleOpen, setExampleOpen] = useState(false)

  return (
    <div className="step-container">
      <div className="step-header">
        <div className="step-number">Section 6</div>
        <h2 className="step-title">Key Baselines and Benchmarks</h2>
      </div>

      <p className="step-description">
        Identify the baselines and benchmarks you'll compare against. This includes both strong 
        baselines (state-of-the-art) and weaker ones (sanity checks). Baselines provide context 
        for your results and help you demonstrate progress. They also ensure your experiments 
        are grounded in reality.
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
            <li>Include diverse baselines: Cover different approaches (e.g., rule-based, deep learning).</li>
            <li>Use established benchmarks: Ensure comparability with prior work.</li>
          </ul>
        )}
      </div>

      <div className="input-group">
        <label className="input-label">What are your key baselines and benchmarks?</label>
        <textarea
          className="textarea-medium"
          value={formData.baselines}
          onChange={(e) => updateFormData('baselines', e.target.value)}
          placeholder="Describe the baselines and benchmarks you'll use..."
        />
        <div className="example-section">
          <button 
            className="example-toggle"
            onClick={() => setExampleOpen(!exampleOpen)}
          >
            <span>Example</span>
            <span className="example-toggle-icon">{exampleOpen ? '−' : '+'}</span>
          </button>
          {exampleOpen && (
            <p className="example-text">
              "Baselines include mBERT (Devlin et al., 2019) and XLM-R (Conneau et al., 2020). Benchmarks: XNLI, MLQA."
            </p>
          )}
        </div>
      </div>

      <div className="step-navigation">
        <button className="nav-btn" onClick={() => onPrev('step5')}>
          ← back
        </button>
        <button className="nav-btn primary" onClick={() => onNext('step7')}>
          next →
        </button>
      </div>
    </div>
  )
}

export default Step6
