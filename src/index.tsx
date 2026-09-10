import { createRoot } from 'react-dom/client';
import App from './app'

const root = createRoot(document.getElementById('testing-app')!)

root.render(<App />)
