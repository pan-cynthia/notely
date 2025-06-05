const NoteCard = ({title, date, content, tags}) => {
  return (
    <div className="w-full h-35 px-5 py-3 mb-4 text-sm rounded shadow hover:shadow-xl hover:shadow-slate-300 outline-none">
      <div className="h-full flex flex-col justify-center space-y-2">
        <h6 className="text-sm font-medium">{title}</h6>
        <p className="text-xs text-slate-500">{date}</p>
        <p className="text-nowrap">{content?.slice(0, 60)}</p>
        <div className="text-xs text-slate-500">{tags}</div>
      </div>
    </div>
  )
}

export default NoteCard
