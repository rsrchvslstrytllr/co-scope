function Step8({ formData, updateFormData, onNext, onPrev }) {
  return (
    <div className="step-container">
      <div className="step-header">
        <div className="step-number">Section 8</div>
        <h2 className="step-title">Additional Details and Experiments</h2>
      </div>

      <p className="step-description">
        Use this space to add any extra context, initial experiments, or questions that don't fit 
        elsewhere. Research is iterative. Capturing early thoughts and experiments helps you refine 
        your approach and track progress.
      </p>

      <div className="step-tips">
        <div className="step-tips-title">Tips</div>
        <ul>
          <li>Be transparent: Note challenges or unexpected results.</li>
          <li>Prioritize clarity: Use bullet points or headings for readability.</li>
        </ul>
      </div>

      <div className="input-group">
        <label className="input-label">Additional details and experiments</label>
        <textarea
          value={formData.additionalDetails}
          onChange={(e) => updateFormData('additionalDetails', e.target.value)}
          placeholder="Add any additional context, initial experiments, or open questions..."
        />
        <p className="example-text">
          Example: "Initial experiments show that mBERT struggles with certain syntactic structures in low-resource languages. Next steps: Investigate fine-tuning strategies."
        </p>
      </div>

      <div className="step-navigation">
        <button className="nav-btn" onClick={() => onPrev('step7')}>
          ← back
        </button>
        <button className="nav-btn primary" onClick={() => onNext('conclusion')}>
          finish →
        </button>
      </div>
    </div>
  )
}

export default Step8
