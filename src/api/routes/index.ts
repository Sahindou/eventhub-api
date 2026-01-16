import { Router } from "express";
import { EventRouter } from "./event.route"
import { OrganizerRouter } from "./organizer.route"

const router = Router()

router.use("/api/events", EventRouter)
router.use("/api/organizers", OrganizerRouter)

export { router as routers }