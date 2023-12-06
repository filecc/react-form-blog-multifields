import { useState } from "react";
import _posts from "./assets/posts.json";
import List from "./components/List";
import Modal from "./components/Modal";

function App() {
  const [posts, setPosts] = useState(_posts);
  const [open, setOpen] = useState(true);

  
  

  return (
    <section className="px-6 pt-12 pb-6 container max-w-xl mx-auto">
      <List list={posts} />
      <Modal open={open} />
    </section>
  );
}

export default App;
