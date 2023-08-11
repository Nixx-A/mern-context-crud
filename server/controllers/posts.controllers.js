import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from 'fs-extra'


export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    if (posts.length === 0) return res.status(404).json({ msg: "No posts found" })

    res.json(posts)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image = null;
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newPost = new Post({ title, description, image });
    await newPost.save();
    return res.json(newPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getPost = async (req, res) => {
  const { id } = req.params

  if (!id) return res.status(404).json({ msg: "Post not found" })

  try {
    const post = await Post.findById(id)
    res.json(post)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: validate req.body before to update

    // if a new image is uploaded upload it to cloudinary
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);


      // add the new image to the req.body
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    
/*     // destroy the old image from Cloudinary
    if (req.body.image?.public_id) {
      deleteImage(req.body.image.public_id);
    }
 */    
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true })

    
    console.log(updatedPost);
    return res.json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}



export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);

    console.log(post);
    if (post && post.image.public_id) {
      await deleteImage(post.image.public_id);
    }

    if (!post) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}