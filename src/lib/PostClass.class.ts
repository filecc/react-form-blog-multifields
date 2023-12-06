import { Post } from "../types/Post.type"

export class PostClass{
    id?: string
    title: string
    content: string
    image: string
    tags: string[]
    category: string


    constructor(item: Post){
        this.id = crypto.randomUUID().slice(0, 8)
        this.title = item.title
        this.content = item.content
        this.image = item.image
        this.tags = item.tags
        this.category = item.category
    }

    getTags(){
        return this.tags.join(', ')
    }
}