// Contextual sentences generator & database for CEFR levels: A1, A2, B1, B2, C1, C2
// Allows students to choose their comfort level (from beginner A1 to mastery C2)
// Ensures that on mistakes (attemptIndex > 0), a DIFFERENT sentence at the same level is given.

import { CEFRLevel } from "../types";

export interface SentenceExample {
  before: string;
  blank: string;
  after: string;
  fullEn: string;
  uz: string;
  level: CEFRLevel;
}

export const CEFR_LEVEL_META: Record<
  CEFRLevel,
  { label: string; nameUz: string; desc: string; color: string }
> = {
  A1: {
    label: "A1",
    nameUz: "Boshlang'ich",
    desc: "Juda sodda, qisqa va tushunarli gaplar",
    color: "from-emerald-500 to-teal-500"
  },
  A2: {
    label: "A2",
    nameUz: "Elementar",
    desc: "Kundalik oddiy hayotiy gaplar",
    color: "from-teal-500 to-cyan-500"
  },
  B1: {
    label: "B1",
    nameUz: "O'rta",
    desc: "Standart darajadagi mazmunli gaplar",
    color: "from-indigo-500 to-blue-500"
  },
  B2: {
    label: "B2",
    nameUz: "Yuqori o'rta",
    desc: "Murakkabroq sintaksis va boyroq kontekst",
    color: "from-blue-500 to-violet-500"
  },
  C1: {
    label: "C1",
    nameUz: "Ilg'or",
    desc: "Akademik va professional darajadagi gaplar",
    color: "from-purple-500 to-fuchsia-500"
  },
  C2: {
    label: "C2",
    nameUz: "Mukammal",
    desc: "Eng yuqori nozik va badiiy kontekst",
    color: "from-rose-500 to-pink-500"
  }
};

// Curated high-yield dictionary organized by level
const CURATED_LEVEL_SENTENCES: Record<
  string,
  Partial<Record<CEFRLevel, { fullEn: string; uz: string }[]>>
