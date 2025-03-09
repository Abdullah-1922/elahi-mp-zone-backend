import { Router } from 'express';
import { ProductRoutes } from '../modules/product/product.route';


type TModuleRoutes = {
  path: string;
  route: Router;
};

const router = Router();

const moduleRoutes: TModuleRoutes[] = [
  {
    path: '/product',
    route: ProductRoutes,
  },

 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
