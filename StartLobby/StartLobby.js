'use strict';

const heartsRange = document.getElementById('heartsRange');
const heartsCount = document.getElementById('heartsCount');

heartsRange.addEventListener('input', () => {
  heartsCount.textContent = heartsRange.value;
})

function redirectToGameLobby(){
  const language = document.querySelector('input[name="language"]:checked').value;
  const hearts = document.getElementById('heartsRange').value;
  const score = document.getElementById('scoreInput').value;

  const data = {
    language: language,
    hearts: hearts,
    score: score
  };

  fetch('/getParameters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        window.location.href = '/gameLobby';
      } else {
        console.error('Error:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}