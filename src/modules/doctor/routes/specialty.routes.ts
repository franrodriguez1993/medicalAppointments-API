import { Router } from "express";
import SpecialtyController from "../controllers/specialty.controller";
import { specialtyValidator } from "../../../middlewares/bodyDoctorValidator";

const controller = new SpecialtyController();
const SpecialtyRouter = Router();

SpecialtyRouter.post("/", specialtyValidator, controller.create);
SpecialtyRouter.delete("/:id", controller.delete);

export default SpecialtyRouter;
