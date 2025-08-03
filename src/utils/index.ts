/**
 * Utility functions index
 * Provides centralized exports for all utility modules
 */

// DOM Helper utilities
export {
  scrollToBottom,
  focusInput,
  scrollToBottomAndFocus
} from './domHelpers';

// Audio management utilities
export {
  playAudio,
  playRandomSound,
  createAudioElement,
  playAudioFromRef
} from './audioManager';

// Text effects utilities
export {
  createCharacterSpans,
  shuffleArray,
  createPairs,
  applyDisappearingEffect,
  restoreCharacterOpacity
} from './textEffects';