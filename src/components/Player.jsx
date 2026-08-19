import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function Player({ currentSong, isPlaying, onPlayPause, onNext, onPrevious }) {
  const { t } = useTranslation();
  const audioRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // تغییر موزیک و پخش
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    const playAudio = async () => {
      try {
        audio.src = currentSong.audioUrl;
        audio.currentTime = 0;
        if (isPlaying) {
          await audio.play();
        }
      } catch (err) {
        console.error("خطا در پخش موزیک:", err);
      }
    };

    playAudio();
  }, [currentSong]);

  // کنترل Play / Pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (isPlaying) {
      audio.play().catch((err) => console.error("خطا در اجرای play:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  if (!currentSong) {
    return (
      <div className="player">
        <p className="player-empty">{t("player.nothingPlaying")}</p>
      </div>
    );
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="player">
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={onNext} />

      <div className="player-info">
        <img
          src={currentSong.image}
          alt={currentSong.title}
          className="player-image"
        />
        <div>
          <p className="player-song-title">{currentSong.title}</p>
          <p className="player-song-artist">{currentSong.artist}</p>
        </div>
      </div>

      <div className="player-controls">
        <button className="btn-icon" onClick={onPrevious}>
          ⏮
        </button>
        <button className="btn-icon play-btn" onClick={onPlayPause}>
          {isPlaying ? t("common.pause") : t("common.play")}
        </button>
        <button className="btn-icon" onClick={onNext}>
          ⏭
        </button>
      </div>

      <div className="progress-container">
        <input
          type="range"
          min="0"
          max="100"
          value={progressPercent || 0}
          onChange={handleSeek}
          className="progress-slider"
        />
      </div>
    </div>
  );
}

export default Player;
