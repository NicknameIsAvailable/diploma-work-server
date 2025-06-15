import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('ScheduleLessonController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let createdId: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // Получаем токен администратора
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ login: 'admin', password: 'adminpass' });

    token = res.body.token;
  });

  it('/schedule-lesson (POST) — создание', async () => {
    const res = await request(app.getHttpServer())
      .post('/schedule-lesson')
      .set('Authorization', `Bearer ${token}`)
      .send({
        dayId: 'some-day-id',
        lessonId: 'some-lesson-id',
        orderId: 'some-order-id',
        teacherIds: ['teacher-id'],
        audiences: ['ауд. 101'],
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  it('/schedule-lesson (GET) — получить все', async () => {
    const res = await request(app.getHttpServer())
      .get('/schedule-lesson')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/schedule-lesson/:id (GET) — получить по ID', async () => {
    const res = await request(app.getHttpServer())
      .get(`/schedule-lesson/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.id).toBe(createdId);
  });

  it('/schedule-lesson/:id (PATCH) — обновить', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/schedule-lesson/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        audiences: ['ауд. 202'],
      })
      .expect(200);

    expect(res.body.audiences).toContain('ауд. 202');
  });

  it('/schedule-lesson/:id (DELETE) — удалить', async () => {
    await request(app.getHttpServer())
      .delete(`/schedule-lesson/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
