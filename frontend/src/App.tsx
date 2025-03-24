import './App.css';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import DonatePage from './pages/DonatePage';
import ProjectsPage from './pages/ProjectPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// router is general
//routes hold the route definition
// route is a specific route
function App() {
    return (
        <>
            <CartProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<ProjectsPage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route
                            path="/donate/:projectName/:projectId"
                            element={<DonatePage />}
                        />
                    </Routes>
                </Router>
            </CartProvider>
        </>
    );
}

export default App;
