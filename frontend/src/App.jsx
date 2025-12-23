import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import axios from 'axios'
import { Download, Loader2, Sparkles, FileText, ArrowRight, ShieldCheck } from 'lucide-react'
import UploadZone from './components/UploadZone'

function App() {
  const [file, setFile] = useState(null)
  const [isConverting, setIsConverting] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [errorStatus, setErrorStatus] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e) => {
    // Parallax background
    setMousePos({ x: e.clientX, y: e.clientY })

    // 3D Tilt calculation
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const handleConvert = async () => {
    if (!file) return
    setIsConverting(true)
    setErrorStatus(null)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('theme', 'pure-black')
    formData.append('eye_care', false)
    formData.append('pages', 'all')

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.post(`${apiUrl}/convert`, formData, {
        responseType: 'blob',
        timeout: 60000
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      setDownloadUrl(url)
    } catch (err) {
      console.error("Conversion error:", err)
      setErrorStatus("Failed to convert the PDF. Please try again.")
    } finally {
      setIsConverting(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setDownloadUrl(null)
    setErrorStatus(null)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen flex flex-col bg-[#010203] selection:bg-accent/30 overflow-x-hidden relative"
    >
      {/* Tactile Texture Layer */}
      <div className="noise-overlay" />

      {/* Interactive Cursor Aura */}
      <motion.div
        animate={{
          x: mousePos.x - 200,
          y: mousePos.y - 200,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 200 }}
        className="fixed w-[400px] h-[400px] bg-accent/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen"
      />

      {/* Dynamic Background Auras */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/20 blur-[180px] pointer-events-none rounded-full z-0"
      />

      {/* Header */}
      <nav className="w-full py-20 flex justify-center sticky top-0 bg-[#000102]/60 backdrop-blur-2xl z-[60] border-b border-white/[0.04]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="group cursor-default flex flex-col items-center gap-2"
        >
          <motion.div
            className="flex gap-2 pb-6"
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            {"NIGGNOTES".split("").map((char, i) => (char === " " ? <span key={i} className="w-4" /> : (
              <motion.span
                key={i}
                variants={{
                  initial: { opacity: 0, y: 30, filter: "blur(10px)" },
                  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
                  hover: {
                    y: -12,
                    color: "#93acff",
                    transition: { duration: 0.4, ease: "backOut" }
                  }
                }}
                className="text-5xl font-black tracking-widest text-[#f8fafc] leading-none transition-colors duration-500 cursor-default"
                transition={{
                  delay: 0.1 + (i * 0.06),
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {char}
              </motion.span>
            )))}
          </motion.div>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent to-transparent rounded-full opacity-40 shadow-[0_0_20px_rgba(147,172,255,0.3)]"
          />
        </motion.div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-3xl mx-auto px-8 flex flex-col items-center justify-center py-12 z-10 transition-all duration-1000">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseLeave={handleMouseLeave}
          className="w-full relative"
        >
          {/* Architectural Light Leak */}
          <div className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] bg-accent/[0.03] blur-[150px] rounded-full pointer-events-none" />

          <AnimatePresence mode="wait">
            {!downloadUrl ? (
              <motion.div
                key="upload-state"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(50px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-[#040507]/60 border border-white/[0.08] rounded-[4rem] p-16 shadow-[0_80px_160px_rgba(0,0,0,0.8)] backdrop-blur-[80px] flex flex-col items-center gap-16 overflow-hidden"
              >
                {/* Advanced Surface Finish */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div className="space-y-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-3 px-6 py-2 bg-white/[0.03] border border-white/[0.08] rounded-full text-[11px] uppercase tracking-[0.5em] font-black text-[#64748b]"
                  >
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(147,172,255,1)]" /> Master Edition
                  </motion.div>
                  <h1 className="text-5xl font-black text-[#f8fafc] leading-[1.1] tracking-tight">
                    Visionary Comfort. <br />
                    <span className="text-[#64748b] opacity-40 font-medium">Mastered in Shadows.</span>
                  </h1>
                </div>

                <div className="w-full">
                  <UploadZone onFileSelect={setFile} selectedFile={file} />
                </div>

                {errorStatus && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold text-center"
                  >
                    {errorStatus}
                  </motion.div>
                )}

                <div className="w-full space-y-12">
                  <button
                    disabled={!file || isConverting}
                    onClick={handleConvert}
                    className="group relative w-full h-20 bg-[#f8fafc] rounded-3xl text-[#000102] font-black text-xl flex items-center justify-center gap-4 hover:shadow-[0_0_60px_rgba(147,172,255,0.3)] transition-all active:scale-[0.98] disabled:opacity-20 disabled:pointer-events-none overflow-hidden animate-breath"
                  >
                    {isConverting ? (
                      <div className="flex items-center gap-4">
                        <Loader2 className="animate-spin text-accent" size={28} />
                        <span className="uppercase tracking-[0.3em] text-xs font-black">Refining Material</span>
                      </div>
                    ) : (
                      <>
                        <span className="z-10 uppercase tracking-[0.3em] text-sm">Convert to Dark</span>
                        <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-500 z-10" />
                      </>
                    )}
                  </button>

                  <div className="flex justify-between items-center px-4 w-full text-[#64748b]/30 text-[10px] uppercase tracking-[0.5em] font-black">
                    <span className="hover:text-white/40 transition-colors">Tactile</span>
                    <div className="w-1.5 h-1.5 bg-white/[0.05] rounded-full" />
                    <span className="hover:text-white/60 transition-colors">Architectural</span>
                    <div className="w-1.5 h-1.5 bg-white/[0.05] rounded-full" />
                    <span className="hover:text-white/40 transition-colors">Pure</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-[#040507]/80 border border-white/[0.1] rounded-[4rem] p-20 shadow-[0_80px_160px_rgba(0,0,0,0.9)] backdrop-blur-[100px] flex flex-col items-center gap-12"
              >
                <div className="w-32 h-32 bg-accent/10 border border-accent/20 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_80px_rgba(147,172,255,0.2)] relative group">
                  <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full opacity-40 group-hover:opacity-100 transition-opacity" />
                  <ShieldCheck className="text-accent relative z-10" size={72} strokeWidth={0.5} />
                </div>

                <div className="text-center space-y-4">
                  <h2 className="text-5xl font-black text-[#f8fafc] tracking-tighter uppercase">Perfected.</h2>
                  <p className="text-[#64748b] text-xl font-medium max-w-xs mx-auto">Your eye-care companion is ready for delivery.</p>
                </div>

                <div className="w-full flex flex-col gap-6">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={downloadUrl}
                    download={`dark_mode_${file?.name || 'document'}.pdf`}
                    className="w-full h-20 bg-accent rounded-3xl text-[#000102] font-black text-xl flex items-center justify-center gap-4 shadow-[0_30px_60px_rgba(147,172,255,0.3)]"
                  >
                    <Download size={28} strokeWidth={2.5} />
                    Download PDF
                  </motion.a>
                  <button
                    onClick={handleReset}
                    className="text-[#64748b]/40 hover:text-white transition-colors text-[11px] uppercase tracking-[0.6em] font-black pt-8"
                  >
                    ← Start Over
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 flex flex-col items-center gap-4 z-10">
        <div className="h-[1px] w-16 bg-white/[0.05] mb-2" />
        <p className="text-[12px] uppercase tracking-[0.8em] font-black text-white/50 flex items-center">
          MADE BY &nbsp;
          <span className="relative inline-block overflow-hidden rounded-md px-2 py-0.5 group/name">
            <span className="text-accent relative z-10 transition-colors duration-500 group-hover:text-white">Lakshya</span>
            <motion.div
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent z-20 pointer-events-none"
              animate={{ x: ["-150%", "150%"] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
                repeatDelay: 1
              }}
              style={{ mixBlendMode: 'plus-lighter', skewX: '-20deg' }}
            />
          </span>
        </p>
        <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#64748b]/10">
          Architectural Digital Utility • 2025
        </p>
      </footer>
    </div>
  )
}

export default App
