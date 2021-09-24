import React, { useContext, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { PostContext } from "../contexts/PostContext";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../contexts/AuthContext";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import AddIcon from "../assets/plus-circle-fill.svg";
import OverlayStrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import UpdatePostModal from "../components/posts/UpdatePostModal";

const Dashboard = () => {
  // Contexts
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    postState: { post, posts, postsLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  // Get all posts
  useEffect(() => getPosts(), []);

  let body = null;

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner variant="info" animation="border" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1"> Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to Note App</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button variant="primary">Learn!</Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3 ">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        <OverlayStrigger
          placement="left"
          overlay={<Tooltip>Add a new thing to learn</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddPostModal.bind(this, true)}
          >
            <img src={AddIcon} alt="add post" width="32" height="32" />
          </Button>
        </OverlayStrigger>
      </>
    );
  }
  return (
    <>
      {body}

      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      <Toast
        show={show}
        className={`bg-${type} text-white`}
        style={{ position: "fixed", top: " 20%", right: "10px" }}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
