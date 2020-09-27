import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'teste1@gmail.com',
      password: '123123',
    });

    const response = await authenticateUserService.execute({
      email: 'teste1@gmail.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate user with non existing user', async () => {
    expect(
      authenticateUserService.execute({
        email: 'teste1@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user with wrong password', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'teste1@gmail.com',
      password: '123123',
    });

    expect(
      authenticateUserService.execute({
        email: 'teste1@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
