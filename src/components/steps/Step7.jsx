function Step7({ formData, updateFormData, onNext, onPrev }) {
  const addResource = () => {
    updateFormData('resources', [...formData.resources, { type: '', name: '', source: '' }])
  }

  const updateResource = (index, field, value) => {
    const updated = formData.resources.map((r, i) => 
      i === index ? { ...r, [field]: value } : r
    )
    updateFormData('resources', updated)
  }

  const removeResource = (index) => {
    if (formData.resources.length > 1) {
      updateFormData('resources', formData.resources.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="step-container">
      <div className="step-header">
        <div className="step-number">Section 7</div>
        <h2 className="step-title">Datasets, Models, and Resources</h2>
      </div>

      <p className="step-description">
        List the datasets, models, evaluation metrics, and other resources you'll use. Be specific 
        to ensure reproducibility. Clearly defining resources helps you plan experiments, collaborate 
        effectively, and replicate results. It's also crucial for writing papers and sharing code.
      </p>

      <div className="step-tips">
        <div className="step-tips-title">Tips</div>
        <ul>
          <li>Use open-source tools: Ensure accessibility for replication.</li>
          <li>Document versions: Note specific model/dataset versions to avoid ambiguity.</li>
        </ul>
      </div>

      <div className="input-group">
        <label className="input-label">List your resources</label>
      </div>

      <div className="resource-list">
        {formData.resources.map((resource, index) => (
          <div key={index} className="resource-item">
            <input
              type="text"
              placeholder="Type (e.g., Dataset)"
              value={resource.type}
              onChange={(e) => updateResource(index, 'type', e.target.value)}
            />
            <input
              type="text"
              placeholder="Name"
              value={resource.name}
              onChange={(e) => updateResource(index, 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Source/Link"
              value={resource.source}
              onChange={(e) => updateResource(index, 'source', e.target.value)}
            />
            <button onClick={() => removeResource(index)}>×</button>
          </div>
        ))}
        <button className="add-resource-btn" onClick={addResource}>
          + Add Resource
        </button>
      </div>

      <p className="example-text" style={{ marginTop: '16px' }}>
        Examples: Dataset — XNLI (https://xnli.github.io), Model — mBERT (https://huggingface.co/bert-base-multilingual-cased), Evaluation Metric — Accuracy
      </p>

      <div className="step-navigation">
        <button className="nav-btn" onClick={() => onPrev('step6')}>
          ← back
        </button>
        <button className="nav-btn primary" onClick={() => onNext('step8')}>
          next →
        </button>
      </div>
    </div>
  )
}

export default Step7
