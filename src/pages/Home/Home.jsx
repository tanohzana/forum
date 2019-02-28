
import React from 'react';

import { Button, Grid, Icon, Image, List, Modal, Pagination, Search } from "semantic-ui-react";
import { Link } from 'react-router-dom';

import style from './Home.scss';

import stevieImg from "../../resources/images/stevie.jpg";
import danielImg from "../../resources/images/daniel.jpg";
import elliotImg from "../../resources/images/elliot.jpg";

// For the sake of demo, we generate a random picture using a timestamp
const pseudoRandomImg = () => {
  const time = new Date().getTime();

  if (time % 4 === 0) {
    return stevieImg;
  } else if (time % 3 === 0) {
    return danielImg;
  } else {
    return elliotImg;
  }
}

const Home = (props) => {
  const {
    posts,
    totalPages,
    activePage,
    handlePaginationChange,
    toggleModal,
    isModalOpen,
    modalUserInfo,
  } = props;

  return (
    <div className={style.mainContainer}>
      <Grid>
        <Grid.Column width={3}>
          <h2>List of posts</h2>
        </Grid.Column>
        <Grid.Column width={10}>
          <Search />
        </Grid.Column>
        <Grid.Column width={3}>
          <Button color='green' disabled floated='right'>New post</Button>
        </Grid.Column>
      </Grid>

      <List divided verticalAlign='middle'>
        {posts.map(post => (
          <List.Item key={post.id}>
            <List.Content floated='right'>
              <Icon name='comment outline' size='big' /> {post.comments.length}
            </List.Content>
            <Image avatar src={pseudoRandomImg()} />
            <List.Content>
              <List.Header as={Link} to={`/postinfo/${post.id}`}>{post.title}</List.Header>
              <List.Description>
                Posted by{' '}
                <a onClick={(e) => toggleModal(e, post.user)}>
                  <b>{post.user.username}</b>
                </a>{' '}
                just now.
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>

      <div className={style.paginationContainer}>
        <Pagination
          totalPages={totalPages}
          activePage={activePage}
          onPageChange={handlePaginationChange}
        />
      </div>

      <Modal closeIcon size="mini" open={isModalOpen} onClose={toggleModal}>
        <Modal.Content>
          <Modal.Description>
            <p><Icon name='user' /> <b>Username:</b> {modalUserInfo.username}</p>
            <p><Icon name='user' /> <b>Name:</b> {modalUserInfo.name}</p>
            <p><Icon name='at' /> <b>Email:</b> {modalUserInfo.email}</p>
            {/* We don't want to give a user's address, do we ?! */}
            <p><Icon name='phone' /> <b>Phone:</b> {modalUserInfo.phone}</p>
            <p><Icon name='tv' /> <b>Website:</b> {modalUserInfo.website}</p>
            <p><Icon name='factory' /> <b>Company:</b> {modalUserInfo.company ? modalUserInfo.company.name : ""}</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Home;
