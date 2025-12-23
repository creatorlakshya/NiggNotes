import fitz  # PyMuPDF
import io

def process_pdf(input_bytes, theme="pure-black", eye_care=False, pages="all"):
    """
    Advanced PDF Dark Mode Processing.
    Mathematically inverts the visual layer for perfect AMOLED compliance.
    """
    try:
        print(f"Processing PDF starting... Theme: {theme}")
        doc = fitz.open(stream=input_bytes, filetype="pdf")
        output_doc = fitz.open()
        
        for i in range(len(doc)):
            page = doc[i]
            
            # Senior Designer approach: High-fidelity rasterization for perfect visuals
            # We use a 2x zoom for retina-grade clarity
            zoom = 2
            mat = fitz.Matrix(zoom, zoom)
            pix = page.get_pixmap(matrix=mat, colorspace=fitz.csRGB)
            
            # Shift to deep matte shadows
            pix.invert_irect()
            
            # Reconstruct the page in the Master archive
            new_page = output_doc.new_page(width=page.rect.width, height=page.rect.height)
            
            # Apply the perfected visual layer
            img_data = pix.tobytes("png")
            new_page.insert_image(new_page.rect, stream=img_data)
            
            print(f"Page {i+1} perfected.")
            
        output_stream = io.BytesIO()
        output_doc.save(output_stream)
        print("PDF conversion completed successfully.")
        return output_stream.getvalue()
        
    except Exception as e:
        print(f"CRITICAL ERROR in processor: {e}")
        # Return a simple error PDF or original as fallback
        return input_bytes
