import Modal from "react-bootstrap/Modal";
import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { PostContext } from "../../contexts/PostContext";

const AddPostModal = () => {
  //Context
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);

  //State
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url } = newPost;

  const onChangeNewPostForm = (event) =>
    setNewPost({ ...newPost, [event.target.name]: event.target.value });

  const resetAddPostModal = () => {
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    });
    setShowAddPostModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    resetAddPostModal();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  return (
    <Modal show={showAddPostModal} onHide={resetAddPostModal}>
      <Modal.Header>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="my-2">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={onChangeNewPostForm}
              aria-describedby="title-help"
              required
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              row="3"
              name="description"
              placeholder="Description"
              value={description}
              onChange={onChangeNewPostForm}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Control
              type="text"
              name="url"
              placeholder="Youtube URL"
              value={url}
              onChange={onChangeNewPostForm}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetAddPostModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Learn!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
