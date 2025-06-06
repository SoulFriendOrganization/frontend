import { useState, useRef, useEffect } from "react";
import { textToSpeechService } from "../services";

function TestPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const audioDataRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
  
  // Function to clean up previous audio playback resources
  const cleanupAudio = () => {
    if (sourceRef.current) {
      try {
        sourceRef.current.stop();
        sourceRef.current.disconnect();
        sourceRef.current = null;
      } catch (err) {
        console.log("Error stopping previous audio source:", err);
      }
    }
    
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
        audioContextRef.current = null;
      } catch (err) {
        console.log("Error closing previous audio context:", err);
      }
    }
  };
    const playAudio = async (arrayBuffer) => {
    try {
      if (!arrayBuffer) {
        console.error("No audio data to play");
        setIsLoading(false);
        return;
      }
      
      // Clean up any previous audio playback
      cleanupAudio();
      
      // Create AudioContext after user interaction
      audioContextRef.current = new AudioContext();
      
      // Resume AudioContext in case it was suspended
      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }
      
      setIsPlaying(true);
      
      audioContextRef.current.decodeAudioData(arrayBuffer, (buffer) => {
        sourceRef.current = audioContextRef.current.createBufferSource();
        sourceRef.current.buffer = buffer;
        sourceRef.current.connect(audioContextRef.current.destination);
        sourceRef.current.start(0);
        
        sourceRef.current.onended = () => {
          setIsPlaying(false);
          cleanupAudio();
        };
      }, (error) => {
        console.error("Error decoding audio data:", error);
        setIsPlaying(false);
        setAutoplayFailed(true);
        cleanupAudio();
      });
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
      setAutoplayFailed(true);
      cleanupAudio();
    }
  };
  
  const handlePlayButtonClick = async () => {
    if (isPlaying) {
      // If already playing, stop the current playback
      setIsPlaying(false);
      cleanupAudio();
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Clear previous audio data to force new fetch
      audioDataRef.current = null;

      audioDataRef.current = await textToSpeechService("mana makan siang gratisnya wok.");
      await playAudio(audioDataRef.current);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to play speech:", error);
      setIsLoading(false);
    }
  };
  
  // Attempt autoplay when component mounts
  useEffect(() => {
    const autoplayAudio = async () => {
      try {
        console.log("Attempting autoplay...");
        setIsLoading(true);
        
        // Create an audio context first to check if it's allowed
        const tempContext = new AudioContext();
        
        // If the audio context is suspended, autoplay might be blocked
        if (tempContext.state === "suspended") {
          await tempContext.resume();
        }
        
        // Fetch the audio data
        const audioData = await textToSpeechService("Selamat datang di aplikasi kami.");
        audioDataRef.current = audioData;
        
        // Try to play the audio
        await playAudio(audioData);
        setIsLoading(false);
      } catch (error) {
        console.error("Autoplay failed:", error);
        setAutoplayFailed(true);
        setIsLoading(false);
      }
    };
    
    // Attempt autoplay
    autoplayAudio();
    
    // Clean up on unmount
    return () => {
      cleanupAudio();
    };
  }, []);    return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Text-to-Speech Test Page</h1>
      <p className="mb-4">Halaman ini menguji kemampuan text-to-speech.</p>
      
      {autoplayFailed && (
        <div className="p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded mb-4">
          <p>Autoplay diblokir oleh browser. Silakan klik tombol di bawah untuk menjalankan audio.</p>
        </div>
      )}
      
      <div className="mt-4">
        <button 
          onClick={handlePlayButtonClick}
          disabled={isLoading}
          className={`px-4 py-2 text-white rounded ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} disabled:bg-gray-300 disabled:cursor-not-allowed`}
        >
          {isLoading ? "Memuat..." : isPlaying ? "Berhenti" : "Putar Audio"}
        </button>
        
        <div className="mt-3">
          <p className="text-sm text-gray-700">
            Status: {isPlaying ? "Memutar audio..." : isLoading ? "Memuat audio..." : "Audio tidak diputar"}
          </p>
          
          {isPlaying && (
            <div className="mt-2 flex items-center">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestPage;