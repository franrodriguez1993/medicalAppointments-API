import { server } from "../src";
import {
  api,
  daoStaff,
  staffListMock,
  newStaffMock,
} from "./helpers/staff_helpers";

import { staffOIF } from "../src/interfaces/staff/staff.interface";

beforeEach(async () => {
  await daoStaff.deleteUsers();
  await daoStaff.deleteAll();
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

    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });

    const response = await api
      .put(`/api/v1/staff/${user.id}/personal`)
      .send({
        name: "jonathan",
        lastname: "jones",
        cellphone: "145289653",
        birthday: "1985/10/5",
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("STAFF_UPDATED");
  });

  test("Invalid id", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const response = await api
      .put(`/api/v1/staff/dasdadjaj1231saa1/personal`)
      .send({
        name: "jonathan",
        lastname: "jones",
        cellphone: "145289653",
        birthday: "1985/10/5",
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("staff not found", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const response = await api
      .put(`/api/v1/staff/${staffListMock[0].id}/personal`)
      .send({
        name: "jonathan",
        lastname: "jones",
        cellphone: "145289653",
        birthday: "1985/10/5",
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("STAFF_NOT_FOUND");
  });
});

describe("change mail", () => {
  test("updated successfully", async () => {
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );

    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });

    const response = await api
      .put(`/api/v1/staff/${staff.id}/mail`)
      .send({ mail: "jonathanlamas@gmail.com" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("MAIL_UPDATED");
  });

  test("invalid id", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });

    const response = await api
      .put(`/api/v1/staff/128312319991/mail`)
      .send({ mail: "jonathanlamas@gmail.com" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("staff not found", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const response = await api
      .put(`/api/v1/staff/${staffListMock[0].id}/mail`)
      .send({ mail: "jonathanlamas@gmail.com" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("STAFF_NOT_FOUND");
  });

  test("mail is the same", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });

    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/${staff.id}/mail`)
      .send({ mail: staffListMock[0].mail })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("MAIL_IS_THE_SAME");
  });

  test("invalid mail", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/${staff.id}/mail`)
      .send({ mail: "juan carlos" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
});

describe("change username", () => {
  test("username updated", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/${staff.id}/username`)
      .send({ username: "juancarlos20" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("USERNAME_UPDATED");
  });

  test("username is the same", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/${staff.id}/username`)
      .send({ username: staff.username })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("USERNAME_IS_THE_SAME");
  });

  test("username already in use", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/${staff.id}/username`)
      .send({ username: staffListMock[1].username })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("USERNAME_ALREADY_IN_USE");
  });

  test("username is too short", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/${staff.id}/username`)
      .send({ username: "a" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("username is too long", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/${staff.id}/username`)
      .send({
        username:
          "abcdeiiiqqiqiqiqiqqedkjasdkjasdkjaskdjaskdajskdajsdkajdkasjdasqweqweqw",
      })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
});

describe("change password", () => {
  test("password updated", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/${staff.id}/password`)
      .send({ password: "kukukuku" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("PASSWORD_UPDATED");
  });

  test("password is the same", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/${staff.id}/password`)
      .send({ password: staffListMock[0].password })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("PASSWORD_IS_THE_SAME");
  });

  test("password is too short", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/${staff.id}/password`)
      .send({ password: "11" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("password is too long", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/${staff.id}/password`)
      .send({ password: "11asdasdasdasdasdqj4e2131231231231sdfdsfbpoil567" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
});

describe("find by id", () => {
  test("find by id", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .get(`/api/v1/staff/${staff.id}`)
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("OK");
  });

  test("invalid id", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const response = await api
      .get(`/api/v1/staff/234234234dfaa1`)
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("staff not found", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const response = await api
      .get(`/api/v1/staff/${staffListMock[0].id}`)
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("STAFF_NOT_FOUND");
  });
});

describe("update salary", () => {
  test("updated successfully", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/${staff.id}/salary`)
      .send({ salary: 5000 })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("SALARY_UPDATED");
  });

  test("user not found", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const response = await api
      .put(`/api/v1/staff/${staffListMock[0].id}/salary`)
      .send({ salary: 5000 })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("STAFF_NOT_FOUND");
  });

  test("invalid id", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const response = await api
      .put(`/api/v1/staff/12312312/salary`)
      .send({ salary: 5000 })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("invalid amount", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/${staff.id}/salary`)
      .send({ salary: 50000000 })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
});

describe("update status", () => {
  test("status updated", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/${staff.id}/status`)
      .send({ status: "suspended" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("STATUS_UPDATED");
  });

  test("invalid status", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const staff: staffOIF = await daoStaff.findByUsername(
      staffListMock[0].username
    );
    const response = await api
      .put(`/api/v1/staff/${staff.id}/status`)
      .send({ status: "vacationnnn" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);
    expect(response.body.msg).toEqual("INVALID_STATUS");
  });

  test("invalid id", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const response = await api
      .put(`/api/v1/staff/231ddddd/status`)
      .send({ status: "vacation" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("staff not found", async () => {
    const login = await api.post("/api/v1/staff/login").send({
      username: staffListMock[0].username,
      password: staffListMock[0].password,
    });
    const response = await api
      .put(`/api/v1/staff/${staffListMock[0].id}/status`)
      .send({ status: "vacation" })
      .set("Authorization", `Bearer ${login.body.data.jwt}`);

    expect(response.body.msg).toEqual("STAFF_NOT_FOUND");
  });
});
