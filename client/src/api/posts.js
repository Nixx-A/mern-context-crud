import axios from 'axios'

export const getPostsRequest = async () => axios.get('http://localhost:3000/posts')

export const createPostRequest = async (post) => {
  const form = new FormData();
  for (let key in post) {
    form.append(key, post[key]);
  }
  return await axios.post("http://localhost:3000/posts", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const deletePostRequest = async (id) => await axios.delete(`http://localhost:3000/posts/${id}`)

export const updatePostRequest = async (id, newPostFields) => {
  const form = new FormData();
  console.log(newPostFields);
  for (let key in newPostFields) {
    form.append(key, newPostFields[key]);
  }
  return axios.put(`http://localhost:3000/posts/${id}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getPostRequest = async (id) => await axios.get(`http://localhost:3000/posts/${id}`)