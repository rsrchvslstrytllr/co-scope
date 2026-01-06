function Step1({ formData, updateFormData, onNext }) {
  return (
    <div className="step-container">
      <div className="step-header">
        <div className="step-number">Section 1</div>
        <h2 className="step-title">Define Your Research Question</h2>
      </div>

      <p className="step-description">
        A well-defined research question is the compass for your project. It keeps you on track, 
        helps you prioritize experiments, and makes it easier to communicate your work to others. 
        Start by clearly articulating the core question your research aims to answer. This will 
        guide your experiments, help you stay focused, and ensure your work addresses a meaningful 
        gap in the field. Think about what problem you're solving and why it matters.
      </p>

      <div className="step-tips">
        <div className="step-tips-title">Tips</div>
        <ul>
          <li>Be specific: Avoid vague questions like "How do neural networks work?" Instead, focus on a particular aspect (e.g., "How does batch size affect training stability in transformers?").</li>
          <li>Choose a question that you care about. Bringing passion to your project greatly increases your chances of completing it.</li>
        </ul>
      </div>

      <div className="input-group">
        <label className="input-label">What is the question we want to answer?</label>
        <textarea
          value={formData.researchQuestion}
          onChange={(e) => updateFormData('researchQuestion', e.target.value)}
          placeholder="Enter your research question..."
        />
        <p className="example-text">
          Example: "Can pre-trained language models effectively generalize to low-resource languages without fine-tuning?"
        </p>
      </div>

      <div className="step-navigation">
        <div></div>
        <button className="nav-btn primary" onClick={() => onNext('step2')}>
          next →
        </button>
      </div>
    </div>
  )
}

export default Step1
