import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('LessonController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let createdId: string;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // Получаем токен (если есть авторизация)
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ login: 'admin', password: 'adminpass' });

    token = res.body.token;
  });

  it('/lesson (POST) create lesson', async () => {
    const res = await request(app.getHttpServer())
      .post('/lesson')
      .set('Authorization', `Bearer ${token}`)
      .send({ label: 'Test lesson' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  it('/lesson (GET) find all lessons', async () => {
    const res = await request(app.getHttpServer())
      .get('/lesson')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/lesson/:id (GET) find lesson by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/lesson/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.id).toBe(createdId);
  });

  it('/lesson/:id (PATCH) update lesson', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/lesson/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ label: 'Updated lesson' })
      .expect(200);

    expect(res.body.label).toBe('Updated lesson');
  });

  it('/lesson/:id (DELETE) remove lesson', async () => {
    await request(app.getHttpServer())
      .delete(`/lesson/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
