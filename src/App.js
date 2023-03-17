// import { useEffect, useRef, useState } from "react";
// import User from "./User";

// const PAGE_NUMBER = 1;

// function App() {
//   const [state, setState] = useState({ list: [], pagination: {} });
//   // Update state to include pagination object
//   const [page, setPage] = useState(PAGE_NUMBER);
//   const nameRef = useRef(null);

//   const stateArr = state.list?.map((el) => {
//     return el;
//   });

//   useEffect(() => {
//     if (!page) return;
//     fetch(
//       `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/10`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setState((prevState) => ({
//           list: [...prevState.list, ...data.list], // Append new data to the existing list
//           pagination: data.pagination, // Update pagination object
//         }));
//       })
//       .catch((error) => console.log(error));
//   }, [page]);

//   const scrollToEnd = () => {
//     setPage(state.pagination.nextPage);
//   };

//   window.onscroll = function () {
//     const t = document.querySelector(".saba");

//     if (
//       window.innerHeight + document.documentElement.scrollTop >
//       t.offsetHeight
//     ) {
//       scrollToEnd();
//     }
//   };

//   return (
//     <div className="saba">
//       <h1 ref={nameRef}>
//         {stateArr?.map((el) => {
//           return (
//             // <User prefix={el.prefix} name={el.name} title={el.title} />
//             <div>
//               <p>{el.prefix}</p>
//               <h1>{el.name}</h1>
//               <p>{el.title}</p>
//             </div>
//           );
//         })}
//       </h1>
//     </div>
//   );
// }

// export default App;

import { useCallback, useEffect, useRef, useState } from "react";
import User from "./components/User/User";

const INITIAL_PAGE = 1;

function App() {
  const [state, setState] = useState({ list: [], pagination: {} });
  const [page, setPage] = useState(INITIAL_PAGE);
  const nameRef = useRef(null);

  const loadUsers = useCallback(() => {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/5`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("No network response");
        }
        return response.json();
      })
      .then((data) => {
        setState((prevState) => ({
          list: [...prevState.list, ...data.list],
          pagination: data.pagination,
        }));
      })
      .catch((error) => console.log(error));
  }, [page]);

  useEffect(() => {
    if (!page) return;
    loadUsers();
  }, [page, loadUsers]);

  const scrollToEnd = useCallback(() => {
    setPage(state.pagination.nextPage);
  }, [state.pagination]);

  const handleScroll = useCallback(() => {
    const t = nameRef.current;
    if (
      window.innerHeight + document.documentElement.scrollTop >
      t.offsetHeight
    ) {
      scrollToEnd();
    }
  }, [nameRef, scrollToEnd]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div ref={nameRef}>
      {state.list?.map((user) => (
        <User
          id={user.id}
          prefix={user.prefix}
          name={user.name}
          title={user.title}
        />
      ))}
    </div>
  );
}

export default App;
