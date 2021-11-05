 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from './BaseController';
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import PostServices from '@ioc:MyProject/PostService';





export default class PostsController extends BaseController {

  protected postService
  constructor(){
    super()
    this.postService = PostServices
  }


  public async index({request}: HttpContextContract){

    return await this.sendResponse('success',this.postService.index())
  }

  public async show({params}:HttpContextContract){

    const post = await this.postService.find(params.id)
    return this.sendResponse('success',post)
/*
    try {
      const post = await Post.find(params.id);
      if(post){
        await post.preload('users');
        await post.preload('forums');

        return this.sendResponse('success',post);
      }
    } catch (error) {
      return  response.status(401).json(this.sendError(error,"02",[]))
    }*/
  }

  public async create({request,response,auth}: HttpContextContract){

    const postSchema = schema.create({
      title: schema.string({ trim: true,escape:true }, [
        rules.minLength(10)
      ]),
      content: schema.string(),

      forum_id: schema.number([rules.required(),rules.unique({
        table:'posts',
        column:'forum_id'
      })])
    })
    const payload = await request.validate({schema: postSchema})
    console.log(payload);
    const user = await auth.authenticate();
    const post = await this.postService.create(user,payload)
    if(post){
      return this.sendResponse('success',post)
    }
    /*const post = new Post();
    post.title = request.input('title');
    post.content = request.input('content');
    post.forum_id = request.input('forum_id');
    await user.related('posts').save(post);
    return this.sendResponse('success',post);*/
  }

  public async update({request,params,response}: HttpContextContract){

    const postSchema = schema.create({
      title: schema.string({ trim: true,escape:true }, [
        rules.minLength(10)
      ]),
      content: schema.string(),

      forum_id: schema.number([rules.required(),rules.unique({
        table:'posts',
        column:'forum_id'
      })])
    })
    const payload = await request.validate({schema: postSchema})

    if(await this.postService.update(params.id,payload)){
      return this.sendResponse('success',null)
    }
    else{
      return this.sendError('Could not update')
    }

    /*const post = await this.postService.find(params.id);
    if(post){
      post.title = request.input('title');
      post.content = request.input('content');
      post.forumId = request.input('forum_id');

      await post.save();
      return this.sendResponse('success',post);
    }
    else{
      return response.status(404).json(this.sendError('Post Not Found','404',[]));
    }*/
  }
}
