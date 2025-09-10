import { useState } from "react";
import Weather from "./components/Weather";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Forecast7Days from "./components/Forecast7Days";

function App() {
    const [appTheme, setAppTheme] = useState("bg-gray-100");

    return (
        <Router>
            <div className={`min-h-screen ${appTheme} flex items-center justify-center transition-all duration-500`}>
                <Routes>
                    <Route path="/" element={<Weather setAppTheme={setAppTheme} />} />
                    <Route path="/7days" element={<Forecast7Days />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
