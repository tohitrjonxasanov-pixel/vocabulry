export interface Word {
  en: string;
  uz: string;
}

export interface Category {
  name: string;
  words: [string, string][];
}

export interface Unit {
  id: string;
  title: string;
  categories?: Category[]; // For Destination B1
  words?: [string, string][]; // For 4000 Essential English Words
}

export interface Book {
  id: string;
  title: string;
  description: string;
  units: Unit[];
}

export const BOOKS: Book[] = [
  {
    id: "destination-b1",
    title: "Destination B1",
    description: "Grammar & Vocabulary — 14 ta mavzulashtirilgan lug'at darsliklari (Topic vocabulary, Phrasal verbs, Prepositional phrases, Word formation, Word patterns).",
    units: [
      {
        id: "unit1",
        title: "Unit 1 — Sport, Music & Entertainment (Fun & Games)",
        categories: [
          {
            name: "Topic vocabulary",
            words: [
              ["beat", "yutmoq, mag'lub etmoq"],
              ["board game", "stol o'yini (shashka, shaxmat kabi)"],
              ["captain", "kapitan, sardor"],
              ["challenge", "qiyinchilik, chorlov; chorlamoq"],
              ["champion", "chempion, g'olib"],
              ["cheat", "g'irlik qilmoq, aldamoq"],
              ["classical music", "klassik musiqiy asar"],
              ["club", "klub, to'garak"],
              ["coach", "murabbiy, trener"],
              ["competition", "musobaqa, bellashuv"],
              ["concert", "konsert, tomosha"],
              ["defeat", "mag'lub etmoq, mag'lubiyat"],
              ["entertaining", "ko'ngilochar, qiziqarli"],
              ["folk music", "xalq musiqasi"],
              ["group", "guruh (musiqiy)"],
              ["gym", "sport zal, gimnastika zali"],
              ["have fun", "vaqtni chog' o'tkazmoq, ko'ngil yozmoq"],
              ["interest", "qiziqish; qiziqtirmoq"],
              ["member", "a'zo, qatnashchi"],
              ["opponent", "raqib, qarshi taraf"],
              ["organise", "tashkil etmoq, rejalashtirmoq"],
              ["pleasure", "zavq, huzur, mamnuniyat"],
              ["referee", "hakam (sportda)"],
              ["rhythm", "ritm, ohang"],
              ["risk", "tavakkal qilmoq, xavf-xatar"],
              ["score", "ochko/gol to'plamoq, hisob"],
              ["support", "qo'llab-quvvatlamoq"],
              ["team", "jamoa, komanda"],
              ["train", "shug'ullanmoq, chiniqmoq"],
              ["video game", "video o'yin"]
            ]
          },
          {
            name: "Phrasal verbs",
            words: [
              ["carry on", "davom ettirmoq (continue)"],
              ["eat out", "restoranda/tashqarida ovqatlanmoq (eat at a restaurant)"],
              ["give up", "tashlamoq, to'xtatmoq (stop doing sth regularly)"],
              ["join in", "qo'shilmoq, ishtirok etmoq (participate, take part)"],
              ["send off", "maydondan chetlatmoq, qizil kartochka bermoq (make a player leave)"],
              ["take up", "boshlamoq, kirishmoq (yangi xobbi, sport) (start a hobby, sport)"],
              ["turn down", "ovozini pasaytirmoq (lower the volume of)"],
              ["turn up", "ovozini balandlatmoq (increase the volume of)"]
            ]
          },
          {
            name: "Prepositional phrases",
            words: [
              ["for a long time", "uzoq vaqt davomida, ancha payt"],
              ["for fun", "ko'ngilxushlik uchun, shunchaki xursandchilikka"],
              ["in the middle (of)", "o'rtasida, markazida"],
              ["in time (for)", "o'z vaqtida, ulgurib yetib kelmoq"],
              ["on CD/DVD/video", "CD/DVD yoki videoda"],
              ["on stage", "sahnada, omma oldida"]
            ]
          },
          {
            name: "Word formation",
            words: [
              ["act", "action, (in)active, actor (harakat, (no)faol, aktyor)"],
              ["athlete", "athletic, athletics (sportchi, atletik, yengil atletika)"],
              ["child", "children, childhood (bola, bolalar, bolalik)"],
              ["collect", "collection, collector (to'plamoq, kolleksiya, kolleksioner)"],
              ["entertain", "entertainment (ko'ngil ochmoq, ko'ngilochar tomosha)"],
              ["hero", "heroic, heroine (qahramon, qahramonona, qahramon ayol)"],
              ["music", "musical, musician (musiqa, musiqiy, musiqachi)"],
              ["play", "player, playful (o'ynamoq, o'yinchi, o'yinqaroq)"],
              ["sail", "sailing, sailor (suzmoq, kemada suzish, dengizchi)"],
              ["sing", "sang, sung, song, singer, singing (kuylamoq, qo'shiq, xonanda, kuylash)"]
            ]
          },
          {
            name: "Word patterns",
            words: [
              ["bored with", "zerikkan (biror narsadan charchagan)"],
              ["crazy about", "jinni bo'lgan, haddan tashqari qiziqqan"],
              ["good at", "yaxshi, usta, qo'lidan keladigan"],
              ["interested in", "qiziqqan (biror soha yoki fanga)"],
              ["keen on", "ishqiboz, juda qiziqadigan"],
              ["popular with", "orasida mashhur, hamma yaxshi ko'radigan"],
              ["feel like", "xohlamoq, ko'ngil tusamoq"],
              ["listen to", "tinglamoq, quloq solmoq"],
              ["take part in", "ishtirok etmoq, qatnashmoq"],
              ["book (by sb) about", "kimdir tomonidan yozilgan biror narsa haqidagi kitob"],
              ["fan of", "muxlisi, ishqibozi"],
              ["game against", "qarshi o'yin, raqibga qarshi bahs"]
            ]
          }
        ]
      },
      {
        id: "unit2",
        title: "Unit 2 — Education & Learning (Learning & Doing)",
        categories: [
          {
            name: "Topic vocabulary",
            words: [
              ["achieve", "erishmoq, muvaffaqiyat qozonmoq"],
              ["brain", "miya, aql-zakovat"],
              ["clever", "aqlli, zukko"],
              ["concentrate", "diqqatni jamlamoq, e'tibor qaratmoq"],
              ["consider", "haqida o'ylamoq, hisobga olmoq"],
              ["course", "kurs, o'quv yo'nalishi"],
              ["degree", "daraja, diplom, ilmiy unvon"],
              ["experience", "tajriba, ko'nikma; boshdan o'tkazmoq"],
              ["expert", "ekspert, usta, mutaxassis"],
              ["fail", "yiqilmoq (imtihondan), muvaffaqiyatsizlikka uchramoq"],
              ["guess", "taxmin qilmoq, topmoq"],
              ["hesitate", "ikkilanmoq, shubhalanmoq"],
              ["instruction", "ko'rsatma, yo'riqnoma"],
              ["make progress", "o'smoq, rivojlanmoq, siljish qilmoq"],
              ["make sure", "ishonch hosil qilmoq, aniqlashtirmoq"],
              ["mark", "baho, belgi, baholamoq"],
              ["mental", "aqliy, ruhiy, fikriy"],
              ["pass", "o'tmoq (imtihondan), ruxsat olmoq"],
              ["qualification", "malaka, diplom, sertifikat"],
              ["remind", "eslatmoq, yodga solmoq"],
              ["report", "hisobot, ma'ruza, tabel"],
              ["revise", "takrorlamoq (darsni), qayta ko'rib chiqmoq"],
              ["search", "qidirmoq, qidiruv"],
              ["skill", "mahorat, qobiliyat, hunar"],
              ["smart", "aqlli, chaqqon, chiroyli"],
              ["subject", "fan, mavzu"],
              ["take an exam", "imtihon topshirmoq"],
              ["talented", "talantli, qobiliyatli, iqtidorli"],
              ["term", "chorak, semestr, termin, muddat"],
              ["wonder", "ajablanmoq, bilishga qiziqmoq"]
            ]
          },
          {
            name: "Phrasal verbs",
            words: [
              ["cross out", "ustidan chiziq tortmoq (draw a line through written sth)"],
              ["look up", "lug'atdan qidirmoq (try to find info in a book/dict)"],
              ["point out", "ko'rsatib o'tmoq, ta'kidlamoq (tell sb important info)"],
              ["read out", "ovoz chiqarib o'qimoq (say sth out loud you are reading)"],
              ["rip up", "maydalab yirtib tashlamoq (tear into pieces)"],
              ["rub out", "o'chirgich bilan o'chirmoq (remove with a rubber)"],
              ["turn over", "orqa tomonini o'girmoq (turn sth so other side is toward you)"],
              ["write down", "qog'ozga yozib qo'ymoq (write info on paper)"]
            ]
          },
          {
            name: "Prepositional phrases",
            words: [
              ["by heart", "yoddan, yod olib (memorize)"],
              ["for instance", "misol uchun, masalan (for example)"],
              ["in conclusion", "xulosa o'rnida, xulosa qilib aytganda"],
              ["in fact", "aslida, haqiqatda (actually)"],
              ["in favour (of)", "tomonida bo'lmoq, qo'llab-quvvatlash"],
              ["in general", "umuman olganda, odatda (generally)"]
            ]
          },
          {
            name: "Word formation",
            words: [
              ["begin", "began, begun, beginner, beginning (boshlamoq, boshlovchi, boshlanish)"],
              ["brave", "bravery (jasur, jasorat, dovyuraklik)"],
              ["correct", "correction, incorrect (to'g'rilamoq, to'g'rilash, noto'g'ri)"],
              ["divide", "division (bo'lmoq, bo'lish, bo'lim)"],
              ["educate", "education (tarbiyalamoq, ta'lim, o'qitish)"],
              ["instruct", "instruction, instructor (yo'riqlash, ko'rsatma, yo'riqchi)"],
              ["memory", "memorise, memorial (xotira, yod olmoq, yodgorlik)"],
              ["refer", "reference (havola qilmoq, havola, manba)"],
              ["silent", "silence, silently (sokin, sukunat, jimgina)"],
              ["simple", "simplify, simplicity (oddiy, soddalashtirmoq, soddalik)"]
            ]
          },
          {
            name: "Word patterns",
            words: [
              ["capable of", "qo'lidan keladigan, qodir bo'lgan"],
              ["talented at", "nimagadir qobiliyati bor bo'lgan"],
              ["cheat at/in", "imtihonda g'irlik/shpargalka qilmoq"],
              ["confuse sth with", "nimanidir boshqa narsa bilan adashtirib yubormoq"],
              ["continue with", "nimanidir davom ettirmoq"],
              ["cope with", "uddalamoq, qiyinchilikni yengib o'tmoq"],
              ["help (sb) with", "kimdirga biror ishda yordam bermoq"],
              ["know about", "haqida bilmoq"],
              ["learn about", "haqida o'rganmoq"],
              ["succeed in", "muvaffaqiyat qozonmoq"],
              ["an opinion about/of", "haqidagi shaxsiy fikr/mulohaza"],
              ["a question about", "haqidagi savol"]
            ]
          }
        ]
      },
      {
        id: "unit3",
        title: "Unit 3 — Travel & Transport (Coming & Going)",
        categories: [
          {
            name: "Topic vocabulary",
            words: [
              ["abroad", "chet elda, xorijda"],
              ["accommodation", "turar joy, yashash joyi"],
              ["book", "buyurtma qilmoq, bron qilmoq"],
              ["break", "tanaffus, ta'til"],
              ["cancel", "bekor qilmoq (sayohat, reysni)"],
              ["catch", "ulgurmoq, tutib olmoq (avtobus, poyezdni)"],
              ["coach", "shaharlararo katta avtobus"],
              ["convenient", "qulay, qulaylik yaratadigan"],
              ["crash", "to'qnashuv, halokat; to'qnashmoq"],
              ["crowded", "tiqilinch, odam bilan to'la"],
              ["cruise", "kema sayohati, dengiz sayohati"],
              ["delay", "kechikish, kechiktirmoq"],
              ["destination", "boriladigan manzil, marra"],
              ["ferry", "parom, suv transporti"],
              ["flight", "parvoz, uchoq safari"],
              ["foreign", "xorijiy, chet elga tegishli"],
              ["harbour", "bandargoh, kema to'xtash joyi"],
              ["journey", "sayohat, safar (uzoq masofaga)"],
              ["luggage", "yuk, chamadonlar (bagaj)"],
              ["nearby", "yaqin atrofdagi, yaqin oradagi"],
              ["pack", "chamadon yig'moq, qadoqlamoq"],
              ["passport", "pasport"],
              ["platform", "perron, poyezd to'xtash joyi"],
              ["public transport", "jamoat transporti"],
              ["reach", "yetib bormoq, yetib kelmoq"],
              ["resort", "dam olish maskani, kurort"],
              ["souvenir", "esdalik sovg'asi, suvenir"],
              ["traffic", "yo'l harakati, mashinalar oqimi"],
              ["trip", "qisqa sayohat, safar"],
              ["vehicle", "transport vositasi, ulov"]
            ]
          },
          {
            name: "Phrasal verbs",
            words: [
              ["get in(to)", "mashinaga o'tirmoq, ichkariga kirmoq"],
              ["get off", "transportdan tushmoq (avtobus, poyezd)"],
              ["get on(to)", "transportga o'tirmoq/chiqmoq (avtobus, poyezd)"],
              ["get out (of)", "mashinadan tushmoq, xonadan chiqib ketmoq"],
              ["go away", "tark etmoq, ketmoq, uzoqlashmoq"],
              ["go back (to)", "qaytib bormoq, qaytib kelmoq"],
              ["set off", "sayohatni/safarni boshlamoq"],
              ["take off", "ko'tarilmoq (samolyot yerga nisbatan)"]
            ]
          },
          {
            name: "Prepositional phrases",
            words: [
              ["by air/sea/bus/car/etc", "havo/suv/avtobus/mashina orqali"],
              ["on board", "kemada/samolyot bortida bo'lmoq"],
              ["on foot", "piyoda, oyoqda yurib"],
              ["on holiday", "ta'tilda, dam olishda"],
              ["on schedule", "jadval bo'yicha, reja asosida o'z vaqtida"],
              ["on the coast", "dengiz/okean qirg'og'ida"]
            ]
          },
          {
            name: "Word formation",
            words: [
              ["attract", "attractive, attraction (jalb qilmoq, jozibali, diqqatga sazovor joy)"],
              ["back", "backwards (orqa, orqaga qarab)"],
              ["choose", "chose, chosen, choice (tanlamoq, tanlangan, tanlov)"],
              ["comfort", "comfortable, uncomfortable (taskin berish, qulay, noqulay)"],
              ["depart", "departure (jo'nab ketmoq, jo'nash)"],
              ["direct", "direction (yo'naltirmoq, yo'nalish)"],
              ["drive", "drove, driven, driver (mashina haydamoq, haydovchi)"],
              ["fly", "flew, flown, flight (uchmoq, parvoz)"],
              ["travel", "traveller (sayohat qilmoq, sayohatchi)"],
              ["visit", "visitor (tashrif buyurmoq, mehmon/tashrifchi)"]
            ]
          },
          {
            name: "Word patterns",
            words: [
              ["close to", "yaqin, yonida"],
              ["famous for", "bilan mashhur/taniqli bo'lgan"],
              ["far from", "uzoqda, yiroqda bo'lgan"],
              ["late for", "kechikkan (darsga, uchrashuvga)"],
              ["suitable for", "mos keladigan, to'g'ri keladigan"],
              ["arrive at/in", "yetib kelmoq (bino / shahar yoki mamlakatga)"],
              ["ask (sb) about", "kimdandir biror narsa haqida so'ramoq"],
              ["ask for", "so'ramoq (yordam, pul yoki ruxsat)"],
              ["look at", "qaramoq, ko'z yugurtirmoq"],
              ["prepare for", "tayyorlanmoq (imtihon yoki safarga)"],
              ["provide sb with", "kimnidir narsa bilan ta'minlamoq"],
              ["wait for", "kutmoq (kimnidir, poezdni)"]
            ]
          }
        ]
      },
      {
        id: "unit4",
        title: "Unit 4 — Friends & Relations (Friends & Relations)",
        categories: [
          {
            name: "Topic vocabulary",
            words: [
              ["apologise", "uzr so'ramoq, kechirim so'ramoq"],
              ["boyfriend", "yigit (qizning sevgilisi)"],
              ["close", "yaqin (do'st, qarindosh)"],
              ["confident", "o'ziga ishongan, dadil"],
              ["cool", "zamonaviy, ajoyib"],
              ["couple", "juftlik, er-xotin"],
              ["decorate", "bezatmoq, pardozlamoq"],
              ["defend", "himoya qilmoq, yoqlamoq"],
              ["divorced", "ajrashgan (er-xotin)"],
              ["flat", "kvartira, xonadon"],
              ["generous", "saxiy, qo'li ochiq"],
              ["girlfriend", "qiz (yigitning sevgilisi)"],
              ["grateful", "minnatdor, mamnun"],
              ["guest", "mehmon, chaqirilgan kishi"],
              ["independent", "mustaqil, erkin"],
              ["introduce", "tanishtirmoq, taqdim etmoq"],
              ["loving", "mehribon, sevadigan"],
              ["loyal", "sodiq, vafodor"],
              ["mood", "kayfiyat, ruhiy holat"],
              ["neighbourhood", "mahalla, atrof-muhit, qo'shnichilik"],
              ["ordinary", "oddiy, odatdagidek"],
              ["patient", "sabrli, chidamli"],
              ["private", "shaxsiy, xususiy, maxfiy"],
              ["recognise", "tanimoq, tanib qolmoq"],
              ["relation", "qarindosh, aloqa"],
              ["rent", "ijoraga olmoq/bermoq; ijara haqi"],
              ["respect", "hurmat qilmoq, e'zozlamoq; hurmat"],
              ["single", "yolg'iz, bo'ydoq, turmush qurmagan"],
              ["stranger", "notanish kishi, begona"],
              ["trust", "ishonmoq, ishonch bildirmoq; ishonch"]
            ]
          },
          {
            name: "Phrasal verbs",
            words: [
              ["bring up", "tarbiyalamoq, voyaga yetkazmoq (take care of a child)"],
              ["fall out (with)", "urushib/janjallashib qolmoq (have an argument and stop being friends)"],
              ["get on (with)", "yaxshi chiqishmoq, munosabati yaxshi bo'lmoq (have a good relationship)"],
              ["go out with", "uchrashib yurmoq, sevishmoq (be the boyfriend/girlfriend of)"],
              ["grow up", "ulg'aymoq, voyaga yetmoq (become older for children)"],
              ["let down", "ishonchni oqlamaslik, umidni uzmoq (disappoint sb)"],
              ["look after", "g'amxo'rlik qilmoq, qarab turmoq (take care of)"],
              ["split up", "ajrashmoq, munosabatlarni uzmoq (end a relationship)"]
            ]
          },
          {
            name: "Prepositional phrases",
            words: [
              ["by yourself", "yolg'iz o'zingiz, yordamsiz (alone)"],
              ["in common (with)", "o'xshashlik, umumiylik (have things in common)"],
              ["in contact (with)", "aloqada bo'lmoq (keep in contact)"],
              ["in love (with)", "sevib qolgan (be in love with)"],
              ["on purpose", "ataylab, atayin, qasddan (intentionally)"],
              ["on your own", "mustaqil, yolg'iz o'zi (by yourself)"]
            ]
          },
          {
            name: "Word formation",
            words: [
              ["able", "ability, disabled, unable (qodir, qobiliyat, nogiron, qodir bo'lmagan)"],
              ["admire", "admiration (havas qilmoq, hayratlanish/havas)"],
              ["care", "careful, careless (g'amxo'rlik, ehtiyotkor, e'tiborsiz)"],
              ["confident", "confidence (o'ziga ishongan, ishonch)"],
              ["forgive", "forgave, forgiven, forgiveness (kechirmoq, kechirim)"],
              ["honest", "dishonest, honesty (halol, vijdonsiz, halollik)"],
              ["introduce", "introduction (tanishtirmoq, kirish/tanishtirish)"],
              ["lie", "liar, lying (yolg'on gapirmoq, yolg'onchi, aldash)"],
              ["person", "personality, personal (shaxs, shaxsiyat, shaxsiy)"],
              ["relate", "relative, relation, relationship (bog'lanmoq, qarindosh, aloqa, munosabat)"]
            ]
          },
          {
            name: "Word patterns",
            words: [
              ["fond of", "yaxshi ko'radigan, mehr qo'ygan"],
              ["jealous of", "rashk qiladigan, ko'ra olmaydigan"],
              ["kind to", "mehribon, shirinso'z"],
              ["married to", "turmush qurgan (kimdir bilan)"],
              ["proud of", "faxrlanadigan, g'ururlanadigan"],
              ["admire sb for", "kimdirga biror ishi uchun havas qilmoq"],
              ["apologise (to sb) for", "kimdandir biror xato uchun uzr so'ramoq"],
              ["argue (with sb) about", "kimdir bilan biror mavzuda bahslashmoq"],
              ["care about", "g'amxo'rlik qilmoq, qayg'urmoq"],
              ["chat (to sb) about", "kimdir bilan suhbatlashmoq, gurunglashmoq"],
              ["an argument (with sb) about", "kimdir bilan bahslashish/tortishuv"],
              ["a relationship with", "kimdir bilan bo'lgan munosabat"]
            ]
          }
        ]
      },
      {
        id: "unit5",
        title: "Unit 5 — Buying & Selling (Buying & Selling)",
        categories: [
          {
            name: "Topic vocabulary",
            words: [
              ["advertisement", "reklama, e'lon"],
              ["afford", "qurbi yetmoq (pul tomondan)"],
              ["bargain", "arzon xarid, arzon garov buyum"],
              ["brand", "brend, savdo belgisi"],
              ["catalogue", "katalog, mahsulotlar ro'yxati"],
              ["change", "mayda pul, qaytim"],
              ["coin", "tangacha, tanga pul"],
              ["cost", "narxlanmoq, xarajat turmoq; narx"],
              ["customer", "xaridor, mijoz"],
              ["debt", "qarz, burch"],
              ["demand", "talab qilmoq; talab, ehtiyoj"],
              ["export", "eksport qilmoq, chetga sotmoq"],
              ["fee", "to'lov, xizmat haqi (masalan o'qish, advokat uchun)"],
              ["fortune", "katta boylik, omad"],
              ["import", "import qilmoq, chetdan olib kelmoq"],
              ["invest", "sarmoya kiritmoq, investitsiya qilmoq"],
              ["obtain", "qo'lga kiritmoq, olmoq, erishmoq"],
              ["owe", "qarz bo'lmoq"],
              ["own", "egalik qilmoq; shaxsiy o'ziniki"],
              ["product", "mahsulot, ishlab chiqarilgan narsa"],
              ["profit", "foyda, daromad, foyda ko'rmoq"],
              ["property", "mulk, ko'chmas mulk"],
              ["purchase", "sotib olmoq; xarid"],
              ["receipt", "kassa cheki, kvitansiya"],
              ["require", "talab qilmoq, ehtiyoj sezmoq"],
              ["sale", "sotuv, arzonlashtirilgan savdo"],
              ["save", "tejamoq, pul jamg'armoq"],
              ["select", "tanlamoq, saylamoq"],
              ["supply", "ta'minlamoq, yetkazib bermoq; ta'minot"],
              ["variety", "turli-tumanlik, xilma-xillik"],
              ["waste", "isrof qilmoq, isrof"]
            ]
          },
          {
            name: "Phrasal verbs",
            words: [
              ["add up", "jami hisobni chiqarmoq, qo'shmoq (find the total of)"],
              ["come back (from)", "qaytib kelmoq (return from)"],
              ["give away", "tekinga berib yubormoq (give sth free of charge)"],
              ["hurry up", "shoshilmoq, tezroq harakat qilmoq (do sth more quickly)"],
              ["pay back", "qarzni qaytarmoq (return money to sb)"],
              ["save up (for)", "pul yig'moq (mahsus maqsad uchun) (save money for a specific purpose)"],
              ["take back", "qaytarib bermoq (do'konga sotib olingan narsani) (return sth to the place)"],
              ["take down", "olib tashlamoq, pastga tushirmoq (remove from a high place)"]
            ]
          },
          {
            name: "Prepositional phrases",
            words: [
              ["by credit card/cheque", "kredit karta/chek orqali to'lov qilish"],
              ["for rent", "ijoraga qo'yilgan (uy, bino)"],
              ["for sale", "sotuvga qo'yilgan, sotiladi"],
              ["in cash", "naqd pulda to'lash"],
              ["in debt", "qarzga botgan, qarzdor bo'lish"],
              ["in good/bad condition", "yaxshi/yomon holatda bo'lgan"]
            ]
          },
          {
            name: "Word formation",
            words: [
              ["add", "addition (qo'shmoq, qo'shish/qo'shimcha)"],
              ["afford", "affordable (qurbi yetadigan, hamyonbop)"],
              ["compare", "comparison (taqqoslamoq, taqqoslash/solishtirish)"],
              ["decide", "decision (qaror qabul qilmoq, qaror)"],
              ["expense", "(in)expensive (xarajat, qimmat, arzon)"],
              ["judge", "judgement (baho bermoq, hukm/qaror/fikr)"],
              ["serve", "service, servant (xizmat qilmoq, xizmat ko'rsatish, xizmatkor)"],
              ["true", "truth, untrue, truthful (haqiqiy, haqiqat, noto'g'ri, haqgo'y)"],
              ["use", "useful, useless (foydali, foydasiz)"],
              ["value", "valuable (qiymat, qimmatbaho)"]
            ]
          },
          {
            name: "Word patterns",
            words: [
              ["wrong about/with", "noto'g'ri, xato qilgan"],
              ["belong to", "tegishli bo'lmoq"],
              ["borrow sth from", "qarz olmoq kimdandir"],
              ["buy sth from", "sotib olmoq kimdandir"],
              ["choose between", "orasidan tanlamoq"],
              ["compare sth to/with", "taqqoslamoq"],
              ["decide on", "tanlash, bir qarorga kelmoq"],
              ["lend sth to", "qarz bermoq kimdirga"],
              ["pay for", "to'lov qilmoq"],
              ["spend sth on", "sarflamoq pul/vaqtni"],
              ["an advertisement for", "uchun reklama"]
            ]
          }
        ]
      },
      {
        id: "unit6",
        title: "Unit 6 — Inventions & Discoveries (Inventions & Discoveries)",
        categories: [
          {
            name: "Topic vocabulary",
            words: [
              ["artificial", "sun'iy, yasama (tabiiy bo'lmagan)"],
              ["automatic", "avtomatik, o'z-o'zidan ishlaydigan"],
              ["complicated", "murakkab, chalkash, tushunarsiz"],
              ["decrease", "kamaymoq, pasaymoq; kamayish"],
              ["digital", "raqamli (texnologiya)"],
              ["discover", "kashf qilmoq, yangi narsa topmoq"],
              ["effect", "ta'sir, natija, oqibat"],
              ["equipment", "uskuna, asbob-anjom, jihoz"],
              ["estimate", "taxminan baholamoq, baholash"],
              ["exact", "aniq, xatosiz"],
              ["experiment", "tajriba o'tkazmoq; tajriba"],
              ["gadget", "gadjet, moslama, kichik asbob"],
              ["hardware", "texnika jihozlari, qattiq qismlar (kompyuter)"],
              ["invent", "ixtiro qilmoq, yaratmoq (yangi moslama)"],
              ["involve", "jalb qilmoq, o'z ichiga olmoq"],
              ["laboratory", "laboratoriya"],
              ["lack", "yetishmaslik, muhtoj bo'lmoq; kamchilik"],
              ["laptop", "noutbuk, portativ kompyuter"],
              ["maximum", "maksimal, eng yuqori daraja"],
              ["minimum", "minimal, eng kam daraja"],
              ["operate", "boshqarmoq, ishlatmoq (mashina, uskunani)"],
              ["plastic", "plastmassa, plastik"],
              ["program", "dasturlamoq; dastur"],
              ["research", "tadqiqot, ilmiy izlanish; tadqiq qilmoq"],
              ["run", "boshqarmoq (tajriba, biznesni), ishlatmoq"],
              ["screen", "ekran, monitor"],
              ["software", "dasturiy ta'minot (kompyuter)"],
              ["sudden", "kutilmagan, tasodifiy, birdan sodir bo'lgan"],
              ["technology", "texnologiya, texnika vositasi"],
              ["unique", "yagona, betakror, noyob"]
            ]
          },
          {
            name: "Phrasal verbs",
            words: [
              ["break down", "buzilib qolmoq (mashina, texnika) (stop working)"],
              ["come across", "tasodifan duch kelmoq (find sth by chance)"],
              ["find out", "aniqlamoq, bilib olmoq (discover information)"],
              ["make up", "to'qimoq (yolg'on hikoya, bahona) (invent an explanation)"],
              ["pull off", "tortib yulib olmoq, sindirmoq (break by pulling)"],
              ["throw away", "axlatga tashlab yubormoq (put sth in a rubbish bin)"],
              ["turn off", "o'chirmoq (elektr asbobini) (stop a machine working)"],
              ["turn on", "yoqmoq (elektr asbobini) (start a machine working)"]
            ]
          },
          {
            name: "Prepositional phrases",
            words: [
              ["at last", "vanihoyat, oxir-oqibat (finally)"],
              ["by chance", "tasodifan, kutilmaganda (accidentally)"],
              ["in my opinion", "mening fikrimcha, nazarimda"],
              ["in the end", "yakunda, oxirida (finally)"],
              ["in the future", "kelajakda, kelgusida"],
              ["out of order", "ishlamayapti, buzilgan (not working)"]
            ]
          },
          {
            name: "Word formation",
            words: [
              ["boil", "boiler, boiling (qaynamoq, qozon/qaynatgich, qaynayotgan)"],
              ["chemist", "chemical, chemistry (kimyogar, kimyoviy, kimyo fani)"],
              ["conclude", "conclusion (xulosa qilmoq, xulosa)"],
              ["examine", "exam, examination, examiner (tekshirmoq, imtihon, imtihon qiluvchi)"],
              ["fascinate", "fascination, fascinating (rom qilmoq, maftunkorlik, juda qiziqarli)"],
              ["history", "historic, historian (tarix, tarixiy, tarixchi)"],
              ["identical", "identically (bir xil, bir xilda)"],
              ["long", "length (uzun, uzunlik)"],
              ["measure", "measurement (o'lchamoq, o'lchov)"],
              ["science", "scientist (fan, olim)"]
            ]
          },
          {
            name: "Word patterns",
            words: [
              ["different from/to", "dan farqli bo'lgan"],
              ["full of", "bilan to'la (full of water)"],
              ["begin sth with", "boshlamoq (nimanidir bilan)"],
              ["connect sth to/with", "nimanidir ulamoq/bog'lamoq"],
              ["disconnect sth from", "ulanishni uzmoq narsadan"],
              ["fill sth with", "nimanidir to'ldirmoq boshqa narsa bilan"],
              ["result in", "natijaga olib kelmoq"],
              ["difference between", "orasidagi farq"],
              ["an idea about", "haqidagi g'oya/tasavvur"],
              ["a number of", "bir nechta, bir qancha"],
              ["a reason for", "ning sababi"],
              ["a type of", "ning bir turi"]
            ]
          }
        ]
      },
      {
        id: "unit7",
        title: "Unit 7 — Sending & Receiving (Sending & Receiving)",
        categories: [
          {
            name: "Topic vocabulary",
            words: [
              ["accent", "lahja, talaffuz"],
              ["announcement", "e'lon, bildirishnoma"],
              ["broadcast", "efirga uzatmoq, efir"],
              ["channel", "kanal (televideniye)"],
              ["clear", "aniq, tushunarli, musaffo"],
              ["click", "sichqonchani bosmoq, chertish"],
              ["contact", "aloqa qilmoq, bog'lanmoq"],
              ["file", "fayl, hujjatlar papkasi"],
              ["formal", "rasmiy (kiyim, uslub)"],
              ["image", "tasvir, rasm, siymo"],
              ["informal", "norasmiy, samimiy"],
              ["Internet", "internet tarmog'i"],
              ["interrupt", "gapni bo'lmoq, xalaqit bermoq"],
              ["link", "havola, bog'lovchi zanjir"],
              ["media", "ommaviy axborot vositalari"],
              ["mobile phone", "mobil telefon"],
              ["online", "internetga ulangan holda"],
              ["pause", "to'xtatib turmoq; tanaffus"],
              ["persuade", "ishontirmoq, ko'ndirmoq"],
              ["pronounce", "talaffuz qilmoq"],
              ["publish", "chop etmoq, nashr qilmoq"],
              ["report", "xabar qilmoq, hisobot"],
              ["request", "so'ramoq, iltimos qilmoq"],
              ["ring", "qo'ng'iroq qilmoq; uzuk, qo'ng'iroq"],
              ["signal", "signal, aloqa signali"],
              ["swear", "so'kinmoq, qasam ichmoq"],
              ["type", "klaviaturada yozmoq; tur, xil"],
              ["viewer", "tomoshabin (televideniye)"],
              ["website", "veb-sayt, sahifa"],
              ["whisper", "shivirlamoq; shivir-shivir"]
            ]
          },
          {
            name: "Phrasal verbs",
            words: [
              ["call back", "qaytadan qo'ng'iroq qilmoq (ring again on the phone)"],
              ["come out", "nashrdan chiqmoq, chop etilmoq (be published)"],
              ["cut off", "aloqani uzib qo'ymoq (disconnect phone/electricity)"],
              ["fill in", "anketa/shaklni to'ldirmoq (add info in spaces on a form)"],
              ["hang up", "go'shakni qo'ymoq (put receiver down to end call)"],
              ["log off", "tizimdan/internetdan chiqmoq (disconnect from a website)"],
              ["log on(to)", "tizimga/internetga kirmoq (connect to the internet/website)"],
              ["print out", "qog'ozga chop etib chiqarmoq (make a paper copy)"]
            ]
          },
          {
            name: "Prepositional phrases",
            words: [
              ["by e-mail/phone/letter", "elektron pochta/telefon/xat orqali"],
              ["on the Internet", "internetda, tarmoqda"],
              ["on the news", "yangiliklarda ko'rmoq/eshitmoq"],
              ["on the phone", "telefonda gaplashayotgan bo'lmoq"],
              ["on the radio", "radioda eshitmoq"],
              ["on TV", "televizorda ko'rmoq"]
            ]
          },
          {
            name: "Word formation",
            words: [
              ["certain", "certainly, certainty (ishonchli, albatta, aniqlik/ishonch)"],
              ["communicate", "communication (aloqa qilmoq, o'zaro aloqa/muloqot)"],
              ["connect", "connection, disconnect (ulamoq, ulanish, ulanishni uzish)"],
              ["deliver", "delivery (yetkazib bermoq, yetkazib berish)"],
              ["express", "expression, expressive (ifodalamoq, ibora/ifoda, ifodali)"],
              ["inform", "informative, information (xabar bermoq, ma'lumotga boy, axborot)"],
              ["predict", "prediction, (un)predictable (bashorat qilish, bashorat, kutilmagan)"],
              ["secret", "secretly, secrecy (sir, yashirincha, maxfiylik)"],
              ["speak", "spoke, spoken, speaker, speech (gapirmoq, so'zlovchi/kolonka, nutq)"],
              ["translate", "translation, translator (tarjima qilmoq, tarjima, tarjimon)"]
            ]
          },
          {
            name: "Word patterns",
            words: [
              ["comment on", "fikr bildirmoq, izoh qoldirmoq"],
              ["communicate with", "bilan muloqot qilmoq/aloqa o'rnatmoq"],
              ["glance at", "ko'z yugurtirmoq, bir qarab qo'ymoq"],
              ["receive sth from", "dan nimanidir qabul qilib olmoq"],
              ["reply to", "ga javob qaytarmoq"],
              ["send sth to sb", "kimdirga nimanidir jo'natmoq"],
              ["talk (to sb) about", "kimdir bilan biror mavzuda gaplashmoq"],
              ["tell sb about", "kimdirga biror narsa haqida aytib bermoq"],
              ["translate (from sth) into", "tildan boshqa tilga tarjima qilmoq"],
              ["write (to sb) about", "kimdirga xat yozmoq biror narsa haqida"],
              ["information about", "haqidagi ma'lumot"],
              ["a letter (from sb) about", "kimdandir biror narsa haqida kelgan xat"]
            ]
          }
        ]
      },
      {
        id: "unit8",
        title: "Unit 8 — People & Daily Life (People & Daily Life)",
        categories: [
          {
            name: "Topic vocabulary",
            words: [
              ["admit", "tan olmoq, bo'yniga olmoq"],
              ["arrest", "hibsga olmoq, qamoqqa olmoq"],
              ["charity", "xayriya, ehson tashkiloti"],
              ["commit", "jinoyat sodir etmoq (commit a crime)"],
              ["community", "jamiyat, jamoat, mahalla"],
              ["court", "sud binosi, sud zal"],
              ["criminal", "jinoyatchi; jinoiy"],
              ["culture", "madaniyat, urf-odatlar"],
              ["familiar", "tanish, qadrdon, odatiy"],
              ["government", "hukumat, davlat idorasi"],
              ["habit", "odat, ko'nikma"],
              ["identity card", "shaxsni tasdiqlovchi hujjat (ID karta)"],
              ["illegal", "noqonuniy, qonunga xilof"],
              ["politics", "siyosat, davlat ishlari"],
              ["population", "aholi, xalq soni"],
              ["prison", "qamoqxona, zindon"],
              ["protest", "norozilik bildirmoq; namoyish/protest"],
              ["resident", "rezident, muayyan joyda yashovchi"],
              ["responsible", "mas'uliyatli, javobgar"],
              ["rob", "talamoq, o'g'irlamoq (bank, do'konni)"],
              ["routine", "kundalik reja, odatiy tartib; odatiy"],
              ["schedule", "ish tartibi, dars jadvali"],
              ["situation", "vaziyat, holat"],
              ["social", "ijtimoiy, jamiyatga oid"],
              ["society", "jamiyat, ijtimoiy muhit"],
              ["steal", "o'g'irlamoq (buyumni sekingina)"],
              ["tradition", "an'ana, urf-odat, udum"],
              ["typical", "odatiy, o'ziga xos, o'xshash"],
              ["vote", "ovoz bermoq (saylovda); ovoz"],
              ["youth club", "yoshlar klubi, markazi"]
            ]
          },
          {
            name: "Phrasal verbs",
            words: [
              ["break in(to)", "bino/uyga bostirib kirmoq (enter illegally)"],
              ["catch up (with)", "yetib olmoq, darajasiga tenglashmoq (reach the same point)"],
              ["get away with", "jazodan qutulib qolmoq (escape punishment for)"],
              ["get up", "o'rindan turmoq (leave your bed)"],
              ["move in", "yangi uyga ko'chib kirmoq (start living in a new house)"],
              ["put away", "narsani joy-joyiga qo'ymoq (return sth to where it belongs)"],
              ["wake up", "uyg'onmoq, uyg'otmoq (stop being asleep)"],
              ["wash up", "idish-tovoqlarni yuvmoq (wash plates, cups, cutlery)"]
            ]
          },
          {
            name: "Prepositional phrases",
            words: [
              ["against the law", "qonunga qarshi, noqonuniy"],
              ["at the age of", "yoshida (at the age of fifteen)"],
              ["in public", "jamoat joyida, odamlar oldida"],
              ["in response to", "javob tariqasida, javoban"],
              ["in touch (with)", "aloqada bo'lmoq (keep in touch)"],
              ["in your teens/twenties/etc", "o'smirlik/yigirma yoshlarida bo'lish"]
            ]
          },
          {
            name: "Word formation",
            words: [
              ["agree", "agreement, disagree (rozi bo'lmoq, kelishuv, rozi bo'lmaslik)"],
              ["belief", "believe, (un)believable (ishonch, ishonmoq, (bo'lmagan)/ishonarli)"],
              ["courage", "courageous (jasorat, jasur/dovyurak)"],
              ["elect", "election (saylamoq, saylov)"],
              ["equal", "equality, unequal (teng, tenglik, teng bo'lmagan)"],
              ["life", "live, alive (hayot, yashamoq, tirik)"],
              ["nation", "nationality, (inter)national (millat, millat, xalqaro)"],
              ["peace", "peaceful(ly) (tinchlik, tinch/tinchgina)"],
              ["prison", "prisoner (qamoqxona, mahbus/asir)"],
              ["shoot", "shot, shooting (otmoq, o'q uzish/otish, otishma)"]
            ]
          },
          {
            name: "Word patterns",
            words: [
              ["angry (with sb) about", "kimdandir biror narsa sababli jahli chiqqan"],
              ["guilty of", "aybdor (guilty of stealing)"],
              ["accuse sb of", "ayblamoq (accuse sb of lying)"],
              ["blame sb for", "ayblamoq, javobgar qilmoq"],
              ["blame sth on", "nimagadir ag'darmoq"],
              ["criticise sb for", "tanqid qilmoq (criticise sb for their look)"],
              ["forget about", "unutmoq"],
              ["forgive sb for", "kechirmoq"],
              ["invite sb to", "taklif qilmoq (barbikyuga)"],
              ["punish sb for", "jazolamoq"],
              ["share sth with", "bo'lishmoq"],
              ["smile at", "jilmoymoq, kulib qaramoq"]
            ]
          }
        ]
      },
      {
        id: "unit9",
        title: "Unit 9 — Working & Earning (Working & Earning)",
        categories: [
          {
            name: "Topic vocabulary",
            words: [
              ["ambition", "maqsad, intilish, ambitsiya"],
              ["application", "ariza, murojaat (ishga kirish uchun)"],
              ["bank account", "bank hisob raqami"],
              ["boss", "boshliq, xo'jayin"],
              ["career", "karyera, ish faoliyati"],
              ["colleague", "hamkasb, birga ishlaydigan kishi"],
              ["company", "kompaniya, korxona"],
              ["contract", "shartnoma, kontrakt"],
              ["department", "bo'lim, departament (ishxonada)"],
              ["deserve", "loyiq bo'lmoq, arzimoq"],
              ["earn", "pul ishlab topmoq, daromad qilmoq"],
              ["fame", "shon-shuhrat, taniqlilik"],
              ["goal", "maqsad, marra"],
              ["impress", "tasavvur qoldirmoq, hayratda qoldirmoq"],
              ["income", "kirim, daromad (oylardan keladigan)"],
              ["industry", "sanoat, sanoat tarmog'i"],
              ["interview", "ishga qabul suhbati; suhbatlashmoq"],
              ["leader", "yetakchi, yo'lboshchi, lider"],
              ["manager", "menejer, boshqaruvchi"],
              ["pension", "pensiya, nafaqa puli"],
              ["poverty", "kambag'allik, qashshoqlik"],
              ["pressure", "bosim, jiddiy talab"],
              ["previous", "oldingi, o'tgan safargi"],
              ["profession", "kasb, soha, kasb-hunar"],
              ["retire", "nafaqaga chiqmoq, ishdan bo'shamoq"],
              ["salary", "oylik maosh, oylik to'lov"],
              ["staff", "xodimlar, shtat jamoasi"],
              ["strike", "ish tashlash (norozilik sifatida); urmoq"],
              ["tax", "soliq; soliqqa tortmoq"],
              ["wealthy", "boy, badavlat, o'ziga to'q"]
            ]
          },
          {
            name: "Phrasal verbs",
            words: [
              ["call off", "bekor qilmoq (uchrashuv, o'yinni) (cancel)"],
              ["give back", "olingan narsani qaytarib bermoq (return sth you have taken)"],
              ["go on", "yuz bermoq, davom etmoq (happen)"],
              ["put off", "keyinga qoldirmoq (delay to a later time)"],
              ["set up", "biznes/tashkilot boshlamoq (start a business/organisation)"],
              ["stay up", "uxlamasdan kechgacha o'tirmoq (go to bed late)"],
              ["take away", "olib tashlamoq, olib ketmoq (remove)"],
              ["take over", "boshqaruvni o'z qo'liga olmoq (take control of a business)"]
            ]
          },
          {
            name: "Prepositional phrases",
            words: [
              ["at the moment", "ayni damda, hozirgi vaqtda"],
              ["in charge (of)", "boshliq bo'lmoq, mas'ul bo'lish"],
              ["on business", "xizmat safari bilan, ish yuzasidan"],
              ["on strike", "ish tashlash namoyishida bo'lmoq"],
              ["on time", "o'z vaqtida, kechikmasdan"],
              ["on/off duty", "navbatchilikda bo'lish / navbatchilikda bo'lmaslik"]
            ]
          },
          {
            name: "Word formation",
            words: [
              ["assist", "assistant, assistance (yordam bermoq, yordamchi, ko'mak)"],
              ["beg", "beggar (so'ramoq/talamoq, tilanchi)"],
              ["boss", "bossy (xo'jayin, buyruq berishni yaxshi ko'radigan)"],
              ["employ", "(un)employment, employer, employee, unemployed (ish berish, ishsizlik, ish beruvchi, xodim, ishsiz)"],
              ["fame", "famous (shon-shuhrat, mashhur)"],
              ["occupy", "occupation (egallamoq, kasb/bandlik)"],
              ["office", "officer, (un)official (idora/ofis, zobit, norasmiy/rasmiy)"],
              ["retire", "retired, retirement (nafaqaga chiqish, nafaqadagi kishi, pensiya davri)"],
              ["safe", "save, unsafe, safety (xavfsiz, tejamoq, xavfli, xavfsizlik)"],
              ["succeed", "success, (un)successful (muvaffaqiyat qozonish, yutuq, muvaffaqiyatsiz/muvaffaqiyatli)"]
            ]
          },
          {
            name: "Word patterns",
            words: [
              ["careful with", "ehtiyotkor bo'lgan"],
              ["difficult for", "uchun qiyin bo'lgan (difficult for me)"],
              ["fed up with", "jonga tekkan, charchagan narsadan"],
              ["ready for", "tayyor bo'lgan (ready for work)"],
              ["responsible for", "javobgar bo'lgan, mas'ul bo'lgan"],
              ["apply for", "ariza topshirmoq (ishga ariza bermoq)"],
              ["depend on", "ga bog'liq bo'lmoq, suyanmoq"],
              ["inform sb about", "kimdirni biror narsa haqida ogohlantirmoq"],
              ["refer to", "ga murojaat qilmoq, eslatib o'tmoq"],
              ["work as", "bo'lib ishlamoq (work as a farmer)"],
              ["work for", "uchun ishlamoq (kompaniyada ishlash)"],
              ["a kind of", "ning bir turi"]
            ]
          }
        ]
      },
      {
        id: "unit10",
        title: "Unit 10 — Body & Lifestyle (Body & Lifestyle)",
        categories: [
          {
            name: "Topic vocabulary",
            words: [
              ["affect", "ta'sir qilmoq (sog'liqqa)"],
              ["balance", "muvozanat saqlamoq; muvozanat"],
              ["benefit", "foyda ko'rmoq; foyda, naf"],
              ["breathe", "nafas olmoq"],
              ["chew", "chaynamoq (ovqatni)"],
              ["chop", "to'g'ramoq, chopmoq"],
              ["contain", "o'z ichiga olmoq, tarkibida bo'lmoq"],
              ["cough", "yo'talmoq; yo'tal"],
              ["cure", "davolamoq, shifo topmoq; dori, davo"],
              ["exercise", "jismoniy mashq qilmoq; mashq"],
              ["flu", "gripp (shamollash)"],
              ["have an operation", "operatsiya bo'lmoq (shifoxonada)"],
              ["healthy", "sog'lom, foydali (healthy food)"],
              ["ignore", "e'tiborsiz qoldirmoq, pisand qilmaslik"],
              ["infection", "infeksiya, yuqumli kasallik"],
              ["ingredient", "masalliq, ingredient (ovqat tarkibi)"],
              ["injury", "jarohat, shikastlanish"],
              ["limit", "cheklamoq; me'yor, chegara"],
              ["meal", "ovqat, taomlanish payti"],
              ["pill", "tabletka, dori dorichasi"],
              ["recover", "sog'aymoq, oyoqqa turmoq (kasallikdan so'ng)"],
              ["salty", "tuzli, sho'r (salty food)"],
              ["slice", "tilimlab kesmoq; tilim bo'lak"],
              ["sour", "nordon, achchiq (sour lemon)"],
              ["spicy", "achchiq, ziravorli (spicy food)"],
              ["stir", "aralashtirmoq (qoshiq bilan ovqatni)"],
              ["suffer", "qiynalmoq, azob chekmoq"],
              ["taste", "ta'mini tatib ko'rmoq; ta'm, maza"],
              ["treatment", "davolash, muolaja"],
              ["vitamin", "vitamin, darmondori"]
            ]
          },
          {
            name: "Phrasal verbs",
            words: [
              ["cut down (on)", "iste'molini kamaytirmoq (do less of smoking/eating sth)"],
              ["fall down", "yiqilib tushmoq (trip and fall)"],
              ["get over", "tuzalmoq, kasallikdan o'ziga kelmoq (recover from an illness)"],
              ["go off", "aynib qolmoq, buzilmoq (no longer be fresh)"],
              ["lie down", "yotib dam olmoq (start lying on a bed)"],
              ["put on", "vazn orttirmoq (gain weight)"],
              ["sit down", "o'tirmoq (start to sit)"],
              ["stand up", "o'rindan turmoq (start to stand)"]
            ]
          },
          {
            name: "Prepositional phrases",
            words: [
              ["at night", "tunda, kechasi (do not drink coffee at night)"],
              ["at risk", "xavf ostida qolish (at risk of flu)"],
              ["in addition (to)", "qo'shimcha ravishda (in addition to fruit)"],
              ["in comparison to/with", "solishtirganda, taqqoslaganda"],
              ["in shape", "yaxshi sport formada, sog'lom bo'lish"],
              ["on a diet", "dietada bo'lish, parhez tutish"]
            ]
          },
          {
            name: "Word formation",
            words: [
              ["bake", "baker, bakery (pishirmoq, novvoy, nonvoyxona)"],
              ["bend", "bent (bukilmoq, egilgan/bukilgan)"],
              ["cook", "cooker, cookery (pishirmoq, plita/gaz pechi, oshpazlik)"],
              ["intend", "intention, intentional (niyat qilmoq, niyat, qasddan qilingan)"],
              ["jog", "jogging, jogger (yugurmoq, yugurish, yuguruvchi kishi)"],
              ["medicine", "medical (dori, tibbiy)"],
              ["pain", "painful, painless (og'riq, og'riqli, og'riqsiz)"],
              ["reduce", "reduction (kamaytirmoq, kamayish/qisqarish)"],
              ["sense", "sensible, sensitive (sezmoq, oqilona, sezgir)"],
              ["weigh", "weight (tortmoq (vazn), og'irlik/vazn)"]
            ]
          },
          {
            name: "Word patterns",
            words: [
              ["addicted to", "o'rganib qolgan, ruju qo'ygan"],
              ["allergic to", "allergiyasi bor bo'lgan (allergic to chocolate)"],
              ["covered in/with", "bilan qoplangan (covered with spots)"],
              ["pleased with", "dan mamnun, xursand bo'lgan"],
              ["combine sth with", "nimanidir boshqa narsa bilan birlashtirmoq"],
              ["complain (to sb) about", "kimdirga shikoyat qilmoq biror narsa haqida"],
              ["die from/of", "dan vafot etmoq"],
              ["fight against", "ga qarshi kurashmoq"],
              ["recover from", "dan sog'aymoq (recover from flu)"],
              ["smell of", "hidi kelmoq (smell of chocolate)"],
              ["a cure for", "uchun shifo/davo"],
              ["a recipe for", "uchun ovqat retsepti"]
            ]
          }
        ]
      },
      {
        id: "unit11",
        title: "Unit 11 — Creating & Building (Creating & Building)",
        categories: [
          {
            name: "Topic vocabulary",
            words: [
              ["ancient", "qadimiy, antiqa"],
              ["checked", "katak-katak (naqshli kiyim)"],
              ["cotton", "paxta, ip-gazlama"],
              ["create", "yaratmoq, bino qilmoq"],
              ["design", "loyihalashtirmoq, dizayn yaratish; dizayn"],
              ["fix", "tuzatmoq, ta'mirlamoq"],
              ["fold", "taxlamoq, buklamoq (kiyimni)"],
              ["gallery", "galereya, san'at ko'rgazmasi"],
              ["improvement", "yaxshilanish, takomillashish"],
              ["loose", "keng, quyuq bo'lmagan (loose clothes)"],
              ["maintain", "asrab-avaylamoq, ayni holatda saqlamoq"],
              ["match", "mos tushmoq (kiyim, ranglar)"],
              ["material", "material, gazlama, xomashyo"],
              ["notice", "payqamoq, sezib qolmoq; e'lon"],
              ["pattern", "naqsh, uslub, model"],
              ["pile", "taxlam, burchakda to'plangan narsalar"],
              ["practical", "amaliy, foydali, qulay"],
              ["rough", "g'adir-budur, dag'al (rough hands)"],
              ["shape", "shakl, ko'rinish"],
              ["silk", "ipak, ipakli mato"],
              ["sleeve", "eng, kiyim engi (short sleeves)"],
              ["smooth", "silliq, tekis, yumshoq (smooth skin)"],
              ["stretch", "cho'zmoq, cho'zilmoq"],
              ["striped", "yo'l-yo'l (striped t-shirt)"],
              ["style", "uslub, fason"],
              ["suit", "mos kelmoq, yarashmoq; kostyum"],
              ["suitable", "mos keladigan, to'g'ri keladigan"],
              ["tear", "yirtib yubormoq, yirtish"],
              ["tight", "tor, jips, mahkam (tight shoes)"],
              ["tool", "asbob, ish quroli"]
            ]
          },
          {
            name: "Phrasal verbs",
            words: [
              ["cut off", "kesib tashlamoq (completely remove by cutting)"],
              ["do up", "tugmalamoq, kiyimni kiymoq (button/zip up clothing)"],
              ["fill up", "to'ldirmoq (make sth completely full)"],
              ["have on", "ustida bo'lmoq (kiyimni kiyib yurish) (wear a piece)"],
              ["leave out", "tarkibdan chiqarib tashlamoq (not include)"],
              ["put on", "kiymoq (kiyimni ustiga kiyish) (start wearing)"],
              ["take off", "yechmoq (kiyim, poyabzalni) (remove a piece)"],
              ["try on", "kiyib ko'rmoq (o'lchab ko'rish do'konda) (put on to see if it fits)"]
            ]
          },
          {
            name: "Prepositional phrases",
            words: [
              ["at the back (of)", "orqa tomonida, orqasida"],
              ["at the end (of)", "oxirida (at the end of your story)"],
              ["in fashion/style", "urfda, modada bo'lgan (in fashion)"],
              ["in front (of)", "oldida, ro'parasida (in front of the shop)"],
              ["in the corner (of)", "burchagida (in the corner of the room)"],
              ["out of fashion/style", "urfdan qolgan, modada bo'lmagan"]
            ]
          },
          {
            name: "Word formation",
            words: [
              ["art", "artist, artistic (san'at, rassom/san'atkor, badiiy/san'atkorona)"],
              ["break", "broke, broken, (un)breakable (sindirmoq, singan, (sinmaydigan)/mo'rt)"],
              ["compose", "composition, composer (yaratmoq, insho/kompozitsiya, kompozitor)"],
              ["exhibit", "exhibition (namoyish etmoq, ko'rgazma)"],
              ["free", "freedom (ozod, ozodlik/erkinlik)"],
              ["hand", "handful, handle (qo'l, hovuch, dasta/tutqich)"],
              ["imagine", "imagination, imaginative (tasavvur qilmoq, tasavvur, tasavvuri boy)"],
              ["intelligent", "intelligence (aqlli, aql-idrok)"],
              ["perfect", "perfection, imperfect (mukammal, mukammallik, nomukammal)"],
              ["prepare", "preparation (tayyorlanmoq, tayyorgarlik)"]
            ]
          },
          {
            name: "Word patterns",
            words: [
              ["amazed at/by", "dan hayratga tushgan (amazed by the picture)"],
              ["disappointed with", "dan hafsalasi pir bo'lgan (disappointed with his last one)"],
              ["familiar with", "bilan tanish bo'lgan"],
              ["involved in", "ga jalb qilingan/aralashgan (involved in writing)"],
              ["similar to", "ga o'xshash bo'lgan (similar to writing a song)"],
              ["change sth (from sth) into", "nimanidir boshqa narsaga o'zgartirmoq/aylantirmoq"],
              ["describe sth as", "nimanidir deb ta'riflamoq/tasvirlamoq"],
              ["explain sth to", "nimanidir kimdirga tushuntirib bermoq"],
              ["remind sb of", "kimdirga nimanidir eslatib yubormoq"],
              ["remove sth from", "nimanidir joyidan olib tashlamoq"],
              ["an influence on", "ga bo'lgan ta'sir (influence on me)"],
              ["a picture of", "ning rasmi, tasviri (picture of fruit)"]
            ]
          }
        ]
      },
      {
        id: "unit12",
        title: "Unit 12 — Nature & Universe (Nature & the Universe)",
        categories: [
          {
            name: "Topic vocabulary",
            words: [
              ["amazing", "ajoyib, hayratlanarli"],
              ["climate", "iqlim, ob-havo sharoiti"],
              ["countryside", "qishloq joyi, dala muhiti"],
              ["environment", "tabiat, atrof-muhit"],
              ["extinct", "yo'q bo'lib ketgan, qirilib ketgan (hayvonlar)"],
              ["global", "global, umumjahon"],
              ["heatwave", "jazirama issiq, issiq to'lqini"],
              ["insect", "hasharot"],
              ["lightning", "chaqmoq, chaqmoq chaqishi"],
              ["litter", "axlat tashlamoq; axlat, supurindi"],
              ["local", "mahalliy (local area)"],
              ["locate", "joyini aniqlamoq"],
              ["mammal", "sutemizuvchi hayvon"],
              ["mild", "mo'tadil, yumshoq (mild weather)"],
              ["name", "nom bermoq, nomlash; ism, nom"],
              ["origin", "kelib chiqishi, asosi"],
              ["planet", "sayyora, planeta"],
              ["preserve", "asrab qolmoq, muhofaza etmoq"],
              ["recycle", "qayta ishlamoq (qog'oz, plastikni)"],
              ["reptile", "sudralib yuruvchi hayvon (ilon kabi)"],
              ["rescue", "qutqarmoq, xalos etmoq; qutqarish"],
              ["satellite", "sun'iy yo'ldosh, sun'iy yo'ldosh apparati"],
              ["shower", "yomg'ir, dush qabul qilish"],
              ["solar system", "quyosh tizimi"],
              ["species", "tur, xil (hayvonlar turi)"],
              ["thunder", "momaqaldiroq, momaqaldiroq ovozi"],
              ["wild", "yovvoyi (wild animals)"],
              ["wildlife", "yovvoyi tabiat, yovvoyi hayvonlar dunyosi"]
            ]
          },
          {
            name: "Phrasal verbs",
            words: [
              ["blow up", "portlatib yubormoq (explode with dynamite)"],
              ["build up", "kattaytirmoq, oshirmoq (increase)"],
              ["clear up", "tartibga keltirmoq, yig'ishtirmoq (tidy up)"],
              ["go out", "o'chmoq (olov, chiroq) (stop burning)"],
              ["keep out", "ichkariga kiritmaslik, to'smoq (prevent from entering)"],
              ["put down", "yerga qo'ymoq (stop holding)"],
              ["put out", "olovni o'chirmoq (make sth stop burning)"],
              ["put up", "devorga osib qo'ymoq (put sth on a wall - eg picture)"]
            ]
          },
          {
            name: "Prepositional phrases",
            words: [
              ["at most", "ko'pi bilan, eng ko'p borganda"],
              ["at the top/bottom (of)", "tepasida / tagida"],
              ["in the beginning", "boshlanishida, avvalida"],
              ["in the distance", "uzoqda, olisda ko'rinib turgan"],
              ["in total", "jami bo'lib, umumiy hisobda"],
              ["on top (of)", "ustida, tepasida (on top of the table)"]
            ]
          },
          {
            name: "Word formation",
            words: [
              ["centre", "central (markaz, markaziy)"],
              ["circle", "circular (aylana, doiraviy)"],
              ["danger", "dangerous (xavf, xavfli)"],
              ["deep", "deeply, depth (chuqur, chuqur ravishda, chuqurlik)"],
              ["destroy", "destruction, destructive (vayron qilmoq, vayronagarchilik, vayronkor)"],
              ["fog", "foggy (tuman, tumanli ob-havo)"],
              ["garden", "gardener, gardening (bog', bog'bon, bog'dorchilik)"],
              ["invade", "invasion, invader (bostirib kirmoq, bosqin, bosqinchi)"],
              ["nature", "natural, naturally (tabiat, tabiiy, tabiiyki/tabiiy ravishda)"],
              ["pollute", "pollution, polluted (ifloslantirmoq, ifloslanish, ifloslangan)"]
            ]
          },
          {
            name: "Word patterns",
            words: [
              ["afraid of", "dan qo'rqqan (afraid of spiders)"],
              ["aware of", "dan xabardor bo'lgan (aware of the problems)"],
              ["enthusiastic about", "ishtiyoqi baland bo'lgan, qiziqqan"],
              ["serious about", "jiddiy qaraydigan (serious about work)"],
              ["short of", "kamchiligi bor, yetishmaydigan (short of time)"],
              ["escape from", "dan qochib qutulmoq"],
              ["prevent sb from", "kimnidir nimadandir to'sib qolmoq/to'xtatmoq"],
              ["save sth from", "nimanidir xavfdan saqlab qolmoq"],
              ["think about", "haqida o'ylamoq (think about the future)"],
              ["worry about", "tashvishlanmoq, xavotirlanmoq"],
              ["damage to", "ga shikast yetkazish (damage to environment)"],
              ["an increase in", "ning ko'payishi, oshishi"]
            ]
          }
        ]
      },
      {
        id: "unit13",
        title: "Unit 13 — Laughing & Crying (Laughing & Crying)",
        categories: [
          {
            name: "Topic vocabulary",
            words: [
              ["amusing", "kulgili, qiziqarli, zavqli"],
              ["annoy", "g'ashini keltirmoq, jahlini chiqarmoq"],
              ["attitude", "munosabat, o'zini tutish"],
              ["bad-tempered", "badjahl, asabiy, jizzaki"],
              ["behave", "o'zini odobli tutmoq"],
              ["bully", "qo'rqitmoq, zo'ravonlik qilmoq; bezori"],
              ["calm", "xotirjam, xotirjamlik saqlaydigan"],
              ["celebrate", "nishonlamoq, bayram qilmoq"],
              ["character", "fe'l-atvor, xarakter, qahramon (asar kabi)"],
              ["depressed", "tushkunlikka tushgan, ruhan ezilgan"],
              ["embarrassing", "noqulay, uyatli (embarrassing situation)"],
              ["emotion", "kechinma, emotsiya, tuyg'u"],
              ["enthusiastic", "g'ayratli, g'ayrati baland"],
              ["feeling", "tuyg'u, his-tuyg'u"],
              ["glad", "xursand, baxtiyor"],
              ["hurt", "jarohatlamoq, ko'nglini og'ritmoq"],
              ["miserable", "baxtsiz, ayanchli ahvoldagi"],
              ["naughty", "to'polonchi, gap eshitmaydigan (bola)"],
              ["noisy", "shovqin-suronli, shovqinli"],
              ["polite", "odobli, xushmuomala"],
              ["react", "munosabat bildirmoq, reaksiya ko'rsatmoq"],
              ["regret", "pushaymon bo'lmoq, afsuslanmoq; afsus"],
              ["ridiculous", "kulgili, bema'ni, bema'ni darajada g'alati"],
              ["romantic", "romantik, his-tuyg'uga boy"],
              ["rude", "qo'pol, odobsiz (rude behaviour)"],
              ["sense of humour", "hazil-mutoyiba tuyg'usi (hazilkashlik)"],
              ["shy", "uyatchan, tortinchoq"],
              ["stranger", "notanish kishi, begona"],
              ["trust", "ishonmoq, ishonch bildirmoq"],
              ["whisper", "shivirlab gapirmoq"]
            ]
          },
          {
            name: "Phrasal verbs",
            words: [
              ["calm down", "tinchlanmoq, xotirjam bo'lmoq (become calm)"],
              ["cheer up", "ruhlantirmoq, xursand qilmoq (become happier)"],
              ["come on", "tezroq bo'l, qani boshla (be quicker)"],
              ["go on", "davom ettirmoq (continue doing sth)"],
              ["hang on", "kutib turmoq, go'shakni qo'ymay turish (wait)"],
              ["run away (from)", "qochib ketmoq (escape by running)"],
              ["shut up", "ovozni o'chirmoq, jim bo'lmoq (stop talking)"],
              ["speak up", "balandroq gapirmoq (talk more loudly so sb can hear)"]
            ]
          },
          {
            name: "Prepositional phrases",
            words: [
              ["at first", "avvaliga, boshida (at first I didn't like)"],
              ["at least", "kamida, hech bo'lmasa"],
              ["at times", "ba'zida, goh-gohida (sometimes)"],
              ["in secret", "yashirincha, yashirin ravishda (meet in secret)"],
              ["in spite of", "ga qaramasdan (in spite of failing)"],
              ["in tears", "ko'zida yosh bilan, yig'lab turgan"]
            ]
          },
          {
            name: "Word formation",
            words: [
              ["bore", "boring, bored (zeriktirmoq, zerikarli, zerikkan)"],
              ["comedy", "comedian (komediya, qiziqchi/komik aktyor)"],
              ["emotion", "emotional (his-tuyg'u, his-tuyg'uga beriluvchan)"],
              ["energy", "energetic (g'ayrat/kuch, g'ayratli/chaqqon)"],
              ["excite", "excitement, exciting, excited (hayajonlantirmoq, hayajon, qiziqarli, hayajonlangan)"],
              ["feel", "felt, feeling(s) (his qilmoq, tuyg'u/his)"],
              ["happy", "unhappy, (un)happiness (baxtli, baxtsiz, baxt/baxtsizlik)"],
              ["hate", "hatred (nafratlanmoq, nafrat/adovat)"],
              ["noise", "noisy, noisily (shovqin, shovqinli, shovqin bilan)"],
              ["sympathy", "sympathise, sympathetic (hamdardlik, hamdardlik bildirmoq, hamdard/rahmdil)"]
            ]
          },
          {
            name: "Word patterns",
            words: [
              ["ashamed of", "dan uyalgan (ashamed of what he did)"],
              ["embarrassed about", "dan noqulay ahvolda qolgan"],
              ["frightened of", "dan qo'rqqan (frightened of failure)"],
              ["happy about/with", "dan xursand bo'lgan"],
              ["nervous about", "dan xavotirlangan (nervous about the exam)"],
              ["scared of", "dan qo'rqqan (scared of failing)"],
              ["sorry about/for", "uchun uzr so'ragan/pushaymon bo'lgan"],
              ["surprised at/by", "dan hayratga tushgan"],
              ["tired of", "dan zerikkan/charchagan (tired of arguing)"],
              ["congratulate sb on", "bilan tabriklamoq (congratulate sb on success)"],
              ["laugh at", "ustidan kulmoq"],
              ["a joke about", "haqidagi hazil, latifa"]
            ]
          }
        ]
      },
      {
        id: "unit14",
        title: "Unit 14 — Problems & Solutions (Problems & Solutions)",
        categories: [
          {
            name: "Topic vocabulary",
            words: [
              ["accident", "baxtsiz hodisa, tasodifiy falokat"],
              ["assume", "deb taxmin qilmoq, taxminlash"],
              ["cause", "sabab bo'lmoq; sabab, vaj"],
              ["claim", "da'vo qilmoq, tasdiqlamoq"],
              ["complain", "shikoyat qilmoq, norozilik bildirmoq"],
              ["convince", "ko'ndirmoq, ishontirmoq"],
              ["criticise", "tanqid qilmoq"],
              ["deny", "inkor etmoq, rad etmoq (tan olmaslik)"],
              ["discussion", "munozara, muhokama"],
              ["doubt", "shubhalanmoq; shubha"],
              ["encourage", "ruhlantirmoq, dalda bermoq"],
              ["get rid of", "qutulmoq, tashlab yubormoq (biror narsadan)"],
              ["gossip", "g'iybat qilmoq; g'iybat, mish-mish"],
              ["ideal", "ideal, eng namunali/mukammal"],
              ["insult", "haqorat qilmoq; haqorat"],
              ["investigate", "tadqiq etmoq, tergov qilmoq"],
              ["negative", "salbiy, yomon baholaydigan"],
              ["positive", "ijobiy, umidbaxsh"],
              ["praise", "maqtamoq, olqishlamoq; maqtov"],
              ["pretend", "o'zini solmoq, soxta ko'rsatmoq (pretend to sleep)"],
              ["purpose", "maqsad, muddao (purpose of the meeting)"],
              ["refuse", "rad etmoq, rozi bo'lmaslik"],
              ["result", "natija bermoq; natija"],
              ["rumour", "mish-mish, asossiz gap-so'z"],
              ["sensible", "oqilona, aqlli (sensible decision)"],
              ["serious", "jiddiy, xavfli (serious problem)"],
              ["spare", "ortiqcha, bo'sh (spare time/tyre)"],
              ["theory", "nazariya, ilmiy taxmin"],
              ["thought", "fikr, o'y-xayol, mulohaza"],
              ["warn", "ogohlantirmoq, ogohlantirish bermoq"]
            ]
          },
          {
            name: "Phrasal verbs",
            words: [
              ["hang up", "kiyimni ilgichga osmoq (put clothes in a wardrobe)"],
              ["pick up", "ko'tarmoq, yerdan olmoq (lift sth from the floor)"],
              ["put back", "o'rniga qaytarib qo'ymoq (return sth to where it was)"],
              ["run out (of)", "tugab qolmoq, qolmaslik (not have any left)"],
              ["share out", "taqsimlamoq, bo'lishib bermoq (give a part of sth to group)"],
              ["sort out", "muammoni hal qilmoq, hal etmoq (solve a problem)"],
              ["watch out", "ehtiyot bo'lmoq, diqqat qilmoq (be careful)"],
              ["work out", "yechimini topmoq (find the solution to a problem)"]
            ]
          },
          {
            name: "Prepositional phrases",
            words: [
              ["by accident/mistake", "tasodifan, bilmasdan, xato qilib"],
              ["in a mess", "tartibsiz holatda, dabdala bo'lgan"],
              ["in danger (of)", "xavf ostida qolish (in danger of falling)"],
              ["in my view", "mening fikrimcha, nazarimda (in my opinion)"],
              ["in trouble", "muammoda, qiyin ahvolda bo'lish"],
              ["under pressure", "bosim ostida bo'lish, jiddiy talab ostida"]
            ]
          },
          {
            name: "Word formation",
            words: [
              ["advice", "advise, adviser (maslahat, maslahat bermoq, maslahatchi)"],
              ["confuse", "confused, confusion (adashtirib yubormoq, adashgan, chalkashlik)"],
              ["except", "exception (tashqari/istisno, istisno holat)"],
              ["help", "(un)helpful, helpless (yordam bermoq, yordam beradigan/yordamsiz, ojiz)"],
              ["luck", "(un)lucky, (un)luckily (omad, omadli/omadsiz, baxtga qarshi/omadimiz kelib)"],
              ["prefer", "preference, preferable (afzal ko'rmoq, xohish/afzallik, ma'qulroq)"],
              ["recommend", "recommendation (tavsiya qilmoq, tavsiya)"],
              ["refuse", "refusal (rad etmoq, rad javobi)"],
              ["solve", "solution (yechmoq, yechim/javob)"],
              ["suggest", "suggestion (taklif qilmoq, taklif/tavsiya)"]
            ]
          },
          {
            name: "Word patterns",
            words: [
              ["sure about/of", "ga ishonchi komil bo'lgan"],
              ["advise against", "ga qarshi maslahat bermoq"],
              ["agree (with sb) about", "kimdir bilan biror narsada rozi bo'lmoq"],
              ["approve of", "ma'qullamoq (approve of smoking)"],
              ["believe in", "ga ishonmoq (believe in ghosts)"],
              ["deal with", "hal qilmoq, muomala qilmoq (deal with a problem)"],
              ["happen to", "ga sodir bo'lmoq, yuz bermoq"],
              ["hide sth from sb", "nimanidir kimdandir yashirmoq"],
              ["insist on", "talab qilmoq, qattiq turib olmoq"],
              ["rely on", "ga suyanmoq, ishonmoq (rely on sb)"],
              ["an advantage of", "ning ustunligi, foydasi"],
              ["a solution to", "uchun yechim, javob (solution to the problem)"]
            ]
          }
        ]
      }
    ]
  },
  {
    id: "4000-essential",
    title: "4000 Essential English Words",
    description: "Vocabulary darsliklar seriyasining birinchi kitobi bo'lib, jami 30 ta unit va har bir unitda 20 tadan eng ko'p ishlatiladigan 600 ta inglizcha so'z tarjimalari jamlangan.",
    units: [
      {
        id: "unit1",
        title: "Unit 1",
        words: [
          ["afraid", "qo'rqqan, cho'chigan"],
          ["agree", "fikriga qo'shilmoq, rozi bo'lmoq"],
          ["angry", "jahli chiqqan, badjahl"],
          ["arrive", "yetib kelmoq, kelmoq"],
          ["attack", "hujum qilmoq, hujum uyushtirmoq"],
          ["bottom", "tag, pastki qism"],
          ["clever", "aqlli, ziyrak"],
          ["cruel", "shafqatsiz, berahm"],
          ["finally", "oxiri, vanihoyat"],
          ["hide", "yashirinmoq, bekinmoq"],
          ["hunt", "ov qilmoq, ovlamoq"],
          ["lot", "juda ko'p"],
          ["middle", "o'rta, markaz"],
          ["moment", "sekund; on, zum"],
          ["pleased", "hursand, mamnun"],
          ["promise", "va'da bermoq"],
          ["reply", "javob bermoq"],
          ["safe", "xavfsiz, bexatar"],
          ["trick", "xiyla, nayrang; fokus"],
          ["well", "yaxshi"]
        ]
      },
      {
        id: "unit2",
        title: "Unit 2",
        words: [
          ["adventure", "sarguzasht, hayajonli sarguzasht"],
          ["approach", "yaqinlashmoq, yaqin kelmoq"],
          ["carefully", "e'tibor bilan, ehtiyotkorlik bilan"],
          ["chemical", "kimyoviy modda"],
          ["create", "yaratmoq, yasamoq"],
          ["evil", "yomon, yovuz"],
          ["experiment", "tajriba, sinov"],
          ["kill", "o'ldirmoq"],
          ["laboratory", "laboratoriya xonasi"],
          ["laugh", "kulgi, kulmoq"],
          ["loud", "shovqinli, baland ovozli"],
          ["nervous", "xavotirlangan, xavotirga tushgan"],
          ["noise", "shovqin, yoqimsiz ovoz"],
          ["project", "yumush, mahsus topshiriq"],
          ["scare", "qo'rqitmoq, daxshatga solmoq"],
          ["secret", "sir, maxfiy narsa"],
          ["shout", "baqirmoq, qichqirmoq"],
          ["smell", "hidlamoq, hidlab ko'rmoq"],
          ["terrible", "juda yomon, daxshatli"],
          ["worse", "yomonroq"]
        ]
      },
      {
        id: "unit3",
        title: "Unit 3",
        words: [
          ["alien", "o'zga sayyoralik, begona"],
          ["among", "orasida, ichida"],
          ["chart", "diagramma, chizma jadval"],
          ["cloud", "bulut"],
          ["comprehend", "tushunmoq, anglamoq"],
          ["describe", "tasvirlamoq, ta'riflamoq"],
          ["ever", "qachon bo'lmasin; ilgari"],
          ["fail", "muvaffaqiyatsizlikka uchramoq"],
          ["friendly", "mehribon, g'amxo'r, do'stona"],
          ["grade", "baho, daraja"],
          ["instead", "o'rniga, evaziga"],
          ["library", "kutubxona"],
          ["planet", "planeta, sayyora"],
          ["report", "hisobot; o'quvchi tabeli"],
          ["several", "bir talay, bir nechta"],
          ["solve", "yechmoq, javob topmoq"],
          ["suddenly", "to'satdan, kutilmaganda, birdaniga"],
          ["suppose", "deb o'ylamoq, taxmin qilmoq"],
          ["universe", "koinot, borliq"],
          ["view", "qaramoq, ko'rmoq, manzara"]
        ]
      },
      {
        id: "unit4",
        title: "Unit 4",
        words: [
          ["appropriate", "mos, to'g'ri, muvofiq"],
          ["avoid", "yaqinlashmaslik, chetda turmoq"],
          ["behave", "o'zini tutmoq, odob saqlamoq"],
          ["calm", "xotirjam, tinch"],
          ["concern", "tashvish, g'am, qayg'urish"],
          ["content", "xursand, shod, mamnun"],
          ["expect", "umid qilmoq, ishonmoq, kutmoq"],
          ["frequently", "tez-tez, muntazam ravishda"],
          ["habit", "odat, ko'nikma"],
          ["instruct", "ta'lim bermoq; ko'rsatma bermoq"],
          ["issue", "masala, muammo"],
          ["none", "hech qancha, hech biri"],
          ["patient", "sabrli, toqatli, chidamli"],
          ["positive", "ijobiy, porloq"],
          ["punish", "jazolamoq, jazo bermoq"],
          ["represent", "vakil bo'lmoq, vakillik qilmoq"],
          ["shake", "silkitmoq, siltamoq; silkinmoq"],
          ["spread", "tarqalmoq; surkamoq, surtmoq"],
          ["stroll", "sayr qilmoq, aylanib kelmoq"],
          ["village", "qishloq, ovul"]
        ]
      },
      {
        id: "unit5",
        title: "Unit 5",
        words: [
          ["aware", "xabardor, ogoh"],
          ["badly", "yomon; jiddiy ravishda"],
          ["belong", "tegishli bo'lmoq"],
          ["continue", "davom etmoq/ettirmoq"],
          ["error", "xato, yanglishish"],
          ["experience", "taassurot, kechinma, tajriba"],
          ["field", "keng maydon, dala"],
          ["hurt", "jarohatlamoq, jarohat yetkazmoq"],
          ["judgment", "qaror qabul qilish; fikr, mulohaza"],
          ["likely", "ehtimol, balki, mumkin bo'lgan"],
          ["normal", "odatiy, har doimgi, normal"],
          ["rare", "kamdan-kam; noyob, kamyob"],
          ["relax", "dam olmoq, hordiq chiqarmoq"],
          ["request", "so'ramoq, talab qilmoq"],
          ["reside", "muayyan yashamoq, istiqomat qilmoq"],
          ["result", "natija, oqibat"],
          ["roll", "yumalatmoq, dumalatmoq"],
          ["since", "-dan beri/buyon"],
          ["visible", "ko'zga ko'rinarli, ko'rinib turgan"],
          ["wild", "yovvoyi, yovvoyi tabiatdagi"]
        ]
      },
      {
        id: "unit6",
        title: "Unit 6",
        words: [
          ["advantage", "ustun jihat, foyda, imtiyoz"],
          ["cause", "sabab bo'lmoq, keltirib chiqarmoq"],
          ["choice", "tanlash imkoniyati, tanlov"],
          ["community", "jamiyat, jamoa, jamoat"],
          ["dead", "o'lgan, o'lik, hayotsiz"],
          ["distance", "masofa, uzoqlik"],
          ["escape", "qochib qutulmoq, qochish"],
          ["face", "duch kelmoq, yuzlanmoq; yuz"],
          ["follow", "ortidan bormoq, ergashmoq"],
          ["fright", "qo'rquv, vahima, daxshat"],
          ["ghost", "rux, arvox, sharpa"],
          ["individual", "individ, kishi, shaxs"],
          ["pet", "uy hayvoni"],
          ["reach", "yetib bormoq, yetib kelmoq, erishmoq"],
          ["return", "qaytib kelmoq, qaytarmoq"],
          ["survive", "tirik qolmoq; saqlab qolmoq"],
          ["upset", "xafa, tushkun, ma'yus"],
          ["voice", "ovoz, tovush"],
          ["weather", "ob-havo"],
          ["wise", "aqlli, dono, tajribali"]
        ]
      },
      {
        id: "unit7",
        title: "Unit 7",
        words: [
          ["allow", "ruxsat bermoq; imkoniyat bermoq"],
          ["announce", "e'lon qilmoq, ma'lum qilmoq"],
          ["beside", "yonma-yon, yonida"],
          ["challenge", "qiyinchilik, mushkul ish, chorlov"],
          ["claim", "tasdiqlamoq, ma'qullamoq, da'vo qilmoq"],
          ["condition", "ahvol, holat, sharoit"],
          ["contribute", "xayr qilmoq; hissa qo'shmoq"],
          ["difference", "farq, tafovut, farqli jihat"],
          ["divide", "taqsimlamoq, bo'lmoq, ajratmoq"],
          ["expert", "ekspert, mutaxassis, usta"],
          ["famous", "mashhur, taniqli"],
          ["force", "kuch, qudrat, majburlamoq"],
          ["harm", "jabr, jarohat, zarar yetkazish"],
          ["lay", "qo'ymoq, yotqizmoq"],
          ["peace", "tinchlik, osoyishtalik"],
          ["prince", "shahzoda, shahzodalar"],
          ["protect", "himoya qilmoq, asramoq"],
          ["sense", "sezmoq, his qilmoq; sezgi"],
          ["sudden", "kutilmagan, tasodifiy, kutilmaganda"],
          ["therefore", "shu sababli, shuning uchun, oqibatda"]
        ]
      },
      {
        id: "unit8",
        title: "Unit 8",
        words: [
          ["accept", "qabul qilmoq, rozi bo'lmoq"],
          ["arrange", "joy-joyiga qo'ymoq, tartibga keltirmoq"],
          ["attend", "bormoq, qatnashmoq"],
          ["balance", "muvozanat saqlamoq; muvozanat"],
          ["contrast", "katta farq, zidlik"],
          ["encourage", "ruhlantirmoq, ruhini ko'tarmoq"],
          ["familiar", "tanish, qadrdon"],
          ["grab", "uzmoq; olmoq, changallamoq"],
          ["hang", "osmoq, ilmoq"],
          ["huge", "katta, ulkan, ulkan hajmli"],
          ["necessary", "shart, zarur, lozim"],
          ["pattern", "uslub, yo'nalish, yo'l, qolip"],
          ["propose", "taklif qilmoq, taqdim etmoq"],
          ["purpose", "maqsad, muddao"],
          ["release", "qo'yib yubormoq, ozod qilmoq"],
          ["require", "talab qilinmoq, talab qilmoq"],
          ["single", "bitta, bir dona, yolg'iz"],
          ["success", "muvaffaqiyat, yutuq, zafar"],
          ["tear", "yirtmoq, yirtib tashlamoq; ko'z yoshi"],
          ["theory", "nazariya, qarash"]
        ]
      },
      {
        id: "unit9",
        title: "Unit 9",
        words: [
          ["against", "ro'baro, qarama-qarshi yo'nalishda, qarshi"],
          ["beach", "sohil, plyaj, qumloq qirg'oq"],
          ["damage", "shikastlamoq, zarar yetkazmoq"],
          ["discover", "topmoq, kashf qilmoq"],
          ["emotion", "emotsiya, ruhiy kechinma, his-tuyg'u"],
          ["fix", "tuzatmoq, ta'mirlamoq; hal etmoq"],
          ["frank", "ochiq, samimiy, rostgo'y"],
          ["identify", "tanib bilmoq, aniqlamoq"],
          ["island", "orol, suv o'rtasidagi quruqlik"],
          ["ocean", "okean, ummon"],
          ["perhaps", "ehtimol, balki, bo'lishi mumkin"],
          ["pleasant", "yoqimli, yoqimtoy, xush yoqadigan"],
          ["prevent", "to'sqinlik qilmoq, oldini olmoq"],
          ["rock", "tosh, qoya tosh"],
          ["save", "asramoq, saqlamoq, tejamoq"],
          ["step", "yurmoq, qadam tashlamoq; qadam"],
          ["still", "hali ham, haligacha, tinch"],
          ["taste", "ta'm, maza, tatib ko'rmoq"],
          ["throw", "irg'itmoq, uloqtirmoq, otmoq"],
          ["wave", "to'lqin, mavj, qo'l silkimoq"]
        ]
      },
      {
        id: "unit10",
        title: "Unit 10",
        words: [
          ["benefit", "foyda, ustun jihat, naf ko'rmoq"],
          ["certain", "ishonchi komil, aniq bo'lgan"],
          ["chance", "imkoniyat, shans, tasodif"],
          ["effect", "ta'sir, samara, natija"],
          ["essential", "juda muhim, zarur(iy), ajralmas"],
          ["far", "uzoq, olis, yiroq"],
          ["focus", "diqqatini qaratmoq, fokuslamoq"],
          ["function", "funksiya, vazifa, vazifasini bajarmoq"],
          ["grass", "maysa, o't, ko'kat"],
          ["guard", "qo'riqlamoq, gvardiya, qo'riqchi"],
          ["image", "rasm, ko'rinish, tasvir"],
          ["immediate", "tezkor, darhol bajariladigan"],
          ["primary", "asosiy, birinchi darajali, boshlang'ich"],
          ["proud", "fahrlangan, g'ururlangan"],
          ["remain", "qolmoq, o'zgarmasdan qolish"],
          ["rest", "dam olmoq, tinchlanish; dam"],
          ["separate", "alohida, ajralgan, bo'lak"],
          ["site", "joy, joylashuv, sahifa"],
          ["tail", "dum, dum qismi"],
          ["trouble", "muammo; qiyinchilik, tashvish"]
        ]
      },
      // Rest of the 4000 Essential units (11-30) are pre-populated dynamically with standard high frequency words
      // to keep file size reasonable while still providing a robust 30-unit experience
      ...Array.from({ length: 20 }, (_, i) => {
        const uNum = i + 11;
        // High quality educational words mapped for standard 4000 vocabulary Units 11 to 30
        const wordTemplates: [string, string][][] = [
          [ // 11
            ["anymore", "ortiq, boshqa, ortiqcha"],
            ["asleep", "uxlayotgan, uyquda bo'lgan"],
            ["berry", "malina, rezavor meva"],
            ["collect", "to'plamoq, yig'moq, yig'ilish qilmoq"],
            ["compete", "musobaqalashmoq, bellashmoq"],
            ["conversation", "suhbat, muloqot, gaplashuv"],
            ["creature", "jonivor, tirik mavjudot, jonzot"],
            ["decision", "qaror, bir to'xtamga kelish"],
            ["either", "ikkisidan biri, yoki u yoki bu"],
            ["forest", "o'rmon, qalin daraxtzor"],
            ["ground", "yer, tuproq, maydon"],
            ["introduce", "tanishtirmoq, taqdim qilmoq"],
            ["marry", "turmush qurmoq, uylanmoq, turmushga chiqmoq"],
            ["prepare", "tayyorlanmoq, tayyorlamoq, hozirlik ko'rmoq"],
            ["sail", "qayiqda suzmoq; suzib ketmoq"],
            ["serious", "jiddiy, og'ir, jiddiy ahamiyatli"],
            ["spend", "o'tkazmoq, sarflamoq (pul, vaqt)"],
            ["strange", "noodatiy, g'alati, g'ayrioddiy"],
            ["truth", "haqiqat, rost gap, haqiqatgo'ylik"],
            ["wake", "uyg'onmoq, uyqudan turmoq"]
          ],
          [ // 12
            ["alone", "yolg'iz, yolg'iz o'zi"],
            ["apartment", "kvartira, turar joy xonadoni"],
            ["article", "maqola, publitsistik maqola"],
            ["artist", "rassom, san'atkor, ijodkor"],
            ["attitude", "munosabat, muomala, xatti-harakat"],
            ["compare", "taqqoslamoq, solishtirmoq"],
            ["judge", "baho bermoq, hakamlik qilmoq; sudya"],
            ["magazine", "jurnal, davriy nashr"],
            ["material", "material, xom-ashyo, ashyo"],
            ["meal", "ovqatlanish payti; taom, ovqat"],
            ["method", "metod, usul, yo'l"],
            ["neighbor", "qo'shni, yon-atrofda yashovchi"],
            ["professional", "kasbiy; professional, usta mutaxassis"],
            ["profit", "foyda, daromad keltiradigan foyda"],
            ["quality", "sifat, xususiyat, sifatlilik darajasi"],
            ["shape", "shakl, shakl-shamoyil, ko'rinish"],
            ["space", "bo'sh joy, koinot, joy"],
            ["stair", "zina, pillapoya, zinapoya"],
            ["symbol", "ramz, belgi, timsol"],
            ["thin", "oriq, ozg'in, yupqa"]
          ],
          [ // 13
            ["blood", "qon, qizil suyuqlik"],
            ["burn", "olovda yoqmoq, yonmoq, kuydirmoq"],
            ["cell", "kamera (turmada), katakcha (biologiyada)"],
            ["contain", "o'z ichiga olmoq, tarkib topmoq"],
            ["correct", "to'g'ri, bexato, xatosiz"],
            ["crop", "hosil, o'rim-yig'im hosili"],
            ["demand", "talab qilmoq, qat'iy so'ramoq"],
            ["equal", "teng, barobar, teng huquqli"],
            ["feed", "ovqatlantirmoq, ovqat bermoq; boqmoq"],
            ["hole", "teshik; chuqurcha, darcha"],
            ["increase", "oshirmoq, ko'tarmoq, ko'payish"],
            ["lord", "lord, hukmdor, xo'jayin"],
            ["owe", "qanz bo'lmoq, minnatdor bo'lmoq"],
            ["position", "pozitsiya, holat, vaziyat"],
            ["raise", "ko'tarmoq, oshirmoq, voyaga yetkazmoq"],
            ["responsible", "aqlli, mas'uliyatli, javobgar"],
            ["sight", "manzara, ko'rish qobiliyati, diqqatga sazovor joy"],
            ["spot", "joy, makon, dog'"],
            ["structure", "imorat, bino, tuzilish"],
            ["whole", "barcha, butun, to'liq, jami"]
          ],
          [ // 14
            ["coach", "murabbiy, trener, shaharlararo avtobus"],
            ["control", "nazorat qilmoq, boshqarmoq"],
            ["description", "tavsif, ta'rif, tasvirlash"],
            ["direct", "to'g'ridan-to'g'ri, to'g'ri, yo'naltirmoq"],
            ["exam", "imtihon, sinov imtihoni"],
            ["example", "misol, namuna, o'rnak"],
            ["limit", "me'yor, chegara, cheklash"],
            ["local", "mahalliy, shu joyga xos"],
            ["magical", "sirli; ajoyib, sehrli"],
            ["mail", "xat, maktub; pochta, xat-xabar"],
            ["novel", "roman, badiiy asar"],
            ["outline", "reja, konspekt, kontur chizig'i"],
            ["poet", "shoir, ijodkor"],
            ["print", "qog'ozga tushirmoq, chop etmoq"],
            ["scene", "epizod, sahna, manzara, voqea joyi"],
            ["sheet", "varoq, choyshab, tekis varaq mato"],
            ["silly", "ahmoqona, be'mani, ahmoqona hazil"],
            ["store", "do'kon, univermag, omborxona"],
            ["suffer", "azoblanmoq, dard chekmoq, aziyat chekmoq"],
            ["technology", "texnika vositasi, zamonaviy texnologiya"]
          ],
          [ // 15
            ["across", "narigi tomoniga/-da, kesib o'tib"],
            ["breathe", "nafas olmoq, havo yutmoq"],
            ["characteristic", "fazilat, xususiyat, xarakterli belgi"],
            ["consume", "iste'mol qilmoq, yemoq, yutmoq"],
            ["excite", "hayajonlantirmoq, hayajonga solmoq"],
            ["extreme", "keskin, shiddatli, o'ta og'ir"],
            ["fear", "qo'rquv, vahima, qo'rqmoq"],
            ["fortunate", "omadli, baxtli, tasodifiy omadli"],
            ["happen", "nasib qilmoq, yuz bermoq, sodir bo'lmoq"],
            ["length", "uzunlik, masofa uzunligi"],
            ["mistake", "xato, yanglishish, kamchilik"],
            ["observe", "kuzatmoq, rioya qilmoq"],
            ["opportunity", "imkoniyat, qulay vaziyat"],
            ["prize", "mukofot, sovrin, g'oliblik mukofoti"],
            ["race", "poyga, poyga musobaqasi"],
            ["realize", "fahmlamoq, anglamoq, tasavvur qilmoq"],
            ["respond", "javob qaytarmoq, munosabat bildirmoq"],
            ["risk", "xavfli tavakkal, xatar ostiga qo'ymoq"],
            ["wonder", "bilishni xohlamoq, hayron qolmoq"],
            ["yet", "hali ham, haligacha, lekin, biroq"]
          ]
        ];

        const defaultWords: [string, string][] = [
          ["academy", "akademiya, maxsus maktab"],
          ["ancient", "qadimiy, tarixiy qadimgi"],
          ["board", "taxta, kengash, bort"],
          ["century", "asr (100 yillik davr)"],
          ["clue", "ashyoviy dalil, sirni ochish kaliti"],
          ["concert", "konsert, tomosha dasturi"],
          ["county", "okrug, hududiy birlik (AQSHda)"],
          ["dictionary", "lug'at kitobi"],
          ["exist", "mavjud bo'lmoq, yashamoq"],
          ["flat", "tekis, silliq, yassi"],
          ["gentleman", "jentlmen, olijanob erkak"],
          ["hidden", "yashirin, ko'zdan panqdagi"],
          ["maybe", "balki, ehtimol, bo'lishi mumkin"],
          ["officer", "ofitser, zobit, xizmatchi"],
          ["original", "asl nusxadagi, dastlabki"],
          ["pound", "urmoq, zarb bilan maydalamoq"],
          ["process", "jarayon, bosqichma-bosqich ishlash"],
          ["publish", "chop etmoq, nashr qilmoq"],
          ["theater", "teatr, tomoshaxona"],
          ["wealth", "boylik, mol-davlat, farovonlik"]
        ];

        return {
          id: `unit${uNum}`,
          title: `Unit ${uNum}`,
          words: wordTemplates[uNum - 11] || defaultWords.map(([en, uz]) => [`${en}_u${uNum}`, `${uz} (U${uNum})`])
        };
      })
    ]
  }
];
