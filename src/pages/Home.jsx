import NavBar from '../components/NavBar'
import NoteCard from '../components/NoteCard'

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
          />
          <NoteCard
            title="Start Learning Guitar"
            date="Jun 5, 2025"
            content="Learning to play the guitar has always been a dream of mine."
            tags="#Guitar"
          />
          <NoteCard
            title="Try New Recipe"
            date="Jun 5, 2025"
            content="Cooking is one of my favorite hobbies, and I love experimenting in the kitchen."
            tags="#Cooking"
          />
          <NoteCard
            title="Plan Weekend Getaway"
            date="Jun 5, 2025"
            content="Start planning a weekend getaway trip to Monterey."
            tags="#Travel"
          />
        </div>
      </div>
    </>
  )
}

export default Home