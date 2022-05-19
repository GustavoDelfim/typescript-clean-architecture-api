import { Either, left, right } from '../../shared/either'
import { Email } from '../email/email'
import { InvalidEmailError } from '../errors/invalid-email-error'
import { InvalidNameError } from '../errors/invalid-name-error'
import { Name } from '../name/name'
import { UserData } from './user-data'

export class User {
  public readonly name: string

  private constructor (name: string) {
    this.name = name
  }

  static create (userData: UserData): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name)
    if (nameOrError.isLeft()) {
      return left(new InvalidNameError())
    }

    const emailOrError = Email.create(userData.email)
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }

    return right(new User(userData.name))
  }
}