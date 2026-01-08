function IntroPage({ onNext }) {
  return (
    <div className="step-container">
      <div className="intro-content">
         <h2 className="step-title">Intro</h2>
        <p className="step-description">
          Starting a new AI/ML project can be overwhelming. Where do you even begin?
        </p>

        <p className="step-description">
          Co/scope walks you through the framework Cohere Labs uses to get our thoughts 
          organized at the start of every project. But here's what's important to understand: this is 
          just for getting started. Don't worry about making your answers perfect. The goal is to get your ideas down and 
          start thinking through key questions.
        </p>

        <p className="step-description">
          These questions are designed to help you identify what you know, what you don't know, and 
          what you need to figure out. Once you've worked through them, you'll continue refining as you dig into the literature, run experiments, and talk with 
          collaborators. Our team constantly revisits and revises our scope docs. Answers move between 
          sections, priorities shift, questions get sharper. That's the process.
        </p>

        <h2 style={{ fontSize: '16px', fontWeight: 600, marginTop: '32px', marginBottom: '12px' }}>
          Why does this matter?
        </h2>

        <p className="step-description">
          Because starting with a structured way to think through your project (even a messy first pass) 
          saves you time, reduces frustration, and helps you avoid common pitfalls. Let's get your 
          ideas out of your head and into a form you can work with.
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
