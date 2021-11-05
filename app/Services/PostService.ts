import Post from "App/Models/Post";
import User from "App/Models/User";
import PostInterface from "Contracts/interfaces/Post.Interface";
import BaseService from "./BaseService";

export default class PostService extends BaseService  implements PostInterface{

  constructor(){
    super(Post)
  }
  async update(post_id: number, data: any): Promise<boolean> {
    const post : Post = this.model.find(post_id);
    if(post){
      try {
        post.title = data.title;
        post.content = data.content;
        post.forumId = data.forum_id;
        await post.save();

      } catch (error) {
        return false
      }
      return true
    }
    else{
      return false
    }
  }



  async index(){
    const posts = await this.model.query().preload('users').preload('forums');
    return posts
  }

  async create(user:User ,data){
    const post = new Post();
    try {

      post.title = data.title;
      post.content = data.content;
      post.forumId = data.forum_id;
      await user.related('posts').save(post);
    } catch (error) {
      return false;
    }

    return post;
  }





}
