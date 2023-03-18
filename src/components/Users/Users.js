import { useEffect, useState } from "react";
import UserCard from "../UserCard/UserCard";
import "./Users.styles.css";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

const PAGE_NUMBER = 1;

function Users({ userId }) {
  const [state, setState] = useState({ list: [], pagination: {} });
  const [page, setPage] = useState(PAGE_NUMBER);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    if (loaded) {
      setLoaded(false);
      return;
    }

    if (!page) {
      setPage(1);
      return;
    }

    const fetchParams = userId ? `${userId}/friends` : "";
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${fetchParams}/${page}/20`
    )
      .then((response) => response.json())
      .then((data) => {
        if (userId) {
          if (data.pagination.current === page) {
            setState(data);
          } else {
            setState((prevState) => ({
              list: [...prevState.list, ...data.list],
              pagination: data.pagination,
            }));
          }
        } else {
          setState((prevState) => ({
            list: [...prevState.list, ...data.list],
            pagination: data.pagination,
          }));
        }
      })
      .catch((error) => console.log(error));
  }, [page, loaded, userId]);

  const scrollToEnd = () => {
    setPage(state.pagination.nextPage);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector(".container");
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        (container?.offsetHeight * 80) / 100
      ) {
        scrollToEnd();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [state]);

  return (
    <div className="container">
      <h4 className="grid">
        {state.list?.map((el) => {
          return (
            <Link key={v4()} to={`/user/${el.id}`}>
              <div onClick={handleClick}>
                <UserCard
                  imageUrl={el.imageUrl}
                  id={el.id}
                  prefix={el.prefix}
                  name={el.name}
                  title={el.title}
                />
              </div>
            </Link>
          );
        })}
      </h4>
    </div>
  );
}

export default Users;
