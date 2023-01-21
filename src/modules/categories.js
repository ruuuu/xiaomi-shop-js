// получение категорий:
import { getData } from "./api";



export const categoriesFunc = () => {
      getData('/categoties')
            .then(data => res)
};