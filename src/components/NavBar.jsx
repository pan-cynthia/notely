import Profile from '../components/Profile.jsx'
import SearchBar from '../components/SearchBar.jsx'

const NavBar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-2 bg-white drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      <SearchBar/>
      <Profile/>
    </div>
  )
}

export default NavBar