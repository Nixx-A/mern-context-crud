/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { getPostsRequest, createPostRequest, deletePostRequest, getPostRequest, updatePostRequest } from "../api/posts";


export const PostContext = createContext();


export const usePosts = () => {
  if (!PostContext) {
    throw new Error('usePosts must be used within a PostsProvider')
  }
  return useContext(PostContext);
}

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    const res = await getPostsRequest()
    setPosts(res.data)
  }

  const createPost = async (post) => {
    try {
      const res = await createPostRequest(post);
      console.log(res);
      setPosts([...posts, res.data]);
    } catch (error) {
      console.error(error.message);
    }
  }

  const deletePost = async (id) => {
    const res = await deletePostRequest(id);
    if (res.status === 204) {
      setPosts(posts.filter((post) => post._id !== id));
    }
  }

  const getPost = async (id) => {
    try {
      const res = await getPostRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  const updatePost = async (id, post) => {
    try {
      const res = await updatePostRequest(id, post);
      setPosts(posts.map((post) => (post._id === id ? res.data : post)));
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    (async () => {
      const res = await getPostsRequest();
      setPosts(res.data);
    })();
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts, getPosts, createPost, deletePost, getPost, updatePost }}>
      {children}
    </PostContext.Provider>
  )
}