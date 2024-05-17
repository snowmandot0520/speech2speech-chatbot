import React, { useState, useEffect } from "react";

const TextToSpeech = ({ text, lang }) => {
  useEffect(() => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang || "en-US";
    synth.speak(utterance);

    return () => {
      synth.cancel();
    };
  }, [text]);

  return <></>;
};

export default TextToSpeech;
