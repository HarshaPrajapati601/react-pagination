import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    console.log(indexOfLastPost, "last")
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const onClickNext = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const onClickPrev = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  }

  useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => {
       setData(data)
        // filtereData(data);
      });
  }, []);


  console.log("render", currentPosts)
  return (
    <div>
      {currentPosts ? (
        currentPosts.map((eachData) => {
          return (
            <ul>
              <li> {eachData.id} </li>
            </ul>
          );
        })
      ) : (
        <h3>No data</h3>
      )}
      <button onClick={onClickNext}>Next</button>
     {indexOfLastPost !== 10 && <button onClick={onClickPrev}>Previous</button>}
      
    </div>
  );
}
