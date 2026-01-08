import CollapsibleTips from '../CollapsibleTips'

function Step1({ formData, updateFormData, onNext }) {
  return (
    <div className="step-container">
      <div className="step-header">
        <div className="step-number">Section 1</div>
        <h2 className="step-title">Define the Problem</h2>
      </div>

      <p className="step-description">
        Strong research starts with a clear understanding of what problem you're tackling and why 
        it matters. Before jumping into specific research questions, take time to articulate what's 
        broken, missing, or could be improved. Think about who's affected by this problem and what 
        impact solving it could have. This foundation will guide your research question and make it easier to communicate your work's value to others.
      </p>

      <CollapsibleTips>
        <li>Describe the problem, not your solution: Focus on what's wrong or missing, not how you'll fix it (that comes later).</li>
        <li>Be specific: Instead of "AI models have limitations," try "Sentiment analysis models misclassify informal text from social media."</li>
        <li>Identify stakeholders: Who experiences this problem? Researchers? Practitioners? Specific communities? End users?</li>
        <li>Connect to impact: What happens if this problem goes unsolved? What becomes possible if it's addressed?</li>
        <li>Highlight gaps: What have others tried? Where do current approaches fall short?</li>
      </CollapsibleTips>

      <div className="input-group">
        <label className="input-label">What problem are you addressing and why does it matter?</label>
        <textarea
          className="textarea-large"
          value={formData.problemAndImportance}
          onChange={(e) => updateFormData('problemAndImportance', e.target.value)}
          placeholder="Describe the problem and its importance..."
        />
        <p className="example-text">
          Example: "Many state-of-the-art NLP models perform poorly on low-resource languages, limiting AI access for billions of speakers worldwide. While multilingual models exist, they're primarily optimized for high-resource languages like English and Chinese. This creates a significant performance gap affecting underserved communities' ability to benefit from advances in machine translation, information retrieval, and conversational AI. Solving this would democratize AI access and advance our theoretical understanding of cross-lingual transfer learning."
        </p>
      </div>

      <div className="step-navigation">
        <div></div>
        <button className="nav-btn primary" onClick={() => onNext('step2')}>
          next &rarr;
        </button>
      </div>
    </div>
  )
}

export default Step1
