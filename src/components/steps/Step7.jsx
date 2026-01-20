import { useState } from 'react'

function Step7({ formData, updateFormData, onNext, onPrev }) {
  const [tipsOpen, setTipsOpen] = useState(true)
  const [examplesOpen, setExamplesOpen] = useState(false)

  return (
    <div className="step-container">
      <div className="step-header">
        <div className="step-number">Section 7</div>
        <h2 className="step-title">Compute & Infrastructure</h2>
      </div>

      <p className="step-description">
        One of the most common reasons projects stall is a mismatch between ambition and infrastructure. 
        Some researchers abandon ideas thinking they need 8xH100s when they don't. Others underestimate 
        the complexity of distributed training or discover too late that a key dependency doesn't support 
        their hardware. This section asks you to honestly assess what compute you have, how reliably you 
        can access it, and whether your project's needs align with that reality.
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
            <li>Persistent free compute (even older GPUs) often enables more experimentation than expensive hourly H100 access.</li>
            <li>Match your access pattern to your project phase: grants and burst compute are great for scaling validated ideas, not early exploration.</li>
            <li>Different workloads need different hardware: L40S may be faster for inference while A100 is better for training.</li>
            <li>Spot/serverless instances work well for benchmarking but poorly for long training runs.</li>
            <li>Check that your key dependencies are actively maintained and support your target hardware/CUDA version.</li>
            <li>Be honest: if your compute access doesn't match your project idea, consider adjusting the project direction.</li>
          </ul>
        )}
      </div>

      <div className="input-group">
        <label className="input-label">What compute do you have access to?</label>
        <textarea
          className="textarea-medium"
          value={formData.computeAccess}
          onChange={(e) => updateFormData('computeAccess', e.target.value)}
          placeholder="Describe your hardware access, including GPU types, cluster vs cloud, access patterns (persistent, hourly, grants), and availability..."
        />
        <div className="example-section">
          <button 
            className="example-toggle"
            onClick={() => setExamplesOpen(!examplesOpen)}
          >
            <span>Example</span>
            <span className="example-toggle-icon">{examplesOpen ? '−' : '+'}</span>
          </button>
          {examplesOpen && (
            <p className="example-text">
              "I have persistent access to a university cluster with 4x A100 (40GB) nodes, typically 2-3 day queue times. 
              I also have $500 in cloud credits on Lambda Labs that I'm saving for final training runs. 
              For quick iteration, I use a local RTX 3090."
            </p>
          )}
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">What type of workload does your project require?</label>
        <textarea
          className="textarea-medium"
          value={formData.workloadType}
          onChange={(e) => updateFormData('workloadType', e.target.value)}
          placeholder="Describe your expected workload: many small experiments, large training runs, inference/benchmarking, or a mix..."
        />
      </div>

      <div className="input-group">
        <label className="input-label">What are your key dependencies and are they healthy?</label>
        <textarea
          className="textarea-medium"
          value={formData.dependencies}
          onChange={(e) => updateFormData('dependencies', e.target.value)}
          placeholder="List critical packages/frameworks, their maintenance status, and any version constraints (PyTorch, CUDA, etc.)..."
        />
      </div>

      <div className="step-navigation">
        <button className="nav-btn" onClick={() => onPrev('step6')}>
          ← back
        </button>
        <button className="nav-btn primary" onClick={() => onNext('step8')}>
          next →
        </button>
      </div>
    </div>
  )
}

export default Step7
