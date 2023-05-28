document.getElementById('sendButton').addEventListener('click', function() {
  fetch('/getWord')
    .then(response => response.json())
    .then(data => {
      document.getElementById('messageWindow').innerText = data.word;
    })
    .catch(error => {
      console.log('Помилка при отриманні слова:', error);
    });
});