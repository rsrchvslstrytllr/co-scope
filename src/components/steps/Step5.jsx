import CollapsibleTips from '../CollapsibleTips'

function Step5({ formData, updateFormData, onNext, onPrev }) {
  return (
    <div className="step-container">
      <div className="step-header">
        <div className="step-number">Section 5</div>
        <h2 className="step-title">Simplest Experimental Setting</h2>
      </div>

      <p className="step-description">
        Define the most straightforward experimental setup to test your hypothesis. This helps you 
        validate your idea quickly before scaling up. Starting simple reduces complexity, saves 
        resources, and allows you to iterate faster. It's a critical step in derisking your project.
      </p>

      <CollapsibleTips>
        <li>Minimize variables: Focus on the core hypothesis.</li>
        <li>Use existing tools: Leverage open-source models and datasets to speed up experimentation.</li>
      </CollapsibleTips>

      <div className="input-group">
        <label className="input-label">What is the simplest experimental setting?</label>
        <textarea
        className="textarea-medium"
          value={formData.simplestExperiment}
          onChange={(e) => updateFormData('simplestExperiment', e.target.value)}
          placeholder="Describe the simplest experiment to test your hypothesis..."
        />
        <p className="example-text">
          Example: "Test a pre-trained multilingual model (e.g., mBERT) on a small subset of low-resource languages using a standard NLP benchmark (e.g., XNLI)."
        </p>
      </div>

      <div className="step-navigation">
        <button className="nav-btn" onClick={() => onPrev('step4')}>
          &larr; back
        </button>
        <button className="nav-btn primary" onClick={() => onNext('step6')}>
          next &rarr;
        </button>
      </div>
    </div>
  )
}

export default Step5
