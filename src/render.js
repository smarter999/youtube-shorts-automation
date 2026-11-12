import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const inputFile = "output/short.json";
const outputDir = "output";
const outputFile = path.join(outputDir, "short.mp4");
const subtitleFile = path.join(outputDir, "captions.srt");

if (!fs.existsSync(inputFile)) {
  console.error("Script file not found. Run the generator first.");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));

if (!data.script || !data.title) {
  console.error("Script or title is missing.");
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

function makeChunks(text, maxLength = 42) {
  const words = text.split(/\s+/);
  const chunks = [];
  let line = "";

  for (const word of words) {
    if ((line + " " + word).trim().length > maxLength) {
      if (line) chunks.push(line);
      line = word;
    } else {
      line = (line + " " + word).trim();
    }
  }

  if (line) chunks.push(line);
  return chunks;
}

function timestamp(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const millis = Math.floor((seconds % 1) * 1000);

  return (
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(secs).padStart(2, "0") + "," +
    String(millis).padStart(3, "0")
  );
}

const chunks = makeChunks(data.script);
const duration = 30;
const chunkDuration = duration / chunks.length;

const subtitles = chunks.map((chunk, index) => {
  const start = index * chunkDuration;
  const end = (index + 1) * chunkDuration;

  return `${index + 1}\n${timestamp(start)} --> ${timestamp(end)}\n${chunk}\n`;
});

fs.writeFileSync(subtitleFile, subtitles.join("\n"), "utf8");

const result = spawnSync(
  "ffmpeg",
  [
    "-y",
    "-f", "lavfi",
    "-i", "color=c=0x101827:s=1080x1920:r=30:d=30",
    "-vf",
    "subtitles=output/captions.srt:force_style='FontName=DejaVu Sans,FontSize=18,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=1,Outline=2,Alignment=2,MarginV=250'",
    "-c:v", "libx264",
    "-preset", "ultrafast",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    outputFile
  ],
  { stdio: "inherit" }
);

if (result.error) {
  console.error("Could not start FFmpeg:", result.error.message);
  process.exit(1);
}

if (result.status !== 0) {
  console.error("Video rendering failed.");
  process.exit(result.status || 1);
}

console.log("Vertical Shorts video created:", outputFile);
