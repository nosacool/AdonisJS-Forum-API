import { DateTime } from 'luxon'
import { BaseModel, column,BelongsTo,belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Forum from './Forum'
import User from './User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public userId: number

  @column()
  public forumId:number

  @belongsTo(()=>Forum)
  public forums: BelongsTo<typeof Forum>

  @belongsTo(()=>User)
  public users: BelongsTo<typeof User>



  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
