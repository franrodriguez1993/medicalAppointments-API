import { server } from "../src";
import {
  api,
  daoStaff,
  daoUser,
  staffListMock,
  newStaffMock,
} from "./helpers/staff_helpers";

import { staffOIF } from "../src/interfaces/staff/staff.interface";

beforeEach(async () => {
  await daoStaff.deleteAll();
  await daoUser.deleteAll();
  await Promise.all(
    staffListMock.map(async (s) => {
      await api.post("/api/v1/staff/register").send(s);
    })
  );
});

afterAll(() => {
  server.close();
});

describe("Register test", () => {
  test("register successfully", async () => {
    const response = await api
      .post("/api/v1/staff/register")
      .send(newStaffMock);
    expect(response.body.msg).toEqual("STAFF_REGISTERED");
  });
  test("mail in use", async () => {
    const response = await api
      .post("/api/v1/staff/register")
      .send({ ...newStaffMock, mail: staffListMock[0].mail });
    expect(response.body.msg).toEqual("MAIL_IN_USE");
  });

  test("username in use", async () => {
    const response = await api
      .post("/api/v1/staff/register")
      .send({ ...newStaffMock, username: staffListMock[0].username });
    expect(response.body.msg).toEqual("USERNAME_IN_USE");
  });

  test("dni in use", async () => {
    const response = await api
      .post("/api/v1/staff/register")
      .send({ ...newStaffMock, dni: staffListMock[0].dni });
    expect(response.body.msg).toEqual("DNI_IN_USE");
  });

  test("invalid username - too short", async () => {
    const response = await api
      .post("/api/v1/staff/register")
      .send({ ...newStaffMock, username: "hu" });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
  test("invalid username - too long", async () => {
    const response = await api.post("/api/v1/staff/register").send({
      ...newStaffMock,
      username:
        "hukasdjaskdjasdjqwoeiqwoeiqoewiqwoeiqeoqiweoqieqoweijdsfsdfawsqw",
    });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("invalid email", async () => {
    const response = await api
      .post("/api/v1/staff/register")
      .send({ ...newStaffMock, mail: "juancarlos" });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("invalid password - too short", async () => {
    const response = await api
      .post("/api/v1/staff/register")
      .send({ ...newStaffMock, password: "juan" });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("invalid password - too long", async () => {
    const response = await api.post("/api/v1/staff/register").send({
      ...newStaffMock,
      password: "juandfsdfsdfsdfsdfowerwieroiwerowiroweirweoriweoriaaqq",
    });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("invalid salary - too high", async () => {
    const response = await api.post("/api/v1/staff/register").send({
      ...newStaffMock,
      salary: 250000000.0,
    });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("invalid salary - too low", async () => {
    const response = await api.post("/api/v1/staff/register").send({
      ...newStaffMock,
      salary: 100.0,
    });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("invalid salary - has to be a float", async () => {
    const response = await api.post("/api/v1/staff/register").send({
      ...newStaffMock,
      salary: "juan",
    });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
});

describe("Login test", () => {
  test("Login successfully", async () => {
    const response = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });

    expect(response.body.msg).toEqual("LOGIN_SUCCESSFULLY");
  });

  test("Invalid credentials - username", async () => {
    const response = await api.post("/api/v1/staff/login").send({
      username: "juancarlos",
      password: staffListMock[0].password,
    });

    expect(response.body.msg).toEqual("INVALID_CREDENTIALS");
  });

  test("Invalid credentials - password", async () => {
    const response = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: "juancarlos",
    });

    expect(response.body.msg).toEqual("INVALID_CREDENTIALS");
  });

  test("Invalid password", async () => {
    const response = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: "aa",
    });

    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("Invalid username", async () => {
    const response = await api.post("/api/v1/staff/login").send({
      username: "ae",
      password: "juancarlos",
    });

    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
});

describe("update personal data test", () => {
  test("updated successfully", async () => {
    const user: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/update/personal/${user.id}`)
      .send({
        name: "jonathan",
        lastname: "jones",
        cellphone: "145289653",
        birthday: "1985/10/5",
      });
    expect(response.body.msg).toEqual("STAFF_UPDATED");
  });

  test("Invalid id", async () => {
    const response = await api
      .put(`/api/v1/staff/update/personal/dasdadjaj1231saa1`)
      .send({
        name: "jonathan",
        lastname: "jones",
        cellphone: "145289653",
        birthday: "1985/10/5",
      });
    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("staff not found", async () => {
    const response = await api
      .put(`/api/v1/staff/update/personal/${staffListMock[0].id}`)
      .send({
        name: "jonathan",
        lastname: "jones",
        cellphone: "145289653",
        birthday: "1985/10/5",
      });
    expect(response.body.msg).toEqual("STAFF_NOT_FOUND");
  });
});

describe("change mail", () => {
  test("updated successfully", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );

    const response = await api
      .put(`/api/v1/staff/update/mail/${staff.id}`)
      .send({ mail: "jonathanlamas@gmail.com" });
    expect(response.body.msg).toEqual("MAIL_UPDATED");
  });

  test("invalid id", async () => {
    const response = await api
      .put(`/api/v1/staff/update/mail/128312319991`)
      .send({ mail: "jonathanlamas@gmail.com" });
    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("staff not found", async () => {
    const response = await api
      .put(`/api/v1/staff/update/mail/${staffListMock[0].id}`)
      .send({ mail: "jonathanlamas@gmail.com" });
    expect(response.body.msg).toEqual("STAFF_NOT_FOUND");
  });

  test("mail is the same", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/update/mail/${staff.id}`)
      .send({ mail: staffListMock[0].mail });
    expect(response.body.msg).toEqual("MAIL_IS_THE_SAME");
  });

  test("invalid mail", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/update/mail/${staff.id}`)
      .send({ mail: "juan carlos" });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
});

describe("change username", () => {
  test("username updated", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/update/username/${staff.id}`)
      .send({ username: "juancarlos20" });
    expect(response.body.msg).toEqual("USERNAME_UPDATED");
  });

  test("username is the same", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/update/username/${staff.id}`)
      .send({ username: staff.username });
    expect(response.body.msg).toEqual("USERNAME_IS_THE_SAME");
  });

  test("username already in use", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/update/username/${staff.id}`)
      .send({ username: staffListMock[1].username });
    expect(response.body.msg).toEqual("USERNAME_ALREADY_IN_USE");
  });

  test("username is too short", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/update/username/${staff.id}`)
      .send({ username: "a" });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("username is too long", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/update/username/${staff.id}`)
      .send({
        username:
          "abcdeiiiqqiqiqiqiqqedkjasdkjasdkjaskdjaskdajskdajsdkajdkasjdasqweqweqw",
      });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
});

describe("change password", () => {
  test("password updated", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/update/password/${staff.id}`)
      .send({ password: "kukukuku" });
    expect(response.body.msg).toEqual("PASSWORD_UPDATED");
  });

  test("password is the same", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/update/password/${staff.id}`)
      .send({ password: "147258" });
    expect(response.body.msg).toEqual("PASSWORD_IS_THE_SAME");
  });

  test("password is too short", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/update/password/${staff.id}`)
      .send({ password: "11" });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("password is too long", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/update/password/${staff.id}`)
      .send({ password: "11asdasdasdasdasdqj4e2131231231231sdfdsfbpoil567" });
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
});

describe("find by id", () => {
  test("find by id", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api.get(`/api/v1/staff/${staff.id}`);
    expect(response.body.msg).toEqual("OK");
  });

  test("invalid id", async () => {
    const response = await api.get(`/api/v1/staff/234234234dfaa1`);
    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("staff not found", async () => {
    const response = await api.get(`/api/v1/staff/${staffListMock[0].id}`);
    expect(response.body.msg).toEqual("STAFF_NOT_FOUND");
  });
});

describe("update salary", () => {
  test("updated successfully", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/update/salary/${staff.id}`)
      .send({ salary: 5000 });

    expect(response.body.msg).toEqual("SALARY_UPDATED");
  });

  test("user not found", async () => {
    const response = await api
      .put(`/api/v1/staff/update/salary/${staffListMock[0].id}`)
      .send({ salary: 5000 });

    expect(response.body.msg).toEqual("STAFF_NOT_FOUND");
  });

  test("invalid id", async () => {
    const response = await api
      .put(`/api/v1/staff/update/salary/12312312`)
      .send({ salary: 5000 });

    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("invalid amount", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/update/salary/${staff.id}`)
      .send({ salary: 50000000 });

    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
});

describe("update status", () => {
  test("status updated", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/update/status/${staff.id}`)
      .send({ status: "suspended" });
    expect(response.body.msg).toEqual("STATUS_UPDATED");
  });

  test("invalid status", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/update/status/${staff.id}`)
      .send({ status: "vacationnnn" });
    expect(response.body.msg).toEqual("INVALID_STATUS");
  });

  test("invalid id", async () => {
    const response = await api
      .put(`/api/v1/staff/update/status/231ddddd`)
      .send({ status: "vacation" });
    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("staff not found", async () => {
    const response = await api
      .put(`/api/v1/staff/update/status/${staffListMock[0].id}`)
      .send({ status: "vacation" });
    expect(response.body.msg).toEqual("STAFF_NOT_FOUND");
  });
});
