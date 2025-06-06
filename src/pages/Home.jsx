import NavBar from '../components/NavBar'
import NoteCard from '../components/NoteCard'
import { MdAdd } from 'react-icons/md'

const Home = () => {
  return (
    <>
      <NavBar/>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-10">
          <NoteCard
            title="Organize Home Office"
            date="Jun 5, 2025"
            content="My home office has become a cluttered mess, making it difficult to find things."
            tags="#Organization"
            isPinned={true}
            pinNote={() => {}}
            editNote={() => {}}
            deleteNote={() => {}}
          />
          <NoteCard
            title="Start Learning Guitar"
            date="Jun 5, 2025"
            content="Learning to play the guitar has always been a dream of mine."
            tags="#Guitar"
            isPinned={false}
            pinNote={() => {}}
            editNote={() => {}}
            deleteNote={() => {}}
          />
          <NoteCard
            title="Try New Recipe"
            date="Jun 5, 2025"
            content="Cooking is one of my favorite hobbies, and I love experimenting in the kitchen."
            tags="#Cooking"
            isPinned={false}
            pinNote={() => {}}
            editNote={() => {}}
            deleteNote={() => {}}
          />
          <NoteCard
            title="Plan Weekend Getaway"
            date="Jun 5, 2025"
            content="Start planning a weekend getaway trip to Monterey."
            tags="#Travel"
            isPinned={false}
            pinNote={() => {}}
            editNote={() => {}}
            deleteNote={() => {}}
          />
        </div>
      </div>
      <button className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10" onClick={() => {}}>
        <MdAdd className="text-white" size={25}/>
      </button>
    </>
  )
}

export default Home