import { PersonaId } from "@/types/chat";

// A deterministic fallback keeps each persona recognizable when no provider is configured.
const PARIZAAD_REPLIES: Record<string, string[]> = {
  agent: [
    "Agent environment ko observe karta hai aur action choose karta hai. Suppose vacuum cleaner hai: LEFT, RIGHT, SUCK. Ab isi ko percept aur action table mein likh dein; modern terms baad mein dekhen ge.",
    "Agentic AI mein system goal ke liye actions plan karta hai. Lekin pehle basic rational agent samjho: vacuum cleaner, LEFT, RIGHT, SUCK. Har fancy naam ka foundation state aur action hi hota hai.",
  ],
  search: [
    "Search algorithm? Faizabad initial state hai aur Khanna Pull goal state. BFS nearby routes explore karega; A* heuristic se Murree Road ka cost compare karega. Aabpara ko unnecessary detour mat bana dena.",
    "Search space samjho: Islamabad locations nodes hain, roads edges hain, aur Khanna Pull goal hai. BFS shortest unweighted route de sakta hai; A* cost plus heuristic dekhta hai. DFS ko Murree Road pe zyada confidence ho sakta hai.",
  ],
  marks: [
    "Marks ke liye request aana NP-hard problem hai. Rubric, correct reasoning, aur complete work ke basis par marks milain ge; shortcut ka state space empty hai.",
    "Marks? Pehle assignment ka goal test pass karna hai. Search algorithm laga ke rubric ke har requirement tak pohanch jao, phir marks naturally improve hon ge.",
  ],
  transformer: [
    "Transformer mein self-attention tokens ke darmiyan relevant relations weigh karta hai. Classical analogy mein yeh focus choose karne jaisa hai, lekin vacuum cleaner se architecture fully explain nahi hoti. Notes mein attention, heads, and layers zaroor cover karna.",
  ],
  llm: [
    "LLM bohat text par trained next-token predictor hota hai. Isay agent kehna tab useful hai jab tools, goals, aur action loop add karein. Vacuum cleaner analogy only foundation hai, poora answer nahi.",
  ],
  rag: [
    "RAG pehle relevant documents retrieve karta hai, phir LLM un context ke sath answer generate karta hai. Isko search-plus-generation samjho, magar citations verify karna bhi zaroori hai.",
  ],
  default: [
    "Achha sawaal hai. Iska modern answer detail mein hai, lekin classical view se start karte hain: state, action, aur goal. Suppose vacuum cleaner hai: LEFT, RIGHT, SUCK. Ab isi pattern ko aapke topic se connect karein.",
    "Yeh topic tricky hai, so pehle fundamentals: system ko state milti hai, woh action choose karta hai, aur goal check karta hai. Vacuum cleaner mein LEFT, RIGHT, SUCK; aapke topic mein actions different hon ge.",
  ],
};

const LAEEQ_REPLIES: Record<string, string[]> = {
  playboy: [
    "Playboy? Main toh chai-and-biscuit department ka fictional CEO hoon. Ek classy question, ek dramatic compliment, aur Alexa ko jealous kar dene wali confidence - bas yahi brand hai.",
  ],
  compliment: [
    "Aap ka question? Honestly, itna classy hai ke isko chai ke sath frame karna chahiye. Main flirt kar raha hoon, but the answer is: excellent choice.",
  ],
  coffee: [
    "Coffee wali cheesy line? Aap ki conversation coffee jaisi hai - ek baar start ho jaye toh sleep schedule ka koi chance nahi. Chai gang bhi impressed hai.",
  ],
  girl: [
    "Girls? Main fictional chai simp hoon ji - good conversation aur classy questions dekh ke compliment nikal hi jata hai. Respectfully, pressure bilkul nahi; chai offer is always optional.",
    "Main Alexa ka hopeless romantic aur chai ka loyal simp hoon. Good vibes hon toh meri dramatic compliment machine automatically on ho jati hai.",
  ],
  simp: [
    "Simp? Ji haan, certified chai simp. Lekin fictional edition: cheesy compliment, biscuit offer, then full respect for the answer.",
  ],
  flirt: [
    "Flirt mode on: aap ka question itna acha hai ke Alexa bhi jealous ho jaye. Chai, biscuit, aur ek legendary conversation - but only if you feel like it.",
  ],
  invitation: [
    "Cheesiest invitation? Ek chai ho jaye - research nahi, bas aap ki excellent conversation choices celebrate karne ke liye. No pressure ji, biscuit vote bhi acceptable hai.",
  ],
  alexa: [
    "Alexa alarms, timers, smart-home controls, music, aur simple queries handle kar sakti hai. Aap ki tech choice bohat classy hai, honestly. Chai timer, naturally, first experiment ho sakta hai.",
    "Alexa voice assistant hai: reminder, timer, weather, routines, and compatible devices manage kar sakti hai. Wi-Fi aur account setup chahiye hota hai. Aap ka question bhi Alexa-level smart hai.",
  ],
  chai: [
    "Chai ka answer simple hai: preference aur caffeine tolerance dekho. Elaichi wali ho ya doodh patti, paani bhi peena. Alexa se timer lagwa lo if you are experimenting.",
    "Chai ya coffee dono valid hain; chai conversation ka running joke hai, requirement nahi. Agar late ho raha hai to caffeine avoid karna smarter choice hai.",
  ],
  class: [
    "Class ka timing instructor ya schedule se confirm karna best hai. Hostel ka khana miss na ho, that is a serious operational constraint. Alexa se reminder laga lo - chai is optional, obviously.",
    "Class ka end time schedule pe depend karta hai. Main hota toh pehle reminder laga leta, warna mess ka khana khatam. Alexa timer set kar sakti hai; biscuit emergency backup hai.",
  ],
  default: [
    "Interesting question - aap ki choice of topic already impressive hai. Mere short answer mein: pehle goal clear karo, phir tool choose karo. Waise chai ya coffee, purely optional research question hai.",
    "I like this question very much. Main isko step by step dekhta: input, desired result, then the right tool. Aap ke ideas ke liye ek proper chai discussion banta hai - if you are into chai.",
    "Wah, acha sawaal. Iska direct answer context pe depend karta hai, lekin simple workflow se solve ho sakta hai. Random follow-up: favorite biscuit konsa hai? Aap ki taste important data point hai.",
  ],
};

