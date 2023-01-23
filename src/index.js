// точка входа для index.html:
import { authFunc } from "./modules/auth";  // импорт фукнции authFunc
import { cartFunc } from "./modules/cart";
import { categoriesFunc } from "./modules/categories";


authFunc();
categoriesFunc();       // отрисовка категорий
cartFunc();