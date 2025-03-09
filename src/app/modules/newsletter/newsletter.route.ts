import { Router } from "express";
import { NewsletterControllers } from "./newsletter.controller";

const router = Router()
router.get('/', NewsletterControllers.getAllNewsletter)
router.post('/', NewsletterControllers.createNewsletter)


export const NewsletterRoutes = router