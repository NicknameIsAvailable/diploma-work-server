import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('LessonOrderController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/lesson-order (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/lesson-order')
      .send({ name: 'Первый урок' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  it('/lesson-order (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/lesson-order')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/lesson-order/:id (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get(`/lesson-order/${createdId}`)
      .expect(200);

    expect(res.body.id).toBe(createdId);
  });

  it('/lesson-order/:id (PUT)', async () => {
    const res = await request(app.getHttpServer())
      .put(`/lesson-order/${createdId}`)
      .send({ name: 'Обновлено' })
      .expect(200);

    expect(res.body.name).toBe('Обновлено');
  });

  it('/lesson-order/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/lesson-order/${createdId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
