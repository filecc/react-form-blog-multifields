import { useEffect, useState } from "react";
import { Post } from "../types/Post.type";
import Form from "./Form";

export default function List({
  list,
  modal,
}: {
  list: Post[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modal: any;
}) {
  const [openImage, setOpenImage] = useState(false);
  const [src, setSrc] = useState("");
  const [post, setPost] = useState<Post | null>(null);
  const [openPostModal, setOpenPostModal] = useState(false);
  
  const handleDelete = (id: string) => {
    const newList = list.filter((item) => item.id !== id);
    modal.setPosts(newList);
    localStorage.removeItem('posts')
    localStorage.setItem('posts', JSON.stringify(newList))
    console.log(newList)
    modal.setOpen(false);
  }
  useEffect(() => {
    if(post){
      setOpenPostModal(true)
    } else if(post === null){
      return setOpenPostModal(false)
    }
  }, [post])


  return (
    <>
      <ul className="mt-6 h-full">
        {list.map((item) => {
            const post = item;
            return (
              <li
                key={post.id}
                className="grid grid-cols-4 space-x-3 h-full py-4"
              >
                <div className="relative h-auto">
                  <img
                    onClick={() => {
                      setSrc(post.image);
                      setOpenImage(true);
                    }}
                    className="w-full h-full rounded-lg brightness-75 cursor-pointer object-cover"
                    src={item.image}
                    alt={item.title + " image"}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => {
                      setSrc(post.image);
                      setOpenImage(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10 text-white drop-shadow-md"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="h-full col-span-2">
                  <h5>{post.title}</h5>
                  <p className="text-xs font-light">id: {post.id}</p>
                  <p className="text-xs font-light">
                    tags: {post.tags.join(", ")}
                  </p>
                  <p className="text-xs font-light">
                    category: {post.category}
                  </p>
                </div>

                <div className="flex items-stretch justify-between gap-1 h-full">
                  <button
                    onClick={() => {
                      setPost(item)
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-sky-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      modal.setOpen(true);
                      modal.setModalOption({
                        title: "Delete post",
                        content: `Are you sure you want to delete ${post.title}?`,
                        setOpen: modal.setOpen,
                        handleConfirm: () => {
                          if (post.id) {
                            handleDelete(post.id);
                          }
                        },
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      modal.setOpen(true);
                      modal.setModalOption({
                        title: "Edit post",
                        editing: true,
                        content: (
                          <Form
                            posts={modal.posts}
                            setPosts={modal.setPosts}
                            post={item}
                          />
                        ),
                        setOpen: modal.setOpen,
                        handleConfirm: () => modal.setOpen(false),
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-amber-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            );
        })}
      </ul>
      {openImage && (
        <section className="absolute top-0 right-0 bottom-0 grid place-items-center bg-black/80 p-6">
          <div className="w-full">
            <img src={src} alt="image" />
            <button
              className="text-white flex items-center gap-1 mt-4"
              onClick={() => {
                setOpenImage(false);
                setSrc("");
              }}
            >
              close{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </section>
      )}
      {
        openPostModal && <section className="absolute top-0 right-0 bottom-0 w-full grid place-items-center bg-black/80 p-6">
          <div className="w-full">
            <div className="bg-white rounded-xl shadow-lg w-11/12 h-fit grid place-items-center">
              <div className="w-full h-full px-5 flex flex-col justify-between py-6 mb-12">
                <div className="pt-8 grid place-items-center space-y-4">
                  <h2 className="text-xl font-semibold text-center">{post?.title}</h2>
                  <img className="rounded-lg" src={post?.image} alt="post image" />
                  <p className="pt-3 font-light place-self-start">{post?.content}</p>
                </div>
                
                
                  <button className="place-self-end bg-gray-50 py-2 max-w-[150px] ml-full border px-6 rounded border-gray-200 text-gray-500 hover:bg-gray-200 hover:text-gray-600 transition-colors duration-300" onClick={() => {setPost(null)}}>Close</button>
           
              </div>
            </div>
          </div>
        </section>
      }
    </>
  );
}
