"use client"

import React from "react";
import MicButton from "../voice/MicButton";
import VoiceWave from "../voice/VoiceWave";
import VoiceStatus from "../voice/VoiceStatus";

const  Hero = () => {
  const voiceStatus = "ready";

  const handleMicClick = () => {
    console.log("Mic clicked");
  };

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-16">
      <h2 className="text-center text-4xl font-semibold">
        How can I help you today,
        {/* <br />
        Subhajit? */}
      </h2>

      <MicButton
        status={voiceStatus}
        onClick={handleMicClick}
      />

      <VoiceWave status={voiceStatus} />

      <VoiceStatus status={voiceStatus} />
    </section>
  );
};

export default Hero;