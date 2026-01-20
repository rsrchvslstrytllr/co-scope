import { useState } from 'react'

function Step4({ formData, updateFormData, onNext, onPrev }) {
  const [tipsOpen, setTipsOpen] = useState(true)
  const [exampleOpen, setExampleOpen] = useState(false)

  return (
    <div className="step-container">
      <div className="step-header">
        <div className="step-number">Section 4</div>
        <h2 className="step-title">How Will You Share This Work?</h2>
      </div>

      <p className="step-description">
        Research has impact when it's shared effectively. Consider what artifacts you can release 
        and who would benefit from them. This might include academic papers, blog posts, open-source 
        code, datasets, models, or demos. Thinking about your audience and format early helps you 
        plan what to build, what to measure, and how to communicate your findings. Not all research 
        needs to be a conference paper. Sometimes a well-documented GitHub repo or a detailed technical 
        report has more impact.
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
            <li>Consider multiple formats: Can you write a paper AND release code? A blog post AND a demo?</li>
            <li>Know your audience: Academic researchers need different things than industry practitioners.</li>
            <li>Think about access: If you can't share the data, can you share the model? If not the model, can you share insights via a paper?</li>
            <li>Be realistic: What format actually matches your timeline and resources?</li>
          </ul>
        )}
      </div>

      <div className="input-group">
        <label className="input-label">How will you share this work and who is it for?</label>
        <textarea
          className="textarea-medium"
          value={formData.sharingPlan}
          onChange={(e) => updateFormData('sharingPlan', e.target.value)}
          placeholder="Describe how you'll share this work and who your target audience is..."
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
              "Primary: Conference paper at NeurIPS/EMNLP targeting the multilingual NLP community. Secondary: Open-source evaluation code on GitHub and a blog post for ML practitioners. If data permits, will also release fine-tuned models on HuggingFace."
            </p>
          )}
        </div>
      </div>

      <div className="step-navigation">
        <button className="nav-btn" onClick={() => onPrev('step3')}>
          ← back
        </button>
        <button className="nav-btn primary" onClick={() => onNext('step5')}>
          next →
        </button>
      </div>
    </div>
  )
}

export default Step4
