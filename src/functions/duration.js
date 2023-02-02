import msToTime from './timer.js'

const getDuration = (target) => {
        let timeCounter = 0;
        if (target.type === 'album' && target.album_type === 'single') {
          const activeTime = msToTime(target.duration_ms);
          return(activeTime);
        } else {
          target.tracks.items.map(track => {
            timeCounter += track.duration_ms;
          });
          const durationTime = msToTime(timeCounter);
          return(durationTime);
        }
}

export default getDuration
