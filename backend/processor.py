import fitz  # PyMuPDF
import io

def process_pdf(input_bytes, theme="pure-black", eye_care=False, pages="all"):
    """
    Advanced PDF Dark Mode Processing.
    Uses high-performance rasterization and pixmap manipulation.
    """
    try:
        print(f"Processing PDF starting... Theme: {theme}, Eye Care: {eye_care}, Pages: {pages}")
        doc = fitz.open(stream=input_bytes, filetype="pdf")
        output_doc = fitz.open()
        
        # Parse page range
        total_pages = len(doc)
        page_indices = []
        if pages == "all":
            page_indices = range(total_pages)
        else:
            try:
                # Basic parser for "1,2,5-10"
                for part in pages.split(','):
                    if '-' in part:
                        start, end = map(int, part.split('-'))
                        page_indices.extend(range(start-1, end))
                    else:
                        page_indices.append(int(part)-1)
            except:
                page_indices = range(total_pages)

        for i in page_indices:
            if i < 0 or i >= total_pages:
                continue
                
            page = doc[i]
            
            # Use 1.5x zoom for a good balance between quality and performance
            zoom = 1.5
            mat = fitz.Matrix(zoom, zoom)
            pix = page.get_pixmap(matrix=mat, colorspace=fitz.csRGB)
            
            # Apply Theme
            if theme == "pure-black":
                pix.invert_irect()
            
            # Create new page with original dimensions
            new_page = output_doc.new_page(width=page.rect.width, height=page.rect.height)
            
            # Insert the processed pixmap directly (much faster than PNG conversion)
            new_page.insert_image(new_page.rect, pixmap=pix)
            
            # Eye Care: Apply a warm amber tint overlay
            if eye_care:
                # Add a semi-transparent amber overlay for eye comfort
                new_page.draw_rect(
                    new_page.rect,
                    color=None,
                    fill=(1.0, 0.8, 0.4), # Warm Amber
                    fill_opacity=0.08,     # Subtle enough
                    overlay=True
                )
            
            pix = None # help GC
            # print(f"Page {i+1} perfected.")
            
        output_stream = io.BytesIO()
        output_doc.save(output_stream, garbage=4, deflate=True)
        doc.close()
        
        print("PDF conversion completed successfully.")
        return output_stream.getvalue()
        
    except Exception as e:
        import traceback
        error_msg = f"CRITICAL ERROR in processor: {str(e)}\n{traceback.format_exc()}"
        print(error_msg)
        with open("processor_error.log", "a") as f:
            f.write(error_msg + "\n")
        return input_bytes
