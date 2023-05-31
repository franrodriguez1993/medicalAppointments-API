import { server } from "../src";
import { specialtiesOIF } from "../src/interfaces/doctor/specialties.interface";
import { api, SpecialtyMock, daoSpecialty } from "./helpers/doctor_helpers";

beforeEach(async () => {
  await daoSpecialty.deleteAll();
  await Promise.all(
    SpecialtyMock.map(async (s) => {
      await api.post("/api/v1/specialty").send(s);
    })
  );
});
afterAll(() => {
  server.close();
});

describe("create specialty", () => {
  test("created successfully", async () => {
    const response = await api
      .post("/api/v1/specialty")
      .send({ name: "pediatrician" });
    expect(response.body.msg).toEqual("SPECIALTY_CREATED");
  });
  test("Already created", async () => {
    const response = await api
      .post("/api/v1/specialty")
      .send({ name: SpecialtyMock[0].name });
    expect(response.body.msg).toEqual("SPECIALTY_ALREADY_CREATED");
  });
  test("Name too short", async () => {
    const response = await api.post("/api/v1/specialty").send({ name: "a" });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
  test("Name too long", async () => {
    const response = await api
      .post("/api/v1/specialty")
      .send({ name: "aasdadasdasdaqweoqwieqwoeiqadkasdkasjdkasjdaskdja" });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
  test("Name is not a string", async () => {
    const response = await api.post("/api/v1/specialty").send({ name: 12 });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
});
describe("delete Specialty", () => {
  test("deleted successfully", async () => {
    const specialty: specialtiesOIF = await daoSpecialty.findByName(
      SpecialtyMock[0].name
    );
    const response = await api.delete(`/api/v1/specialty/${specialty.id}`);
    expect(response.body.msg).toEqual("SPECIALTY_DELETED");
  });

  test("invalid id", async () => {
    const response = await api.delete(`/api/v1/specialty/2313`);
    expect(response.body.msg).toEqual("INVALID_ID");
  });
});
