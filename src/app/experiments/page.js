'use client'
import React from 'react';
import { motion } from 'framer-motion';
import NavNav from "@/components/ui/navnav";
import { Card } from "@/components/ui/card";
import { 
  Cpu, 
  Smartphone, 
  LineChart, 
  Settings, 
  Lightbulb,
  Radio,
  CircuitBoard,
  Gauge
} from "lucide-react";

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black overflow-hidden relative">
      <NavNav />

      {/* Hero Section */}
      <motion.div 
        className="h-screen flex flex-col items-center justify-center relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center z-10">
          <h1 className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 mb-6 p-4">
            Quantum Lab
          </h1>
          <p className="text-xl md:text-2xl text-purple-300 max-w-2xl mx-auto px-4">
            Exploring quantum tunneling through real-world experiments
          </p>
        </div>
      </motion.div>

      {/* Hardware Setup Section */}
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
              Experimental Setup
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Hardware Description */}
              <div>
                <Card className="bg-black/40 border-purple-500/30 p-6">
                  <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                    <CircuitBoard className="h-6 w-6" />
                    Hardware Components
                  </h3>
                  <ul className="space-y-4 text-purple-200">
                    <li className="flex items-start gap-2">
                      <Cpu className="h-5 w-5 mt-1 flex-shrink-0 text-purple-400" />
                      <span>Arduino Uno: The brain of our setup, processing sensor data and controlling outputs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lightbulb className="h-5 w-5 mt-1 flex-shrink-0 text-purple-400" />
                      <span>LDR Sensor: Measures ambient light levels, simulating particle detection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Radio className="h-5 w-5 mt-1 flex-shrink-0 text-purple-400" />
                      <span>HC05 Bluetooth Module: Enables wireless communication with the mobile app</span>
                    </li>
                  </ul>
                </Card>
              </div>

              {/* Connection Diagram */}
              <div>
                <Card className="bg-black/40 border-purple-500/30 p-6 h-full">
                  <h3 className="text-2xl font-bold text-purple-300 mb-4">Circuit Configuration</h3>
                  <p className="text-purple-200 mb-4">
                    The components are connected on a breadboard with:
                  </p>
                  <ul className="text-purple-200 space-y-2">
                    <li>• LDR sensor connected to analog pin A0</li>
                    <li>• LED indicator on digital pin 13</li>
                    <li>• HC05 module on pins 0 (RX) and 1 (TX)</li>
                    <li>• 10kΩ resistor as voltage divider for LDR</li>
                  </ul>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Software Integration Section */}
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
              Software Integration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-black/40 border-purple-500/30 p-6 hover:scale-105 transition-transform duration-300">
                <Smartphone className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-purple-300 mb-2">Mobile Control</h3>
                <p className="text-purple-200">
                  MIT App Inventor application allows real-time control of experimental parameters:
                </p>
                <ul className="text-purple-200 mt-2 space-y-1">
                  <li>• Threshold adjustment</li>
                  <li>• Probability settings</li>
                  <li>• Real-time data viewing</li>
                </ul>
              </Card>

              <Card className="bg-black/40 border-purple-500/30 p-6 hover:scale-105 transition-transform duration-300">
                <LineChart className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-purple-300 mb-2">Data Analysis</h3>
                <p className="text-purple-200">
                  Streamlit web application provides comprehensive data visualization:
                </p>
                <ul className="text-purple-200 mt-2 space-y-1">
                  <li>• Interactive graphs</li>
                  <li>• Statistical analysis</li>
                  <li>• Historical data tracking</li>
                </ul>
              </Card>

              <Card className="bg-black/40 border-purple-500/30 p-6 hover:scale-105 transition-transform duration-300">
                <Settings className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-purple-300 mb-2">System Integration</h3>
                <p className="text-purple-200">
                  Complete end-to-end system features:
                </p>
                <ul className="text-purple-200 mt-2 space-y-1">
                  <li>• Bluetooth connectivity</li>
                  <li>• Real-time data transfer</li>
                </ul>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Data Flow Section */}
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
              Experimental Process
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-black/40 border-purple-500/30 p-6">
                <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                  <Gauge className="h-6 w-6" />
                  Data Collection
                </h3>
                <ol className="space-y-4 text-purple-200">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-purple-400">1.</span>
                    <span>LDR sensor continuously monitors ambient light levels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-purple-400">2.</span>
                    <span>Arduino processes readings based on user-defined threshold and probability values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-purple-400">3.</span>
                    <span>Data is transmitted via Bluetooth to the mobile app</span>
                  </li>
                </ol>
              </Card>

              <Card className="bg-black/40 border-purple-500/30 p-6">
                <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                  <LineChart className="h-6 w-6" />
                  Data Analysis
                </h3>
                <ol className="space-y-4 text-purple-200">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-purple-400">1.</span>
                    <span>Attach data to Streamlit application</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-purple-400">2.</span>
                    <span>Streamlit processes and visualizes the data in real-time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-purple-400">3.</span>
                    <span>Users can analyze trends and patterns through interactive visualizations</span>
                  </li>
                </ol>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}