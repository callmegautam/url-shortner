import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Redirect from "./pages/Redirect";
import Home from "./pages/Home";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:shortUrl" element={<Redirect />} />
            </Routes>
        </Router>
    );
};

export default App;
