
import React, { Component } from 'react';
import Home from './Home';

import * as backendService from "../../services/backend";

class HomeContainer extends Component {
  state = {
    posts: [],
    activePage: 0,
    pageSize: 10,
    numberOfPages: 0,
    enhancedPosts: [],
    modalUserInfo: {},
    isModalOpen: false,
  };

  async componentDidMount() {
    const { pageSize, activePage } = this.state;

    const posts = await backendService.getPosts();
    const numberOfPages = posts.length / pageSize;

    const start = activePage*10;

    const enhancedPosts = await backendService.getEnhancedPosts(posts.slice(start, start + pageSize));

    this.setState({ posts, enhancedPosts, numberOfPages });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { activePage, posts, pageSize } = this.state;
    const { activePage: prevActivePage } = prevState;

    if (activePage !== prevActivePage) {

      const start = activePage*10;
      const enhancedPosts = await backendService.getEnhancedPosts(posts.slice(start, start + pageSize));

      this.setState({ enhancedPosts })
    }
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage: activePage - 1 })

  toggleModal = (e, userInfo = null) => {
    const { isModalOpen } = this.state;

    this.setState({
      isModalOpen: !isModalOpen,
      modalUserInfo: userInfo,
    });
  };

  render() {
    const {
      numberOfPages,
      activePage,
      enhancedPosts,
      modalUserInfo,
      isModalOpen,
    } = this.state;

    return (
      <Home
        posts={enhancedPosts}
        toggleModal={this.toggleModal}
        isModalOpen={isModalOpen}
        modalUserInfo={modalUserInfo}
        totalPages={numberOfPages}
        activePage={activePage + 1}
        handlePaginationChange={this.handlePaginationChange}
      />
    );
  }
}

export default HomeContainer;