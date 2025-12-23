import { motion } from 'framer-motion'
import { Upload, FileText, CheckCircle2, X } from 'lucide-react'

export default function UploadZone({ onFileSelect, selectedFile }) {
    return (
        <div className="w-full">
            <motion.div
                whileHover={{ scale: 1.002 }}
                whileTap={{ scale: 0.998 }}
                className={`relative w-full border border-dashed rounded-[3rem] p-16 flex flex-col items-center justify-center cursor-pointer transition-all duration-700 overflow-hidden group/zone
          ${selectedFile ? 'border-accent/40 bg-accent/[0.03]' : 'border-white/[0.05] hover:border-accent/40 hover:bg-white/[0.01]'}
        `}
                onClick={() => !selectedFile && document.getElementById('fileInput').click()}
            >
                {/* Master Grade Background Elements */}
                <div className="absolute inset-0 bg-accent/[0.01] opacity-0 group-hover/zone:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-accent/5 blur-[100px] opacity-0 group-hover/zone:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                <input
                    id="fileInput"
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => onFileSelect(e.target.files[0])}
                />

                {selectedFile ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-8 z-10"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: [0, 1, 0, -1, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="relative w-32 h-32 bg-accent/10 border border-accent/20 rounded-[2.5rem] flex items-center justify-center backdrop-blur-xl group/icon shadow-2xl"
                            >
                                <FileText className="text-accent w-14 h-14 group-hover/icon:scale-110 transition-transform duration-700" strokeWidth={0.5} />
                                <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full opacity-30 group-hover/icon:opacity-60 transition-opacity" />
                            </motion.div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFileSelect(null);
                                }}
                                className="absolute -top-4 -right-4 w-12 h-12 bg-[#000102] border border-white/10 rounded-full flex items-center justify-center text-[#64748b] hover:text-red-400 transition-all shadow-2xl hover:scale-110 active:scale-90 z-20"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-3 text-center">
                            <p className="text-3xl font-black text-[#f8fafc] max-w-[400px] truncate tracking-tight">{selectedFile.name}</p>
                            <div className="flex items-center justify-center gap-6">
                                <span className="text-accent/60 text-[10px] font-black uppercase tracking-[0.6em]">
                                    SECURE BUNDLE
                                </span>
                                <div className="w-1.5 h-1.5 bg-accent/20 rounded-full" />
                                <span className="text-[#64748b]/60 text-[10px] font-black uppercase tracking-[0.6em]">
                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center gap-12 py-12 z-10">
                        <div className="relative w-28 h-28">
                            <div className="absolute inset-0 bg-accent/20 blur-[60px] opacity-0 group-hover/zone:opacity-100 transition-opacity duration-1000" />
                            <div className="relative w-full h-full bg-white/[0.04] border border-white/[0.08] rounded-[2.5rem] flex items-center justify-center group-hover/zone:border-accent/40 group-hover/zone:scale-110 group-hover/zone:shadow-[0_0_80px_rgba(147,172,255,0.15)] transition-all duration-1000">
                                <Upload className="text-[#64748b]/60 w-12 h-12 group-hover/zone:text-[#f8fafc] transition-colors duration-1000" strokeWidth={0.5} />
                            </div>
                        </div>
                        <div className="space-y-6 text-center">
                            <h3 className="text-4xl font-black text-[#f8fafc] tracking-tight">Deposit Archive.</h3>
                            <p className="text-[#64748b] text-[11px] font-black uppercase tracking-[0.8em] opacity-40">
                                Click to select PDF
                            </p>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    )
}
