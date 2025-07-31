import { useState } from "react";
import { useLocation } from "react-router-dom";

import Logo from "../assets/logo.png";

import Profile from "../components/Profile";
import SearchBar from "../components/SearchBar";

const NavBar = ({ userInfo, searchNotes, clearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleSearch = () => {
    if (searchQuery) {
      searchNotes(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    clearSearch();
  };

  return (
    <div className="flex items-center px-6 py-2 bg-white drop-shadow">
      <div className="flex flex-1/3 items-center space-x-2">
        <img src={Logo} width={35} />
        <h2 className="text-xl font-medium text-black py-2">Notely</h2>
      </div>
      {isHomePage && (
        <>
          <div className="flex flex-1/3 justify-center">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              handleSearch={handleSearch}
              handleClearSearch={handleClearSearch}
            />
          </div>
          <div className="flex flex-1/3 justify-end">
            <Profile userInfo={userInfo} />
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
