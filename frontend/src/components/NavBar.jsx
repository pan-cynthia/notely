import { useState } from 'react';
import Profile from '../components/Profile.jsx';
import SearchBar from '../components/SearchBar.jsx';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log(searchQuery);
    clearSearch();
  }

  const clearSearch = () => {
    setSearchQuery("");
  }

  return (
    <div className="flex items-center px-6 py-2 bg-white drop-shadow">
      <div className="flex-1/3">
        <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      </div>
      <div className="flex flex-1/3 justify-center">
        <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} handleSearch={handleSearch} clearSearch={clearSearch}/>
      </div>
      <div className="flex flex-1/3 justify-end">
        <Profile/>
      </div>
    </div>
  )
}

export default NavBar;
