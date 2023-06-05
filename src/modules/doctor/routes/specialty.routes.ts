import { Router } from "express";
import SpecialtyController from "../controllers/specialty.controller";
import { specialtyValidator } from "../../../middlewares/bodyDoctorValidator";
import { requireToken } from "../../../middlewares/requireToken";

const controller = new SpecialtyController();
const SpecialtyRouter = Router();

SpecialtyRouter.post("/", requireToken, specialtyValidator, controller.create);
SpecialtyRouter.delete("/:id", requireToken, controller.delete);

export default SpecialtyRouter;
