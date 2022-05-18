import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import CollectionPage from "./views/CollectionPage";
import NFTPage from "./views/NFTPage";
import { FaHome } from "react-icons/fa";

export default function App() {
  return (
    <Router>
      <div className={"mt-2"}>
        <ul>
          <li>
            <Link className={"text-white text-decoration-none"} to={"/"}>
              <FaHome size={70} />
            </Link>
          </li>
        </ul>
      </div>

      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"collections/:collection"} element={<CollectionPage />} />
        <Route path={"nfts/:id"} element={<NFTPage />} />
      </Routes>
    </Router>
  );
}
