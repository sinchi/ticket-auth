import request from 'supertest'
import { app } from '../../../app'

it('retunr 201 on succesfull request', async () => {
  return request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@test.com',
          password: '12345'
        })
        .expect(201);
});

it('retunr 400 with invalid email', async () => {
  return request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@test',
          password: '12345'
        })
        .expect(400);
})

it('retunr 400 with invalid password', async () => {
  return request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@test',
          password: '12'
        })
        .expect(400);
})

it('retunr 400 with missing email and password', async () => {
  await request(app)
        .post('/api/users/signup')
        .send({    
          email: 'ayoub@sinhci.com'     
        })
        .expect(400);
  await request(app)
        .post('/api/users/signup')
        .send({  
          password: '123456'       
        })
        .expect(400);
})

it('disallows duplicate emails', async () => {
  await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@test.com',
          password: '12334'
        })
        .expect(201);
  await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@test.com',
          password: '12334'
        })
        .expect(400);
})

it('check the cookies after signup', async () => {
  const response = await request(app)
        .post('/api/users/signup')
        .send({
          email: 's.b@g.com',
          password: '123456'
        });

        expect(response.get('Set-Cookie')).toBeDefined();
  
})