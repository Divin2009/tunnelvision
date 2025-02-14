'use client'
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NavNav from "@/components/ui/navnav";
import { Card } from "@/components/ui/card";
import { ArrowDown, Atom, Brain, Sparkles, Zap, Waves, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redirect } from 'next/navigation';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function LearnPage() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseParticles, setMouseParticles] = useState([]);
  const { scrollYProgress } = useScroll();
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Mouse particle effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (Math.random() > 0.8) {
        const newParticle = {
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
        };
        setMouseParticles(prev => [...prev.slice(-20), newParticle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate mouse particles
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setMouseParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        size: particle.size * 0.99
      })).filter(particle => particle.size > 0.1));
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [mouseParticles]);

  // Quantum tunneling simulation states and effects
  const [particles, setParticles] = useState([]);
  const [isRunning, setIsRunning] = useState(true);
  const TUNNEL_PROBABILITY = 0.1;
  const PARTICLE_SPEED = 2;
  const BARRIER_X = 200;
  const MAX_PARTICLES = 5;

  const createParticle = () => ({
    id: Math.random(),
    x: 50,
    y: 150 + Math.random() * 100,
    direction: 1,
    hasTunneled: false,
    isReflected: false
  });

  // Quantum tunneling animation loop
  useEffect(() => {
    if (!isRunning) return;

    const animationFrame = requestAnimationFrame(() => {
      setParticles(currentParticles => {
        return currentParticles.map(particle => {
          if (particle.x >= BARRIER_X && !particle.hasTunneled && !particle.isReflected) {
            if (Math.random() < TUNNEL_PROBABILITY) {
              return {
                ...particle,
                x: BARRIER_X + 10,
                hasTunneled: true
              };
            } else {
              return {
                ...particle,
                direction: -1,
                isReflected: true
              };
            }
          }

          let newX = particle.x + (PARTICLE_SPEED * particle.direction);

          if (newX < 0 || newX > 400) {
            return null;
          }

          return {
            ...particle,
            x: newX
          };
        }).filter(Boolean);
      });
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [isRunning, particles]);

  // Add new quantum particles periodically
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setParticles(current => {
        if (current.length < MAX_PARTICLES) {
          return [...current, createParticle()];
        }
        return current;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black overflow-hidden relative" ref={containerRef}>
      {/* Mouse Particle Effect */}
      {mouseParticles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-purple-400 opacity-30 pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <NavNav />

      {/* Hero Section */}
      <motion.div 
        className="h-screen flex flex-col items-center justify-center relative"
        style={{ y: parallaxY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 mb-6 p-4">Quantum Tunneling</h1>
          <p className="text-xl md:text-2xl text-purple-300 max-w-2xl mx-auto px-4">Where the impossible becomes possible</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-12"
          >
            <ArrowDown className="h-8 w-8 text-purple-400" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 pb-20">
        {/* Introduction Section */}
        <section className="relative z-10 py-20 bg-black/40">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-purple-300 text-center mb-12">
              Key Quantum Concepts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <Card className="relative bg-black/60 border-purple-500/30 p-8 backdrop-blur-sm overflow-hidden">
                  <div className="flex items-center space-x-4 mb-6">
                    <Shield className="h-12 w-12 text-purple-400" />
                    <h3 className="text-3xl font-bold text-purple-300">Quantum Tunneling</h3>
                  </div>
                  <p className="text-purple-200 text-lg leading-relaxed">
                    A quantum phenomenon where particles penetrate through potential barriers that 
                    they classically couldn't overcome. This occurs because quantum objects behave 
                    as waves, allowing them to "tunnel" through barriers with a certain probability, 
                    even when they lack the energy to pass over them.
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <Card className="relative bg-black/60 border-purple-500/30 p-8 backdrop-blur-sm overflow-hidden">
                  <div className="flex items-center space-x-4 mb-6">
                    <Waves className="h-12 w-12 text-purple-400" />
                    <h3 className="text-3xl font-bold text-purple-300">Quantum Noise</h3>
                  </div>
                  <p className="text-purple-200 text-lg leading-relaxed">
                    Random fluctuations in measurements at the quantum level, arising from the 
                    fundamental uncertainty in quantum systems. This inherent "noise" is not due 
                    to imperfect measurements but is a fundamental feature of quantum mechanics, 
                    affecting everything from particle positions to energy levels.
                  </p>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="min-h-screen flex items-center py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-4xl md:text-6xl font-bold text-purple-300 mb-6">
                  Breaking Classical Boundaries
                </h2>
                <p className="text-xl text-purple-200 leading-relaxed">
                  Imagine a ball that can pass through a solid wall. In our everyday world, 
                  this seems impossible. Yet, in the quantum realm, particles do exactly this 
                  through a phenomenon called quantum tunneling.
                </p>
              </div>
              <div className="relative">
                <Card className="bg-black/40 border-purple-500/30 p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center space-x-4 mb-4">
                    <Brain className="h-8 w-8 text-purple-400" />
                    <h3 className="text-2xl font-bold text-purple-300">Did You Know?</h3>
                  </div>
                  <p className="text-purple-200">
                    Quantum tunneling is responsible for nuclear fusion in stars, making it 
                    fundamental to the existence of life itself.
                  </p>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Interactive Visualization */}
        <section className="min-h-screen bg-black/30 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-purple-300 text-center mb-12">
                The Tunneling Effect
              </h2>
              
              {/* Quantum Tunneling Simulation */}
              <div className="relative h-64 bg-gradient-to-r from-purple-900/20 via-purple-900/40 to-purple-900/20 rounded-xl overflow-hidden">
                {/* Barrier */}
                <div 
                  className="absolute h-full w-16 bg-purple-600/50 backdrop-blur-sm"
                  style={{ left: BARRIER_X }}
                />

                {/* Particles */}
                {particles.map(particle => (
                  <motion.div
                    key={particle.id}
                    className={`absolute w-4 h-4 rounded-full shadow-lg ${
                      particle.hasTunneled ? 'bg-green-400 shadow-green-400/50' : 
                      particle.isReflected ? 'bg-red-400 shadow-red-400/50' : 'bg-blue-400 shadow-blue-400/50'
                    }`}
                    style={{
                      left: particle.x,
                      top: particle.y,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                ))}
                {/* Quantum effect overlay */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent to-purple-900/20" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <Card className="bg-black/40 border-purple-500/30 p-6 hover:scale-105 transition-transform duration-300">
                  <Atom className="h-8 w-8 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold text-purple-300 mb-2">Wave Function</h3>
                  <p className="text-purple-200">
                    Particles exist as waves of probability, allowing them to "leak" through barriers.
                  </p>
                </Card>
                <Card className="bg-black/40 border-purple-500/30 p-6 hover:scale-105 transition-transform duration-300">
                  <Sparkles className="h-8 w-8 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold text-purple-300 mb-2">Uncertainty</h3>
                  <p className="text-purple-200">
                    Heisenberg's uncertainty principle enables momentary energy "borrowing".
                  </p>
                </Card>
                <Card className="bg-black/40 border-purple-500/30 p-6 hover:scale-105 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold text-purple-300 mb-2">Probability</h3>
                  <p className="text-purple-200">
                    The thicker the barrier, the lower the chance of tunneling success.
                  </p>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Applications Section */}
        <section className="min-h-screen py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-purple-300 text-center mb-12">
                Real-World Impact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Scanning Tunneling Microscope",
                    description: "Images individual atoms by measuring electron tunneling",
                    detail: "This revolutionary microscope earned its inventors the 1986 Nobel Prize."
                  },
                  {
                    title: "Nuclear Fusion",
                    description: "Powers stars through quantum tunneling",
                    detail: "Without tunneling, our Sun couldn't generate energy."
                  },
                  {
                    title: "Quantum Computing",
                    description: "Enables quantum bits and gates",
                    detail: "Future computers may rely on tunneling for processing."
                  },
                  {
                    title: "Flash Memory",
                    description: "Stores data using electron tunneling",
                    detail: "Your smartphone likely uses this technology."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="bg-black/40 border-purple-500/30 p-6 h-full hover:bg-purple-900/20 transition-colors duration-300">
                      <h3 className="text-2xl font-bold text-purple-300 mb-2">{item.title}</h3>
                      <p className="text-purple-200 mb-4">{item.description}</p>
                      <p className="text-purple-400 text-sm">{item.detail}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}