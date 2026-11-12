import fs from "node:fs";
import path from "node:path";

const niches = [
  {
    name: "Islamic Stories",
    title: "A Powerful Lesson About Patience",
    script: "Sometimes life tests our patience. But remember, every difficulty carries a lesson. Never lose hope, keep doing good, and trust that every hardship will pass. A patient heart finds strength even in difficult times."
  },
  {
    name: "Motivation",
    title: "Never Give Up on Your Dreams",
    script: "Your dreams will not become reality by waiting. Start today, even if your steps are small. Every successful person once started as a beginner. Keep learning, keep working, and never give up."
  },
  {
    name: "Horror",
    title: "The Knock at 3 AM",
    script: "At exactly 3 AM, Ali heard three knocks on his bedroom door. He checked the hallway, but nobody was there. Then his phone lit up with a message from his own number. It said: Do not open the door."
  },
  {
    name: "Amazing Facts",
    title: "An Amazing Fact About Space",
    script: "Space is unbelievably huge. Light from the Sun takes about eight minutes to reach Earth. That means when you look at the Sun, you are seeing it as it was eight minutes ago. The universe is full of surprises."
  },
  {
    name: "Unsolved Mysteries",
    title: "The Mysterious Disappearance",
    script: "Some mysteries still have no clear answers. People have disappeared under strange circumstances, leaving behind unanswered questions. Investigators search for clues, but sometimes the truth remains unknown."
  },
  {
    name: "AI Technology",
    title: "How AI Is Changing Our World",
    script: "Artificial intelligence is changing how we work, learn, and create. AI can help write text, recognize images, and answer questions. But human judgment still matters. The future depends on how wisely we use this technology."
  },
  {
    name: "Money and Business",
    title: "A Simple Money Lesson",
    script: "Want to improve your finances? Start by tracking where your money goes. Save a small amount regularly, avoid unnecessary debt, and learn useful skills. Small habits can make a big difference over time."
  }
];

const index = Math.floor(Date.now() / 86400000) % niches.length;
const selected = niches[index];

const outputDir = "output";
fs.mkdirSync(outputDir, { recursive: true });

const data = {
  niche: selected.name,
  title: selected.title,
  script: selected.script,
  description: `${selected.title}\n\n#Shorts #YouTubeShorts`,
  generatedAt: new Date().toISOString()
};

fs.writeFileSync(
  path.join(outputDir, "short.json"),
  JSON.stringify(data, null, 2)
);

fs.writeFileSync(
  path.join(outputDir, "script.txt"),
  `${selected.title}\n\n${selected.script}`
);

console.log("Short script generated successfully!");
console.log("Niche:", selected.name);
console.log("Title:", selected.title);
