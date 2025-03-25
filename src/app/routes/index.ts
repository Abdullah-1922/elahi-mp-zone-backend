import { Router } from "express";
import { ProductRoutes } from "../modules/product/product.route";
import { UserRoutes } from "../modules/user/user.route";
import { NewsletterRoutes } from "../modules/newsletter/newsletter.route";
import { AnalyticsLogRoutes } from "../modules/analyticsLog/analyticsLog.route";
import { FeedbackRoutes } from "../modules/feedback/feedback.route";

type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/news-letter",
    route: NewsletterRoutes,
  },
  {
    path: "/analytics-log",
    route: AnalyticsLogRoutes,
  },
  {
    path: "/feedback",
    route: FeedbackRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