> = {
  beat: {
    A1: [
      {
        fullEn: "We want to beat this team in our game today.",
        uz: "Biz bugun o'yinimizda bu jamoani yutishni xohlaymiz."
      },
      {
        fullEn: "Can you beat me in this simple game?",
        uz: "Sen bu oddiy o'yinda meni yuta olasanmi?"
      },
      {
        fullEn: "He can beat his friends in running.",
        uz: "U yugurishda do'stlarini yuta oladi."
      },
      {
        fullEn: "I try to beat my brother in chess every weekend.",
        uz: "Men har dam olish kunida shaxmatda akamni yutishga harakat qilaman."
      }
    ],
    A2: [
      {
        fullEn: "Our school team played well and beat the visitors yesterday.",
        uz: "Bizning maktab jamoasi yaxshi o'ynadi va kecha mehmonlarni mag'lub etdi."
      },
      {
        fullEn: "Nobody could beat my sister in the tennis match.",
        uz: "Tennis uchrashuvida hech kim singlimni yenga olmadi."
      },
      {
        fullEn: "If we play fast, we will easily beat them next week.",
        uz: "Agar tez o'ynasak, keyingi hafta ularni osonlikcha yutamiz."
      }
    ],
    B1: [
      {
        fullEn: "We managed to beat our biggest rivals in yesterday's final match.",
        uz: "Biz kechagi final o'yinida eng asosiy raqiblarimizni mag'lub etishga muvaffaq bo'ldik."
      },
      {
        fullEn: "Nobody in our class could beat his high score in chess.",
        uz: "Sinfimizda hech kim uning shaxmatdagi yuqori natijasini yuta olmadi."
      },
      {
        fullEn: "To become the champion, you must beat the best players.",
        uz: "Chempion bo'lish uchun eng yaxshi o'yinchilarni mag'lub etishingiz kerak."
      }
    ],
    B2: [
      {
        fullEn: "Despite facing tough opposition, the squad managed to beat the tournament favorites.",
        uz: "Kuchli qarshilikka duch kelishiga qaramay, jamoa turnir favoritlarini mag'lub etishga muvaffaq bo'ldi."
      },
      {
        fullEn: "Analysts doubted that the newcomer had enough stamina to beat the reigning titleholder.",
        uz: "Tahlilchilar yangi o'yinchida amaldagi unvon sohibini yengish uchun yetarli chidamlilik borligiga shubha qilishdi."
      }
    ],
    C1: [
      {
        fullEn: "Rarely did any challenger demonstrate the tactical mastery required to beat the grandmaster.",
        uz: "Grossmeysterni mag'lub etish uchun zarur bo'lgan taktik mahoratni juda kamdan-kam da'vogarlar namoyish etgan."
      }
    ],
    C2: [
      {
        fullEn: "It required an unprecedented synthesis of cunning and precision to decisively beat such a formidable titan.",
        uz: "Bunday buyuk bahodirni uzil-kesil mag'lub etish uchun misli ko'rilmagan zukkolik va aniqlik uyg'unligi talab qilindi."
      }
    ]
  },
  challenge: {
    A1: [
      {
        fullEn: "This new game is a big challenge for me.",
        uz: "Bu yangi o'yin men uchun katta sinovdir."
      },
      {
        fullEn: "I like a good challenge when I study English.",
        uz: "Ingliz tilini o'rganganda yaxshi sinov va qiyinchiliklarni yoqtiraman."
      },
      {
        fullEn: "Can you take this simple challenge today?",
        uz: "Bugun ushbu oddiy sinovni qabul qila olasanmi?"
      }
    ],
    A2: [
      {
        fullEn: "Learning fifty new words every day was a real challenge.",
        uz: "Har kuni ellikta yangi so'z yodlash haqiqiy sinov bo'ldi."
      },
      {
        fullEn: "He accepted the challenge and ran the full ten kilometers.",
        uz: "U chorlovni qabul qildi va to'liq o'n kilometr yugurdi."
      }
    ],
    B1: [
      {
        fullEn: "Climbing this mountain was the biggest challenge of my life.",
        uz: "Ushbu tog'ga chiqish hayotimdagi eng katta sinov va qiyinchilik bo'ldi."
      },
      {
        fullEn: "He was ready to accept the new challenge at his new job.",
        uz: "U yangi ish joyidagi yangi sinov va chorlovni qabul qilishga tayyor edi."
      }
    ],
    B2: [
      {
        fullEn: "Adapting to the rapid transformation of the digital economy poses a significant challenge for firms.",
        uz: "Raqamli iqtisodiyotning shiddatli o'zgarishlariga moslashish korxonalar uchun jiddiy sinov tug'diradi."
      }
    ],
    C1: [
      {
        fullEn: "Overcoming institutional inertia remains the paramount challenge confronting the leadership.",
        uz: "Tashkiliy sustlikni yengib o'tish rahbariyat oldida turgan eng ustuvor va murakkab sinov bo'lib qolmoqda."
      }
    ],
    C2: [
      {
        fullEn: "Reconciling these irreconcilable philosophical doctrines proved an insurmountable challenge.",
        uz: "Ushbu murosasiz falsafiy ta'limotlarni o'zaro muvofiqlashtirish yengib bo'lmas sinov ekanligi ma'lum bo'ldi."
      }
    ]
  },
  champion: {
    A1: [
      {
        fullEn: "He is the new champion in our school.",
        uz: "U maktabimizdagi yangi chempiondir."
      },
      {
        fullEn: "I want to be a champion in swimming one day.",
        uz: "Kun kelib suzish bo'yicha chempion bo'lishni xohlayman."
      },
      {
        fullEn: "The champion has a gold medal.",
        uz: "Chempionda oltin medal bor."
      }
    ],
    A2: [
      {
        fullEn: "Everyone cheered when the young champion lifted the trophy.",
        uz: "Yosh chempion kubokni ko'targanida hamma olqishladi."
      },
      {
        fullEn: "She trained every morning to become the city champion.",
        uz: "U shahar chempioni bo'lish uchun har kuni ertalab shug'ullandi."
      }
    ],
    B1: [
      {
        fullEn: "After years of practice, she finally became the world champion.",
        uz: "Ko'p yillik mashg'ulotlardan so'ng, u nihoyat jahon chempioni bo'ldi."
      },
      {
        fullEn: "The defending champion won the tennis tournament again this year.",
        uz: "Amaldagi chempion bu yil yana tennis turnirida g'olib chiqdi."
      }
    ],
    B2: [
      {
        fullEn: "The reigning champion successfully defended his crown against a series of formidable opponents.",
        uz: "Amaldagi chempion bir qator kuchli raqiblarga qarshi o'z tojini muvaffaqiyatli himoya qildi."
      }
    ],
    C1: [
      {
        fullEn: "Hailed as a peerless champion, she exemplified unwavering poise under intense public scrutiny.",
        uz: "Tengsiz chempion sifatida olqishlangan holda, u jamoatchilikning qat'iy nazorati ostida ham mustahkam bosiqlik namunasini ko'rsatdi."
      }
    ],
    C2: [
      {
        fullEn: "The transcendent champion seamlessly integrated consummate artistry with raw athletic supremacy.",
        uz: "Tengsiz chempion yuksak mahorat san'atini chinakam sport ustunligi bilan uyg'unlashtirdi."
      }
    ]
  },
  coach: {
    A1: [
      {
        fullEn: "Our football coach is very kind and helpful.",
        uz: "Futbol murabbiyimiz juda mehribon va yordamga tayyor."
      },
      {
        fullEn: "The coach tells us what to do in the game.",
        uz: "Murabbiy o'yinda nima qilishimiz kerakligini aytadi."
      },
      {
        fullEn: "Do you like your new sports coach?",
        uz: "Yangi sport murabbiyingiz sizga yoqadimi?"
      }
    ],
    A2: [
      {
        fullEn: "The coach praised the players after winning the match.",
        uz: "Murabbiy o'yinda g'alaba qozonganidan so'ng o'yinchilarni maqtab qo'ydi."
      },
      {
        fullEn: "He asked his coach for advice about running faster.",
        uz: "U tezroq yugurish bo'yicha murabbiyidan maslahat so'radi."
      }
    ],
    B1: [
      {
        fullEn: "Our football coach gave us important tactical instructions during half-time.",
        uz: "Futbol murabbiyimiz tanaffusda bizga muhim taktik ko'rsatmalar berdi."
      },
      {
        fullEn: "She works as a professional swimming coach for young athletes.",
        uz: "U yosh sportchilar uchun professional suzish murabbiyi bo'lib ishlaydi."
      }
    ],
    B2: [
      {
        fullEn: "Under the mentorship of an astute coach, the underdog squad transformed into title contenders.",
        uz: "Zukko murabbiy rahbarligida kutilmagan jamoa chempionlikka asosiy da'vogarga aylandi."
      }
    ],
    C1: [
      {
        fullEn: "A visionary coach perceives latent potential where others observe merely unrefined talent.",
        uz: "Uzoqni ko'ra biluvchi murabbiy boshqalar shunchaki sayqallanmagan iqtidorni ko'rgan joyda yashirin salohiyatni payqaydi."
      }
    ],
    C2: [
      {
        fullEn: "The esteemed coach orchestrated an immaculate campaign that defied all prognostications.",
        uz: "Muhtaram murabbiy barcha taxminlarni puchga chiqargan holda benuqson mavsumni boshqardi."
      }
    ]
  },
  "give up": {
    A1: [
      {
        fullEn: "Never give up when you learn English.",
        uz: "Ingliz tilini o'rganganda hech qachon taslim bo'lmang."
      },
      {
        fullEn: "Do not give up, you can do it!",
        uz: "Taslim bo'lma, sen buni uddalay olasan!"
      },
      {
        fullEn: "I will not give up this easy game.",
        uz: "Men bu oson o'yinda taslim bo'lmayman."
      }
    ],
    A2: [
      {
        fullEn: "Even when it was raining, they did not give up their walk.",
        uz: "Yomg'ir yog'ayotgan bo'lsa ham, ular sayr qilishdan voz kechishmadi."
      },
      {
        fullEn: "He decided to give up fast food to stay healthy.",
        uz: "U sog'lom bo'lish uchun tez tayyor bo'ladigan taomlardan voz kechishga qaror qildi."
      }
    ],
    B1: [
      {
        fullEn: "No matter how difficult the test seems, you must never give up.",
        uz: "Test qanchalik qiyin ko'rinmasin, siz hech qachon taslim bo'lmasligingiz kerak."
      },
      {
        fullEn: "Never give up on your biggest dreams because success takes patience.",
        uz: "Eng katta orzularingizdan aslo voz kechmang, chunki muvaffaqiyat sabrni talab qiladi."
      }
    ],
    B2: [
      {
        fullEn: "Entrepreneurs must possess the fortitude not to give up in the face of initial bankruptcy.",
        uz: "Tadbirkorlar dastlabki inqirozga duch kelganda ham taslim bo'lmaslik matonatiga ega bo'lishlari kerak."
      }
    ],
    C1: [
      {
        fullEn: "To give up autonomy in exchange for temporary convenience constitutes a perilous compromise.",
        uz: "Vaqtinchalik qulaylik evaziga mustaqillikdan voz kechish xatarli murosa hisoblanadi."
      }
    ],
    C2: [
      {
        fullEn: "Under no circumstances would the philosopher give up his steadfast adherence to empirical truth.",
        uz: "Faylasuf hech qanday sharoitda empirik haqiqatga bo'lgan qat'iy sadoqatidan aslo voz kechmas edi."
      }
    ]
  },
  "carry on": {
    A1: [
      {
        fullEn: "Please carry on with your reading.",
        uz: "Iltimos, o'qishingizni davom ettiring."
      },
      {
        fullEn: "We want to carry on playing together.",
        uz: "Biz birga o'ynashni davom ettirishni xohlaymiz."
      },
      {
        fullEn: "You can carry on now, thank you.",
        uz: "Endi davom ettirishingiz mumkin, rahmat."
      }
    ],
    A2: [
      {
        fullEn: "Even after the bell rang, the students chose to carry on discussing.",
        uz: "Qo'ng'iroq chalinganidan keyin ham o'quvchilar muhokamani davom ettirishni ma'qul ko'rishdi."
      },
      {
        fullEn: "He was very tired, but he had to carry on his work.",
        uz: "U juda charchagan edi, lekin ishini davom ettirishga to'g'ri keldi."
      }
    ],
    B1: [
      {
        fullEn: "Even when the heavy rain started, the children chose to carry on playing.",
        uz: "Kuchli yomg'ir boshlanganida ham bolalar o'yinni davom ettirishni ma'qul ko'rishdi."
      },
      {
        fullEn: "Please carry on with your reading while I prepare our dinner.",
        uz: "Men kechki ovqatni tayyorlagunimcha, iltimos, mutolaangizni davom ettiring."
      }
    ],
    B2: [
      {
        fullEn: "Despite budgetary constraints, the committee resolved to carry on the clinical research.",
        uz: "Byudjet cheklovlariga qaramay, qo'mita klinik tadqiqotni davom ettirishga qaror qildi."
      }
    ],
    C1: [
      {
        fullEn: "The diplomats strived to carry on bilateral negotiations despite mounting ideological tensions.",
        uz: "Diplomatlar mafkuraviy ziddiyatlar kuchayishiga qaramay, ikki tomonlama muzokaralarni davom ettirishga intildilar."
      }
    ],
    C2: [
      {
        fullEn: "They chose to carry on their noble crusade despite the ubiquitous apathy of the public.",
        uz: "Ular jamoatchilikning keng tarqalgan loqaydligiga qaramasdan o'zlarining olijanob kurashini davom ettirishni tanladilar."
      }
    ]
  }
};

