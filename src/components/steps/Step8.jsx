import CollapsibleTips from '../CollapsibleTips'

function Step8({ formData, updateFormData, onNext, onPrev }) {
  return (
    <div className="step-container">
      <div className="step-header">
        <div className="step-number">Section 8</div>
        <h2 className="step-title">Define Scope, Non-Goals & Priorities</h2>
      </div>

      <p className="step-description">
        Define the boundaries of your project. Being explicit about what you're NOT trying to solve 
        is just as important as defining what you are solving. Clear scope helps you stay focused, 
        manage expectations, and avoid scope creep.
      </p>

      <CollapsibleTips>
        <li>Be specific and realistic about what's achievable in your project.</li>
        <li>Non-goals aren't failures—they're strategic decisions to maintain focus.</li>
        <li>Prioritization helps you make trade-offs when resources are limited.</li>
        <li>Acknowledging limitations upfront builds credibility.</li>
      </CollapsibleTips>

      <div className="input-group">
        <label className="input-label">Non-goals: What are you explicitly NOT trying to solve?</label>
        <textarea
          className="textarea-medium"
          value={formData.nonGoals}
          onChange={(e) => updateFormData('nonGoals', e.target.value)}
          placeholder="List what you're explicitly not trying to solve..."
        />
        <p className="example-text">
          Example: "We're not trying to achieve state-of-the-art performance on high-resource languages. We're also not addressing model interpretability or computational efficiency in this project."
        </p>
      </div>

      <div className="input-group">
        <label className="input-label">Scope for v1: What's in scope for the first version of this project?</label>
        <textarea
          className="textarea-large"
          value={formData.scopeV1}
          onChange={(e) => updateFormData('scopeV1', e.target.value)}
          placeholder="Define what's in scope for v1..."
        />
        <p className="example-text">
          Example: "Focus on 5-10 low-resource languages from different language families (e.g., Swahili, Quechua, Telugu). Evaluation limited to sentiment analysis and NER tasks using existing benchmarks."
        </p>
      </div>

      <div className="input-group">
        <label className="input-label">Priorities: What's most critical vs. nice-to-have?</label>
        <textarea
          className="textarea-small"
          value={formData.priorities}
          onChange={(e) => updateFormData('priorities', e.target.value)}
          placeholder="Rank your priorities..."
        />
        <p className="example-text">
          Example: "Priority 1: Zero-shot performance on target languages. Priority 2: Understanding cross-lingual transfer patterns. Nice-to-have: Computational efficiency improvements."
        </p>
      </div>

      <div className="input-group">
        <label className="input-label">Known limitations: What trade-offs or constraints are you accepting?</label>
        <textarea
          className="textarea-medium"
          value={formData.knownLimitations}
          onChange={(e) => updateFormData('knownLimitations', e.target.value)}
          placeholder="Acknowledge known limitations and constraints..."
        />
        <p className="example-text">
          Example: "Limited to languages with at least 100 Wikipedia articles due to data availability. Using existing benchmarks which may have quality/bias issues. No human evaluation in v1 due to resource constraints."
        </p>
      </div>

      <div className="step-navigation">
        <button className="nav-btn" onClick={() => onPrev('step7')}>
         &larr; back
        </button>
        <button className="nav-btn primary" onClick={() => onNext('conclusion')}>
          next &rarr;

        </button>
      </div>
    </div>
  )
}

export default Step8
