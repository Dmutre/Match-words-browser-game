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
  const inputText = this; // Зберегти посилання на елемент inputText

  if (e.key === 'Enter') {
    const inputValue = inputText.value;

    fetch('/postText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputValue }),
    })
      .then(response => response.json())
      .then(result => {
        console.log('Отримано результат від сервера:', result);
        if (result.success === true) {
          inputText.value = ''; // Очистити поле вводу
        }
      })
      .catch(error => {
        console.log('Сталася помилка:', error);
      });
  }
});