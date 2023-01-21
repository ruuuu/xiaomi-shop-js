// открытие окна
export const openModal = (modal) => {
      // вместо след четырех строк используем метод insertAdjacmentHTML:
      const layout = document.createElement('div');   //  оверлей для модалки(затемненая облатсь вокруг модалки)
      layout.classList.add('modal-backdrop');
      layout.classList.add('fade');
      document.body.append(layout);




      setTimeout(() => {  // переданная фукнция отрабоатет через 0.1 с (100ms)
            //const layout = document.querySelector('.modal-backdrop');
            if (layout) {
                  layout.classList.add('show');
            }

            modal.classList.add('show');
      }, 100);




      modal.classList.add('d-block');     //  d-block bootstrap-ский класс

      setTimeout(() => {  // переданная фукнция отрабоатет через 0.1 с (100ms)
            modal.classList.add('show');
      }, 100);
}




// закррытие окна
export const closeModal = (modal) => {
      const layout = document.querySelector('.modal-backdrop');
      modal.classList.remove('show');
      if (layout) {
            layout.classList.remove('show');
      }



      setTimeout(() => {
            modal.style.display = 'none';
            if (layout) {
                  layout.remove();              // удаляем элемент из верстки
            }
      }, 500);



}