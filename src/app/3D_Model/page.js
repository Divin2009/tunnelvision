'use client'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

const QuantumTunneling3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup with fog for depth
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000824);
    scene.fog = new THREE.FogExp2(0x000824, 0.05);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);

    // Renderer setup with post-processing support
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    mountRef.current.appendChild(renderer.domElement);

    // Label container for DOM elements
    const labelContainer = document.createElement('div');
    labelContainer.style.position = 'absolute';
    labelContainer.style.top = '0';
    labelContainer.style.left = '0';
    labelContainer.style.pointerEvents = 'none';
    mountRef.current.appendChild(labelContainer);

    // Custom camera controls
    const cameraState = {
      isDragging: false,
      previousMousePosition: { x: 0, y: 0 },
      spherical: new THREE.Spherical(5, Math.PI / 3, 0),
      target: new THREE.Vector3(0, 0, 0),
      dampingFactor: 0.05,
      rotationSpeed: 0.005,
      zoomSpeed: 0.1
    };

    const updateCameraPosition = () => {
      const sinPhiRadius = Math.sin(cameraState.spherical.phi) * cameraState.spherical.radius;
      camera.position.x = sinPhiRadius * Math.sin(cameraState.spherical.theta);
      camera.position.y = Math.cos(cameraState.spherical.phi) * cameraState.spherical.radius;
      camera.position.z = sinPhiRadius * Math.cos(cameraState.spherical.theta);
      camera.lookAt(cameraState.target);
    };

    // Mouse event handlers
    const handleMouseDown = (event) => {
      cameraState.isDragging = true;
      cameraState.previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseMove = (event) => {
      if (!cameraState.isDragging) return;
      const deltaMove = {
        x: event.clientX - cameraState.previousMousePosition.x,
        y: event.clientY - cameraState.previousMousePosition.y
      };
      cameraState.spherical.theta -= deltaMove.x * cameraState.rotationSpeed;
      cameraState.spherical.phi = Math.max(
        0.1,
        Math.min(Math.PI - 0.1, cameraState.spherical.phi + deltaMove.y * cameraState.rotationSpeed)
      );
      updateCameraPosition();
      cameraState.previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseUp = () => {
      cameraState.isDragging = false;
    };

    const handleWheel = (event) => {
      cameraState.spherical.radius = Math.max(
        2,
        Math.min(10, cameraState.spherical.radius + event.deltaY * cameraState.zoomSpeed * 0.01)
      );
      updateCameraPosition();
    };

    // Event listeners
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('mouseleave', handleMouseUp);
    renderer.domElement.addEventListener('wheel', handleWheel);

    // Enhanced environment setup
    const createStarField = () => {
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.02,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
      });

      const starVertices = [];
      for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 20;
        starVertices.push(x, y, z);
      }

      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      return new THREE.Points(starGeometry, starMaterial);
    };

    // Add star field
    const starField = createStarField();
    scene.add(starField);

    // Enhanced grid setup
    const gridHelper = new THREE.GridHelper(20, 40, 0x0a1a3f, 0x0a1a3f);
    gridHelper.position.y = -1;
    scene.add(gridHelper);

    // Barrier setup with glow effect
    const barrierGeometry = new THREE.BoxGeometry(0.5, 2, 2);
    const barrierMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a148c,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const barrier = new THREE.Mesh(barrierGeometry, barrierMaterial);

    // Add glow effect to barrier
    const barrierGlow = new THREE.Mesh(
      barrierGeometry.clone().scale(1.1, 1.1, 1.1),
      new THREE.MeshBasicMaterial({
        color: 0x9c27b0,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide
      })
    );
    barrier.add(barrierGlow);
    scene.add(barrier);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x112244, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x9f7aea, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7c3aed, 0.8);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Enhanced particle system
    class Particle {
      constructor() {
        // Main particle
        const geometry = new THREE.SphereGeometry(0.06, 16, 16);
        const material = new THREE.MeshPhongMaterial({ 
          color: 0x60a5fa,
          emissive: 0x60a5fa,
          emissiveIntensity: 0.5
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(-3, Math.random() * 1 - 0.5, Math.random() * 1 - 0.5);

        // Particle glow
        const glowGeometry = geometry.clone();
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: 0x60a5fa,
          transparent: true,
          opacity: 0.2,
          side: THREE.BackSide
        });
        this.glow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.glow.scale.multiplyScalar(2);
        this.mesh.add(this.glow);

        // Trail
        this.trail = [];
        this.trailLength = 20;

        // Tunneling effect properties
        this.tunnelStartTime = null;
        this.originalColor = new THREE.Color(0x60a5fa);
        this.targetColor = new THREE.Color(0x34d399);
        this.label = null;

        this.velocity = new THREE.Vector3(0.05, 0, 0);
        this.hasTunneled = false;
        this.isReflected = false;

        scene.add(this.mesh);
      }

      createLabel(text, color) {
        const label = document.createElement('div');
        label.textContent = text;
        label.style.position = 'absolute';
        label.style.color = color;
        label.style.fontFamily = 'Arial, sans-serif';
        label.style.fontSize = '12px';
        label.style.whiteSpace = 'nowrap';
        label.style.textShadow = '0 0 3px rgba(0,0,0,0.5)';
        label.style.transition = 'opacity 0.5s';
        labelContainer.appendChild(label);
        this.label = { element: label, startTime: Date.now(), yOffset: 0 };
      }

      update() {
        // Update trail
        this.trail.unshift(this.mesh.position.clone());
        if (this.trail.length > this.trailLength) {
          this.trail.pop();
        }

        if (this.mesh.position.x >= -0.25 && !this.hasTunneled && !this.isReflected) {
          if (Math.random() < 0.1) {
            this.hasTunneled = true;
            this.tunnelStartTime = Date.now();
            this.mesh.material.color.setHex(0x00ff00); // Bright green
            this.mesh.material.emissive.setHex(0x00ff00);
            this.glow.material.color.setHex(0x00ff00);
            this.createLabel('Tunneled!', '#00ff00');
          } else {
            this.isReflected = true;
            this.velocity.x *= -1;
            this.mesh.material.color.setHex(0xf87171);
            this.mesh.material.emissive.setHex(0xf87171);
            this.glow.material.color.setHex(0xf87171);
            this.createLabel('Reflected', '#f87171');
          }
        }

        // Update color transition
        if (this.hasTunneled && this.tunnelStartTime) {
          const elapsed = Date.now() - this.tunnelStartTime;
          const progress = Math.min(elapsed / 1000, 1);

          const currentColor = this.originalColor.clone().lerp(this.targetColor, progress);
          this.mesh.material.color.copy(currentColor);
          this.mesh.material.emissive.copy(currentColor);
          this.glow.material.color.copy(currentColor);

          if (progress >= 1) {
            this.tunnelStartTime = null;
          }
        }

        // Update label position
        if (this.label) {
          const vector = this.mesh.position.clone().project(camera);
          const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
          const y = (vector.y * -0.5 + 0.5) * window.innerHeight;

          this.label.element.style.transform = `translate(${x}px, ${y - this.label.yOffset}px)`;
          this.label.yOffset += 0.5;

          // Fade out label after 1 second
          if (Date.now() - this.label.startTime > 1000) {
            this.label.element.style.opacity = 0;
          }
          // Remove label after animation
          if (Date.now() - this.label.startTime > 1500) {
            this.label.element.remove();
            this.label = null;
          }
        }

        this.mesh.position.add(this.velocity);

        // Remove if too far
        if (Math.abs(this.mesh.position.x) > 3) {
          if (this.label) {
            this.label.element.remove();
            this.label = null;
          }
          scene.remove(this.mesh);
          return false;
        }
        return true;
      }
    }

    const particles = [];
    let lastParticleTime = 0;

    // Animation loop
    const animate = (time) => {
        // Add new particles
        if (time - lastParticleTime > 1000 && particles.length < 10) {
          particles.push(new Particle());
          lastParticleTime = time;
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const isAlive = particles[i].update();
          if (!isAlive) {
            if (particles[i].label) {
              particles[i].label.element.remove();
            }
            particles.splice(i, 1);
          }
        }

        // Animate star field
        starField.rotation.y += 0.0001;
        starField.rotation.x += 0.0001;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate(0);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      // Remove all labels
      while (labelContainer.firstChild) {
        labelContainer.removeChild(labelContainer.firstChild);
      }
      mountRef.current?.removeChild(labelContainer);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('mouseleave', handleMouseUp);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      mountRef.current?.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full relative" ref={mountRef}>
      <div className="absolute bottom-10 left-4 text-white text-sm space-y-1 opacity-50">
        <p>Click + Drag: Rotate View</p>
        <p>Scroll: Zoom</p>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => redirect('/')}>Go to Home Page</Button>
      </div>
    </div>
  );
};
export default QuantumTunneling3D;