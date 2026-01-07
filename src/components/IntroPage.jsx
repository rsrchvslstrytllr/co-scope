function IntroPage({ onNext }) {
  return (
    <div className="step-container">
      <div className="intro-content">
         <h2 className="step-title">Intro</h2>
        <p className="step-description">
          Starting a new AI/ML project can be overwhelming. Where do you even begin?
        </p>

        <p className="step-description">
          The following is the framework our team uses to focus our research questions and build a solid 
          foundation for our projects. It helps us hone in our research questions, avoid common 
          pitfalls, and align our work with proven best practices from the start. Whether you're 
          a beginner tackling your first research project or an experienced researcher looking to 
          streamline your process, this tool can help ground your research from the beginning.
        </p>

        <h2 style={{ fontSize: '16px', fontWeight: 600, marginTop: '32px', marginBottom: '12px' }}>
          Why does this matter?
        </h2>

        <p className="step-description">
          Because a well-scoped project saves time, reduces frustration, and increases your chances 
          of success. Let's turn your ideas into a clear, actionable plan.
        </p>

        <div className="step-navigation" style={{ justifyContent: 'flex-end' }}>
          <button className="nav-btn primary" onClick={() => onNext('step1')}>
            Step 1 →
          </button>
        </div>
      </div>
    </div>
  )
}

export default IntroPage
