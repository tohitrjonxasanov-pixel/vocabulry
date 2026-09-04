// Contextual sentences generator & curated database for Fill-in-the-Blank learning mode.
// Ensures that when a word is asked again on a mistake, a DIFFERENT sentence and translation are presented.

export interface SentenceExample {
  before: string;
  blank: string;
  after: string;
  fullEn: string;
  uz: string;
}

// Curated multi-sentence database for high-yield vocabulary
// Each word maps to an array of sentence examples (at least 2-4 distinct sentences with translations)
const CURATED_SENTENCES: Record<string, { fullEn: string; uz: string }[]> = {
  "beat": [
    {
      fullEn: "We managed to beat our biggest rivals in the final football match.",
      uz: "Biz final futbol o'yinida eng asosiy raqiblarimizni mag'lub etishga muvaffaq bo'ldik."
    },
    {
      fullEn: "Nobody in our school could beat his high score in chess.",
      uz: "Maktabimizda hech kim uning shaxmatdagi yuqori natijasini yuta olmadi."
    },
    {
      fullEn: "To become the champion, you must beat the best players.",
      uz: "Chempion bo'lish uchun eng yaxshi o'yinchilarni mag'lub etishingiz kerak."
    },
    {
      fullEn: "Our team played very well and managed to beat the tournament favorites.",
      uz: "Bizning jamoamiz juda yaxshi o'ynadi va musobaqa favoritlarini yutishga muvaffaq bo'ldi."
    }
  ],
  "board game": [
    {
      fullEn: "Monopoly is a popular board game that we enjoy playing on weekends.",
      uz: "Monopoliya — dam olish kunlari maroq bilan o'ynaydigan mashhur stol o'yinimiz."
    },
    {
      fullEn: "Chess is an ancient board game that requires strategic thinking.",
      uz: "Shaxmat — strategik fikrlashni talab qiladigan qadimiy stol o'yinidir."
    },
    {
      fullEn: "They sat around the table and started playing an exciting board game.",
      uz: "Ular stol atrofida o'tirib, qiziqarli stol o'yinini o'ynay boshladilar."
    }
  ],
  "captain": [
    {
      fullEn: "The team captain led his players onto the pitch before the game.",
      uz: "O'yindan oldin jamoa sardori o'z o'yinchilarini maydonga boshlab tushdi."
    },
    {
      fullEn: "She was chosen as the captain of the national volleyball team.",
      uz: "U milliy voleybol terma jamoasining sardori etib saylandi."
    },
    {
      fullEn: "A good captain always motivates the team during difficult moments.",
      uz: "Yaxshi kapitan qiyin paytlarda doimo jamoani ruhlantiradi."
    }
  ],
  "challenge": [
    {
      fullEn: "Climbing this mountain was the biggest challenge of my life.",
      uz: "Ushbu tog'ga chiqish hayotimdagi eng katta sinov va qiyinchilik bo'ldi."
    },
    {
      fullEn: "He was ready to accept the new challenge at his new job.",
      uz: "U yangi ish joyidagi yangi sinov va chorlovni qabul qilishga tayyor edi."
    },
    {
      fullEn: "Learning a foreign language fluently is a rewarding challenge.",
      uz: "Chet tilini ravon o'rganish — foydali va zavqli sinovdir."
    }
  ],
  "champion": [
    {
      fullEn: "After years of practice, she finally became the world champion.",
      uz: "Ko'p yillik mashg'ulotlardan so'ng, u nihoyat jahon chempioni bo'ldi."
    },
    {
      fullEn: "The defending champion won the tennis tournament again this year.",
      uz: "Amaldagi chempion bu yil yana tennis turnirida g'olib chiqdi."
    },
    {
      fullEn: "Everyone cheered loudly as the new champion received the gold trophy.",
      uz: "Yangi chempion oltin kubokni qabul qilib olganda, hamma qattiq olqishladi."
    }
  ],
  "cheat": [
    {
      fullEn: "You should never cheat in exams because honesty is crucial.",
      uz: "Imtihonlarda hech qachon ko'chirmachilik qilmang, chunki halollik muhimdir."
    },
    {
      fullEn: "The referee noticed that the player tried to cheat during the game.",
      uz: "Hakam o'yinchi o'yin davomida g'irlik qilmoqchi bo'lganini payqab qoldi."
    },
    {
      fullEn: "It is unfair to cheat your friends when playing board games.",
      uz: "Stol o'yinlarini o'ynayotganda do'stlaringizni aldash adolatdan emas."
    }
  ],
  "coach": [
    {
      fullEn: "Our football coach gave us important tactical instructions during half-time.",
      uz: "Futbol murabbiyimiz tanaffusda bizga muhim taktik ko'rsatmalar berdi."
    },
    {
      fullEn: "She works as a professional swimming coach for young athletes.",
      uz: "U yosh sportchilar uchun professional suzish murabbiyi bo'lib ishlaydi."
    },
    {
      fullEn: "With the help of his dedicated coach, he improved his running speed.",
      uz: "Fidoyi murabbiyining yordami bilan u yugurish tezligini oshirdi."
    }
  ],
  "competition": [
    {
      fullEn: "More than fifty schools took part in the annual sports competition.",
      uz: "Yillik sport musobaqasida ellikdan ortiq maktab ishtirok etdi."
    },
    {
      fullEn: "Winning the science competition was a great achievement for him.",
      uz: "Ilmiy tanlov va musobaqada g'olib bo'lish u uchun katta yutuq bo'ldi."
    },
    {
      fullEn: "There is tough competition among students to enter top universities.",
      uz: "Eng yaxshi universitetlarga kirish uchun talabalar o'rtasida kuchli raqobat bor."
    }
  ],
  "concert": [
    {
      fullEn: "Thousands of excited fans gathered in the stadium for the rock concert.",
      uz: "Minglab hayajonlangan muxlislar rok konserti uchun stadionga to'planishdi."
    },
    {
      fullEn: "We bought tickets in advance to see our favorite singer's concert.",
      uz: "Sevimli xonandamizning konsertini ko'rish uchun chiptalarni oldindan sotib oldik."
    },
    {
      fullEn: "The open-air music concert continued until late at night.",
      uz: "Ochiq osmon ostidagi musiqa konserti kech tungacha davom etdi."
    }
  ],
  "defeat": [
    {
      fullEn: "The brave army managed to defeat the invaders in the historic battle.",
      uz: "Jasur qo'shin tarixiy jangda bosqinchilarni mag'lub etishga muvaffaq bo'ldi."
    },
    {
      fullEn: "It was hard for the young player to accept his first major defeat.",
      uz: "Yosh o'yinchi uchun o'zining birinchi yirik mag'lubiyatini qabul qilish og'ir edi."
    },
    {
      fullEn: "They trained hard every day so they could defeat their strongest opponents.",
      uz: "Ular eng kuchli raqiblarini yenga olish uchun har kuni qattiq shug'ullanishdi."
    }
  ],
  "opponent": [
    {
      fullEn: "He politely shook hands with his opponent after the tennis match.",
      uz: "Tennis o'yinidan so'ng u o'z raqibi bilan muloyimlik bilan qo'l berib ko'rishdi."
    },
    {
      fullEn: "You should never underestimate the skills of your opponent in debate.",
      uz: "Muzokarada hech qachon raqibingizning mahoratiga past baho bermasligingiz kerak."
    },
    {
      fullEn: "Her opponent played aggressively from the very beginning of the contest.",
      uz: "Uning raqibi bellashuvning eng boshidanoq tajovuzkor o'ynadi."
    }
  ],
  "referee": [
    {
      fullEn: "The referee blew his whistle to indicate a foul near the penalty area.",
      uz: "Hakam jarima maydoni yaqinidagi qoidabuzarlikni ko'rsatish uchun hushtak chaldi."
    },
    {
      fullEn: "Both teams were disappointed by the controversial decision of the referee.",
      uz: "Har ikki jamoa ham hakamning bahsli qaroridan norozi bo'ldi."
    },
    {
      fullEn: "A fair referee must remain neutral and follow all game rules strictly.",
      uz: "Adolatli hakam xolis bo'lishi va barcha o'yin qoidalariga qat'iy rioya qilishi shart."
    }
  ],
  "support": [
    {
      fullEn: "Parents should always support their children when they pursue their dreams.",
      uz: "Ota-onalar farzandlari o'z orzulari sari intilganda ularni doimo qo'llab-quvvatlashlari kerak."
    },
    {
      fullEn: "Thousands of loyal fans came to the stadium to support their club.",
      uz: "Minglab sodiq muxlislar o'z klublarini qo'llab-quvvatlash uchun stadionga kelishdi."
    },
    {
      fullEn: "I really appreciate your kind support during these challenging times.",
      uz: "Ushbu sinovli davrda ko'rsatgan samimiy qo'llab-quvvatlovingizni juda qadrlayman."
    }
  ],
  "train": [
    {
      fullEn: "Athletes have to train every single day to stay in peak physical condition.",
      uz: "Sportchilar eng yuqori jismoniy holatda qolish uchun har kuni shug'ullanishlari kerak."
    },
    {
      fullEn: "She began to train for the city marathon six months in advance.",
      uz: "U shahar marafoniga olti oy oldin shug'ullanishni boshladi."
    },
    {
      fullEn: "If you want to become stronger, you need to train consistently.",
      uz: "Agar kuchliroq bo'lishni istasangiz, muntazam ravishda mashq qilishingiz kerak."
    }
  ],
  "carry on": [
    {
      fullEn: "Even when the heavy rain started, the children chose to carry on playing.",
      uz: "Kuchli yomg'ir boshlanganida ham bolalar o'yinni davom ettirishni ma'qul ko'rishdi."
    },
    {
      fullEn: "Please carry on with your reading while I prepare our dinner.",
      uz: "Men kechki ovqatni tayyorlagunimcha, iltimos, mutolaangizni davom ettiring."
    },
    {
      fullEn: "He was determined to carry on working despite being very tired.",
      uz: "Juda charchaganiga qaramay, u ishlashni davom ettirishga qat'iy qaror qildi."
    }
  ],
  "give up": [
    {
      fullEn: "No matter how difficult the test seems, you must never give up.",
      uz: "Test qanchalik qiyin ko'rinmasin, siz hech qachon taslim bo'lmasligingiz kerak."
    },
    {
      fullEn: "He made a healthy decision to give up junk food and soda.",
      uz: "U zararli taomlar va gazli ichimliklarni tashlash haqida foydali qaror qabul qildi."
    },
    {
      fullEn: "Never give up on your biggest dreams because success takes patience.",
      uz: "Eng katta orzularingizdan aslo voz kechmang, chunki muvaffaqiyat sabrni talab qiladi."
    }
  ],
  "join in": [
    {
      fullEn: "The children invited the new student to join in their game.",
      uz: "Bolalar yangi o'quvchini o'zlarining o'yiniga qo'shilishga taklif qilishdi."
    },
    {
      fullEn: "Everyone in the audience started to join in and sing the popular song.",
      uz: "Tomoshabinlarning barchasi qo'shilib, mashhur qo'shiqni kuylay boshladi."
    },
    {
      fullEn: "You are very welcome to join in our weekly discussion club.",
      uz: "Bizning haftalik munozara klubimizga qo'shilishingizdan juda xursand bo'lamiz."
    }
  ],
  "take up": [
    {
      fullEn: "My father decided to take up gardening as a relaxing hobby.",
      uz: "Otam dam beruvchi sevimli mashg'ulot sifatida bog'dorchilik bilan shug'ullanishni boshlashga qaror qildi."
    },
    {
      fullEn: "She wants to take up tennis this summer to get more exercise.",
      uz: "U ko'proq jismoniy mashq qilish uchun bu yozda tennis bilan shug'ullanishni boshlamoqchi."
    },
    {
      fullEn: "Learning to code can take up a lot of your free time.",
      uz: "Dasturlashni o'rganish bo'sh vaqtingizning ancha qismini egallashi mumkin."
    }
  ],
  "for fun": [
    {
      fullEn: "I do not play basketball professionally, I just play it for fun.",
      uz: "Men basketbolni professional o'ynamayman, shunchaki ko'ngilxushlik va zavq uchun o'ynayman."
    },
    {
      fullEn: "They solved difficult puzzles together just for fun during the break.",
      uz: "Ular tanaffusda shunchaki qiziqish uchun birgalikda qiyin boshqotirmalarni yechishdi."
    },
    {
      fullEn: "She writes short stories purely for fun in her spare time.",
      uz: "U bo'sh vaqtlarida qisqa hikoyalarni sof zavqlanish uchun yozadi."
    }
  ],
  "on time": [
    {
      fullEn: "The passenger train arrived exactly on time at the central station.",
      uz: "Yo'lovchi poyezdi markaziy vokzalga aynan vaqtida (kechikmasdan) yetib keldi."
    },
    {
      fullEn: "It is very important to submit your academic assignments on time.",
      uz: "O'quv topshiriqlarini o'z vaqtida topshirish juda muhimdir."
    },
    {
      fullEn: "He always arrives on time for all his morning meetings.",
      uz: "U barcha ertalabki uchrashuvlariga doimo o'z vaqtida keladi."
    }
  ],
  "in time": [
    {
      fullEn: "We ran quickly and arrived just in time to catch the last bus.",
      uz: "Biz tez yugurdik va oxirgi avtobusga o'z vaqtida (ulgurib) yetib keldik."
    },
    {
      fullEn: "The doctor reached the emergency room in time to save the patient.",
      uz: "Shifokor bemorni qutqarish uchun tez yordam xonasiga o'z vaqtida yetib keldi."
    },
    {
      fullEn: "Will we finish this big project in time before the deadline?",
      uz: "Biz bu katta loyihani belgilangan muddatgacha ulgurib tugata olamizmi?"
    }
  ],
  "interested in": [
    {
      fullEn: "She has always been deeply interested in modern photography.",
      uz: "U doimo zamonaviy fotosurat san'atiga chuqur qiziqib kelgan."
    },
    {
      fullEn: "Are you interested in joining our school debate team this term?",
      uz: "Bu chorakda maktabimizning bahs-munozara jamoasiga a'zo bo'lishga qiziqasizmi?"
    },
    {
      fullEn: "Many teenagers are very interested in artificial intelligence and robotics.",
      uz: "Ko'plab o'smirlar sun'iy intellekt va robototexnikaga juda qiziqishadi."
    }
  ],
  "bored with": [
    {
      fullEn: "After playing for three hours, the boys got bored with the game.",
      uz: "Uch soat o'ynagach, bolalar o'yindan zerikib qolishdi."
    },
    {
      fullEn: "I am bored with watching the same movies repeatedly every weekend.",
      uz: "Har dam olish kunida bir xil filmlarni qayta-qayta tomosha qilishdan zerikdim."
    },
    {
      fullEn: "The students were bored with the long and monotone lecture.",
      uz: "Talabalar uzoq va bir xil ohangdagi ma'ruzadan zerikishdi."
    }
  ],
  "good at": [
    {
      fullEn: "My older brother is exceptionally good at solving complex mathematics.",
      uz: "Mening akam murakkab matematik masalalarni yechishda juda mohir va ustasi."
    },
    {
      fullEn: "She is very good at playing both the piano and acoustic guitar.",
      uz: "U ham pianino, ham akustik gitarani chalishda juda mohir."
    },
    {
      fullEn: "Practice every day if you want to become truly good at speaking English.",
      uz: "Ingliz tilida gapirishda chinakam mohir bo'lishni istasangiz, har kuni mashq qiling."
    }
  ],
  "popular with": [
    {
      fullEn: "This new cafe is extremely popular with local university students.",
      uz: "Ushbu yangi qahvaxona mahalliy universitet talabalari orasida juda mashhur."
    },
    {
      fullEn: "The adventure movie became very popular with teenagers worldwide.",
      uz: "Sarguzasht filmi butun dunyodagi o'smirlar orasida juda ommalashdi."
    },
    {
      fullEn: "His warm humor made him popular with all his school colleagues.",
      uz: "Uning samimiy hazil-mutoyibasi uni maktabdagi barcha hamkasblari orasida sevimli qildi."
    }
  ],
  "afraid": [
    {
      fullEn: "The little boy was afraid of the dark and asked for a nightlight.",
      uz: "Kichkina bola qorong'ulikdan qo'rqqan edi va tungi chiroqni yoqishni so'radi."
    },
    {
      fullEn: "Do not be afraid to make mistakes when you learn something new.",
      uz: "Yangi narsani o'rganayotganda xato qilishdan qo'rqmang."
    },
    {
      fullEn: "She felt afraid when she heard strange noises outside the window.",
      uz: "Deraza tashqarisidan g'alati tovushlarni eshitganida u qo'rquvni his qildi."
    }
  ],
  "agree": [
    {
      fullEn: "I completely agree with your opinion regarding this difficult matter.",
      uz: "Men ushbu qiyin masala bo'yicha sizning fikringizga to'liq qo'shilaman."
    },
    {
      fullEn: "Both sides could not agree on the terms of the new contract.",
      uz: "Har ikki tomon yangi shartnoma shartlari bo'yicha kelisha olishmadi."
    },
    {
      fullEn: "Most doctors agree that regular physical exercise is essential for health.",
      uz: "Aksariyat shifokorlar muntazam jismoniy mashqlar sog'liq uchun zarurligiga rozi."
    }
  ],
  "angry": [
    {
      fullEn: "He became very angry when he discovered that his bicycle was stolen.",
      uz: "U velosipedi o'g'irlanganini bilgach, juda qattiq g'azablandi."
    },
    {
      fullEn: "There is no reason to be angry over such a minor misunderstanding.",
      uz: "Bunday kichik tushunmovchilik uchun jahldor bo'lishga hech qanday sabab yo'q."
    },
    {
      fullEn: "Her angry voice surprised everyone in the quiet meeting room.",
      uz: "Uning g'azabnok ovozi sokin yig'ilish xonasidagi barchani hayratda qoldirdi."
    }
  ],
  "arrive": [
    {
      fullEn: "What time did the international flight arrive at the airport?",
      uz: "Xalqaro samolyot reysi aeroportga soat nechada yetib keldi?"
    },
    {
      fullEn: "We were happy to arrive safely at our hotel after the long trip.",
      uz: "Uzoq safardan so'ng mehmonxonamizga eson-omon yetib borganimizdan xursand bo'ldik."
    },
    {
      fullEn: "The package should arrive within two business days.",
      uz: "Posilka ikki ish kuni ichida yetib kelishi kerak."
    }
  ],
  "clever": [
    {
      fullEn: "The clever student found a simple solution to the hardest riddle.",
      uz: "Zukko o'quvchi eng qiyin topishmoqqa oddiy yechim topdi."
    },
    {
      fullEn: "It was a clever idea to pack an extra umbrella before leaving home.",
      uz: "Uydan chiqishdan oldin qo'shimcha soyabon olib olish oqilona g'oya edi."
    },
    {
      fullEn: "Dogs are very clever animals that can learn dozens of helpful tricks.",
      uz: "Itlar o'nlab foydali hiylalarni o'rgana oladigan juda aqlli hayvonlardir."
    }
  ],
  "cruel": [
    {
      fullEn: "It is wrong and unacceptable to be cruel to innocent animals.",
      uz: "Begunoh hayvonlarga nisbatan shafqatsiz bo'lish noto'g'ri va qabul qilib bo'lmasdir."
    },
    {
      fullEn: "The cruel ruler ignored the basic needs of his poor people.",
      uz: "Shafqatsiz hukmdor o'zining nochor xalqining asosiy ehtiyojlariga e'tibor bermadi."
    },
    {
      fullEn: "Fate dealt a cruel blow to the family during the difficult winter.",
      uz: "Qiyin qish faslida taqdir bu oilaga shafqatsiz zarba berdi."
    }
  ],
  "finally": [
    {
      fullEn: "After hours of exhausting walking, we finally reached the summit.",
      uz: "Bir necha soatlik charchatuvchi piyoda yurishdan so'ng, biz nihoyat cho'qqiga yetib keldik."
    },
    {
      fullEn: "She worked diligently and finally passed the difficult bar examination.",
      uz: "U astoydil o'qidi va nihoyat qiyin imtihondan muvaffaqiyatli o'tdi."
    },
    {
      fullEn: "The rain finally stopped and the bright sun appeared in the sky.",
      uz: "Yomg'ir nihoyat to'xtadi va osmonda yorqin quyosh ko'rindi."
    }
  ],
  "promise": [
    {
      fullEn: "You should never make a promise that you cannot keep.",
      uz: "Bajara olmaydigan va'dani hech qachon bermasligingiz kerak."
    },
    {
      fullEn: "He gave me his promise that he would return the borrowed book tomorrow.",
      uz: "U olingan kitobni ertaga qaytarib berishiga va'da berdi."
    },
    {
      fullEn: "She made a silent promise to herself to always work honestly.",
      uz: "U o'z-o'ziga doimo halol mehnat qilish haqida ichki va'da berdi."
    }
  ],
  "safe": [
    {
      fullEn: "Always wear your seatbelt to stay safe during the car ride.",
      uz: "Mashinada ketayotganda xavfsiz bo'lish uchun doimo xavfsizlik kamarini taqing."
    },
    {
      fullEn: "The hikers found a safe place to set up their camp for the night.",
      uz: "Sayyohlar tunash uchun chodir tikishga xavfsiz joy topdilar."
    },
    {
      fullEn: "Keep your personal passwords in a safe and secure location.",
      uz: "Shaxsiy parollaringizni xavfsiz va ishonchli joyda saqlang."
    }
  ]
};

