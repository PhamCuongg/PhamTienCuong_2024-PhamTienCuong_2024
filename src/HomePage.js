import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./actions";
import Navbar from "./NavBar";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const { users, posts, comments } = useSelector((state) => state);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [openComments, setOpenComments] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const [currentDate] = useState(new Date().toLocaleDateString());
  const toggleComments = (postId) => {
    setOpenComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        users
          .find((user) => user.id === post.userId)
          ?.name.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts, users]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container">
      <Navbar
        currentDate={currentDate}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      <br />
      {currentPosts.map((post) => (
        <div className="post" key={post.id}>
          <h2>Author: {users.find((user) => user.id === post.userId)?.name}</h2>
          <h3>Title: {post.title}</h3>
          <p>Description: {post.body}</p>
          <button onClick={() => toggleComments(post.id)}>
            {openComments[post.id] ? "Close Comments" : "Open Comments"}
          </button>
          <br />
          {openComments[post.id] && (
            <div>
              <h4>Comments:</h4>
              <ul>
                {comments
                  .filter((comment) => comment.postId === post.id)
                  .map((comment) => (
                    <li key={comment.id}>{comment.body}</li>
                  ))}
              </ul>
            </div>
          )}
          
        </div>
      ))}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <button
          onClick={nextPage}
          disabled={currentPosts.length < postsPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
