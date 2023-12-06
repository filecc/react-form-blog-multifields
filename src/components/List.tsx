import { Post } from "../types/Post.type";

export default function List({ list }: { list: Post[]}) {
    return (
        <> 
            <ul>
                {list.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </>
    )
}