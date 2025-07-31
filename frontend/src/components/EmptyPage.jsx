const EmptyPage = ({ imgSrc, message }) => {
  return (
    <div className="h-[75vh] flex flex-col items-center justify-center text-center">
      <img className="w-60 mr-7" src={imgSrc} alt="Image of empty page" />
      <p className="text-sm font-medium text-slate-700 mt-5 text-center">
        {message}
      </p>
    </div>
  );
};

export default EmptyPage;
