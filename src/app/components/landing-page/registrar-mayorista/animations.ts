import { ElementRef } from '@angular/core';

export function initializeLoginAnimations(
  contenedorLogin: ElementRef,
) {
  const inputs = document.querySelectorAll<HTMLInputElement>('.input-field');
  const toggleButtons = document.querySelectorAll<HTMLButtonElement>('.toggle');
  const bullets = document.querySelectorAll<HTMLSpanElement>('.bullets span');
  const images = document.querySelectorAll<HTMLImageElement>('.image');

  let currentIndex = 1; // Empezamos con la primera imagen


  inputs.forEach((inp) => {
    inp.addEventListener('focus', () => {
      inp.classList.add('active');
    });

    inp.addEventListener('blur', () => {
      if (inp.value !== '') return;
      inp.classList.remove('active');
    });

    inp.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    });
  });

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      contenedorLogin.nativeElement.classList.toggle('sign-up-mode');
    });
  });

  bullets.forEach((bullet) => {
    bullet.addEventListener('click', function () {
      const index = parseInt(this.dataset['value'] || '1', 10);
      
      currentIndex = index; // Actualiza el índice actual
    });
  });

  
}
