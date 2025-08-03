/**
 * Text effects utilities for terminal animations
 */

/**
 * Creates individual character spans for text disappearing effects
 * @param element - The DOM element containing text
 * @returns Array of character span elements
 */
export const createCharacterSpans = (element: Element): HTMLSpanElement[] => {
  const charElements: HTMLSpanElement[] = [];
  
  if (element.textContent && element.textContent.trim() !== '') {
    const text = element.textContent;
    element.innerHTML = '';
    
    for (let i = 0; i < text.length; i++) {
      const charSpan = document.createElement('span');
      charSpan.textContent = text[i];
      charSpan.style.display = 'inline-block';
      charSpan.style.transition = 'opacity 0.1s ease-out';
      charSpan.style.opacity = '1';
      element.appendChild(charSpan);
      charElements.push(charSpan);
    }
  }
  
  return charElements;
};

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param array - Array to shuffle
 * @returns Shuffled array
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Creates pairs from an array for batch processing
 * @param array - Array to create pairs from
 * @returns Array of pairs
 */
export const createPairs = <T>(array: T[]): T[][] => {
  const pairs: T[][] = [];
  for (let i = 0; i < array.length; i += 2) {
    pairs.push(array.slice(i, i + 2));
  }
  return pairs;
};

/**
 * Applies disappearing effect to character elements
 * @param charElements - Array of character span elements
 * @param maxDelay - Maximum delay for disappearing effect (ms)
 */
export const applyDisappearingEffect = (
  charElements: HTMLSpanElement[],
  maxDelay: number = 2000
): void => {
  const shuffled = shuffleArray(charElements);
  const pairs = createPairs(shuffled);
  
  pairs.forEach(pair => {
    const delay = Math.random() * maxDelay;
    setTimeout(() => {
      pair.forEach(char => {
        if (char) char.style.opacity = '0';
      });
    }, delay);
  });
};

/**
 * Restores opacity to character elements
 * @param charElements - Array of character span elements
 */
export const restoreCharacterOpacity = (charElements: HTMLElement[]): void => {
  charElements.forEach(char => {
    if (char) char.style.opacity = '1';
  });
};