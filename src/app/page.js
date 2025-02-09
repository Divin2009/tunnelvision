'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from 'next/navigation';
import NavNav from '@/components/ui/navnav';

const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  // Generate quantum particle effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add new particle
      const newParticle = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 4,
        speedY: (Math.random() - 0.5) * 4,
      };

      setParticles(prev => [...prev, newParticle]);

      // Limit particles for performance
      if (particles.length > 50) {
        setParticles(prev => prev.slice(1));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [particles]);

  // Animate particles
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        size: particle.size * 0.98 // Slowly fade out
      })).filter(particle => particle.size > 0.1));
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [particles]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black overflow-hidden relative">
      {/* Quantum particle effect */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-400 opacity-50 pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Navigation */}
      <NavNav />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 animate-pulse p-4">Explore Quantum Tunneling</h1>
          <p className="mt-6 text-xl text-purple-200 max-w-2xl mx-auto">Dive into the fascinating world of quantum mechanics, where reality defies classical physics and possibilities become infinite.</p>
          <div className="mt-10 flex justify-center gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => redirect('/learn')}>Start Learning</Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => redirect('/experiments')}>View Experiments</Button>
          </div>
        </div>
      </div>

      {/* Featured Topics */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-black/50 backdrop-blur-md border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-300">Quantum Entanglement</CardTitle>
              <CardDescription className="text-purple-200/70">
                Explore the phenomenon Einstein called "spooky action at a distance"
              </CardDescription>
            </CardHeader>
            <CardContent className="text-purple-100">
              Learn about particles that remain connected regardless of distance.
            </CardContent>
          </Card>
          <Card className="bg-black/50 backdrop-blur-md border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-300">Wave-Particle Duality</CardTitle>
              <CardDescription className="text-purple-200/70">
                Understand how particles can exhibit wave-like behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="text-purple-100">
              Discover the double-slit experiment and its implications.
            </CardContent>
          </Card>
          <Card className="bg-black/50 backdrop-blur-md border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-300">Quantum Superposition</CardTitle>
              <CardDescription className="text-purple-200/70">
                Dive into multiple states existing simultaneously
              </CardDescription>
            </CardHeader>
            <CardContent className="text-purple-100">
              Uses Schrödinger's quantum equations to provide precise calculations that mimic quantum tunneling as it occurs in nature.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;