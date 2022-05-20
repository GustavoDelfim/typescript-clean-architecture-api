import { InvalidEmailError } from '../../entities/errors/invalid-email-error'
import { InvalidNameError } from '../../entities/errors/invalid-name-error'
import { UserData } from '../../entities/user/user-data'
import { left } from '../../shared/either'
import { UserRepository } from '../ports/user-repository'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'
import { InMemoryUserRepository } from './repository/in-memory-user-repository'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to maling list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)

    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'Gustavo'
    const email = 'gusttavodelfim@gmail.com'
    const { value } = await usecase.perform({ name, email })
    const userResponse = value as UserData

    expect(userResponse.name).toBe(name)
    expect(userResponse.email).toBe(email)

    const user = await repo.findUserByEmail(email)
    expect(user?.name).toBe(name)
  })

  test('should not add user with invalid Email to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)

    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'Gustavo'
    const email = 'invalid_email'
    const response = await usecase.perform({ name, email })
    const user = await repo.findUserByEmail(email)

    expect(user).toBeNull()
    expect(response).toEqual(left(new InvalidEmailError()))
  })

  test('should not add user with invalid Name to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)

    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = ''
    const email = 'gusttavodelfim@gmail.com'
    const response = await usecase.perform({ name, email })
    const user = await repo.findUserByEmail(email)

    expect(user).toBeNull()
    expect(response).toEqual(left(new InvalidNameError()))
  })
})
