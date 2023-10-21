import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Input,
  Spinner,
  
} from "@chakra-ui/react";
import DeleteUser from "./DeleteModal";
import AddModal from "./AddModal";
import "./index.css";
import Paginator from "./Paginator";
import EditModal from "./EditModal";
import {DeleteIcon,EditIcon } from "@chakra-ui/icons";


function Users() {
  const url = "https://jsonplaceholder.typicode.com/users";
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
 
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

     const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
     const currentUsers = filteredUsers.slice(
       (currentPage - 1) * itemsPerPage,
       currentPage * itemsPerPage
     );



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
    // set timeout to show spinner
    setTimeout(() => {

    getUsers();
    }
    , 2000);

  }, []);
  const handleEditModal = (userId) => {
    setIsOpen(userId);
  };

  const handleCloseEditModal = () => {
    setIsOpen(null);
  };

  const handleAddModal = () => {
    setIsAddOpen(true);
  }
  const handleCloseAddModal = () => {
    setIsAddOpen(false);
  }

  const handleDeleteModal = (userId) => {
    setIsDeleteOpen(userId);
  }
  const handleCloseDeleteModal = () => {
    setIsDeleteOpen(null);
  }

  return (
    <>
      {users.length === 0 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spinner sx={{ width: "100px", height: "100px" }} />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>User List</h1>
          <Button
            className="add"
            sx={{ marginBottom: "9px", marginTop: "-5px" }}
            onClick={handleAddModal}
          >
            Add User
          </Button>
          <Input
            type="text"
            placeholder="Search by name, email or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: "300px",
              marginBottom: "10px",
              borderRadius: "5px",
              padding: "8px",
              border: "2px solid #00B87C",
            }}
          />
          <TableContainer>
            <Table
              variant="simple"
              sx={{ borderCollapse: "collapse", minWidth: "900px" }}
            >
              <Thead>
                <Th
                  sx={{
                    border: "1px solid #ddd",
                    textAlign: "left",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                    minWidth: "200px",
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
                    minWidth: "200px",
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
                    minWidth: "200px",
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
                    minWidth: "20px",
                  }}
                >
                  Actions
                </Th>
              </Thead>
              <Tbody>
                {currentUsers.map((user) => (
                  <>
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
                        <div style={{ display: "flex", gap: "1rem",justifyContent:"center" }}>
                          <Button
                            onClick={() => handleEditModal(user.id)}
                            className="edit"
                            sx={{ width: "30px" }}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            className="delete"
                            sx={{ width: "30px" }}
                            onClick={() => handleDeleteModal(user.id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </div>
                      </Td>
                    </Tr>
                    <EditModal
                      user={user}
                      isOpen={isOpen === user.id}
                      onClose={handleCloseEditModal}
                      setUsers={setUsers}
                    />
                    <AddModal
                      isOpen={isAddOpen}
                      onClose={handleCloseAddModal}
                      setUsers={setUsers}
                    />

                    <DeleteUser
                      isOpen={isDeleteOpen === user.id}
                      onClose={handleCloseDeleteModal}
                      userId={user.id}
                      setUsers={setUsers}
                    />
                  </>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Paginator
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
}

export default Users;
