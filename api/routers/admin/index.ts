import express from "express";
import auth from "../../middlewear/auth";
import permit from "../../middlewear/permit";
import artistsAdminRouter from "./artistAdmin";
import albumsAdminRouter from "./albumsAdmin";
import tracksAdminRouter from "./trackAdminRouter";

const AdminRouter = express.Router();
AdminRouter.use(auth, permit("admin"));
AdminRouter.use('/artists', artistsAdminRouter);
AdminRouter.use('/albums', albumsAdminRouter);
AdminRouter.use('/tracks', tracksAdminRouter);


export default AdminRouter;