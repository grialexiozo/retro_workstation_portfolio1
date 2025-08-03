/**
 * DOM helper utilities for terminal functionality
 */

/**
 * Scrolls the terminal container to the bottom
 * @param terminalElement - The terminal container element
 */
export const scrollToBottom = (terminalElement: HTMLDivElement): void => {
  terminalElement.scrollTop = terminalElement.scrollHeight;
};

/**
 * Scrolls to top of the terminal container
 * @param terminalElement - The terminal container element
 */
export const scrollToTop = (terminalElement: HTMLDivElement): void => {
  terminalElement.scrollTop = 0;
};

/**
 * Checks if content overflows the terminal container
 * @param terminalElement - The terminal container element
 * @returns true if content overflows
 */
export const isContentOverflowing = (terminalElement: HTMLDivElement): boolean => {
  return terminalElement.scrollHeight > terminalElement.clientHeight;
};

/**
 * Scrolls to the beginning of the last command
 * @param terminalElement - The terminal container element
 */
export const scrollToLastCommand = (terminalElement: HTMLDivElement): void => {
  setTimeout(() => {
    const commandElements = terminalElement.querySelectorAll('.text-green-300');
    if (commandElements.length > 0) {
      const lastCommand = commandElements[commandElements.length - 1] as HTMLElement;
      terminalElement.scrollTop = lastCommand.offsetTop;
    }
  }, 10);
};

/**
 * Smart scroll that goes to the top of the new output if it's long, otherwise to the bottom.
 * @param terminalElement - The terminal container element
 * @param newLinesCount - Number of new lines added in the last command
 * @param isNewCommand - Whether this is a new command execution
 */
export const smartScroll = (terminalElement: HTMLDivElement, newLinesCount: number, isNewCommand: boolean = false): void => {
  if (isNewCommand && newLinesCount > 15 && isContentOverflowing(terminalElement)) {
    const allLines = terminalElement.querySelectorAll('div');
    const startOfNewOutput = allLines[allLines.length - newLinesCount] as HTMLElement;
    if (startOfNewOutput) {
      terminalElement.scrollTop = startOfNewOutput.offsetTop;
    }
  } else {
    scrollToBottom(terminalElement);
  }
};

/**
 * Focuses the terminal input element
 * @param inputElement - The input element
 */
export const focusInput = (inputElement: HTMLInputElement): void => {
  inputElement.focus();
};

/**
 * Scrolls to bottom and focuses input in sequence
 * @param terminalElement - The terminal container element
 * @param inputElement - The input element
 */
export const scrollToBottomAndFocus = (
  terminalElement: HTMLDivElement,
  inputElement: HTMLInputElement
): void => {
  scrollToBottom(terminalElement);
  setTimeout(() => {
    focusInput(inputElement);
  }, 0);
};