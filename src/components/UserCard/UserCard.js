import "./UserCard.styles.css";
const UserCard = ({ prefix, name, lastName, title, imageUrl }) => {
  return (
    <div className="card-container">
      <img className="user-img" alt="user pics" src={imageUrl} />
      <div className="card-txt">
        <h1>
          {prefix} {name} {lastName}{" "}
        </h1>
        <p className="title">{title}</p>
      </div>
    </div>
  );
};

export default UserCard;
