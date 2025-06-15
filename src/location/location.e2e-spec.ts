import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('LocationController (e2e)', () => {
  let app: INestApplication;
  let locationId: string;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/location (POST) — создать', async () => {
    const res = await request(app.getHttpServer())
      .post('/location')
      .send({ name: 'New Location' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    locationId = res.body.id;
  });

  it('/location (GET) — получить все', async () => {
    const res = await request(app.getHttpServer()).get('/location').expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/location/:id (GET) — получить по ID', async () => {
    const res = await request(app.getHttpServer())
      .get(`/location/${locationId}`)
      .expect(200);

    expect(res.body.id).toBe(locationId);
  });

  it('/location/:id (PATCH) — обновить', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/location/${locationId}`)
      .send({ name: 'Updated Name' })
      .expect(200);

    expect(res.body.name).toBe('Updated Name');
  });

  it('/location/:id (DELETE) — удалить', async () => {
    await request(app.getHttpServer())
      .delete(`/location/${locationId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
