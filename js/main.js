document.querySelector('button').addEventListener('click', getFetch);

function getFetch() {
  const date = document.querySelector('input').value;
  const url = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`;
  console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayAPOD(data);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });

  function displayAPOD(data) {
    const imageElement = document.querySelector('img');
    const videoElement = document.querySelector('iframe');
    const videoContainer = document.querySelector('.video-container');

    if (data.media_type === 'image') {
      imageElement.src = data.url;
      imageElement.classList.remove('hidden');
      videoElement.src = '';
      videoContainer.classList.add('hidden');
    } else if (data.media_type === 'video') {
      videoElement.src = data.url;
      videoContainer.classList.remove('hidden');
      imageElement.src = '';
      imageElement.classList.add('hidden');
    }
    document.querySelector('p').innerText = data.explanation;
  }
}

window.onload = function () {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = String(today.getFullYear());
  today = `${yyyy}-${mm}-${dd}`;
  const dateInput = document.querySelector('#datePicker');
  dateInput.setAttribute('max', today);
  dateInput.setAttribute('value', today);
};

getFetch();
