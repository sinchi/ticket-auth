import request from 'supertest';
import { app } from '../../../app'

it('fails when email that does not exist is supplied', async () => {
  await request(app)
        .post('/api/users/signin')
        .send({
          email: 'a.f@g.com',
          password: '123455'
        }).
        expect(400);
})

it('fails when incorrect password that does is supplied', async () => {
  await request(app)
        .post('/api/users/signup')
        .send({
          email: 'a.f@g.com',
          password: '1222223'
        })
        .expect(201);

  await request(app)
        .post('/api/users/signin')
        .send({
          email: 'a.f@g.com',
          password: '222ddsdsd'
        })
        .expect(400);
})

it('respond with cookie when given the correct credentials', async () => {
  await request(app)
        .post('/api/users/signup')
        .send({
          email: 'a.f@g.com',
          password: '1222223'
        })
        .expect(201);
        
  const response = await request(app)
        .post('/api/users/signin')
        .send({
          email: 'a.f@g.com',
          password: '1222223'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
})