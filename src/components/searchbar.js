import "./searchbar.css";

export function SearchBar({searchUsers}) {
  
  return(
    <div>
    <input type = "text"  placeholder = "Search By Name,Email or Role " className="search" onChange={searchUsers} />
    </div>
    )

};