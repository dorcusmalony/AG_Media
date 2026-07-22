/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { MediaContent } from '../types';
import { MEDIA_CONTENT_DATA } from '../data';
import { Play, Pause, Headphones, Video, BookOpen, Clock, Calendar, ArrowRight, ArrowLeft, Volume2, RotateCcw, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MediaView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Audio Player states
  const [activePodcast, setActivePodcast] = useState<MediaContent | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Photo Essay states
  const [activePhotoEssay, setActivePhotoEssay] = useState<MediaContent | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Video Teaser states
  const [activeVideo, setActiveVideo] = useState<MediaContent | null>(null);

  // YouTube Podcast states
  const [activeYoutubePodcast, setActiveYoutubePodcast] = useState<MediaContent | null>(null);

  const categories = ['All', 'video', 'podcast', 'photo-essay'];

  const filteredMedia = MEDIA_CONTENT_DATA.filter((item) => {
    return selectedCategory === 'All' || item.type === selectedCategory;
  });

  // Handle Audio Player synchronization
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activePodcast]);

  const handlePodcastPlay = (podcast: MediaContent) => {
    setActiveYoutubePodcast(null); // Stop YouTube video if audio starts
    if (activePodcast?.id === podcast.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActivePodcast(podcast);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

  const handleWatchYoutube = (podcast: MediaContent) => {
    setIsPlaying(false); // Mute audio broadcast
    setActiveVideo(null); // Close cinema trailer
    setActiveYoutubePodcast(podcast);
    setTimeout(() => {
      document.getElementById('youtube-player-canvas')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 2520); // 42 mins fallback
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekValue = parseFloat(e.target.value);
    setCurrentTime(seekValue);
    if (audioRef.current) {
      audioRef.current.currentTime = seekValue;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="media-content-container">
      {/* Hidden Audio Element */}
      {activePodcast?.audioUrl && (
        <audio
          ref={audioRef}
          src={activePodcast.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Main Section Banner */}
      <div className="border-b border-sand-200 pb-6 space-y-3">
        <p className="text-clay-500 text-xs font-sans tracking-widest uppercase font-bold">Aesthetic & Auditory Evidence</p>
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal-900">
          Media & Cultural Documentation
        </h1>
        <p className="text-sm text-charcoal-900/80 max-w-2xl leading-relaxed">
          Explore our fully realized sensory assets. Listen to scholarly podcasts regarding customary law, watch cinematic documentary teasers, or examine structured monochrome photo essays.
        </p>
      </div>

      {/* Categories Filtering block */}
      <div className="flex border-b border-sand-200 pb-1 space-x-1 overflow-x-auto mt-8 font-sans">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-bold tracking-wider uppercase border-b-2 transition-all duration-200 cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'border-clay-500 text-clay-500'
                : 'border-transparent text-charcoal-900/60 hover:text-clay-500'
            }`}
          >
            {cat === 'video' ? 'Cinematic Trailers' : cat === 'podcast' ? 'Radio & Podcasts' : cat === 'photo-essay' ? 'Photo Essays' : 'All Media'}
          </button>
        ))}
      </div>

      {/* Multi-Media Registry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {filteredMedia.map((item) => {
          const isCurrentAudio = activePodcast?.id === item.id;
          return (
            <div
              key={item.id}
              className="bg-white border border-sand-200 overflow-hidden flex flex-col justify-between shadow-2xs group"
              id={`media-card-${item.id}`}
            >
              <div className="space-y-4">
                {/* Visual Cover frame */}
                <div className="h-48 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                  {/* Category Pill Icon overlay */}
                  <span className="absolute top-3 left-3 bg-charcoal-900 text-sand-50 text-[8px] uppercase tracking-widest font-bold px-2 py-1 flex items-center space-x-1.5">
                    {item.type === 'video' && <Video className="w-3 h-3 text-clay-500" />}
                    {item.type === 'podcast' && <Headphones className="w-3 h-3 text-clay-500" />}
                    {item.type === 'photo-essay' && <BookOpen className="w-3 h-3 text-emerald-400" />}
                    <span>{item.type}</span>
                  </span>

                  {/* Play Hover triggers */}
                  {item.type === 'podcast' && (
                    <button
                      onClick={() => handlePodcastPlay(item)}
                      className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                      aria-label="Toggle podcast player"
                    >
                      <div className="w-12 h-12 bg-sand-50 text-clay-500 flex items-center justify-center shadow-lg rounded-none hover:scale-105 transition-transform">
                        {isCurrentAudio && isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
                      </div>
                    </button>
                  )}
                </div>

                {/* Narrative Details */}
                <div className="px-6 space-y-2">
                  <div className="flex items-center space-x-2 text-[9px] text-charcoal-900/60 font-sans uppercase font-bold tracking-wider">
                    <span className="text-clay-500">{item.category}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.durationOrPages}</span>
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-charcoal-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal-900/80 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Trigger in foot */}
              <div className="p-6 pt-4 border-t border-sand-200/50">
                {item.type === 'podcast' && (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handlePodcastPlay(item)}
                      className="w-full bg-charcoal-900 hover:bg-clay-500 text-white py-2.5 text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      {isCurrentAudio && isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Mute Broadcast</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Stream Broadcast</span>
                        </>
                      )}
                    </button>

                    {item.youtubeUrl && (
                      <button
                        onClick={() => handleWatchYoutube(item)}
                        className="w-full bg-white border border-sand-200 hover:bg-sand-50 text-clay-500 py-2.5 text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-2xs"
                      >
                        <Youtube className="w-4 h-4 text-red-600" />
                        <span>Watch Video Version</span>
                      </button>
                    )}
                  </div>
                )}

                {item.type === 'video' && (
                  <button
                    onClick={() => {
                      setActiveVideo(item);
                      // Scroll slightly to let the video embed show
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="w-full bg-clay-500 hover:bg-clay-600 text-white py-2.5 text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Launch Cinematic Player</span>
                  </button>
                )}

                {item.type === 'photo-essay' && (
                  <button
                    onClick={() => {
                      setActivePhotoEssay(item);
                      setPhotoIndex(0);
                    }}
                    className="w-full bg-white border border-sand-200 hover:bg-sand-50 text-charcoal-900 py-2.5 text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-clay-500" />
                    <span>Examine Photo Plates</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* =================== INTEGRATED AUDIO PLAYER CONTROL BAR =================== */}
      <AnimatePresence>
        {activePodcast && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-charcoal-900 border-t-2 border-clay-500 text-sand-50 py-4 px-6 shadow-2xl font-sans"
            id="integrated-audio-player"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Left Column: Title metadata */}
              <div className="flex items-center space-x-4 w-full md:w-1/3">
                <div className="w-12 h-12 overflow-hidden bg-charcoal-800 border border-charcoal-800">
                  <img src={activePodcast.coverImage} alt="Cover" className="w-full h-full object-cover grayscale" />
                </div>
                <div className="truncate">
                  <p className="text-[9px] uppercase tracking-wider font-bold text-clay-500">CIVIC RADIO BROADCST</p>
                  <p className="text-xs font-semibold text-white truncate">{activePodcast.title}</p>
                  <p className="text-[10px] text-sand-100/60 truncate">{activePodcast.category}</p>
                </div>
              </div>

              {/* Middle Column: Controls & seekbar */}
              <div className="flex flex-col items-center gap-2 w-full md:w-1/2">
                <div className="flex items-center space-x-4">
                  {/* Seek backwards button */}
                  <button
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
                      }
                    }}
                    className="p-1 hover:text-clay-500 transition-colors text-sand-100/75 cursor-pointer"
                    title="Rewind 10 seconds"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  {/* Play/Pause toggle */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 bg-clay-500 hover:bg-clay-600 text-white flex items-center justify-center rounded-none shadow-md transition-transform active:scale-95 cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>
                  <div className="w-4"></div>
                </div>

                {/* Progress bar container */}
                <div className="flex items-center space-x-3 w-full text-[10px]">
                  <span>{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 accent-clay-500 bg-charcoal-800 h-1 rounded-none appearance-none cursor-pointer"
                  />
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Right Column: Speaker volume level and Dismiss button */}
              <div className="hidden md:flex items-center justify-end space-x-6 w-full md:w-1/6">
                <div className="flex items-center space-x-2 text-sand-100">
                  <Volume2 className="w-4 h-4" />
                  <span className="text-[10px]">Loudspeaker Active</span>
                </div>
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setActivePodcast(null);
                  }}
                  className="text-xs uppercase tracking-wider font-bold text-sand-100/40 hover:text-white transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =================== INTEGRATED VIDEO COMPONENT PLAYER =================== */}
      {activeVideo && (
        <div className="mt-12 bg-white border border-sand-200 p-6 shadow-md space-y-4" id="video-player-canvas">
          <div className="flex justify-between items-center border-b border-sand-200 pb-3">
            <div>
              <p className="text-[9px] text-clay-500 font-sans font-bold uppercase tracking-widest">Cinema Broadcast</p>
              <h2 className="font-serif text-lg font-bold text-charcoal-900">{activeVideo.title}</h2>
            </div>
            <button
              onClick={() => setActiveVideo(null)}
              className="text-xs font-sans font-bold text-charcoal-900/60 hover:text-clay-500 uppercase tracking-wider cursor-pointer"
            >
              Close Cinema Panel
            </button>
          </div>
          
          <div className="relative bg-black h-96 max-w-4xl mx-auto flex items-center justify-center overflow-hidden border border-charcoal-800">
            <video
              src={activeVideo.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-xs text-charcoal-900/70 italic text-center font-sans">
            "The River of Return" teaser. Streamed under public access licensing from the AG Media Archive.
          </p>
        </div>
      )}

      {/* =================== INTEGRATED YOUTUBE VIDEO INTERVIEW PLAYER =================== */}
      {activeYoutubePodcast && (
        <div className="mt-12 bg-white border border-sand-200 p-6 shadow-md space-y-4" id="youtube-player-canvas">
          <div className="flex justify-between items-center border-b border-sand-200 pb-3">
            <div>
              <p className="text-[9px] text-clay-500 font-sans font-bold uppercase tracking-widest">Video Interview Embed</p>
              <h2 className="font-serif text-lg font-bold text-charcoal-900">{activeYoutubePodcast.title}</h2>
            </div>
            <button
              onClick={() => setActiveYoutubePodcast(null)}
              className="text-xs font-sans font-bold text-charcoal-900/60 hover:text-clay-500 uppercase tracking-wider cursor-pointer"
            >
              Close Interview Panel
            </button>
          </div>
          
          <div className="relative bg-black w-full max-w-4xl mx-auto border border-charcoal-800 aspect-video">
            <iframe
              src={`${activeYoutubePodcast.youtubeUrl}?autoplay=1`}
              title={activeYoutubePodcast.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full absolute inset-0"
              id={`youtube-iframe-${activeYoutubePodcast.id}`}
            ></iframe>
          </div>
          <p className="text-xs text-charcoal-900/70 italic text-center font-sans">
            Streamed and embedded from official AG Media YouTube archives.
          </p>
        </div>
      )}

      {/* =================== PHOTO ESSAY MODAL OVERLAY =================== */}
      <AnimatePresence>
        {activePhotoEssay && activePhotoEssay.photos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal-900/95 flex items-center justify-center p-4 overflow-y-auto"
            id="photo-essay-modal"
          >
            <div className="bg-charcoal-900 max-w-5xl w-full border border-charcoal-800 flex flex-col justify-between h-[85vh] shadow-2xl">
              {/* Header */}
              <div className="p-5 border-b border-charcoal-800 flex justify-between items-center text-white">
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-bold text-emerald-400">MONOCHROME DOCUMENTARY FLIGHT</span>
                  <h3 className="font-serif text-base font-bold">{activePhotoEssay.title}</h3>
                </div>
                <button
                  onClick={() => setActivePhotoEssay(null)}
                  className="text-xs uppercase tracking-wider font-bold text-sand-100/50 hover:text-white transition-colors cursor-pointer"
                >
                  Exit Flight
                </button>
              </div>

              {/* Photo Frame Container */}
              <div className="flex-1 flex items-center justify-center p-6 relative bg-black/50">
                {/* Image */}
                <div className="relative max-h-[50vh] w-full max-w-3xl flex items-center justify-center overflow-hidden border border-charcoal-800">
                  <img
                    src={activePhotoEssay.photos[photoIndex].url}
                    alt={`Plate ${photoIndex + 1}`}
                    referrerPolicy="no-referrer"
                    className="max-h-[50vh] object-contain grayscale"
                  />
                  
                  {/* Plate indicator */}
                  <span className="absolute top-4 left-4 bg-black/80 text-white text-[10px] font-sans font-semibold px-2.5 py-1">
                    PLATE {photoIndex + 1} OF {activePhotoEssay.photos.length}
                  </span>
                </div>

                {/* Left/Right Buttons */}
                <button
                  onClick={() => setPhotoIndex(Math.max(0, photoIndex - 1))}
                  disabled={photoIndex === 0}
                  className="absolute left-6 w-10 h-10 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-20 transition-all cursor-pointer"
                  aria-label="Previous plate"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPhotoIndex(Math.min(activePhotoEssay.photos!.length - 1, photoIndex + 1))}
                  disabled={photoIndex === activePhotoEssay.photos.length - 1}
                  className="absolute right-6 w-10 h-10 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-20 transition-all cursor-pointer"
                  aria-label="Next plate"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Caption description block */}
              <div className="p-6 bg-charcoal-950 border-t border-charcoal-800 text-sand-50 space-y-2">
                <p className="font-serif text-sm leading-relaxed text-sand-100 max-w-3xl text-justify">
                  {activePhotoEssay.photos[photoIndex].caption}
                </p>
                <div className="pt-2 flex justify-between items-center text-[10px] font-sans text-sand-100/40">
                  <span>AG Media Cultural Registry Division</span>
                  <span>AS 4825-2023 Digital Conservation Compliant</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
