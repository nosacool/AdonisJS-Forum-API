 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import BaseController from './BaseController';
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController extends BaseController {

  public async login({request,auth,response}: HttpContextContract){

    const user  = await auth.use("api").attempt(request.input("email"),request.input('password'))
    return this.sendResponse('success',user);
  }

  public async register({request, auth, response}: HttpContextContract){

    const userSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.unique({
          table:'users',
          column:'email'
        })
      ])
    });
    const payload = await request.validate({schema:userSchema})
    const email = request.input("email");
    const password = request.input("password");
    const name = request.input("name");
    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.name = name;
    await newUser.save();
    const token = await auth.use('api').login(newUser)
    return  response.status(200).json(this.sendResponse('success',token.toJSON()));
    //return response.status(200).json(result);
  }

}
