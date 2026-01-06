function Step2({ formData, updateFormData, onNext, onPrev }) {
  return (
    <div className="step-container">
      <div className="step-header">
        <div className="step-number">Section 2</div>
        <h2 className="step-title">Why Is This Question Important?</h2>
      </div>

      <p className="step-description">
        Now that you've defined your research question, it's time to articulate why it matters. 
        Connect your work to the broader field, real-world applications, or theoretical advancements. 
        This helps justify your research and increases its chances to have a meaningful impact. 
        Clearly explaining the importance of your question is critical for securing resources, 
        collaborating with others, and publishing your work. It also keeps you motivated throughout the project.
      </p>

      <div className="step-tips">
        <div className="step-tips-title">Tips</div>
        <ul>
          <li>Link to existing literature: Mention how your work builds on or challenges previous studies.</li>
          <li>Highlight practical applications: Explain how your research could solve real-world problems.</li>
          <li>Address limitations: Discuss gaps in current knowledge that your work aims to fill.</li>
        </ul>
      </div>

      <div className="input-group">
        <label className="input-label">Why is this question important?</label>
        <textarea
          value={formData.whyImportant}
          onChange={(e) => updateFormData('whyImportant', e.target.value)}
          placeholder="Explain the importance of your research question..."
        />
        <p className="example-text">
          Example: "Understanding how language models perform on low-resource languages can democratize access to AI tools in underserved communities and advance multilingual NLP research."
        </p>
      </div>

      <div className="step-navigation">
        <button className="nav-btn" onClick={() => onPrev('step1')}>
          ← back
        </button>
        <button className="nav-btn primary" onClick={() => onNext('step3')}>
          next →
        </button>
      </div>
    </div>
  )
}

export default Step2
