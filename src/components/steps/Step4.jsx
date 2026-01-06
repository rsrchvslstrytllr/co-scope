function Step4({ formData, updateFormData, onNext, onPrev }) {
  return (
    <div className="step-container">
      <div className="step-header">
        <div className="step-number">Section 4</div>
        <h2 className="step-title">Is This a Publishable Question?</h2>
      </div>

      <p className="step-description">
        Assess whether your research question is novel enough to warrant publication. Consider if 
        the findings can be shared externally and if they contribute significantly to the field. 
        Publishability ensures your work has broader impact and advances the field. It also helps 
        you secure funding, collaborations, and recognition.
      </p>

      <div className="step-tips">
        <div className="step-tips-title">Tips</div>
        <ul>
          <li>Check recent conferences/journals: Ensure your question hasn't been addressed in recent publications.</li>
          <li>Consider impact: Will your findings be of interest to the research community?</li>
        </ul>
      </div>

     
      <div className="input-group">
        <label className="input-label">Explain your answer</label>
        <textarea
          value={formData.publishableExplanation}
          onChange={(e) => updateFormData('publishableExplanation', e.target.value)}
          placeholder="Explain why this is or isn't publishable..."
        />
        <p className="example-text">
          Example: "Yes. While multilingual models exist, this study focuses on zero-shot performance in low-resource languages, an underexplored area."
        </p>
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
