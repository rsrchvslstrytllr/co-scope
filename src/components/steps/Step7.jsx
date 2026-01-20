import { useState } from 'react'

function Step7({ formData, updateFormData, onNext, onPrev }) {
  const [tipsOpen, setTipsOpen] = useState(true)
  const [example1Open, setExample1Open] = useState(false)
  const [example2Open, setExample2Open] = useState(false)
  const [example3Open, setExample3Open] = useState(false)

  return (
    <div className="step-container">
      <div className="step-header">
        <div className="step-number">Section 7</div>
        <h2 className="step-title">Compute & Infrastructure</h2>
      </div>

      <p className="step-description">
        You don't need a cluster of H100s to do meaningful research. Some of the most impactful work 
        comes from clever experiment design, not brute-force compute. That said, projects often stall 
        when there's a mismatch between ambition and available infrastructure. This section helps you 
        take stock of what you have and shape your project to match.
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
            <li>Reliable access to modest hardware often beats sporadic access to powerful GPUs.</li>
            <li>Many research questions can be answered with a single GPU and smart experiment design.</li>
            <li>Check that your key dependencies are actively maintained before building on them.</li>
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
            onClick={() => setExample1Open(!example1Open)}
          >
            <span>Example</span>
            <span className="example-toggle-icon">{example1Open ? '−' : '+'}</span>
          </button>
          {example1Open && (
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
              "Mostly small experiments—I'll be running ~50 ablations on 1B parameter models, each taking 2-4 hours on a single GPU. 
              One final training run at 7B scale for the paper, which will need multi-GPU."
            </p>
          )}
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">What are your key dependencies and are they healthy?</label>
        <textarea
          className="textarea-medium"
          value={formData.dependencies}
          onChange={(e) => updateFormData('dependencies', e.target.value)}
          placeholder="List critical packages/frameworks, their maintenance status, and any version constraints (PyTorch, CUDA, etc.)..."
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
              "PyTorch 2.1+ (actively maintained), HuggingFace Transformers (active, large community), 
              and a custom fork of an evaluation library (last updated 6 months ago—may need to maintain ourselves)."
            </p>
          )}
        </div>
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
