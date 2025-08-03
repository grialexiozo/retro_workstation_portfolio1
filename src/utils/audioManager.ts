/**
 * Audio management utilities
 */

/**
 * Plays an audio file with error handling
 * @param audioPath - Path to the audio file
 * @param volume - Volume level (0-1)
 */
export const playAudio = (audioPath: string, volume: number = 0.5): void => {
  try {
    const audio = new Audio(audioPath);
    audio.volume = volume;
    audio.play().catch(error => {
      console.warn('Audio playback failed:', error);
    });
  } catch (error) {
    console.warn('Audio creation failed:', error);
  }
};

/**
 * Plays a random sound from an array of sound files
 * @param soundFiles - Array of audio file paths
 * @param volume - Volume level (0-1)
 */
export const playRandomSound = (soundFiles: string[], volume: number = 0.5): void => {
  if (soundFiles.length === 0) return;
  
  const randomIndex = Math.floor(Math.random() * soundFiles.length);
  const selectedSound = soundFiles[randomIndex];
  playAudio(selectedSound, volume);
};

/**
 * Creates and manages an audio element with ref
 * @param audioRef - React ref to store the audio element
 * @param audioPath - Path to the audio file
 */
export const createAudioElement = (
  audioRef: React.MutableRefObject<HTMLAudioElement | null>,
  audioPath: string
): void => {
  if (!audioRef.current) {
    audioRef.current = new Audio(audioPath);
  }
};

/**
 * Plays audio using a ref-managed audio element
 * @param audioRef - React ref containing the audio element
 * @param volume - Volume level (0-1)
 */
export const playAudioFromRef = (
  audioRef: React.MutableRefObject<HTMLAudioElement | null>,
  volume: number = 0.5
): void => {
  if (audioRef.current) {
    audioRef.current.volume = volume;
    audioRef.current.play().catch(error => {
      console.warn('Audio playback failed:', error);
    });
  }
};