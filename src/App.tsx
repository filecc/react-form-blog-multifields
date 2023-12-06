import { useState } from "react";
import _posts from "./assets/posts.json";
import List from "./components/List";
import Modal from "./components/Modal";
import { PostClass } from "./lib/PostClass.class";
import { Post } from "./types/Post.type";

function App() {
  const [posts, setPosts] = useState<Post[]>(_posts);
  const [open, setOpen] = useState(false);
  const [[title, content, image], setPost] = useState(["", "", ""]);
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const availableTags = ["drama", "war", "random", "funny", "action"];
  const handleConfirm = () => {
    console.log("Confirm");
  }

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = new PostClass({title, content, image, tags, category});
    setPosts([...posts, newPost])
  }

  

  return (
    <section className="px-6 pt-12 pb-6 container max-w-xl mx-auto min-h-[100dvh]">
      <h1 className="text-2xl font-semibold pb-6">Insert a New Post</h1>
      <form tabIndex={1} onSubmit={handleAdd}>
        <label htmlFor="title" className="font-medium text-xs inline-block pb-2">Title</label>
        <input
          value={title}
          onChange={(e) => setPost([e.target.value, content, image])}
          name="title"
          type="text"
          className="input mb-2"
          placeholder="Insert a title"
        />

        <label htmlFor="content" className="font-medium text-xs inline-block pb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setPost([title, e.target.value, image])}
          name="content"
          rows={5}
          placeholder="Insert a content"
          className="input mb-2"
        ></textarea>

        <label htmlFor="image" className="font-medium text-xs inline-block pb-2">Image</label>
        <input
          value={image}
          onChange={(e) => setPost([title, content, e.target.value])}
          name="image"
          type="text"
          className="input mb-2"
          placeholder="Insert a image URL"
        />

        <label htmlFor="category" className="font-medium text-xs inline-block pb-2">Category</label>
        <select
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
            return   <div key={tag + 'tag-list'} className="px-2 flex items-center">
            <label htmlFor={tag} className="capitalize text-xs mr-1 font-medium">{tag}</label>
            <input 
            value={tag} 
            name={tag}
            onChange={(e) => {
              if(e.target.checked){
                setTags([...tags, tag])
              } else {
                setTags(tags.filter(t => t !== tag))
              }
            }}  type="checkbox" className="" />
            </div>
          })}
        
        </div>

        <button className="btn mt-2" type="submit">
          Add post
        </button>
      </form>
      <section className="h-full">
        <List list={posts} openModal={setOpen} />
      </section>
      
      <Modal
        open={open}
        handleCancel={() => setOpen(!open)}
        handleConfirm={handleConfirm}
      />
    </section>
  );
}

export default App;
