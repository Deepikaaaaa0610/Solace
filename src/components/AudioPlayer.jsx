import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, ChevronDown } from 'lucide-react';

/**
 * Premium inline audio player that uses the Web Speech API (AI TTS)
 * to recite Urdu/Hindi poetry with a beautiful equalizer visualization.
 */

const SPEED_OPTIONS = [
  { label: '0.5×', value: 0.5 },
  { label: '0.75×', value: 0.75 },
  { label: '1×', value: 1 },
  { label: '1.25×', value: 1.25 },
  { label: '1.5×', value: 1.5 },
];

const BAR_COUNT = 24;

function getPreferredVoice(voices) {
  // Priority: Hindi > Urdu > English (India) > any English
  const priorities = [
    (v) => /hi[-_]IN/i.test(v.lang),
    (v) => /ur/i.test(v.lang),
    (v) => /hi/i.test(v.lang),
    (v) => /en[-_]IN/i.test(v.lang),
    (v) => /en/i.test(v.lang) && v.name.toLowerCase().includes('female'),
    (v) => /en/i.test(v.lang),
  ];

  for (const test of priorities) {
    const match = voices.find(test);
    if (match) return match;
  }

  return voices[0] || null;
}

export default function AudioPlayer({ text, isHindi = false, poetName = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [showVoiceMenu, setShowVoiceMenu] = useState(false);
  const [barHeights, setBarHeights] = useState(Array(BAR_COUNT).fill(8));

  const utteranceRef = useRef(null);
  const animFrameRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const estimatedDurationRef = useRef(0);
  const speedMenuRef = useRef(null);
  const voiceMenuRef = useRef(null);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      if (available.length > 0) {
        setVoices(available);
        setSelectedVoice(getPreferredVoice(available));
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Animate equalizer bars
  const animateBars = useCallback(() => {
    if (!isPlaying || isPaused) return;

    setBarHeights((prev) =>
      prev.map((_, i) => {
        const base = 6;
        const maxH = 28;
        const wave = Math.sin(Date.now() / 200 + i * 0.6) * 0.5 + 0.5;
        const random = Math.random() * 0.4 + 0.6;
        return base + (maxH - base) * wave * random;
      })
    );

    animFrameRef.current = requestAnimationFrame(animateBars);
  }, [isPlaying, isPaused]);

  useEffect(() => {
    if (isPlaying && !isPaused) {
      animFrameRef.current = requestAnimationFrame(animateBars);
    } else {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (!isPlaying) {
        setBarHeights(Array(BAR_COUNT).fill(8));
      }
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, isPaused, animateBars]);

  // Close menus on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target)) {
        setShowSpeedMenu(false);
      }
      if (voiceMenuRef.current && !voiceMenuRef.current.contains(e.target)) {
        setShowVoiceMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Estimate duration for progress (rough: ~80ms per character at 1x speed)
  const estimateDuration = (str, rate) => {
    return (str.length * 80) / rate;
  };

  const startProgressTracking = (duration) => {
    startTimeRef.current = Date.now();
    estimatedDurationRef.current = duration;

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
    }, 50);
  };

  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handlePlay = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      startProgressTracking(estimatedDurationRef.current - (Date.now() - startTimeRef.current));
      return;
    }

    // Stop any ongoing
    window.speechSynthesis.cancel();
    stopProgressTracking();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speed;
    utterance.volume = muted ? 0 : 1;
    utterance.lang = isHindi ? 'hi-IN' : 'en-US';

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      const dur = estimateDuration(text, speed);
      startProgressTracking(dur);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(0);
      stopProgressTracking();
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(0);
      stopProgressTracking();
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    stopProgressTracking();
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    stopProgressTracking();
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    setShowSpeedMenu(false);

    // If currently playing, restart with new speed
    if (isPlaying) {
      window.speechSynthesis.cancel();
      stopProgressTracking();
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(0);

      // Small delay then re-play
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = newSpeed;
        utterance.volume = muted ? 0 : 1;
        utterance.lang = isHindi ? 'hi-IN' : 'en-US';
        if (selectedVoice) utterance.voice = selectedVoice;

        utterance.onstart = () => {
          setIsPlaying(true);
          const dur = estimateDuration(text, newSpeed);
          startProgressTracking(dur);
        };
        utterance.onend = () => {
          setIsPlaying(false);
          setProgress(0);
          stopProgressTracking();
        };
        utterance.onerror = () => {
          setIsPlaying(false);
          setProgress(0);
          stopProgressTracking();
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }, 100);
    }
  };

  const toggleMute = () => {
    setMuted((prev) => !prev);
    // Note: Can't change volume mid-utterance with SpeechSynthesis,
    // but it'll apply on next play
  };

  const handleVoiceChange = (voice) => {
    setSelectedVoice(voice);
    setShowVoiceMenu(false);

    if (isPlaying) {
      handleStop();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      stopProgressTracking();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Group voices for display
  const hindiVoices = voices.filter((v) => /hi|ur/i.test(v.lang));
  const englishVoices = voices.filter((v) => /en/i.test(v.lang));

  return (
    <div className={`audio-player ${isPlaying ? 'playing' : ''} ${isPaused ? 'paused' : ''}`}>
      {/* Equalizer visualization */}
      <div className="audio-player-visualizer">
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="audio-bar"
            style={{
              height: `${h}px`,
              animationDelay: `${i * 30}ms`,
              opacity: isPlaying && !isPaused ? 0.9 : 0.25,
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="audio-player-progress">
        <div
          className="audio-player-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="audio-player-controls">
        <div className="audio-player-left">
          {/* Play / Pause */}
          {isPlaying && !isPaused ? (
            <button
              className="audio-player-btn audio-play-btn"
              onClick={handlePause}
              aria-label="Pause"
              title="Pause"
            >
              <Pause size={18} />
            </button>
          ) : (
            <button
              className="audio-player-btn audio-play-btn"
              onClick={handlePlay}
              aria-label={isPaused ? 'Resume' : 'Play'}
              title={isPaused ? 'Resume' : 'Play AI recitation'}
            >
              <Play size={18} style={{ marginLeft: '2px' }} />
            </button>
          )}

          {/* Stop */}
          {(isPlaying || isPaused) && (
            <button
              className="audio-player-btn"
              onClick={handleStop}
              aria-label="Stop"
              title="Stop"
            >
              <Square size={14} />
            </button>
          )}

          {/* Mute toggle */}
          <button
            className={`audio-player-btn ${muted ? 'active' : ''}`}
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>

        <div className="audio-player-right">
          {/* AI label */}
          <span className="audio-player-ai-badge">AI Voice</span>

          {/* Speed control */}
          <div className="audio-player-menu-wrapper" ref={speedMenuRef}>
            <button
              className="audio-player-btn audio-speed-btn"
              onClick={() => setShowSpeedMenu((prev) => !prev)}
              title="Playback speed"
            >
              {speed}× <ChevronDown size={12} />
            </button>

            {showSpeedMenu && (
              <div className="audio-player-dropdown">
                <div className="audio-player-dropdown-title">Speed</div>
                {SPEED_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={`audio-player-dropdown-item ${speed === opt.value ? 'active' : ''}`}
                    onClick={() => handleSpeedChange(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Voice selector */}
          {voices.length > 1 && (
            <div className="audio-player-menu-wrapper" ref={voiceMenuRef}>
              <button
                className="audio-player-btn audio-voice-btn"
                onClick={() => setShowVoiceMenu((prev) => !prev)}
                title="Select voice"
              >
                {selectedVoice?.name?.split(' ').slice(0, 2).join(' ') || 'Voice'}
                <ChevronDown size={12} />
              </button>

              {showVoiceMenu && (
                <div className="audio-player-dropdown audio-voice-dropdown">
                  <div className="audio-player-dropdown-title">Select Voice</div>

                  {hindiVoices.length > 0 && (
                    <>
                      <div className="audio-player-dropdown-section">Hindi / Urdu</div>
                      {hindiVoices.map((v) => (
                        <button
                          key={v.name}
                          className={`audio-player-dropdown-item ${selectedVoice?.name === v.name ? 'active' : ''}`}
                          onClick={() => handleVoiceChange(v)}
                        >
                          {v.name.split(' ').slice(0, 3).join(' ')}
                        </button>
                      ))}
                    </>
                  )}

                  {englishVoices.length > 0 && (
                    <>
                      <div className="audio-player-dropdown-section">English</div>
                      {englishVoices.slice(0, 6).map((v) => (
                        <button
                          key={v.name}
                          className={`audio-player-dropdown-item ${selectedVoice?.name === v.name ? 'active' : ''}`}
                          onClick={() => handleVoiceChange(v)}
                        >
                          {v.name.split(' ').slice(0, 3).join(' ')}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
