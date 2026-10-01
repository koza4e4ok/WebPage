import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {CaseStudyPage} from './CaseStudyPage.tsx';
import '../index.css';

const slug = window.location.pathname.match(/\/work\/([^/]+)/)?.[1] ?? '';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CaseStudyPage slug={slug} />
  </StrictMode>,
);
