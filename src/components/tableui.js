
import React, { useState } from "react";
import "./tableui.css";

export function TableUi({
  data,
  selection,
  rowSelect,
  selectedRows, 
  handleSelectAll,
  deleteSelected,
  handleSaveClick
}) {
    // State to handle editable user information

  const [editableUser, setEditableUser] = useState(null);
  
    // Function to handle save action for an editable user

  const handleSave = () => {
    if (editableUser) {
      handleSaveClick(editableUser); // Call the handleSaveClick function passed from the parent
      setEditableUser(null);
    }
  };

    // Function to handle editing of a user

  const handleEdit = (user) => {
    setEditableUser(user);
  };


  // Function to handle input change for editable user properties

   const handleInputChange = (event, property) => {
    const newValue = event.target.value;
    setEditableUser((prevUser) => ({
      ...prevUser,
      [property]: newValue
    }));
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={selection} onChange={handleSelectAll} />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr className="row-data" key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => rowSelect(user.id)}
                />
              </td>
              <td className="Name">
                {editableUser && editableUser.id === user.id ? (
                  <input
                    type="text"
                    value={editableUser.name}
                    onChange={(e) => handleInputChange(e, "name")}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="Email">
                {editableUser && editableUser.id === user.id ? (
                  <input
                    type="text"
                    value={editableUser.email}
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="Role">
                {editableUser && editableUser.id === user.id ? (
                  <input
                    type="text"
                    value={editableUser.role}
                    onChange={(e) => handleInputChange(e, "role")}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editableUser && editableUser.id === user.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <p className="edit-icon" onClick={() => handleEdit(user)}>✎</p>
                )}
                <p className="delete-icon" onClick={() => deleteSelected(user.id)}>🗑</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
