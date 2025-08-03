import { useCallback, useEffect } from 'react';
import { createCharacterSpans } from '../utils';

export const useCRTEffects = () => {
  const applyCurvatureToInput = useCallback((inputElement: HTMLInputElement) => {
    const text = inputElement.value;
    const wrapper = inputElement.parentElement;
    if (!wrapper) return;
    
    let textDisplay = wrapper.querySelector('.input-text-display') as HTMLElement;
    
    if (!text) {
      if (textDisplay) {
        textDisplay.remove();
      }
      inputElement.style.color = '';
      return;
    }
    
    if (!textDisplay) {
      textDisplay = document.createElement('div');
      textDisplay.className = 'input-text-display absolute inset-0 pointer-events-none text-green-400 font-mono';
      textDisplay.style.left = inputElement.offsetLeft + 'px';
      textDisplay.style.top = inputElement.offsetTop + 'px';
      textDisplay.style.height = inputElement.offsetHeight + 'px';
      textDisplay.style.lineHeight = inputElement.offsetHeight + 'px';
      wrapper.appendChild(textDisplay);
    }
    
    textDisplay.innerHTML = text;
    const spans = createCharacterSpans(textDisplay);
    
    spans.forEach((span, index) => {
      if (span.textContent === ' ') {
        span.style.whiteSpace = 'pre';
        span.style.width = '0.5em';
      }
      
      const totalChars = spans.length;
      const charPosition = index / (totalChars - 1 || 1);
      const distanceFromCenter = Math.abs(charPosition - 0.5) * 2;
      const scale = 1 - (distanceFromCenter * 0.2);
      
      span.style.transform = `scaleX(${Math.max(scale, 0.2)})`;
      span.style.transformOrigin = 'center';
      span.style.transition = 'transform 0.1s ease-out';
      span.style.color = 'inherit';
    });
    
    inputElement.style.color = 'transparent';
  }, []);

  const applyCRTCurvature = useCallback(() => {
    const terminalRef = document.querySelector('.crt-curvature') as HTMLDivElement;
    if (!terminalRef) return;
    
    const terminal = terminalRef;
    const lines = terminal.querySelectorAll('div:not(.crt-processed)');
    
    lines.forEach((line: Element) => {
      const htmlLine = line as HTMLElement;
      
      const inputElement = htmlLine.querySelector('input');
      if (inputElement) {
        htmlLine.classList.add('crt-processed');
        applyCurvatureToInput(inputElement);
        return;
      }
      
      if (htmlLine.querySelector('span.text-green-400.ml-2')) {
        htmlLine.classList.add('crt-processed');
        return;
      }
      
      if (!htmlLine.textContent || htmlLine.textContent.trim() === '') {
        htmlLine.classList.add('crt-processed');
        return;
      }
      
      const text = htmlLine.textContent;
      
      htmlLine.innerHTML = '';
      htmlLine.classList.add('crt-processed');
      
      htmlLine.textContent = text;
      const spans = createCharacterSpans(htmlLine);
      
      spans.forEach((span, index) => {
        if (span.textContent === ' ') {
          span.style.whiteSpace = 'pre';
          span.style.width = '0.5em';
        }
        
        const totalChars = spans.length;
        const charPosition = index / (totalChars - 1 || 1);
        const distanceFromCenter = Math.abs(charPosition - 0.5) * 2;
        const scale = 1 - (distanceFromCenter * 0.2);
        
        span.style.transform = `scaleX(${Math.max(scale, 0.2)})`;
        span.style.transformOrigin = 'center';
        span.style.transition = 'transform 0.1s ease-out';
        span.style.color = 'inherit';
      });
    });
  }, [applyCurvatureToInput]);

  useEffect(() => {
    const handleResize = () => {
      applyCRTCurvature();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [applyCRTCurvature]);

  return {
    applyCurvatureToInput,
    applyCRTCurvature
  };
};