from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from processor import process_pdf
import uvicorn

app = FastAPI(title="NiggNote API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/convert")
async def convert_pdf(
    file: UploadFile = File(...),
    theme: str = Form("pure-black"),
    eye_care: bool = Form(False),
    pages: str = Form("all")
):
    pdf_bytes = await file.read()
    processed_pdf = process_pdf(pdf_bytes, theme, eye_care, pages)
    
    return Response(
        content=processed_pdf,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=dark_{file.filename}"}
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
