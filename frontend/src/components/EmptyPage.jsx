import AddNoteImg from '../assets/add-note.svg';

const EmptyPage = () => {
  return (
    <div className="h-[75vh] flex flex-col items-center justify-center">
      <img className="w-60" src={AddNoteImg} alt="No notes"/>
      <p className="w-3/4 text-sm font-medium text-slate-700 text-center mt-5">Add your first note! Click the '+' button at the bottom right corner to start recording your thoughts, ideas, and reminders.</p>
    </div>
  )
}

export default EmptyPage;
