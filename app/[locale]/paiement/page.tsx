"use client";

import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react';

export default function Page() {
  const t = useTranslations();
  const phrase1 = t('phrase1');
  const phrase2 = t('phrase2');
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [loopCount, setLoopCount] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(phrase1);

  useEffect(() => {
    const handleTextChange = () => {
      if (isDeleting) {
        if (charIndex > 0) {
          setCharIndex(charIndex - 1);
          setCurrentText(currentPhrase.substring(0, charIndex - 1));
        } else {
          setIsDeleting(false);
          setLoopCount(loopCount + 1);
          if (loopCount % 2 === 0) {
            setCurrentPhrase(currentPhrase === phrase1 ? phrase2 : phrase1);
          }
        }
      } else {
        if (charIndex < currentPhrase.length) {
          setCharIndex(charIndex + 1);
          setCurrentText(currentPhrase.substring(0, charIndex + 1));
        } else {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1000);
        }
      }
    };

    const interval = setInterval(handleTextChange, 100);

    return () => clearInterval(interval);
  }, [charIndex, isDeleting, currentPhrase, loopCount]);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-white"
      style={{ background: "linear-gradient(to right, #87c0cd, #508c9b, #113f67)" }}
    >
      <div className="text-center p-8 rounded-lg bg-opacity-75 bg-gray-800 shadow-lg">
        <p className="text-2xl font-semibold tracking-wider">
          {t('heading')}
        </p>
        <p
          className="text-5xl font-bold mt-6 tracking-wide text-yellow-300
          animate-pulse transition duration-150 ease-in-out"
        >
          {currentText}
        </p>
      </div>
    </div>
  );
}
