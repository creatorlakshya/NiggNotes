# Deployment Guide - NiggNotes Master Edition

Follow these steps to deploy your localized project to the cloud.

## 1. Prepare GitHub Repository
1. Create a new repository on [GitHub](https://github.com/new).
2. Push your project to the repository:
   ```powershell
   git init
   git add .
   git commit -m "feat: Senior Designer Master Edition"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

## 2. Deploy Backend (Render)
1. Go to [Render](https://dashboard.render.com/).
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository.
4. Settings:
   - **Name**: `niggnote-backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port 10000`
5. Note the generated URL (e.g., `https://niggnote-backend.onrender.com`).

## 3. Deploy Frontend (Vercel)
1. Go to [Vercel](https://vercel.com/new).
2. Connect your GitHub repository.
3. Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
4. **Environment Variables**:
   - Add `VITE_API_URL` with the value of your Render URL (from step 2), e.g., `https://niggnote-backend.onrender.com/convert`.
5. Click **Deploy**.

## 4. Final Verification
- Visit your Vercel URL.
- Test a PDF conversion to ensure the frontend is communicating with your Render backend.

---
*Created by NiggNote Deployment Assistant*
