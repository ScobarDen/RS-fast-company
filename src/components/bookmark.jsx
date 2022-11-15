const Bookmark = ({isFavorite, id, onToggle}) => {
  const fill = isFavorite ? '-fill' : '';
  return(
      <button className='btn p-0' onClick={()=>onToggle(id)}>
        <i className={`bi bi-bookmark-heart${fill} fs-4`}></i>
      </button>
  );
};

export default Bookmark;