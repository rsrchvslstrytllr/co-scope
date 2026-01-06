function IntroScreen({ onStart }) {
  return (
    <div className="intro-screen">
      <h1 className="intro-title">co/scope</h1>
      <p className="intro-subtitle">build a strong foundation for your research project</p>
      <button className="intro-cta" onClick={onStart}>
        Click here to get started.
      </button>
    </div>
  )
}

export default IntroScreen
