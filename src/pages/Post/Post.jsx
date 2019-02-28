import React from "react";
import { Icon, Label, List, Modal } from "semantic-ui-react";

import style from "./Post.scss";

const Post = (props) => {
  const { postInfo, toggleModal, isModalOpen } = props;

  return (
    <div className={style.mainContainer}>
      <h1>
        <Label circular color="green" empty />
        <span>Topic: {postInfo.title}</span>
      </h1>

      <p className={style.postBody}>{postInfo.body}</p>

      <span>
        -- by <a className={style.modalTriggerLink} onClick={toggleModal}><b>{postInfo.user.username}</b></a>
      </span>

      <List divided verticalAlign='middle'>
        {postInfo.comments.map(comment => (
          <List.Item key={comment.id}>
            <List.Content floated='right'>
              <Icon name='comment outline' size='big' />
            </List.Content>
            <List.Content>
              <List.Header>
                <Label circular color="teal" empty />
                <span className={style.commentName}>{comment.name}</span>
              </List.Header>
              <List.Description>
                Posted by{' '}
                <a>
                  <b>{comment.email}</b>
                </a>{' '}
                just now.
              </List.Description>
              <List.Description>
                {comment.body}
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>

      <Modal closeIcon size="mini" open={isModalOpen} onClose={toggleModal}>
        <Modal.Content>
          <Modal.Description>
            <p><Icon name='user' /> <b>Username:</b> {postInfo.user.username}</p>
            <p><Icon name='user' /> <b>Name:</b> {postInfo.user.name}</p>
            <p><Icon name='at' /> <b>Email:</b> {postInfo.user.email}</p>
            {/* We don't want to give a user's address, do we ?! */}
            <p><Icon name='phone' /> <b>Phone:</b> {postInfo.user.phone}</p>
            <p><Icon name='tv' /> <b>Website:</b> {postInfo.user.website}</p>
            <p>
              <Icon name='factory' /> <b>Company:</b> {postInfo.user.company ? postInfo.user.company.name : ""}
            </p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default Post;