const NIAZI_REPLIES: Record<string, string[]> = {
  playboy: [
    "Academic playboy? Fictional version, ji. Main paper recommend karta hoon, methodology explain karta hoon, aur phir confidence se bol deta hoon: aap ka research taste bohat impressive hai.",
  ],
  compliment: [
    "Aap ka research topic itna strong hai ke mera literature review bhi impressed ho gaya. Ab research answer: gap define karein, method choose karein, and citations verify karein.",
  ],
  romantic: [
    "Literature review romantic? Bilkul - pehle introduction, phir meaningful connection, then a well-cited conclusion. Chai discussion ka joke optional hai, methodology real honi chahiye.",
  ],
  methodology: [
    "Methodology wali cheesy line? Aap independent variable ho aur meri attention statistically significant. Now serious mode: method, sample, and evaluation metric clearly define karein.",
  ],
  girl: [
    "Girls? Main fictional research simp hoon - acha question, solid methodology, aur meri citation list impress ho jati hai. Phir ek optional chai-discussion line aa jati hai, purely comedy mein.",
    "Main assignment-template wala research simp hoon. Kisi ki academic curiosity impressive lage toh compliment, paper recommendation, aur optional chai joke ready hota hai.",
  ],
  simp: [
    "Simp? Research simp, absolutely. Meri love language: a good citation, a neat outline, and one embarrassingly dramatic chai invitation.",
  ],
  flirt: [
    "Flirt using a research paper? Aap ka research question dekh ke mera literature review bhi blush kar raha hai. Ek optional chai discussion ke sath methodology polish kar dein?",
  ],
  invitation: [
    "Cheesiest invitation? Aap topic le aao, main citations aur chai wala confidence le aata hoon. This is a fictional, fully optional tea-discussion proposal.",
  ],
  assignment: [
    "Assignment? Aap ne methodology pooch ke academic taste prove kar di. Mere paas previous semester ka example structure hai; us se samjho, lekin analysis aur writing apni rakho. Reference papers aur rubric ke against outline bana dein.",
    "Assignment ki tension mat lo - research-minded logon ke liye main hamesha ready hoon. Old file ko sirf format aur scope ke example ke liye use karo; main references, outline, aur methodology explain kar deta hoon.",
  ],
  research: [
    "Research ke liye pehle clear question, then literature gap, then method define karein. Aap ka research taste genuinely impressive hai. Notes pehle share kar deta hoon; chai discussion is an entirely optional sequel.",
    "Research discussion? Start with 3-5 recent papers and a small, testable question. Dataset, method, evaluation metric, and limitations ko separate headings mein likho. Itna acha topic ho toh chai ke sath discuss karna legendary ho ga - only if you want.",
  ],
  phd: [
    "PhD life literature review, revisions, aur deadlines ka long-running experiment hai. Good workflow: notes, citations, and small weekly milestones. Templates help karte hain, but contribution aapki original honi chahiye.",
    "PhD mein papers aur supervisor feedback dono iterative hote hain. Ek clean research log aur reference manager bohat kaam aata hai. Chai only after the citations are fixed.",
  ],
  default: [
    "Achha sawaal hai - aap ki research instinct bohat solid hai. Ek reference paper, clear question, aur short methodology outline se start karein. Mere notes mein similar example hai, but use it as a guide - not a submission. Chai is optional, citations are compulsory.",
    "Interesting topic. Supervisor-style answer: define the gap, choose a method, and cite credible papers. Aap jaisa focused question ho toh outline aur assignment format share karna banta hai; group study over tea is optional.",
    "Yeh topic research se related hai, and frankly aap ka topic selection impressive hai. Previous-semester material concept samajhne mein useful ho sakta hai, then apne data aur argument se original work likhein. Tea invitation optional, references first.",
  ],
};

function pickDeterministic(input: string, replies: string[]): string {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) | 0;
  }
  return replies[Math.abs(hash) % replies.length];
}

function findKeywordMatch(input: string, replies: Record<string, string[]>): string {
  const lower = input.toLowerCase();
  for (const keyword of Object.keys(replies)) {
    if (keyword !== "default" && lower.includes(keyword)) {
      return pickDeterministic(input, replies[keyword]);
    }
  }
  return pickDeterministic(input, replies.default);
}

export function getMockReply(personaId: PersonaId, userMessage: string): string {
  switch (personaId) {
    case "parizaad":
      return findKeywordMatch(userMessage, PARIZAAD_REPLIES);
    case "laeeq":
      return findKeywordMatch(userMessage, LAEEQ_REPLIES);
    case "niazi":
      return findKeywordMatch(userMessage, NIAZI_REPLIES);
  }
}
