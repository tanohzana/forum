import React, { Component } from "react";

import Post from "./Post";
import * as backendService from "../../services/backend";

class PostContainer extends Component {
  state = {
    postInfo: {},
    loading: true,
    isModalOpen: false,
  };

  toggleModal = () => {
    const { isModalOpen } = this.state;

    this.setState({
      isModalOpen: !isModalOpen,
    });
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const { postId } = this.props.match.params;
    const postInfo = await backendService.getEnhancedPostById(postId)

    this.setState({ postInfo, loading: false });
  }

  render() {
    const { postInfo, loading, isModalOpen } = this.state;

    return loading ? null : (
      <Post
        postInfo={postInfo}
        isModalOpen={isModalOpen}
        toggleModal={this.toggleModal}
      />
    );
  }
}

export default PostContainer;