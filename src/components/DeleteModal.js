import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

function DeleteUser({ isOpen, onClose, userId, setUsers }) {
  const deleteUserAPI = async (id) => {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    await axios
      .delete(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    onClose();
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    deleteUserAPI(userId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay sx={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} />
      <ModalContent
        sx={{
          position: "absolute",
          marginTop: "50px",
          top: "50%",
          left: "35%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "10px",
          outline: "none",
          padding: "20px",
          backgroundColor: "#fff",
          zIndex: "1000",
        }}
      >
        <ModalHeader>Delete User</ModalHeader>
        <ModalCloseButton
          sx={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "16px",
            height: "16px",
            padding: "0",
            borderRadius: "50%",
            border: "none",
            outline: "none",
            cursor: "pointer",
            color: "#999",
            background: "none",
          }}
          onClick={onClose}
        />
        <ModalBody>Are you sure you want to delete this user?</ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={handleDelete}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteUser;