import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { FirebaseProvider } from './context/Firebase.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <FirebaseProvider>
            <App />
        </FirebaseProvider>
    </BrowserRouter>
)
