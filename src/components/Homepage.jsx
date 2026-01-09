import { useEffect, useRef } from 'react'

// Pre-create the spark path
const sparkPath = new Path2D('M33.438 7.98158L37.2124 4.31523C38.0367 3.52959 39.3383 3.52959 40.1192 4.35888C40.9001 5.18817 40.9001 6.49758 40.0758 7.28323L34.0454 13.1319C28.7092 18.3259 28.8393 27.0116 34.3925 32.031L40.5964 37.6615C41.4207 38.4471 41.5075 39.7566 40.7265 40.5858C39.9456 41.4151 38.6441 41.5024 37.8198 40.7168L31.8328 35.2609L33.5248 43.2483C33.7851 44.3831 33.0476 45.4743 31.9196 45.6925C30.7916 45.9544 29.707 45.2124 29.4901 44.0776L27.7547 35.8283C26.1929 28.4956 18.8176 24.0437 11.6593 26.0951L3.58988 28.4083C2.50528 28.7139 1.33391 28.1028 1.03023 26.968C0.726539 25.8768 1.33391 24.6984 2.4619 24.3928L7.66797 22.9088L3.06927 21.5121C1.98467 21.163 1.3773 20.0281 1.68099 18.937C2.02806 17.8458 3.15604 17.2347 4.24064 17.5403L12.2667 19.9845C19.3816 22.1668 26.8437 17.8458 28.5357 10.5131L30.4445 2.30747C30.7049 1.2163 31.7895 0.51795 32.9174 0.779832C34.0454 1.04171 34.6962 2.13289 34.4793 3.26771L33.438 7.85064V7.98158ZM26.3231 25.7895C26.0628 24.3928 25.9326 22.9961 26.0194 21.5994C25.0216 22.3414 23.937 22.9525 22.8524 23.4326C24.1105 24.0873 25.2819 24.8729 26.3231 25.7895Z')

function SparkCanvas() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const revealedRef = useRef(new Set())
  const sparksRef = useRef([])
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const spacing = 20
    const sparkSize = 10
    const sidebarWidth = 260
    const scopeRadius = 80
    
    const resize = () => {
      canvas.width = window.innerWidth - sidebarWidth
      canvas.height = window.innerHeight
      
      // Rebuild spark grid
      sparksRef.current = []
      const cols = Math.ceil(canvas.width / spacing) + 1
      const rows = Math.ceil(canvas.height / spacing) + 1
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          sparksRef.current.push({
            x: col * spacing,
            y: row * spacing,
            id: `${col}-${row}`,
            opacity: 0,
            targetOpacity: 0,
            scale: 1,
            targetScale: 1
          })
        }
      }
    }
    resize()
    window.addEventListener('resize', resize)
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const mouse = mouseRef.current
      
      for (const spark of sparksRef.current) {
        const dx = spark.x - mouse.x
        const dy = spark.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        // Check if within scope radius
        if (dist < scopeRadius) {
          revealedRef.current.add(spark.id)
          // Scale and opacity based on distance from center (closer = bigger/brighter)
          const proximity = 1 - (dist / scopeRadius) // 1 at center, 0 at edge
          spark.targetOpacity = 0.3 + proximity * 0.4 // 0.3 at edge, 0.7 at center
          spark.targetScale = 1 + proximity * 1.2 // 1x at edge, 2.2x at center
        } else {
          spark.targetOpacity = 0
          spark.targetScale = 1
        }
        
        // Animate opacity and scale toward target (snappy)
        spark.opacity += (spark.targetOpacity - spark.opacity) * 0.2
        spark.scale += (spark.targetScale - spark.scale) * 0.15
        
        // Draw spark
        if (spark.opacity > 0.01) {
          ctx.save()
          ctx.translate(spark.x, spark.y)
          const s = sparkSize * spark.scale
          ctx.scale(s / 42, s / 46)
          ctx.translate(-21, -23)
          ctx.fillStyle = `rgba(150, 150, 150, ${spark.opacity})`
          ctx.fill(sparkPath)
          ctx.restore()
        }
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()
    
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: '260px', // sidebar width
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  )
}

