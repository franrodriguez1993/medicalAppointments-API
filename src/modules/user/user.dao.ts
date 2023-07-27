import User from "./user.model";
import {
  userBIF,
  userOIF,
  userUpdateIF,
} from "../../interfaces/user/user.interface";
import Staff from "../staff/staff.model";
import Doctor from "../doctor/models/doctor.model";
import Patient from "../patient/patient.model";

import { BuildOptions, Model } from "sequelize";
import { doctorOIF } from "../../interfaces/doctor/doctor.interface";
import { staffOIF } from "../../interfaces/staff/staff.interface";
import { patientOIF } from "../../interfaces/patient/patient.interface";

type modelClass = typeof Model & {
  new (values?: object, options?: BuildOptions):
    | doctorOIF
    | staffOIF
    | patientOIF;
};

export class UserDao {
  model: modelClass;
  /**  CREATE USER  **/
  constructor(m: modelClass) {
    this.model = m;
  }
  async createUser(data: userBIF) {
    try {
      return await User.create(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /** --- FIND BY ID ---  **/
  async findUserByID(id: string) {
    try {
      return await User.findOne({
        where: { id },
        include: [{ model: Staff }, { model: Doctor }, { model: Patient }],
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /** --- FIND BY MAIL ---  **/
  async findUserByMail(mail: string) {
    try {
      return await User.findOne({
        where: { mail },
        include: [{ model: Staff }, { model: Doctor }, { model: Patient }],
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /** --- FIND BY DNI ---  **/
  async findUserByDNI(dni: string) {
    try {
      return await User.findOne({
        where: { dni },
        include: [{ model: Staff }, { model: Doctor }, { model: Patient }],
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /**  UPDATE USER  **/
  async updateUser(id: string, data: userUpdateIF) {
    try {
      return await User.update({ ...data }, { where: { id } });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  async changeMail(id: string, mail: string) {
    try {
      const user: userOIF = await User.findOne({ where: { id } });
      if (user.mail === mail) throw new Error("MAIL_IS_THE_SAME");

      const checkMail = await User.findOne({ where: { mail } });
      if (checkMail) throw new Error("MAIL_IN_USE");

      return await User.update({ mail }, { where: { id } });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /**  DELETE USER  **/
  async deleteUser(id: string) {
    try {
      return await User.destroy({
        where: { id },
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /** --- DELETE ALL ---  **/
  async deleteUsers() {
    try {
      return await User.destroy({ where: {} });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  /** DELETE ONE  **/
  async deleteOne(id: string) {
    try {
      return await this.model.destroy({
        where: { id },
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }

  async deleteAll() {
    try {
      return await this.model.destroy({
        where: {},
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else throw new Error(e.toString());
    }
  }
}
