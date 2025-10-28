import React from "react";
import CircularGallery from "@/components/CircularGallery";
import { motion } from "framer-motion";

// RoboRash and LuxLinea gallery items (temporary images for testing)
const roboRashItems = [
  { image: "/maps/roborash1.jpg", text: "Ramp Zone" },
  { image: "/maps/roborash2.jpg", text: "Curve Section" },
  { image: "/maps/roborash3.jpg", text: "Tunnel Area" },
  { image: "/maps/roborash4.jpg", text: "Checkpoint" },
  { image: "/maps/roborash5.jpg", text: "Bridge" },
  { image: "/maps/roborash6.jpg", text: "Final Sprint" },
  { image: "/maps/roborash7.jpg", text: "Pit Stop" },
  { image: "/maps/roborash8.jpg", text: "Incline Test" },
  { image: "/maps/roborash9.jpg", text: "Sharp Turn" },
  { image: "/maps/roborash10.jpg", text: "Finish Zone" }
];

const luxLineaItems = [
  { image: "/maps/lux1.jpg", text: "Initial Curve" },
  { image: "/maps/lux2.jpg", text: "Parallel Path" },
  { image: "/maps/lux3.jpg", text: "Cross Section" },
  { image: "/maps/lux4.jpg", text: "Loop Turn" },
  { image: "/maps/lux5.jpg", text: "Double Bend" },
  { image: "/maps/lux6.jpg", text: "Speed Zone" },
  { image: "/maps/lux7.jpg", text: "Precision Area" },
  { image: "/maps/lux8.jpg", text: "End Trail" },
  { image: "/maps/lux9.jpg", text: "Final Curve" },
  { image: "/maps/lux10.jpg", text: "Finish Line" }
];

export default function MapReveal() {
  return (
    <section
      className="min-h-screen py-20 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white font-poppins"
      style={{
        // fallback in case tailwind config is missing
        fontFamily:
          "'Poppins', 'Figtree', 'Inter', 'Segoe UI', 'Arial', sans-serif"
      }}
    >
      <div className="container mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight"
          style={{
            letterSpacing: "-0.03em"
          }}
        >
          MAP REVEAL
        </motion.h1>

        {/* RoboRash Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-32"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8"
              style={{
                color: "#C4FF47",
                letterSpacing: "-0.01em"
              }}
          >
            RoboRash — Obstacle Challenge
          </h2>
          <div
            style={{
              height: "600px",
              position: "relative",
              maxWidth: 900,
              margin: "0 auto"
            }}
            className="flex items-center justify-center"
          >
            <CircularGallery
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.02}
              items={roboRashItems}
            />
          </div>
        </motion.div>

        {/* LuxLinea Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8"
              style={{
                color: "#47D1FF",
                letterSpacing: "-0.01em"
              }}
          >
            LuxLinea — Path Precision
          </h2>
          <div
            style={{
              height: "600px",
              position: "relative",
              maxWidth: 900,
              margin: "0 auto"
            }}
            className="flex items-center justify-center"
          >
            <CircularGallery
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.02}
              items={luxLineaItems}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}