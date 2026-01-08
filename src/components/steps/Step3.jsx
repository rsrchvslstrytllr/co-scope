function Step3({ formData, updateFormData, onNext, onPrev }) {
  return (
    <div className="step-container">
      <div className="step-header">
        <div className="step-number">Section 3</div>
        <h2 className="step-title">What Work Does This Question Build On?</h2>
      </div>

      <p className="step-description">
        Your research should build on existing work. Identify key papers, studies, or methodologies 
        that are relevant to your question. This shows you're aware of the field's progress and 
        helps position your work within the literature. Understanding the existing landscape ensures 
        you're not reinventing the wheel and highlights how your work contributes something new. 
        It's essential for justifying your approach and avoiding redundant efforts.
      </p>

      <div className="step-tips">
        <div className="step-tips-title">Tips</div>
        <ul>
          <li>Be specific: Mention authors, years, and key findings.</li>
          <li>Highlight gaps: Explain how your work addresses limitations in existing studies.</li>
        </ul>
      </div>

      <div className="input-group">
        <label className="input-label">What prior work does this question build on?</label>
        <textarea
        className="textarea-large"
          value={formData.priorWork}
          onChange={(e) => updateFormData('priorWork', e.target.value)}
          placeholder="Describe the prior work and literature..."
        />
        <p className="example-text">
          Example: "This project builds on recent advances in transfer learning (Devlin et al., 2019) and multilingual model evaluation (Conneau et al., 2020). Key papers include [list citations]."
        </p>
      </div>

      <div className="step-navigation">
        <button className="nav-btn" onClick={() => onPrev('step2')}>
          ← back
        </button>
        <button className="nav-btn primary" onClick={() => onNext('step4')}>
          next →
        </button>
      </div>
    </div>
  )
}

export default Step3
