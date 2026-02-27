import { Router } from "express";
import { EventRouter } from "./event.route"
import { OrganizerRouter } from "./organizer.route"
import { a2fRouter } from "./a2f.routes";


const router = Router()

router.use("/api/events", EventRouter)
router.use("/api/organizers", OrganizerRouter)

// route de la A2F
router.use("/api/a2f", a2fRouter)

export { router as routers }