// Clean Uzbek text for dynamic synthesis
function cleanUzbekTranslation(uz: string): string {
  const parts = uz.split(/[,;(]/);
  return parts[0].trim();
}

// Generate dynamic sentence variations for any word not explicitly curated
function generateDynamicSentence(
  targetEn: string,
  targetUz: string,
  attemptIndex: number
): { fullEn: string; uz: string } {
  const cleanUz = cleanUzbekTranslation(targetUz);
  const normalized = targetEn.trim().toLowerCase();
  const mod = Math.abs(attemptIndex) % 4;

  // Pattern detection
  const isPhrasalVerb = /^(take|give|carry|look|get|put|turn|come|go|bring|keep|stand|make|hold|break)\s+(up|down|on|off|in|out|away|back|over|after|for|to)$/i.test(normalized);
  const isVerb = normalized.endsWith("ise") || normalized.endsWith("ize") || normalized.endsWith("ate") || cleanUz.endsWith("moq") || cleanUz.endsWith("sh");
  const isAdjective = normalized.endsWith("ful") || normalized.endsWith("ous") || normalized.endsWith("ive") || normalized.endsWith("able") || normalized.endsWith("ible") || normalized.endsWith("ic") || normalized.endsWith("al");

  if (isPhrasalVerb) {
    switch (mod) {
      case 0:
        return {
          fullEn: `You should never ${targetEn} when faced with an unexpected obstacle.`,
          uz: `Kutilmagan to'siqqa duch kelganda siz hech qachon ${cleanUz} qilmasligingiz kerak.`
        };
      case 1:
        return {
          fullEn: `They decided to ${targetEn} after discussing all the available options.`,
          uz: `Ular barcha mavjud variantlarni muhokama qilgandan so'ng ${cleanUz} qaroriga keldilar.`
        };
      case 2:
        return {
          fullEn: `It is essential to ${targetEn} in order to achieve meaningful progress.`,
          uz: `Sezilarli yutuqlarga erishish uchun ${cleanUz} juda muhimdir.`
        };
      default:
        return {
          fullEn: `The teacher explained why we need to ${targetEn} in this specific situation.`,
          uz: `O'qituvchi nima sababdan ushbu vaziyatda ${cleanUz} kerakligini tushuntirdi.`
        };
    }
  }

  if (isVerb) {
    switch (mod) {
      case 0:
        return {
          fullEn: `Every student should learn how to ${targetEn} effectively in modern life.`,
          uz: `Har bir o'quvchi zamonaviy hayotda qanday qilib unumli ${cleanUz} kerakligini o'rganishi lozim.`
        };
      case 1:
        return {
          fullEn: `We must ${targetEn} before we can see real improvement in our results.`,
          uz: `Natijalarimizda haqiqiy o'sishni ko'rishdan oldin biz ${cleanUz}imiz zarur.`
        };
      case 2:
        return {
          fullEn: `He tried his best to ${targetEn} despite all the difficulties.`,
          uz: `Barcha qiyinchiliklarga qaramay, u bor kuchi bilan ${cleanUz}ga harakat qildi.`
        };
      default:
        return {
          fullEn: `It took a lot of dedication and practice to ${targetEn} properly.`,
          uz: `To'g'ri tarzda ${cleanUz} uchun juda ko'p fidoyilik va mashq talab etildi.`
        };
    }
  }

  if (isAdjective) {
    switch (mod) {
      case 0:
        return {
          fullEn: `Her presentation was very ${targetEn} and impressed all the listeners.`,
          uz: `Uning taqdimoti juda ${cleanUz} bo'lib, barcha tinglovchilarda katta taassurot qoldirdi.`
        };
      case 1:
        return {
          fullEn: `It is always helpful to stay ${targetEn} in challenging moments.`,
          uz: `Qiyin damlarda doimo ${cleanUz} bo'lib qolish juda foydalidir.`
        };
      case 2:
        return {
          fullEn: `The new policy turned out to be quite ${targetEn} for the entire community.`,
          uz: `Yangi tartib-qoida butun jamiyat uchun ancha ${cleanUz} bo'lib chiqdi.`
        };
      default:
        return {
          fullEn: `They chose a ${targetEn} approach to solve the problem quickly.`,
          uz: `Ular muammoni tezda hal qilish uchun ${cleanUz} yondashuvni tanladilar.`
        };
    }
  }

  // General noun / term fallback
  switch (mod) {
    case 0:
      return {
        fullEn: `The teacher asked us to find an example of a ${targetEn} in today's lesson.`,
        uz: `O'qituvchi bugungi darsda "${cleanUz}"ga misol topishimizni so'radi.`
      };
    case 1:
      return {
        fullEn: `Understanding the concept of ${targetEn} is essential for your studies.`,
        uz: `"${cleanUz}" tushunchasini to'g'ri anglash sizning o'qishingiz uchun juda muhimdir.`
      };
    case 2:
      return {
        fullEn: `They had an interesting discussion about the role of ${targetEn} in society.`,
        uz: `Ular jamiyatda "${cleanUz}"ning tutgan o'rni haqida qiziqarli munozara o'tkazdilar.`
      };
    default:
      return {
        fullEn: `He wrote an insightful article explaining what a ${targetEn} represents.`,
        uz: `U "${cleanUz}" nimani anglatishini tushuntirib beruvchi mazmunli maqola yozdi.`
      };
  }
}

/**
 * Gets a contextual sentence with a blank for a target word.
 * If attemptIndex increases (e.g. word was answered incorrectly and re-queued),
 * it returns a DIFFERENT sentence and a DIFFERENT translation!
 */
export function getSentenceForWord(
  targetEn: string,
  targetUz: string,
  attemptIndex: number = 0
): SentenceExample {
  const normKey = targetEn.trim().toLowerCase();
  const curatedList = CURATED_SENTENCES[normKey];

  let chosen: { fullEn: string; uz: string };

  if (curatedList && curatedList.length > 0) {
    const idx = Math.abs(attemptIndex) % curatedList.length;
    chosen = curatedList[idx];
  } else {
    chosen = generateDynamicSentence(targetEn, targetUz, attemptIndex);
  }

  // Locate the target word inside fullEn (case-insensitive) to create before & after
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
      uz: chosen.uz
    };
  }

  // Fallback if exact word boundary wasn't hit
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
      uz: chosen.uz
    };
  }

  // Extreme fallback
  return {
    before: "Please complete the sentence: ... ",
    blank: targetEn,
    after: ".",
    fullEn: `Please complete the sentence: ${targetEn}.`,
    uz: `Gapni to'ldiring: ${targetUz}`
  };
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
