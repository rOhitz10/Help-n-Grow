import React, { useState, useEffect } from 'react';

const Typewriter = () => {
  const words = ["Hello, World!", "Welcome to my website!", "Enjoy your stay!"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  
  const typingSpeed = 150; // Speed for typing (ms)
  const deletingSpeed = 75; // Speed for deleting (ms)
  const pauseDuration = 1000; // Pause duration after typing before deleting (ms)

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      // Remove characters
      setCurrentText(currentWord.substring(0, charIndex - 1));
      setCharIndex(charIndex - 1);

      // If finished deleting, move to the next word
      if (charIndex === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setCharIndex(0);
      }
    } else {
      // Add characters
      setCurrentText(currentWord.substring(0, charIndex + 1));
      setCharIndex(charIndex + 1);

      // If finished typing, wait before starting to delete
      if (charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        // Set timeout for deleting
        setTimeout(() => {}, deletingSpeed);
      } else {
        // Set timeout for typing
        setTimeout(() => {}, typingSpeed);
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentWordIndex]);

  return (
    <div className="flex justify-center items-center">
      <h1 id="typewriter" className="text-4xl font-bold">
        {currentText}
      </h1>
    </div>
  );
};

export default Typewriter;
