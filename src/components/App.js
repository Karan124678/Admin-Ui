import './App.css'
import { TableUi } from "./tableui";
import { SearchBar } from "./searchbar";
import React, { useState, useEffect } from 'react';
import "./buttonui.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(1);
  const [searchResult,setSearchResult]= useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [editableUser, setEditableUser] = useState(null);


  // :-Fething users Details Using Api

  const FetchUsers = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      const data = await response.json();
      setUsers(data);
      console.log(users);
    } catch (error) {
      console.log("something wrong:", error);
    }
  };

// :-Function Callback with searchResult dependency

  useEffect(() => {
    FetchUsers();
    console.log(users);
  }, [searchResult]);


 

  const dataPerPage = 10;
  const pageCount = Math.ceil(users.length / dataPerPage);
  const handlePage = (page) => {
    if (page >= 1 && page <= pageCount) {
      setPages(page);
    }
  }
  const startIndex = (pages - 1) * dataPerPage;
  const uiData = users.slice(startIndex, startIndex + dataPerPage);


  // :- to handle the search functionality

 const searchData = searchResult.slice(startIndex,startIndex + dataPerPage);
const handleSearch = (value) => {
  const searchResult = value.toLowerCase();
  const searchData = users.filter((data) => {
    return (
      data.name.toLowerCase().includes(searchResult) ||
      data.email.toLowerCase().includes(searchResult) ||
      data.role.toLowerCase().includes(searchResult)
)
  });
  
  setSearchResult(searchData); 
     console.log(searchData);
  }
    

  // :-   Row Selection Functionality 

  const selectRow = (userId) => {
    if (!selectedRows.includes(userId)) {
      setSelectedRows([userId]);
      setIsChecked(true);
    } else {
      setSelectedRows([]);
      setIsChecked(false);
    }
  };

    // :-  For select All checboxes Functionality

  const handleSelectAll = (e) => {
    const dataToSelect = searchResult.length ? searchData : uiData;
    if (e.target.checked) {
      const allIds = dataToSelect.map((user) => user.id);
      setSelectedRows(allIds);
      setIsChecked(true);
    } else {
      setSelectedRows([]);
      setIsChecked(false);
    }
  };

  // :- Selected CheckBoxes Delete By delete Selected Button FFunctionality

  const deleteSelected = () => {
    const updatedUsers = users.filter((user) => !selectedRows.includes(user.id));
    setUsers(updatedUsers);
    setSelectedRows([]);
    setIsChecked(false);
  };


// :-  Edit users Data By clicking Edit Icon And Save button For Saving And Updating Data Functionality

  const handleEdit = (user) => {
    setEditableUser(user);
  };

  const handleSave = (editedUser) => {
    // Update the users with the edited user information
    const updatedUsers = users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    );
    setUsers(updatedUsers);
  };
    
    
  // :-    Rendring Part


  return (
    
    <div>
      <SearchBar searchUsers = {(e) => handleSearch(e.target.value)} />
      
      <TableUi data = {searchResult.length ? searchData : uiData}       selection={isChecked}
              
              handleSelect={(e) => handleSelectAll(e)}
              rowSelect={(userId) => selectRow(userId)}
              selectedRows={selectedRows}
              handleSelectAll={handleSelectAll}
              deleteSelected={deleteSelected}
              handleEdit={handleEdit}
              handleSaveClick={handleSave}

/>
      

      <button type="round" className='deletebutton'  onClick={deleteSelected}>Delete selected</button>
      <button type="round" onClick={() => handlePage(1)} className="round-button">&lt;&lt;</button>
      <button type="round" onClick = {() => handlePage(pages-1)} className="round-button">&lt;</button>
      <button type="round" onClick={() => handlePage(1)} className="round-button">1</button>
      <button type="round" className="round-button" onClick={() => handlePage(2)}>2</button>
      <button type="round" className="round-button" onClick={() => handlePage(3)}>3</button>
      <button type="round" onClick = {() => handlePage(4)} className="round-button" >4</button>
      <button type="round" onClick = {() => handlePage(5)} className="round-button">5</button>
      <button type="round" onClick = {() => handlePage(pages+1)} className="round-button">&gt;</button>
      <button type="round" onClick = {() => handlePage(5)} className="round-button">&gt;&gt;</button>


    </div>
  )
}
