import axios from "axios";

const baseURL = "http://jsonplaceholder.typicode.com";

// Get all posts
const getPosts = async () => {
  const response = await axios.get(`${baseURL}/posts`);
  
  return response.data;
};

// Provide user and comments info about a list of posts
const getEnhancedPosts = async (posts) => {
  const usersRequests = posts.map(post => axios.get(`${baseURL}/users/${post.userId}`));
  const commentsRequests = posts.map(post => axios.get(`${baseURL}/comments?postId=${post.id}`))

  const response = await axios.all([...usersRequests, ...commentsRequests])

  const enhancedPosts = posts.map((post, index) => ({
    ...post,
    user: response[index].data,
    comments: response[index + posts.length].data,
  }));

  return enhancedPosts;
}

// Get a user info by id
const getUserById = async (userId) => {
  const response = await axios.get(`${baseURL}/users/${userId}`)

  return response.data
}

// Provide user and comments info about a single post by id
const getEnhancedPostById = async (postId) => {
  const postRequest = axios.get(`${baseURL}/posts/${postId}`);
  const commentsRequest = axios.get(`${baseURL}/comments?postId=${postId}`);

  const postAndCommentsResponse = await axios.all([postRequest, commentsRequest]);

  const post = postAndCommentsResponse[0].data;
  const comments = postAndCommentsResponse[1].data;

  const userResponse = await axios.get(`${baseURL}/users/${post.userId}`);

  const enhancedPost = { ...post, user: userResponse.data, comments };

  return enhancedPost;
}

export { getPosts, getUserById, getEnhancedPosts, getEnhancedPostById };