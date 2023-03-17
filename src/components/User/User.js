function User({ prefix, name, title, id }) {
  return (
    <div>
      <div>
        {/* <img src={el.imgUrl} /> */}
        <p>{prefix}</p>
        <h1>{name}</h1>
        <p>{title}</p>
      </div>
    </div>
  );
}

export default User;
