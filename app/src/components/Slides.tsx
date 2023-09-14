import './App.css';

import { useState } from "react"

const slides = [
  "https://raw.githubusercontent.com/CassioML/langchain-flare-pdf-qa-demo/main/images/diagrams/flare_arch1.png",
  "https://raw.githubusercontent.com/CassioML/langchain-flare-pdf-qa-demo/main/images/diagrams/flare_arch_write.png",
  "https://raw.githubusercontent.com/CassioML/langchain-flare-pdf-qa-demo/main/images/diagrams/flare_arch_ask.png",
  "https://raw.githubusercontent.com/CassioML/langchain-flare-pdf-qa-demo/main/images/diagrams/flare_full.png",
];
const titles = [
  "Tech stack",
  "File ingestion",
  "Question-time flow",
  "FLARE at a glance",
]

const Slides = () => {

  const [slide, setSlide] = useState(0);

  return (
    <div>
      <span className="slideTitle">{titles[slide]} ({slide+1}/{slides.length})</span>
      <img
        onClick={ () => setSlide(s => (s+1) % slides.length) }
        className="slideImage"
        src={slides[slide]}
      />
    </div>
  );
}

export default Slides
