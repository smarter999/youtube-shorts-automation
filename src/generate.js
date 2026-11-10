const fs = require("fs");
const path = require("path");

const videos = [
  {
    niche: "Motivational Stories",
    title: "Haar Mat Mano | Ek Chhoti Si Kahani",
    hook: "Kya ek chhoti si koshish aapki zindagi badal sakti hai?",
    story: "Ek naujawan baar baar nakaam hota raha. Har baar usne apni ghalti se seekha aur dobara koshish ki. Dheere dheere uski mehnat rang lane lagi. Usne samjha ke kamyabi ek din mein nahi milti.",
    lesson: "Yaad rakho, nakaami khatam hone ka naam nahi, seekhne ka mauqa hai.",
    tags: "#Motivation #Success #Shorts"
  },
  {
    niche: "Islamic Stories",
    title: "Sabr Ki Ahmiyat | Islamic Reminder",
    hook: "Mushkil waqt mein sabr kyun zaroori hai?",
    story: "Zindagi mein kabhi aasani hoti hai aur kabhi imtihan. Aise waqt mein insaan ko umeed, dua aur nek amal ka sahara lena chahiye. Sabr ka matlab koshish chhorna nahi, balkay himmat ke saath sahi raaste par rehna hai.",
    lesson: "Allah ki rehmat se mayoos mat ho aur apni koshish jaari rakho.",
    tags: "#IslamicReminder #Sabr #Shorts"
  },
  {
    niche: "Horror Stories",
    title: "Raat Ke 3 Baje | Darawni Kahani",
    hook: "Us raat darwaze par dastak kis ne di thi?",
    story: "Raat ke teen baj rahe thay. Ghar mein sab so rahe thay. Achanak darwaze par teen dastakein hui. Usne poocha, kaun hai? Bahar se koi jawab nahi aaya. Jab usne camera dekha, darwaze ke saamne koi nahi tha.",
    lesson: "Yeh ek fictional horror story hai. Aisi kahaniyan sirf entertainment ke liye hoti hain.",
    tags: "#Horror #ScaryStory #Shorts"
  },
  {
    niche: "Amazing Facts",
    title: "Octopus Ke Teen Dil Hote Hain!",
    hook: "Kya aap jaante hain samundar ke ek janwar ke teen dil hote hain?",
    story: "Octopus ke waqai teen dil hote hain. Do dil khoon ko gills tak bhejte hain aur teesra dil baqi jism tak. Nature ki duniya waqai hairat angez hai.",
    lesson: "Duniya mein abhi bohat kuch aisa hai jo humein seekhna baqi hai.",
    tags: "#AmazingFacts #Octopus #Shorts"
  },
  {
    niche: "Unsolved Mysteries",
    title: "Bermuda Triangle Ka Raaz",
    hook: "Bermuda Triangle ke bare mein itni baatein kyun hoti hain?",
    story: "Atlantic Ocean ka ek ilaqa Bermuda Triangle ke naam se mashhoor hai. Is se judi kai jahazon aur hawai safar ki kahaniyan mashhoor hui hain. Lekin is ilaqe ke bare mein phaili hui kai purani kahaniyon ko sabit karne wala mazboot saboot nahi.",
    lesson: "Har pur-asrar kahani ko sach samajhne se pehle uska saboot zaroor dekho.",
    tags: "#Mystery #BermudaTriangle #Shorts"
  },
  {
    niche: "AI Technology",
    title: "AI Hamari Duniya Kaise Badal Raha Hai?",
    hook: "Kya AI aapke rozmarra ke kaam asaan kar sakta hai?",
    story: "Artificial Intelligence aaj tasveer banane, zaban samajhne aur mushkil maloomat ko arrange karne mein madad karta hai. Lekin AI ki har baat sahi nahi hoti. Is liye zaroori hai ke uske jawab verify kiye jayen.",
    lesson: "AI ko samajh kar istemal karo, aankh band karke bharosa mat karo.",
    tags: "#AI #Technology #Shorts"
  },
  {
    niche: "Money and Business",
    title: "Paise Bachane Ka Aasaan Tareeqa",
    hook: "Aapki chhoti si saving kal ka bara sahara ban sakti hai.",
    story: "Agar aap roz apne kharch ka thora sa hissa bachate hain, to waqt ke saath ek achhi raqam jama ho sakti hai. Pehle zaroori kharch likhein, phir apni haisiyat ke mutabiq saving ka target rakhein.",
    lesson: "Saving ki aadat chhoti shuru hoti hai, lekin faida lamba deti hai.",
    tags: "#MoneyTips #Saving #Shorts"
  }
];

const day = Math.floor(Date.now() / 86400000);
const video = videos[day % videos.length];

const script = [
  video.hook,
  video.story,
  video.lesson,
  "Aisi mazeed videos ke liye channel subscribe karein."
].join("\n\n");

const result = {
  date: new Date().toISOString().slice(0, 10),
  niche: video.niche,
  title: video.title,
  script,
  description: video.title + "\n\n" + video.tags,
  hashtags: video.tags
};

fs.mkdirSync("output", { recursive: true });
fs.writeFileSync(
  path.join("output", "short.json"),
  JSON.stringify(result, null, 2)
);
fs.writeFileSync("output/script.txt", script);

console.log("Short draft generated successfully!");
console.log("Niche:", video.niche);
console.log("Title:", video.title);
