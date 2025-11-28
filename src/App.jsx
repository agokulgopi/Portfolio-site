import React, { useState, useEffect } from 'react';
import { Play, X, Github, Linkedin, Instagram, Mail, ChevronRight, ChevronLeft, ExternalLink, MapPin, Code, Film, Layers, Image as ImageIcon } from 'lucide-react';

// --- Components ---

const GlitchText = ({ text }) => {
  return (
    <div className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-400 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 ease-in-out">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 ease-in-out">
        {text}
      </span>
    </div>
  );
};

const SectionTitle = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-8">
    {Icon && <Icon className="w-6 h-6 text-cyan-400" />}
    <h2 className="text-3xl font-bold uppercase tracking-widest text-white border-l-4 border-cyan-500 pl-4">
      {children}
    </h2>
  </div>
);

const ProjectCard = ({ title, role, description, tags, imageColor, icon: Icon, onClick }) => (
  <div 
    onClick={onClick}
    // Added 'cursor-default' if onClick is undefined, otherwise cursor-pointer
    className={`group relative bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
  >
    {/* Image Placeholder */}
    <div className={`h-48 w-full ${imageColor} relative flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
      <Icon className="w-16 h-16 text-white/80 transform group-hover:scale-110 transition-transform duration-500" />
      
      {/* Overlay Button - Only show interactive element if onClick exists */}
      {onClick && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-cyan-500/90 text-black px-4 py-2 rounded font-bold uppercase tracking-wider text-sm flex items-center gap-2">
            View Details <ExternalLink size={16} />
          </div>
        </div>
      )}
    </div>

    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{title}</h3>
      <p className="text-xs font-mono text-zinc-400 mb-4 uppercase tracking-wider">{role}</p>
      <p className="text-zinc-300 text-sm leading-relaxed mb-6 flex-1">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, i) => (
          <span key={i} className="text-xs font-medium px-2 py-1 bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ExperienceItem = ({ role, company, location, period, details }) => (
  <div className="relative pl-8 pb-12 last:pb-0 border-l border-zinc-700">
    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
    
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
      <h3 className="text-xl font-bold text-white">{role}</h3>
      <span className="text-xs font-mono text-cyan-400 border border-cyan-500/30 px-2 py-1 rounded bg-cyan-950/30 mt-1 sm:mt-0 w-fit">
        {period}
      </span>
    </div>
    
    <div className="flex items-center gap-2 text-sm text-zinc-400 mb-4 font-mono">
      <span className="text-white font-semibold">{company}</span>
      <span>•</span>
      <span className="flex items-center gap-1"><MapPin size={12} /> {location}</span>
    </div>
    
    <ul className="space-y-2">
      {details.map((item, i) => (
        <li key={i} className="text-zinc-300 text-sm leading-relaxed pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-cyan-500/50">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const SocialLink = ({ href, icon: Icon, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center gap-3 text-zinc-400 hover:text-cyan-400 transition-colors group p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-zinc-700"
  >
    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
    <span className="text-sm font-medium">{label}</span>
    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
  </a>
);

// Gallery Image Card Component
const GalleryImageCard = ({ title, url, tags, className }) => (
  <div className={`group relative w-full h-full rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-[1.005] hover:shadow-cyan-500/40 ${className}`}>
    <img 
      src={url} 
      alt={title} 
      className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-80"
      style={{ minHeight: '300px' }} 
    />
    
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-100 p-8 flex flex-col justify-end">
      <h4 className="text-white text-3xl font-bold mb-2">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i} className="text-xs font-mono px-3 py-1 bg-cyan-600/80 text-black rounded-full shadow-lg">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// Gallery image data (images should be placed in the public/gallery/ folder)
const galleryImages = [
  { id: 1, title: "Forever ShortFlim (Upcoming)", url: "/gallery/Forever.png", tags: ["Lighting", "Romance"] },
  { id: 2, title: "Beach Sunset", url: "/gallery/Beach.png", tags: ["Environment", "Golden Hour"] },
  { id: 3, title: "Foliages on Rocks", url: "/gallery/Beach1.png", tags: ["Environment", "Foliage"] },
  { id: 4, title: "Truck Lit", url: "/gallery/Truck%20Lit.png", tags: ["Lighting", "Photogrammetry"] },
  { id: 5, title: "Church", url: "/gallery/post%201.png", tags: ["Night", "Eerie"] },
  { id: 6, title: "Japanese Mansion", url: "/gallery/Master3.png", tags: ["Environment", "Fog", "Anime"] },
];

// --- Main App ---

export default function Portfolio() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  // Mouse position state for parallax
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // Gallery state
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (event) => {
      // Normalize coordinates to a range of -1 to 1 based on viewport center
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setMouseX(x);
      setMouseY(y);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Gallery navigation functions
  const totalImages = galleryImages.length;
  const nextImage = () => {
    setDirection('right');
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };
  const prevImage = () => {
    setDirection('left');
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  // Gallery auto-advance (5 seconds)
  useEffect(() => {
    if (totalImages === 0) return;
    const interval = setInterval(() => {
      setDirection('right');
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalImages]);

  const projects = [
    {
      title: "Lokha - Cinematic Sequence",
      role: "Cinematic Artist",
      description: "A full cinematic sequence for the movie Lokha. Focused on camera movements, lighting, scene composition, and atmosphere to deliver a polished visual storytelling experience.",
      tags: ["Unreal Engine 5.5", "Cinematics", "Sequencer", "Lighting"],
      imageColor: "bg-gradient-to-br from-amber-900 to-black",
      icon: Film,
      category: "Cinematics",
      // Updated to use externalUrl for opening in a new tab
      externalUrl: "https://www.youtube.com/watch?v=b-3QMMyarEA" 
    },
    {
      title: "The Curse of Pharaoh",
      role: "Level Designer",
      description: "A horror-themed exploration level featuring hidden quest items and an eerie atmosphere. Implemented interaction logic and player movement systems.",
      tags: ["UE5", "Blueprints", "Level Design", "Horror"],
      imageColor: "bg-gradient-to-br from-purple-900 to-black",
      icon: Layers,
      category: "Game Dev",
      // ADDED user's requested link to be opened in a new tab
      externalUrl: "https://youtu.be/tHE8w98t0bY?si=DzApRVAQeQc4308A",
    },
    {
      title: "Anime Virtual Production",
      role: "Environment Artist",
      description: "Stylized cinematic sequence using virtual production tools. Simulated a green screen setup for real-time compositing with distinct anime-style visuals.",
      tags: ["Virtual Production", "Stylized Rendering", "Green Screen"],
      imageColor: "bg-gradient-to-br from-blue-900 to-black",
      icon: Code,
      category: "Virtual Prod",
      //externalUrl: "https://youtu.be/tHE8w98t0bY?si=DzApRVAQeQc4308A",
      // No externalUrl for this one, so clicking the card will do nothing
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  // The embeddable URL for the main Showreel modal
  const SHOWREEL_EMBED_URL = "https://www.youtube.com/embed/y6ea4uXV7ow?autoplay=1";

  // Parallax styles computed from mouseX/mouseY
  const titleParallaxStyle = {
    transform: `translate3d(${mouseX * 40}px, ${mouseY * 40}px, 0) rotateX(${mouseY * 6}deg) rotateY(${-mouseX * 6}deg)`,
    transition: 'transform 60ms linear',
    transformStyle: 'preserve-3d',
  };

  const backgroundParallaxStyle = {
    transform: `translate3d(${-mouseX * 120}px, ${-mouseY * 120}px, 0)`,
    transition: 'transform 80ms linear',
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800 py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter uppercase flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-600 rounded flex items-center justify-center text-black font-black">G</div>
            <span className="hidden sm:inline">Gokul Gopi</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium tracking-wide">
            <a href="#work" className="hover:text-cyan-400 transition-colors">WORK</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">EXPERIENCE</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">ABOUT</a>
            <a href="#contact" className="px-4 py-2 bg-white text-black rounded hover:bg-cyan-400 transition-colors font-bold">CONTACT</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Overlay simulating atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-zinc-800/20 via-black to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-0"></div>

        {/* Floating Background Element (parallax) */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-50 pointer-events-none"
          style={backgroundParallaxStyle}
        ></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <p className="text-cyan-400 font-mono tracking-[0.3em] mb-4 animate-pulse">UNREAL ENGINE ARTIST</p>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight" style={titleParallaxStyle}>
            <GlitchText text="INFINITE" /> <br />
            <span className="text-stroke-thin text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-600">
              PARADISO
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed">
            Crafting atmospheric environments, cinematic sequences, and interactive stories. 
            Blurring the line between imagination and real-time rendering.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="group relative px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-black font-bold rounded overflow-hidden transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Play className="fill-current w-5 h-5" />
              <span>WATCH SHOWREEL</span>
            </button>
            <a 
              href="#work"
              className="px-8 py-4 border border-zinc-700 hover:border-white text-white rounded font-medium transition-colors w-full sm:w-auto hover:bg-white/5"
            >
              VIEW PORTFOLIO
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500">Scroll</span>
          <div className="w-px h-12 bg-linear-to-b from-cyan-500 to-transparent"></div>
        </div>
      </header>

      {/* Stats/Skills Banner */}
      <div className="border-y border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Engine", val: "Unreal 5.5" },
              { label: "Language", val: "C++ / Blueprints" },
              { label: "Tools", val: "Blender / DaVinci" },
              { label: "Focus", val: "Cinematics" }
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-white font-bold text-lg md:text-xl">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <section id="work" className="py-24 bg-black relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionTitle icon={Film}>Selected Works</SectionTitle>
            
            {/* Filter */}
            <div className="flex gap-2 mb-8 md:mb-0">
              {['All', 'Cinematics', 'Game Dev', 'Virtual Prod'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-xs font-bold uppercase rounded transition-all ${
                    activeFilter === filter 
                      ? 'bg-white text-black' 
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={index}
                {...project}
                // Update onClick to open externalUrl in a new tab if it exists
                onClick={
                  project.externalUrl 
                    ? () => window.open(project.externalUrl, '_blank') 
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section id="gallery" className="py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="container mx-auto px-6">
          <SectionTitle icon={ImageIcon}>Unreal Renders</SectionTitle>
          <p className="text-zinc-400 max-w-3xl mb-12">
            A curated selection of high-fidelity environmental and cinematic renders, showcasing lighting and composition skills in Unreal Engine.
          </p>

          {/* Carousel Container (16:9 Aspect Ratio enforced by aspect-video) */}
          <div className="relative w-full max-w-6xl mx-auto rounded-xl bg-zinc-900 border border-zinc-700 overflow-hidden shadow-2xl aspect-video">
            
            {/* Navigation Left */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-cyan-600/80 text-white rounded-full transition-all duration-300 shadow-xl opacity-80 hover:opacity-100"
              aria-label="Previous Image"
            >
              <ChevronLeft size={30} />
            </button>

            {/* Carousel Content (Single Image) */}
            <div className="w-full h-full flex items-center justify-center">
              {galleryImages[activeIndex] && (
                <GalleryImageCard 
                  key={galleryImages[activeIndex].id + direction} 
                  {...galleryImages[activeIndex]} 
                  className={direction === 'right' ? 'slide-in-right' : 'slide-in-left'}
                />
              )}
            </div>

            {/* Navigation Right */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-cyan-600/80 text-white rounded-full transition-all duration-300 shadow-xl opacity-80 hover:opacity-100"
              aria-label="Next Image"
            >
              <ChevronRight size={30} />
            </button>
            
            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 'right' : 'left'); 
                    setActiveIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-cyan-500 w-5 shadow-cyan-400/50 shadow-md' 
                      : 'bg-zinc-600 hover:bg-zinc-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="container mx-auto px-6">
          <SectionTitle icon={Layers}>Experience</SectionTitle>
          
          <div className="max-w-3xl">
            <ExperienceItem 
              role="Project Manager"
              company="ZETREL"
              location="Thrikkakara, India"
              period="2022 - 2025"
              details={[
                "Led outreach programs across colleges, coordinating with placement officers.",
                "Managed a 15-member creative video team to boost online presence and social media reach."
              ]}
            />
            <ExperienceItem 
              role="Unreal Engine Developer"
              company="ASAP"
              location="Kalamassery, India"
              period="2020 - 2022"
              details={[
                "Designed a detailed ghosted church environment in UE5 focusing on mood and volumetric lighting.",
                "Implemented gameplay mechanics using Blueprints for exploration-based gameplay."
              ]}
            />
            <ExperienceItem 
              role="Unreal Engine Developer"
              company="MALGER ENTERTAINMENTS"
              location="Kakkanad, India"
              period="2018 - 2020"
              details={[
                "Contributed to virtual production using UE5 and real-time rendering.",
                "Designed anime-inspired 3D environments with cinematic cameras.",
                "Handled green screen shoots and chroma key compositing."
              ]}
            />
          </div>
        </div>
      </section>

      {/* About / Contact Section */}
      <section id="about" className="py-24 bg-black relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        
        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16">
          
          {/* About Text */}
          <div>
            <SectionTitle icon={Code}>The Artist</SectionTitle>
            <p className="text-lg text-zinc-300 leading-relaxed mb-6">
              I am an Unreal Engine Cinematic and Environment Designer passionate about building atmospheric worlds and storytelling through real-time visuals.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Blending creativity with technical precision, I transform simple ideas into compelling visual moments. Whether it's a horror-themed exploration level or a stylized anime cinematic, I am dedicated to pushing visual quality and experimenting with new techniques.
            </p>
            
            <div className="flex flex-wrap gap-4">
               <a href="mailto:gokulgopi2106@gmail.com" className="bg-white hover:bg-cyan-400 text-black px-6 py-3 rounded font-bold transition-colors flex items-center gap-2">
                 <Mail size={18} /> Get in Touch
               </a>
               {/* IMPORTANT: Ensure 'Gokul_Gopi_CV_Cinematic.pdf' is in the public folder 
                 of your project for this link to work correctly.
               */}
               {/* <a 
                 href="/Gokul_Gopi_CV_Cinematic.pdf" 
                 download="Gokul_Gopi_CV.pdf"
                 className="border border-zinc-700 text-zinc-300 hover:text-white hover:border-white px-6 py-3 rounded font-bold transition-colors"
               >
                 Download CV
               </a> */}
            </div>
          </div>

          {/* Connect */}
          <div id="contact">
            <h3 className="text-2xl font-bold text-white mb-8">Connect</h3>
            <div className="grid gap-4">
              <SocialLink 
                href="https://www.linkedin.com/in/gokul-gopi-09878b2b2/"
                icon={Linkedin}
                label="LinkedIn Profile"
              />
              <SocialLink 
                href="https://www.instagram.com/infiniteparadiso/?igsh=b3phYnVrYmRjYnl3#"
                icon={Instagram}
                label="Instagram (@infiniteparadiso)"
              />
              <SocialLink 
                href="https://github.com/agokulgopi"
                icon={Github}
                label="GitHub Repositories"
              />
              <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 mt-4">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Contact Info</p>
                <p className="text-white font-mono mb-1">gokulgopi2106@gmail.com</p>
                <p className="text-zinc-500 text-sm mt-2">Ernakulam, Kerala</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-zinc-900 text-center text-zinc-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Gokul Gopi. All Rights Reserved.</p>
        <p className="mt-2 text-xs">Built for Unreal Engine Portfolios</p>
      </footer>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl rounded-lg overflow-hidden border border-zinc-800">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            <iframe 
              width="100%" 
              height="100%" 
              src={SHOWREEL_EMBED_URL} // Hardcoded for the main showreel
              title="Lokha Cinematic"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}

      <style>{`
        .text-stroke-thin {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
        }
        
        /* Gallery slide animations */
        .slide-in-right {
          animation: slideInRight 0.5s ease-out forwards;
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .slide-in-left {
          animation: slideInLeft 0.5s ease-out forwards;
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
