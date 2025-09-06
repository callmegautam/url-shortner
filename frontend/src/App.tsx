import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Redirect from "@/pages/Redirect";

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
