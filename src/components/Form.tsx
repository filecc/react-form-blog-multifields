import { useState } from "react";
import { PostClass } from "../lib/PostClass.class";
import { Post } from "../types/Post.type";


export default function Form({posts, setPosts, post}: {posts: PostClass[], setPosts: React.Dispatch<React.SetStateAction<PostClass[]>>, post?: Post}) {
    const [[title, content, image], setPost] = useState([
        post ? post.title : "", 
        post ? post.content : "", 
        post ? post.image : ""]);
    const [tags, setTags] = useState<string[]>(post? post.tags : []);
    const [category, setCategory] = useState<string>(post ? post.category : "");
    const availableTags = ["drama", "war", "random", "funny", "action"];
    
    
    const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
        console.log('adding')
        e.preventDefault();
        const newPost = new PostClass({title, content, image, tags, category});
        setPosts([...posts, newPost])
        localStorage.removeItem("posts");
        localStorage.setItem("posts", JSON.stringify([...posts, newPost]));
        setPost(["", "", ""]);
        setCategory("");
        setTags([]);
      }

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log('editing')
        e.preventDefault();
        const newPost = new PostClass({title, content, image, tags, category});
        const newPosts = posts.filter(p => p.id !== post?.id);
        setPosts([...newPosts, newPost])
        localStorage.removeItem("posts");
        localStorage.setItem("posts", JSON.stringify([...newPosts, newPost]));
        setPost(["", "", ""]);
        setCategory("");
        setTags([]);
      }

    return (<form onSubmit={post ? handleEdit : handleAdd}>
        <label
          htmlFor="title"
          className="font-medium text-xs inline-block pb-2"
        >
          Title
        </label>
        <input
          required
          value={title}
          onChange={(e) => setPost([e.target.value, content, image])}
          name="title"
          type="text"
          className="input mb-2"
          placeholder="Insert a title"
        />

        <label
          htmlFor="content"
          className="font-medium text-xs inline-block pb-2"
        >
          Content
        </label>
        <textarea
          required
          value={content}
          onChange={(e) => setPost([title, e.target.value, image])}
          name="content"
          rows={5}
          placeholder="Insert a content"
          className="input mb-2"
        ></textarea>

        <label
          htmlFor="image"
          className="font-medium text-xs inline-block pb-2"
        >
          Image
        </label>
        <input
          required
          value={image}
          onChange={(e) => setPost([title, content, e.target.value])}
          name="image"
          type="text"
          className="input mb-2"
          placeholder="Insert a image URL"
        />

        <label
          htmlFor="category"
          className="font-medium text-xs inline-block pb-2"
        >
          Category
        </label>
        <select
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="input mb-2"
        >
          <option value="">Select a category</option>
          <option value="movie">Movie</option>
          <option value="news">News</option>
          <option value="song">Song</option>
        </select>

        <h4>Select tags</h4>
        <div className="flex items-center justify-between divide-x-2 divide-gray-200 py-4">
          {availableTags.map((tag) => {
            return (
              <div key={tag + "tag-list"} className="px-2 flex items-center">
                <label
                  htmlFor={tag}
                  className="capitalize text-xs mr-1 font-medium"
                >
                  {tag}
                </label>
                <input
                  checked={tags.includes(tag)}
                  value={tag}
                  name={tag}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTags([...tags, tag]);
                    } else {
                      setTags(tags.filter((t) => t !== tag));
                    }
                  }}
                  type="checkbox"
                  className=""
                />
              </div>
            );
          })}
        </div>

        <button className="btn mt-2" type="submit">
          {post ? 'Confirm Edit' : 'Add post'}
        </button>
      </form>)
}