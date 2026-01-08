import CollapsibleTips from '../CollapsibleTips'

function Step2({ formData, updateFormData, onNext, onPrev }) {
  return (
    <div className="step-container">
      <div className="step-header">
        <div className="step-number">Section 2</div>
        <h2 className="step-title">Define Your Research Question</h2>
      </div>

      <p className="step-description">
        Now that you understand the problem you're addressing, it's time to formulate a specific, 
        actionable research question. A well-defined research question is the compass for your project. 
        It keeps you on track, helps you prioritize experiments, and makes it easier to communicate 
        your work to others. Your question should be focused enough to be answerable but broad enough 
        to be interesting.
      </p>

      <CollapsibleTips>
        <li>Be specific: Avoid vague questions like "How do neural networks work?" Instead, focus on a particular aspect (e.g., "How does batch size affect training stability in transformers?").</li>
        <li>Make it testable: Ensure your question can be answered through experiments or analysis.</li>
        <li>Connect to your problem: Your question should directly address the problem you defined in Step 1.</li>
        <li>Choose a question you care about: Passion for your project greatly increases your chances of completing it.</li>
      </CollapsibleTips>

      <div className="input-group">
        <label className="input-label">What is the research question you want to answer?</label>
        <textarea
          className="textarea-large"
          value={formData.researchQuestion}
          onChange={(e) => updateFormData('researchQuestion', e.target.value)}
          placeholder="Enter your research question..."
        />
        <p className="example-text">
          Example: "Can pre-trained multilingual models effectively perform zero-shot sentiment analysis on low-resource languages without any fine-tuning?"
        </p>
      </div>

      <div className="step-navigation">
        <button className="nav-btn" onClick={() => onPrev('step1')}>
          &larr; back
        </button>
        <button className="nav-btn primary" onClick={() => onNext('step3')}>
          next &rarr;
        </button>
      </div>
    </div>
  )
}

export default Step2
