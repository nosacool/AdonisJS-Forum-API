import User from "App/Models/User";

export default interface PostInterface {
   index();
   create(user: User, data);
   update(post_id:number,data):Promise<boolean>
}
