// точка входа для catalog.html:
import { authFunc } from "./modules/auth";  // импорт фукнции authFunc
import { cartFunc } from "./modules/cart";
import { prodocutsFunc } from "./modules/products";


authFunc();
prodocutsFunc();        // отражение верстки спсика продуктов
cartFunc();             // корзина
