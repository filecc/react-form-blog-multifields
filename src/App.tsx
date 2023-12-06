import { useState } from "react";
import _posts from "./assets/posts.json";
import List from "./components/List";

function App() {
  const [posts, setPosts] = useState(_posts);

  

  return (
    <section className="px-6 pt-12 pb-6 container max-w-xl mx-auto">
      <List list={posts} />
    </section>
  );
}

export default App;
