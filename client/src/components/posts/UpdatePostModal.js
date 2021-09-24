import Modal from "react-bootstrap/Modal";
import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { PostContext } from "../../contexts/PostContext";
import { postReducer } from "../../reducers/postReducer";

const UpdatePostModal = () => {
  //Context
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  //State
  const [updatedPost, setUpdatedPost] = useState(post);

  const { title, description, url, status } = updatedPost;

  useEffect(() => setUpdatedPost(post), [post]);

  const onChangeUpdatePostForm = (event) =>
    setUpdatedPost({
      ...updatedPost,
      [event.target.name]: event.target.value,
    });

  const resetUpdatePostModal = () => {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    resetUpdatePostModal();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  return (
    <Modal show={showUpdatePostModal} onHide={resetUpdatePostModal}>
      <Modal.Header>
        <Modal.Title>Making progress!</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="my-2">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={onChangeUpdatePostForm}
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
              onChange={onChangeUpdatePostForm}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Control
              type="text"
              name="url"
              placeholder="Youtube URL"
              value={url}
              onChange={onChangeUpdatePostForm}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onChangeUpdatePostForm}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetUpdatePostModal}>
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

export default UpdatePostModal;
