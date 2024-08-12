export function inicializarFuncionesTarjeta() {
  const cardNumberInput = document.querySelector(
    '.card-number-input'
  ) as HTMLInputElement;
  const cardNumberBox = document.querySelector(
    '.card-number-box'
  ) as HTMLElement;

  const cardHolderInput = document.querySelector(
    '.card-holder-input'
  ) as HTMLInputElement;
  const cardHolderName = document.querySelector(
    '.card-holder-name'
  ) as HTMLElement;

  const monthInput = document.querySelector('.month-input') as HTMLInputElement;
  const expMonth = document.querySelector('.exp-month') as HTMLElement;

  const yearInput = document.querySelector('.year-input') as HTMLInputElement;
  const expYear = document.querySelector('.exp-year') as HTMLElement;

  const cvvInput = document.querySelector('.cvv-input') as HTMLInputElement;
  const cvvBox = document.querySelector('.cvv-box') as HTMLElement;
  const front = document.querySelector('.front') as HTMLElement;
  const back = document.querySelector('.back') as HTMLElement;

  // Actualizar número de tarjeta
  cardNumberInput.oninput = () => {
    cardNumberBox.innerText = cardNumberInput.value;
  };

  // Actualizar nombre del titular
  cardHolderInput.oninput = () => {
    cardHolderName.innerText = cardHolderInput.value;
  };

  // Actualizar mes de expiración
  monthInput.oninput = () => {
    expMonth.innerText = monthInput.value;
  };

  // Actualizar año de expiración
  yearInput.oninput = () => {
    expYear.innerText = yearInput.value;
  };

  // Animación CVV - Ingresar
  cvvInput.onmouseenter = () => {
    front.style.transform = 'perspective(1000px) rotateY(-180deg)';
    back.style.transform = 'perspective(1000px) rotateY(0deg)';
  };

  // Animación CVV - Salir
  cvvInput.onmouseleave = () => {
    front.style.transform = 'perspective(1000px) rotateY(0deg)';
    back.style.transform = 'perspective(1000px) rotateY(180deg)';
  };

  // Actualizar CVV
  cvvInput.oninput = () => {
    cvvBox.innerText = cvvInput.value;
  };
}
