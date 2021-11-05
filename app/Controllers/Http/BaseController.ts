import { Response } from '@adonisjs/http-server/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class BaseController  {


  public  sendResponse(message,result){
    return {
      success : '00',
      message: message,
      data: result
     }

  }

  public  sendError(error,status = "01", errorMessages = []){
    return {
      status:status,
      message:error,
      data:errorMessages
    }
  }

}
