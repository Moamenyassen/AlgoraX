import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Used only at build time by scripts/prerender.js to turn each page into static HTML.
export const render = (lang, page) => renderToString(
  <StrictMode>
    <App lang={lang} page={page} />
  </StrictMode>
);
