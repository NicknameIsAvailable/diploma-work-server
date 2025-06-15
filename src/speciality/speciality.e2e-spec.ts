import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('SpecialityController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  let createdId: string;

  it('/speciality (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/speciality')
      .send({ name: 'Тестовая специальность' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  it('/speciality (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/speciality')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/speciality/:id (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get(`/speciality/${createdId}`)
      .expect(200);
    expect(res.body.id).toBe(createdId);
  });

  it('/speciality/:id (PATCH)', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/speciality/${createdId}`)
      .send({ name: 'Обновленная специальность' })
      .expect(200);
    expect(res.body.name).toBe('Обновленная специальность');
  });

  it('/speciality/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/speciality/${createdId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
