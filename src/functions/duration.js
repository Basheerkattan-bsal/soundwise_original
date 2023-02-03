import msToTime from './timer.js'

const getDuration = (target) => {
  console.log('duration', target)
        let timeCounter = 0;
        if (target.type === 'album' && target.album_type === 'single') {
          const activeTime = msToTime(target.tracks.items[0].duration_ms);
          return(activeTime);
        } else {
          target.tracks.items.map(track => {
            const realTrack = track.track ? track.track : track
            timeCounter += realTrack.duration_ms;
          });
          const durationTime = msToTime(timeCounter);
          return(durationTime);
        }
}

export default getDuration
