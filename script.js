const generateBtn = document.getElementById('generate-btn');
const colorPalette = document.querySelector('.palette-container');
const copyBtn = document.querySelector('.copy-btn');

generateBtn.addEventListener('click', generatePalette);
colorPalette.addEventListener('click', (e) => {
  if (e.target.classList.contains('copy-btn')) {
    const copyIcon = e.target;
    const colorValue = e.target.previousElementSibling.textContent;
    navigator.clipboard.writeText(colorValue).then(() => showCopySuccess(copyIcon).catch(err => alert(err)));
  } else if (e.target.classList.contains('color')) {
    const copyIcon = e.target.nextElementSibling.querySelector('.copy-btn');
    const colorValue = e.target.nextElementSibling.querySelector('.hex-value').textContent;
    navigator.clipboard.writeText(colorValue).then(() => showCopySuccess(copyIcon)).catch(err => alert(err));
  } else if (e.target.classList.contains('hex-value')) {
    const copyIcon = e.target.nextElementSibling;
    const colorValue = e.target.textContent;
    navigator.clipboard.writeText(colorValue).then(() => showCopySuccess(copyIcon)).catch(err => alert(err));
  } else if (e.target.classList.contains('color-info')) {
    const copyIcon = e.target.querySelector('.copy-btn');
    const colorValue = e.target.firstElementChild.textContent;
    navigator.clipboard.writeText(colorValue).then(() => showCopySuccess(copyIcon)).catch(err => alert(err));
  }
}
);

function generatePalette() {

  const colors = [];
  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor());
  }

  updatePalleteDisplay(colors);
}

function generateRandomColor() {
  const digits = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += digits[Math.floor(Math.random() * 16)];
  }

  return color;
}

function updatePalleteDisplay(colors) {
  const colorBoxes = colorPalette.querySelectorAll('.color-box');

  colorBoxes.forEach((box, index) => {
    const color = colors[index];
    const colorDiv = box.querySelector('.color');
    const hexValue = box.querySelector('.hex-value');

    hexValue.textContent = color;
    colorDiv.style.backgroundColor = colors[index];
  });
}

function showCopySuccess(object) {

  object.classList.remove('far', 'fa-copy');
  object.classList.add('fas', 'fa-check');

  object.style.color = '#4CAF50';

  setTimeout(() => {
    object.classList.remove('fas', 'fa-check');
    object.classList.add('far', 'fa-copy');
    object.style.color = '#222';
  }, 500);

}
generatePalette(); // Initial palette generation