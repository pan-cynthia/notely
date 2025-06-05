import Profile from '../components/Profile.jsx'
import SearchBar from '../components/SearchBar.jsx'

const NavBar = () => {
  return (
    <div className="flex items-center px-6 py-2 bg-white drop-shadow">
      <div className="flex-1/3">
        <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      </div>
      <div className="flex flex-1/3 justify-center">
        <SearchBar/>
      </div>
      <div className="flex flex-1/3 justify-end">
        <Profile/>
      </div>
    </div>
  )
}

export default NavBar