function Homepage({ onStart }) {
  return (
    <div className="intro-screen" style={{ position: 'relative', minHeight: '100%', height: '100%' }}>
      <SparkCanvas />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          fontSize: '14px',
          color: '#666'
        }}>
          <span>A tool from</span>
          <svg viewBox="0 0 968.1 103.1" style={{ width: '120px', height: 'auto' }}>
            <g>
              <path fill="#000000" d="M134.3,51.5C134.3,19.2,150,.4,177.3.4s34.1,12.4,37.9,33.8h-13.2c-3.4-14.8-11.9-22.3-24.9-22.3-19.3,0-30,14.5-30,39.7s10.3,39.7,29.6,39.7,21.6-7.3,25.2-22.3h13.2c-3.9,21.6-17.8,33.8-38.4,33.8s-42.4-19-42.4-51.2h0Z"/>
              <path fill="#000000" d="M227,65.2c0-22.3,14.9-37.5,36.4-37.5s36.4,15.2,36.4,37.5-14.9,37.5-36.4,37.5-36.4-15.2-36.4-37.5ZM287.7,65.2c0-15.7-9.8-27-24.3-27s-24.3,11.4-24.3,27,9.8,27,24.3,27,24.3-11.4,24.3-27Z"/>
              <path fill="#000000" d="M379.4,59.6v42.3h-11.8v-41.5c0-14.2-7-21.8-19.4-21.8s-21.6,9.8-21.6,25.3v38.1h-11.8V1.2h11.8v37.5c5.2-7,13.5-11.1,23.6-11.1,18,0,29.2,10.9,29.2,31.9h0Z"/>
              <path fill="#000000" d="M406.1,67.8v.7c.4,13.9,9.2,23.7,23.1,23.7s18.4-5.5,20.8-14.9h11.9c-2.9,14.7-14.9,25.4-31.9,25.4s-36.4-15.1-36.4-37.5,14.1-37.5,34.8-37.5,34.2,13.1,34.8,34.8c0,1.1-.1,3.6-.3,5.3h-56.9.1ZM406.8,57.7h43.8c-1.1-12.6-9.8-19.7-22-19.7s-20.7,7.8-21.8,19.7Z"/>
              <path fill="#000000" d="M534,28.5v11.5h-9.5c-17.1,0-22.1,13.1-22.1,24.7v26.3h21.4v10.8h-49.6v-10.8h16.4v-51.7h-16.4v-10.8h27.6l.4,12.4c3.3-5.8,9.9-12.4,23.9-12.4,0,0,7.9,0,7.9,0Z"/>
              <path fill="#000000" d="M555,67.8v.7c.4,13.9,9.2,23.7,23.1,23.7s18.4-5.5,20.8-14.9h11.9c-2.9,14.7-14.9,25.4-31.9,25.4s-36.4-15.1-36.4-37.5,14.1-37.5,34.8-37.5,34.2,13.1,34.8,34.8c0,1.1,0,3.6-.3,5.3h-56.9.1ZM555.8,57.7h43.8c-1.2-12.6-9.8-19.7-22-19.7s-20.7,7.8-21.8,19.7Z"/>
              <path fill="#000000" d="M673.9,101.8V1.2h12.5v89.1h45.1v11.5s-57.6,0-57.6,0Z"/>
              <path fill="#000000" d="M810.2,91.1v10.8h-6.5c-9.8,0-13.1-4.2-13.2-11.4-4.6,6.6-11.9,12.2-24.6,12.2s-27-8-27-21.4,10.2-22.9,29.5-22.9h21.6v-5c0-9.5-6.8-15.2-18.3-15.2s-17.2,4.9-18.7,12.4h-11.8c1.7-14.4,13.4-22.9,31-22.9s29.5,9.3,29.5,26.4v32.1c0,3.9,1.4,4.9,4.7,4.9h3.8ZM789.9,68.4h-22.7c-10.5,0-16.4,3.9-16.4,12.2s6.2,12.1,16,12.1c14.7,0,23.1-8.5,23.1-20.7v-3.6h0Z"/>
              <path fill="#000000" d="M894.8,65.2c0,22.4-14.9,37.5-35.2,37.5s-20.7-5-25.2-12.1l-1.6,11.2h-10.2V1.2h11.8v39.1c4.9-6.8,12.8-12.6,25.2-12.6,20.3,0,35.2,13.7,35.2,37.5ZM882.7,65.2c0-16-9.8-27-24.3-27s-24.1,11.1-24.1,26.7,9.8,27.3,24.1,27.3,24.3-11.1,24.3-27Z"/>
              <path fill="#000000" d="M905.5,77.7h12.1c.4,8.6,8,14.9,20.3,14.9s17.7-4.5,17.7-11.2-8-9.9-19-11.2c-16.4-2-29.5-5.3-29.5-20.6s12.2-22,28.7-22,28.7,7.9,29.9,23.1h-12.1c-.9-7.5-7.8-13.1-17.8-13.1s-17.1,4.3-17.1,11.1,7.8,9.1,18.4,10.3c16.7,2,30,5.2,30,21.4s-13.1,22.1-29.3,22.1-32.1-8.9-32.3-25v.2Z"/>
            </g>
            <path fill="#000000" d="M75.2,16.3l8.7-8.4c1.9-1.8,4.9-1.8,6.7,0,1.8,1.9,1.8,4.9,0,6.7l-13.9,13.4c-12.3,11.9-12,31.8.8,43.3l14.3,12.9c1.9,1.8,2.1,4.8.3,6.7s-4.8,2.1-6.7.3l-13.8-12.5,3.9,18.3c.6,2.6-1.1,5.1-3.7,5.6-2.6.6-5.1-1.1-5.6-3.7l-4-18.9c-3.6-16.8-20.6-27-37.1-22.3l-18.6,5.3c-2.5.7-5.2-.7-5.9-3.3-.7-2.5.7-5.2,3.3-5.9l12-3.4-10.6-3.2c-2.5-.8-3.9-3.4-3.2-5.9.8-2.5,3.4-3.9,5.9-3.2l18.5,5.6c16.4,5,33.6-4.9,37.5-21.7l4.4-18.8c.6-2.5,3.1-4.1,5.7-3.5,2.6.6,4.1,3.1,3.6,5.7l-2.4,10.5h0v.3ZM58.8,57.1c-.6-3.2-.9-6.4-.7-9.6-2.3,1.7-4.8,3.1-7.3,4.2,2.9,1.5,5.6,3.3,8,5.4Z"/>
          </svg>
        </div>
        
        <h1 className="intro-title">co/scope</h1>
        <p className="intro-subtitle">build a strong foundation for your research project</p>
        <button className="intro-cta" onClick={onStart}>
          Click here to get started.
        </button>
      </div>
    </div>
  )
}

export default Homepage
