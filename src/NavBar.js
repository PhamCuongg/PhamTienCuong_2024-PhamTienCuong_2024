import React from 'react';

const Navbar = ({ currentDate, searchTerm, handleSearch }) => {
  return (
    <div className="navbar">
      <div className="navbar-item">{currentDate}</div>
      <div className="navbar-item homepage">Blogs</div>
      <div className="navbar-item search-bar">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default Navbar;
