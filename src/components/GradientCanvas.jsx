import { useEffect } from "react";

export default function GradientCanvas() {
  useEffect(() => {
    // Dynamically import gradient AFTER canvas is on screen
    import("../gradient.js").then(() => {
      const gradient = new window.Gradient();
      gradient.initGradient("#gradient-canvas");
    });
  }, []);

  return (
    <canvas
      id="gradient-canvas"
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{
        "--gradient-color-1": "#0f0826",
        "--gradient-color-2": "#2a0a4a",
        "--gradient-color-3": "#3d1a77",
        "--gradient-color-4": "#1f4e79",
      }}
    ></canvas>
  );
}
