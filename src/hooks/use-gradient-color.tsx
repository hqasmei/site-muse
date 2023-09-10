import { useState } from "react";
import tailwindColors from "tailwindcss/colors";

type TailwindColor = keyof typeof tailwindColors;

const generateRandomColor = () => {
  const colorKeys = Object.keys(tailwindColors) as TailwindColor[];
  console.log("hi");
  const randomColorKey =
    colorKeys[ Math.floor( Math.random() * colorKeys.length ) ];
  
  const colors = tailwindColors[randomColorKey] as any;
  const colorNames = Object.keys(colors);
  const randomColorName =
    colorNames[Math.floor(Math.random() * colorNames.length)];
  return colors[randomColorName];
};

const useRandomGradient = () => {
  const [gradient, setGradient] = useState<string>("test");

  const generateRandomGradient = () => {
    const startColor = generateRandomColor();
    const endColor = generateRandomColor();
    const gradientStyle = `bg-gradient-to-r from-${startColor} to-${endColor}`;

    setGradient(gradientStyle);
  };

  return { gradient, generateRandomGradient };
};

export default useRandomGradient;
