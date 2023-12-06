import { useEffect, useState } from "react";
import _posts from "./assets/posts.json";
import List from "./components/List";
import Modal from "./components/Modal";
import { PostClass } from "./lib/PostClass.class";
import Form from "./components/Form";

function App() {
  const [posts, setPosts] = useState<PostClass[]>(localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts') as string) : _posts);
  const [open, setOpen] = useState(false);
  const [modalOption, setModalOption] = useState(
    {  
      setOpen: setOpen,
      title: "Confirm",  
      content: "Are you sure?",  
      handleConfirm: () => {},
    });


  useEffect(() => {
    setOpen(false)
  }, [posts])

  return (
    <section className="px-6 pt-12 pb-6 container max-w-xl mx-auto min-h-[100dvh]">
      <h1 className="text-2xl font-semibold pb-6">Insert a New Post</h1>
      <Form posts={posts} setPosts={setPosts} />
      <section className="h-full mt-6">
      
          <div>
            <h3 className="text-2xl">Your Posts</h3>
            <p className="font-light text-sm">A list of all your posts</p>
          </div>
        

        <List
          list={posts}
          modal={{
            setOpen: setOpen,
            setModalOption: setModalOption,
            setPosts: setPosts,
            posts: posts
          }}
        />
      </section>

      <Modal open={open} option={modalOption} />
    </section>
  );
}

export default App;
