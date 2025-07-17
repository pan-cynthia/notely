import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Profile from '../components/Profile.jsx';
import SearchBar from '../components/SearchBar.jsx';

const NavBar = ({userInfo}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log(searchQuery);
    clearSearch();
  }

  const clearSearch = () => {
    setSearchQuery("");
  }

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex items-center px-6 py-2 bg-white drop-shadow">
      <div className="flex-1/3">
        <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      </div>
      {isHomePage && (
        <>
          <div className="flex flex-1/3 justify-center">
            <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} handleSearch={handleSearch} clearSearch={clearSearch}/>
          </div>
          <div className="flex flex-1/3 justify-end">
            <Profile userInfo={userInfo}/>
          </div>
        </>
      )}
    </div>
  )
}

export default NavBar;
