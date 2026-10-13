import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { parsePath } from './routes'

const { lang, page } = parsePath(window.location.pathname);
const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App lang={lang} page={page} />
  </StrictMode>
);

// Built pages arrive pre-rendered, so React attaches to the existing HTML; the dev server renders from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
