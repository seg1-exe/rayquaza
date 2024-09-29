function updateMusicPlayer(song) {
  document.getElementById('music-player__title').textContent = song.title;
  document.getElementById('music-player__artist').textContent = song.artist;
  document.getElementById('music-cover').src = song.cover;
  document.getElementById('background-poster').src = song.cover;
  document.getElementById('audio-source').src = song.audio;
  document.getElementById('audio-player').load();
  document.getElementById('spotify-link').href = song.spotify;
  document.getElementById('soundcloud-link').href = song.soundcloud;
  document.getElementById('deezer-link').href = song.deezer;

  const audioPlayer = document.getElementById('audio-player');
        audioPlayer.load();
        audioPlayer.play(); 
}

fetch('musicData.json') 
  .then(response => response.json())
  .then(data => {
    const tracklist = document.getElementById('tracklist__list');
    
    if (data.songs && data.songs.length > 0) {
      updateMusicPlayer(data.songs[0]); 
    }

    data.songs.forEach((song, index) => {
      const trackElement = document.createElement('div');
      trackElement.classList.add('track');

      trackElement.innerHTML = `
        <i class="fa-solid fa-play track__play"></i>
        <img src="${song.cover}" alt="cover" class="track__cover"/>
        <div class="track__info">
          <h3 class="track__title">${song.title}</h3>
          <h4 class="track__artist">${song.artist}</h4>
        </div>
      `;

      trackElement.querySelector('.track__play').addEventListener('click', () => {
        updateMusicPlayer(song); 
      });

      tracklist.appendChild(trackElement);
    });
  })
  .catch(error => console.error('Erreur de chargement du fichier JSON :', error));