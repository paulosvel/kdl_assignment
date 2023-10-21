import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";

import "./index.css";
import EditModal from "./EditModal";
function Users() {
  const url = "https://jsonplaceholder.typicode.com/users";
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const getUsers = async () => {
    const response = await axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    setUsers(response);
  };

  useEffect(() => {
    getUsers();
  }, []);
  const handleEditModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <h1>User List</h1>
      <Button className="add" sx={{ marginBottom: "9px", marginTop: "-5px" }}>
        Add User
      </Button>
      <TableContainer>
        <Table
          variant="simple"
          sx={{ borderCollapse: "collapse", width: "100%" }}
        >
          <Thead>
            <Th
              sx={{
                border: "1px solid #ddd",
                textAlign: "left",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Name
            </Th>
            <Th
              sx={{
                border: "1px solid #ddd",
                textAlign: "left",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Email
            </Th>
            <Th
              sx={{
                border: "1px solid #ddd",
                textAlign: "left",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Company Name
            </Th>
            <Th
              sx={{
                border: "1px solid #ddd",
                textAlign: "left",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Actions
            </Th>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr>
                <Td
                  sx={{
                    border: "1px solid #ddd",
                    textAlign: "left",
                    padding: "8px",
                  }}
                >
                  {user.name}
                </Td>
                <Td
                  sx={{
                    border: "1px solid #ddd",
                    textAlign: "left",
                    padding: "8px",
                  }}
                >
                  {user.email}
                </Td>
                <Td
                  sx={{
                    border: "1px solid #ddd",
                    textAlign: "left",
                    padding: "8px",
                  }}
                >
                  {user.company.name}
                </Td>
                <Td
                  sx={{
                    border: "1px solid #ddd",
                    textAlign: "left",
                    padding: "8px",
                  }}
                >
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <Button onClick={handleEditModal} className="edit">
                      Edit User
                    </Button>
                    <Button className="delete">Delete User</Button>
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <EditModal isOpen={isOpen} />
    </div>
  );
}

export default Users;