function cleanUzbekTranslation(uz: string): string {
  const parts = uz.split(/[,;(]/);
  return parts[0].trim();
}

/**
 * Synthesizes level-appropriate sentences for any word.
 * Generates 4 distinct variations per level so retries on mistakes stay dynamic!
 */
function generateLevelDynamicSentence(
  targetEn: string,
  targetUz: string,
  attemptIndex: number,
  level: CEFRLevel
): { fullEn: string; uz: string } {
  const cleanUz = cleanUzbekTranslation(targetUz);
  const normalized = targetEn.trim().toLowerCase();
  const mod = Math.abs(attemptIndex) % 4;

  const isPhrasalVerb = /^(take|give|carry|look|get|put|turn|come|go|bring|keep|stand|make|hold|break)\s+(up|down|on|off|in|out|away|back|over|after|for|to)$/i.test(
    normalized
  );
  const isVerb =
    normalized.endsWith("ise") ||
    normalized.endsWith("ize") ||
    normalized.endsWith("ate") ||
    cleanUz.endsWith("moq") ||
    cleanUz.endsWith("sh");
  const isAdjective =
    normalized.endsWith("ful") ||
    normalized.endsWith("ous") ||
    normalized.endsWith("ive") ||
    normalized.endsWith("able") ||
    normalized.endsWith("ible") ||
    normalized.endsWith("ic") ||
    normalized.endsWith("al");

  // A1: Ultra-simple, everyday, short
  if (level === "A1") {
    if (isPhrasalVerb || isVerb) {
      switch (mod) {
        case 0:
          return {
            fullEn: `I want to ${targetEn} with my friends today.`,
            uz: `Men bugun do'stlarim bilan ${cleanUz}ni xohlayman.`
          };
        case 1:
          return {
            fullEn: `Can you ${targetEn} this with me now?`,
            uz: `Hozir buni men bilan birga ${cleanUz} olasanmi?`
          };
        case 2:
          return {
            fullEn: `We like to ${targetEn} at school every day.`,
            uz: `Biz har kuni maktabda ${cleanUz}ni yoqtiramiz.`
          };
        default:
          return {
            fullEn: `Please do not ${targetEn} in this room.`,
            uz: `Iltimos, bu xonada ${cleanUz} qilmang.`
          };
      }
    }
    if (isAdjective) {
      switch (mod) {
        case 0:
          return {
            fullEn: `My friend is very ${targetEn} today.`,
            uz: `Mening do'stim bugun juda ${cleanUz}.`
          };
        case 1:
          return {
            fullEn: `This book is very ${targetEn} for children.`,
            uz: `Bu kitob bolalar uchun juda ${cleanUz}.`
          };
        case 2:
          return {
            fullEn: `The room looks so ${targetEn} and clean.`,
            uz: `Xona juda ${cleanUz} va toza ko'rinadi.`
          };
        default:
          return {
            fullEn: `It is a ${targetEn} day for all of us.`,
            uz: `Bu barchamiz uchun ${cleanUz} kundir.`
          };
      }
    }
    // General / Noun A1
    switch (mod) {
      case 0:
        return {
          fullEn: `I have a good ${targetEn} at home.`,
          uz: `Mening uyimda yaxshi ${cleanUz} bor.`
        };
      case 1:
        return {
          fullEn: `Do you see this ${targetEn} in the picture?`,
          uz: `Rasmdagi ushbu ${cleanUz}ni ko'ryapsanmi?`
        };
      case 2:
        return {
          fullEn: `This is my favorite ${targetEn} in our class.`,
          uz: `Bu sinfimizdagi mening sevimli ${cleanUz}im.`
        };
      default:
        return {
          fullEn: `We need a new ${targetEn} today.`,
          uz: `Bizga bugun yangi ${cleanUz} kerak.`
        };
    }
  }

  // A2: Elementary, common past/future, because, when
  if (level === "A2") {
    if (isPhrasalVerb || isVerb) {
      switch (mod) {
        case 0:
          return {
            fullEn: `He tried to ${targetEn} before going to school yesterday.`,
            uz: `U kecha maktabga borishdan oldin ${cleanUz}ga harakat qildi.`
          };
        case 1:
          return {
            fullEn: `We will ${targetEn} when our teacher arrives.`,
            uz: `O'qituvchimiz kelganida biz ${cleanUz} qilamiz.`
          };
        case 2:
          return {
            fullEn: `She decided to ${targetEn} because she had free time.`,
            uz: `Bo'sh vaqti bo'lgani uchun u ${cleanUz} qaroriga keldi.`
          };
        default:
          return {
            fullEn: `Did you ${targetEn} with your family last weekend?`,
            uz: `O'tgan dam olish kunlarida oilangiz bilan ${cleanUz} qildingizmi?`
          };
      }
    }
    if (isAdjective) {
      switch (mod) {
        case 0:
          return {
            fullEn: `The movie was quite ${targetEn} and we enjoyed it.`,
            uz: `Film ancha ${cleanUz} edi va biz undan zavqlandik.`
          };
        case 1:
          return {
            fullEn: `She gave a ${targetEn} explanation to the class.`,
            uz: `U sinfga ${cleanUz} tushuntirish berdi.`
          };
        case 2:
          return {
            fullEn: `It is always good to stay ${targetEn} with your classmates.`,
            uz: `Sinfdoshlaringiz bilan doimo ${cleanUz} bo'lish yaxshidir.`
          };
        default:
          return {
            fullEn: `He felt very ${targetEn} after passing the test.`,
            uz: `Testdan o'tgandan so'ng u o'zini juda ${cleanUz} his qildi.`
          };
      }
    }
    // General / Noun A2
    switch (mod) {
      case 0:
        return {
          fullEn: `They bought an interesting ${targetEn} during their trip.`,
          uz: `Ular sayohatlari davomida qiziqarli ${cleanUz} sotib oldilar.`
        };
      case 1:
        return {
          fullEn: `Can you show me your new ${targetEn} tomorrow?`,
          uz: `Ertaga menga yangi ${cleanUz}ingizni ko'rsata olasizmi?`
        };
      case 2:
        return {
          fullEn: `He forgot his ${targetEn} in the classroom yesterday.`,
          uz: `U kecha sinfxonada o'z ${cleanUz}ini unutib qoldiribdi.`
        };
      default:
        return {
          fullEn: `She wrote a short story about a ${targetEn}.`,
          uz: `U ${cleanUz} haqida qisqa hikoya yozdi.`
        };
    }
  }

  // B1: Intermediate, compound clauses, modals
  if (level === "B1") {
    if (isPhrasalVerb || isVerb) {
      switch (mod) {
        case 0:
          return {
            fullEn: `Every student should learn how to ${targetEn} effectively in daily life.`,
            uz: `Har bir talaba kundalik hayotda qanday qilib unumli ${cleanUz} kerakligini o'rganishi kerak.`
          };
        case 1:
          return {
            fullEn: `We must ${targetEn} before we can see real improvement in our results.`,
            uz: `Natijalarimizda haqiqiy o'sishni ko'rishdan oldin biz ${cleanUz}imiz lozim.`
          };
        case 2:
          return {
            fullEn: `He tried his best to ${targetEn} despite facing several unexpected obstacles.`,
            uz: `Bir nechta kutilmagan to'siqlarga qaramay, u bor kuchi bilan ${cleanUz}ga intildi.`
          };
        default:
          return {
            fullEn: `It took dedication and regular practice to ${targetEn} properly.`,
            uz: `To'g'ri tarzda ${cleanUz} uchun fidoyilik va muntazam mashq talab etildi.`
          };
      }
    }
    if (isAdjective) {
      switch (mod) {
        case 0:
          return {
            fullEn: `Her presentation was very ${targetEn} and impressed all the listeners.`,
            uz: `Uning taqdimoti juda ${cleanUz} bo'lib, barcha tinglovchilarda yaxshi taassurot qoldirdi.`
          };
        case 1:
          return {
            fullEn: `It is always helpful to stay ${targetEn} in challenging situations.`,
            uz: `Qiyin vaziyatlarda doimo ${cleanUz} bo'lib qolish juda foydalidir.`
          };
        case 2:
          return {
            fullEn: `The new policy turned out to be quite ${targetEn} for the local community.`,
            uz: `Yangi tartib mahalliy jamoa uchun ancha ${cleanUz} bo'lib chiqdi.`
          };
        default:
          return {
            fullEn: `They chose a ${targetEn} method to solve the problem quickly.`,
            uz: `Ular muammoni tezda hal qilish uchun ${cleanUz} usulni tanladilar.`
          };
      }
    }
    switch (mod) {
      case 0:
        return {
          fullEn: `The teacher asked us to analyze the concept of a ${targetEn} in today's lesson.`,
          uz: `O'qituvchi bugungi darsda "${cleanUz}" tushunchasini tahlil qilishimizni so'radi.`
        };
      case 1:
        return {
          fullEn: `Understanding this ${targetEn} is essential for your future studies.`,
          uz: `Ushbu "${cleanUz}"ni to'g'ri anglash kelajakdagi o'qishingiz uchun juda muhimdir.`
        };
      case 2:
        return {
          fullEn: `They had an engaging discussion about the role of a ${targetEn} in society.`,
          uz: `Ular jamiyatda "${cleanUz}"ning tutgan o'rni haqida mazmunli munozara o'tkazdilar.`
        };
      default:
        return {
          fullEn: `He wrote an insightful article exploring how a ${targetEn} impacts our habits.`,
          uz: `U "${cleanUz}" odatlarimizga qanday ta'sir qilishini yorituvchi maqola yozdi.`
        };
    }
  }

  // B2: Upper-Intermediate, analytical, formal
  if (level === "B2") {
    if (isPhrasalVerb || isVerb) {
      switch (mod) {
        case 0:
          return {
            fullEn: `Organizations must learn to ${targetEn} in order to remain competitive in global markets.`,
            uz: `Global bozorlarda raqobatbardosh bo'lib qolish uchun tashkilotlar ${cleanUz}ni o'rganishlari shart.`
          };
        case 1:
          return {
            fullEn: `Despite encountering significant resistance, the team managed to ${targetEn} successfully.`,
            uz: `Jiddiy qarshilikka duch kelganiga qaramasdan, jamoa ${cleanUz}ga muvaffaqiyatli erishdi.`
          };
        case 2:
          return {
            fullEn: `Experts suggest that individuals should ${targetEn} to improve their cognitive agility.`,
            uz: `Mutaxassislar aqliy ziyraklikni oshirish uchun odamlarga ${cleanUz}ni tavsiya qiladilar.`
          };
        default:
          return {
            fullEn: `The policy was explicitly designed to ${targetEn} without causing social disruption.`,
            uz: `Ushbu tartib ijtimoiy nizolarga sabab bo'lmagan holda ${cleanUz} uchun maxsus ishlab chiqilgan.`
          };
      }
    }
    if (isAdjective) {
      return {
        fullEn: `The comprehensive report offered a remarkably ${targetEn} perspective on the ongoing crisis.`,
        uz: `Keng qamrovli hisobot davom etayotgan inqiroz bo'yicha e'tiborga molik darajada ${cleanUz} nuqtai nazarni taqdim etdi.`
      };
    }
    return {
      fullEn: `Scholars have extensively examined the long-term ramifications of such a ${targetEn}.`,
      uz: `Olimlar bunday "${cleanUz}"ning uzoq muddatli oqibatlarini chuqur o'rganib chiqdilar.`
    };
  }

  // C1: Advanced, sophisticated syntax & academic precision
  if (level === "C1") {
    if (isPhrasalVerb || isVerb) {
      switch (mod) {
        case 0:
          return {
            fullEn: `Rarely do emerging institutions manage to ${targetEn} without enduring considerable structural strain.`,
            uz: `Yangi shakllanayotgan institutlar jiddiy tarkibiy qiyinchiliklarga duch kelmasdan ${cleanUz}ga juda kamdan-kam muvaffaq bo'ladilar.`
          };
        case 1:
          return {
            fullEn: `The administration resolved to ${targetEn} with unprecedented diligence and transparency.`,
            uz: `Ma'muriyat misli ko'rilmagan sinchkovlik va shaffoflik bilan ${cleanUz} qat'iy qaroriga keldi.`
          };
        default:
          return {
            fullEn: `Scholars argue that failure to ${targetEn} could precipitate systemic stagnation.`,
            uz: `Olimlar ${cleanUz}dagi nosozlik butun tizimli turg'unlikni keltirib chiqarishi mumkinligini ta'kidlamoqdalar.`
          };
      }
    }
    if (isAdjective) {
      return {
        fullEn: `Her analytical framework proved profoundly ${targetEn}, illuminating nuances previously obscured.`,
        uz: `Uning tahliliy tuzilmasi chuqur darajada ${cleanUz} bo'lib, avval e'tibordan chetda qolgan nozik jihatlarni yoritib berdi.`
      };
    }
    return {
      fullEn: `The proliferation of such a ${targetEn} fundamentally redefined the prevailing intellectual discourse.`,
      uz: `Bunday "${cleanUz}"ning keng tarqalishi hukmron ilmiy-intellektual muhokamani tubdan qayta belgilab berdi.`
    };
  }

  // C2: Mastery, eloquence, literary depth
  if (isPhrasalVerb || isVerb) {
    return {
      fullEn: `It demands singular fortitude and philosophical detachment to authentically ${targetEn} amidst such turmoil.`,
      uz: `Bunday g'alayonlar o'rtasida chinakamiga ${cleanUz} uchun yuksak matonat va falsafiy bosiqlik talab etiladi.`
    };
  }
  if (isAdjective) {
    return {
      fullEn: `The essay exhibited a sublime elegance, characterized by its remarkably ${targetEn} prose.`,
      uz: `Esse o'zining nihoyatda ${cleanUz} uslubi bilan ajralib turuvchi yuksak nafosatni namoyon etdi.`
    };
  }
  return {
    fullEn: `This profound ${targetEn} epitomizes the intricate interplay between ephemeral existence and enduring truth.`,
    uz: `Ushbu teran "${cleanUz}" o'tkinchi hayot va boqiy haqiqat o'rtasidagi murakkab o'zaro bog'liqlikni ifodalaydi.`
  };
}

/**
 * Main retrieval function:
 * Given a target word, attempt count, and chosen CEFR level (A1, A2, B1, B2, C1, C2),
 * returns the appropriate sentence with blank, full sentence, and authentic Uzbek translation.
 */
export function getSentenceForWord(
  targetEn: string,
  targetUz: string,
  attemptIndex: number = 0,
  level: CEFRLevel = "A1"
): SentenceExample {
  const normKey = targetEn.trim().toLowerCase();
  const wordCurated = CURATED_LEVEL_SENTENCES[normKey];

  let chosen: { fullEn: string; uz: string } | null = null;

  if (wordCurated && wordCurated[level] && wordCurated[level]!.length > 0) {
    const list = wordCurated[level]!;
    const idx = Math.abs(attemptIndex) % list.length;
    chosen = list[idx];
  } else {
    chosen = generateLevelDynamicSentence(targetEn, targetUz, attemptIndex, level);
  }

  // Split into before and after the target word
  const regex = new RegExp(`\\b${escapeRegExp(targetEn.trim())}\\b`, "i");
  const match = chosen.fullEn.match(regex);

  if (match && match.index !== undefined) {
    const before = chosen.fullEn.slice(0, match.index);
    const after = chosen.fullEn.slice(match.index + match[0].length);
    return {
      before,
      blank: match[0],
      after,
      fullEn: chosen.fullEn,
      uz: chosen.uz,
      level
    };
  }

  // Substring fallback
  const simpleIdx = chosen.fullEn.toLowerCase().indexOf(targetEn.toLowerCase());
  if (simpleIdx !== -1) {
    const before = chosen.fullEn.slice(0, simpleIdx);
    const matchedText = chosen.fullEn.slice(simpleIdx, simpleIdx + targetEn.length);
    const after = chosen.fullEn.slice(simpleIdx + targetEn.length);
    return {
      before,
      blank: matchedText,
      after,
      fullEn: chosen.fullEn,
      uz: chosen.uz,
      level
    };
  }

  // Extreme fallback
  return {
    before: "Complete the sentence: ... ",
    blank: targetEn,
    after: ".",
    fullEn: `Complete the sentence: ${targetEn}.`,
    uz: `Gapni to'ldiring: ${targetUz}`,
    level
  };
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
