import { ElementRef } from '@angular/core';

export function initializeLoginAnimations(
  contenedorLogin: ElementRef,
  carouselElement: ElementRef
) {
  const inputs = document.querySelectorAll<HTMLInputElement>('.input-field');
  const toggleButtons = document.querySelectorAll<HTMLButtonElement>('.toggle');
  const bullets = document.querySelectorAll<HTMLSpanElement>('.bullets span');
  const images = document.querySelectorAll<HTMLImageElement>('.image');

  let currentIndex = 1; // Empezamos con la primera imagen

  function moveSlider(index: number) {
    if (index == 1) {
      carouselElement.nativeElement.style.backgroundImage =
        "url('./img/fondos/fondo_ay.jpg')";
    } else if (index == 2) {
      carouselElement.nativeElement.style.backgroundImage =
        "url('./img/fondos/fondo_cabotella.jpg')";
    } else if (index == 3) {
      carouselElement.nativeElement.style.backgroundImage =
        "url('./img/fondos/fondo_escorpion.jpg')";
    }

    const currentImage = document.querySelector<HTMLImageElement>(
      `.img-${index}`
    );
    images.forEach((img) => img.classList.remove('show'));
    if (currentImage) currentImage.classList.add('show');

    const textSlider = document.querySelector('.text-group') as HTMLElement;
    textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

    bullets.forEach((bull) => bull.classList.remove('active'));
    const currentBullet = document.querySelector<HTMLSpanElement>(
      `.bullets span[data-value="${index}"]`
    );
    if (currentBullet) currentBullet.classList.add('active');
  }

  function autoSlide() {
    currentIndex++;
    if (currentIndex > bullets.length) {
      currentIndex = 1;
    }
    moveSlider(currentIndex);
  }

  // Inicia el slider automático cada 3 segundos
  const intervalId = setInterval(autoSlide, 5000);

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
      moveSlider(index);
      currentIndex = index; // Actualiza el índice actual
    });
  });

  return intervalId;
}
