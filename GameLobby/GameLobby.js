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

document.getElementById('inputText').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const inputText = this.value;

    fetch('/postText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText }),
    })
      .then(response => response.json())
      .then(result => {
        console.log('Отримано результат від сервера:', result);
      })
      .catch(error => {
        console.log('Сталася помилка:', error);
      });
  }
});