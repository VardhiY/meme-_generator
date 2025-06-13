const templateSelector = document.getElementById('templateSelector');
const memeImage = document.getElementById('memeImage');
const downloadLink = document.getElementById('downloadLink');

let memeTemplates = [];

async function loadTemplates() {
  try {
    const res = await fetch('https://api.imgflip.com/get_memes');
    const data = await res.json();

    memeTemplates = data.data.memes;
    memeTemplates.forEach(template => {
      const option = document.createElement('option');
      option.value = template.id;
      option.textContent = template.name;
      templateSelector.appendChild(option);
    });
  } catch (err) {
    alert("Failed to load meme templates.");
    console.error(err);
  }
}

async function generateMeme() {
  const templateId = templateSelector.value;
  const topText = document.getElementById('topText').value;
  const bottomText = document.getElementById('bottomText').value;

  const params = new URLSearchParams();
  params.append('template_id', templateId);
  params.append('username', 'Vardhini123');  // Public test account
  params.append('password', 'Vinnuy@3347');
  params.append('text0', topText);
  params.append('text1', bottomText);

  try {
    const response = await fetch('https://api.imgflip.com/caption_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });

    const data = await response.json();
    console.log("Response:", data);

    if (data.success) {
      memeImage.src = data.data.url;
      downloadLink.href = data.data.url;
      downloadLink.style.display = 'inline-block';
    } else {
      alert("Meme generation failed: " + data.error_message);
    }
  } catch (error) {
    alert("Network error while generating meme.");
    console.error(error);
  }
}

loadTemplates();
