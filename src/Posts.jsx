import { useEffect, useState } from "react";
import _ from "lodash";

export const Posts = () => {
  const [posts, setPosts] = useState();
  const [paginatedPosts, setPaginatedPosts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setPaginatedPosts(_(data).slice(0).take(pageSize).value());
      });
  }, []);

  const pageCount = posts ? Math.ceil(posts.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * pageSize;
    const paginatedPosts = _(posts).slice(startIndex).take(pageSize).value();
    setPaginatedPosts(paginatedPosts);
  };

  return (
    <div className="container">
      <table className="table ">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPosts?.map(({ id, title, body }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{title}</td>
              <td>{body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="d-flex justify-content-center m2">
        <ul className="pagination">
          {pages?.map((page) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              type="button"
              onClick=""
            >
              <p className="page-link" onClick={() => pagination(page)}>
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
