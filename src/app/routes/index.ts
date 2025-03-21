import { Router } from "express";
import { ProductRoutes } from "../modules/product/product.route";
import { UserRoutes } from "../modules/user/user.route";
import { NewsletterRoutes } from "../modules/newsletter/newsletter.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
