import CookieConsent from 'react-cookie-consent';
import './App.css';
import ProjectList from './ProjectList';
import CategoryFilter from './CategoryFiler';
import WelcomeBand from './WelcomeBand';
import { useState } from 'react';

function App() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <>
            <div className="container mt-4">
                <div className="row bg-primary text-white">
                    <WelcomeBand />
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
                    </div>
                    <div className="col-md-9">
                        <ProjectList selectedCategories={selectedCategories}/>
                    </div>
                </div>
            </div>
            <CookieConsent>
                This website uses cookies to enhance the user experience.
            </CookieConsent>
        </>
    );
}

export default App;
