import { userBIF, userOIF } from "../user/user.interface";
import { Model } from "sequelize";

/**
 * INTERFACE ONLY STAFF PROPERTIES
 **/

export interface staffBodyIF {
  id?: string;
  id_user: string;
  username: string;
  password: string;
  status: string;
  seniority: string;
  salary: number;
}

/**
 * INTERFACE BODY - STAFF USER
 **/
export interface userStaffBIF extends staffBodyIF, userBIF {}

/**
 * INTERFACE ONLY STAFF OBJECT
 **/

export interface staffOIF extends staffBodyIF, Model<staffBodyIF> {
  id: string;
}

/**
 * INTERFACE USER STAFF OBJECT
 **/

// export interface userStaffOIF extends userStaffBIF, Model<userStaffBIF> {
//   staff: staffBodyIF;
// }

export interface userStaffOIF extends userOIF {
  staff: staffBodyIF;
}
