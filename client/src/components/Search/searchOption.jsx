import React, { useState } from 'react'

const SearchOption = ({setSearchTerm}) => {

const [searchInput, setSearchInput] = useState("");

const handleSearchInput = (event) => {
    setSearchInput(event.target.value)
}

const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(searchInput)
}

  return (
    <div>
      <form className="form-inline my-2 my-lg-0 d-flex gap-2" onSubmit={handleSubmit}>
      <input className="form-control mr-sm-2" type="search" placeholder="Search" value={searchInput} onChange={handleSearchInput} aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    </div>
  )
}

export default SearchOption;
