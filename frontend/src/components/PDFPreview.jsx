import { useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Use local worker
// Use local worker from node_modules if possible, otherwise a stable CDN
const PDF_JS_VERSION = '4.0.379'; // Ensure consistency
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export default function PDFPreview({ file, theme }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!file) return;

        const renderPage = async () => {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
                const pdf = await loadingTask.promise;
                const page = await pdf.getPage(1);

                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = canvasRef.current;
                if (!canvas) return;

                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };

                await page.render(renderContext).promise;
            } catch (err) {
                console.error("PDF Preview Error:", err);
            }
        };

        renderPage();
    }, [file]);

    const getFilter = () => {
        if (theme === 'pure-black') return 'invert(1) hue-rotate(180deg) brightness(0.8) contrast(1.2)';
        if (theme === 'dark-gray') return 'invert(0.9) hue-rotate(180deg) brightness(0.7)';
        if (theme === 'sepia') return 'invert(0.9) sepia(0.6) hue-rotate(10deg) brightness(0.8)';
        return 'none';
    };

    return (
        <div className="relative mt-8 group">
            <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div
                className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500"
                style={{ filter: getFilter() }}
            >
                <canvas ref={canvasRef} className="max-w-full h-auto" />
            </div>
            <p className="text-center mt-4 text-secondary text-sm">Preview of first page</p>
        </div>
    );
}
