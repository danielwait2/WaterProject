import CookieConsent from 'react-cookie-consent';
import './App.css';
import ProjectList from './ProjectList';
import Fingerprint from './Fingerprint';

function App() {
    return (
        <>
            {' '}
            <ProjectList />
            <CookieConsent>
                This website uses cookies to enhance the user experience.
            </CookieConsent>
            <Fingerprint />
        </>
    );
}

export default App;
