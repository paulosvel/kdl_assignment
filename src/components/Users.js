import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button
} from "@nextui-org/react";
function Users() {
  const url = "https://jsonplaceholder.typicode.com/users";
  const [users, setUsers] = useState([]);

  const getUsers = async() => {
  const response = await  axios 
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  setUsers(response);
  }
  
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div style={{display:"flex",alignItems:"center", flexDirection:"column"}}>
      <h1>User List</h1>
      <Table style={{border:"1px solid black"}}>
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Company Name</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.company.name}</TableCell>
            <TableCell>  <Button>Edit User</Button> <Button>Delete User</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Users;
