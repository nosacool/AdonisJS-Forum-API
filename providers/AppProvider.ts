import { ApplicationContract } from '@ioc:Adonis/Core/Application'


export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings


  }

  public async boot() {
    const {default:PostService} = await import('App/Services/PostService')
    this.app.container.singleton('MyProject/PostService',() =>  new PostService() )
    // IoC container is ready
  }

  public async ready() {
    // App is ready

  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
