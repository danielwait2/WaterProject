import CookieConsent from 'react-cookie-consent';
import '../App.css';
import ProjectList from '../components/ProjectList';
import CategoryFilter from '../components/CategoryFiler';
import WelcomeBand from '../components/WelcomeBand';
import { useState } from 'react';
import CartSummary from '../components/CartSummary';

function ProjectsPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <>
            <div className="container mt-4">
                    <CartSummary />
                    <WelcomeBand />
                <div className="row">
                    <div className="col-md-3">
                        <CategoryFilter
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                        />
                    </div>
                    <div className="col-md-9">
                        <ProjectList selectedCategories={selectedCategories} />
                    </div>
                </div>
            </div>
            <CookieConsent>
                This website uses cookies to enhance the user experience.
            </CookieConsent>
        </>
    );
}

export default ProjectsPage;
