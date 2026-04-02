const fs = require('fs');
const path = require('path');

// New works to add per poet (5 each)
const newWorks = {
  'mirza-ghalib': [
    { id:'gh-4', title:'Ye Na Thi Hamari Qismat', type:'Ghazal', text:'Ye na thi hamari qismat ke visaal-e-yaar hota\nAgar aur jeete rehte yehi intezaar hota\n\nTere vaade par jiye hum to ye jaan jhoot jaana\nKe khushi se mar na jaate agar aitabaar hota\n\nKoi mere dil se pooche tere teer-e-neem-kash ko\nYe khalish kahan se hoti jo jigar ke paar hota\n\nYe masael-e-tasawwuf ye tera bayaan Ghalib\nTujhe hum wali samajhte jo na baada-khwaar hota', roman:'ये न थी हमारी क़िस्मत कि विसाल-ए-यार होता\nअगर और जीते रहते यही इंतिज़ार होता', tags:['Destiny','Love'], likes:4520 },
    { id:'gh-5', title:'Dard Minnat Kash-e-Dawa Na Hua', type:'Ghazal', text:'Dard minnat-kash-e-dawa na hua\nMain na achha hua bura na hua\n\nJam\'a karte ho kyon raqeebon ko\nEk tamaasha hua gila na hua\n\nJaan di di hui usi ki thi\nHaq to yun hai ke haq ada na hua\n\nKuch to padhiye ke log kehte hain\nAaj Ghalib ghazal-sara na hua', roman:'दर्द मिन्नत-कश-ए-दवा न हुआ\nमैं न अच्छा हुआ बुरा न हुआ', tags:['Pain','Irony'], likes:3890 },
    { id:'gh-6', title:'Har Ek Baat Pe Kehte Ho', type:'Ghazal', text:'Har ek baat pe kehte ho tum ke tu kya hai\nTumheen kaho ke ye andaaz-e-guftagu kya hai\n\nJala hai jism jahan dil bhi jal gaya hoga\nKuredte ho jo ab raakh justujoo kya hai\n\nRagon mein daudte phirne ke hum nahin qaayal\nJab aankh hi se na tapka to phir lahoo kya hai\n\nRahi na taaqat-e-guftaar aur agar ho bhi\nTo kis ummeed pe kahiye ke aarzoo kya hai', roman:'हर एक बात पे कहते हो तुम कि तू क्या है\nतुम्हीं कहो कि ये अंदाज़-ए-गुफ़्तगू क्या है', tags:['Philosophy','Wit'], likes:6120 },
    { id:'gh-7', title:'Phir Mujhe Deeda-e-Tar Yaad Aaya', type:'Ghazal', text:'Phir mujhe deeda-e-tar yaad aaya\nDil jigar tishna-e-faryaad aaya\n\nDam liya tha na qayamat ne hanoz\nPhir tera waqt-e-safar yaad aaya\n\nPhir tere kooche ko jaata hai khayal\nDil-e-gumgashta magar yaad aaya\n\nKoi veerani si veerani hai\nDasht ko dekh ke ghar yaad aaya\n\nMain ne majnoon pe ladakpan mein Asad\nSang uthaaya tha ke sar yaad aaya', roman:'फिर मुझे दीदा-ए-तर याद आया\nदिल जिगर तिश्ना-ए-फ़र्याद आया', tags:['Memory','Sorrow'], likes:3200 },
    { id:'gh-8', title:'Naqsh Faryadi Hai', type:'Ghazal', text:'Naqsh faryadi hai kis ki shokhi-e-tehreer ka\nKaaghazi hai pairahan har paikar-e-tasveer ka\n\nKaav-kaav-e-sakht-jaani-haaye-tanhayi na pooch\nSubah karna shaam ka laana hai joo-e-sheer ka\n\nTa phir na intezaar mein neend aaye umar bhar\nAane ka ahd kar gaye aaye jo baar-e-beer ka', roman:'नक़्श फ़र्यादी है किस की शोख़ी-ए-तहरीर का\nकाग़ज़ी है पैरहन हर पैकर-ए-तस्वीर का', tags:['Classic','Art'], likes:2870 }
  ],
  'mir-taqi-mir': [
    { id:'mr-4', title:'Ulti Ho Gayin Sab Tadbeerein', type:'Ghazal', text:'Ulti ho gayin sab tadbeerein kuch na dawa ne kaam kiya\nDekha is beemari-e-dil ne aakhir kaam tamam kiya\n\nAhad-e-jawani ro ro kaata peeri mein li aankhein moond\nYaani raat bohat the jaage subah hui aaram kiya\n\nMir ke deen-o-mazhab ko ab poochho kya ho un ne to\nQashqa khencha dair mein baitha kab ka tark-e-islam kiya', roman:'उल्टी हो गईं सब तदबीरें कुछ न दवा ने काम किया\nदेखा इस बीमारी-ए-दिल ने आख़िर काम तमाम किया', tags:['Fate','Classic'], likes:1780 },
    { id:'mr-5', title:'Ibtida-e-Ishq Hai', type:'Ghazal', text:'Ibtida-e-ishq hai rota hai kya\nAage aage dekhiye hota hai kya\n\nQaafile mein subah ke ek shor hai\nYaani ghaafil hum chale sota hai kya\n\nYe nishaan-e-ishq hain jaate nahin\nDaagh chhaati ke abas dhota hai kya', roman:'इब्तिदा-ए-इश्क़ है रोता है क्या\nआगे आगे देखिए होता है क्या', tags:['Love','Beginning'], likes:2900 },
    { id:'mr-6', title:'Yaaro Mujhe Maaf Rakho', type:'Ghazal', text:'Yaaro mujhe maaf rakho main nashe mein hoon\nAb do to jaam khaali hi do main nashe mein hoon\n\nYa haathon haath lo mujhe maanind-e-jaam-e-mai\nYa thodi door saath chalo main nashe mein hoon\n\nNazuk-mizaaj aap qayamat hain Mir jee\nJo sheesha mere munh na lago main nashe mein hoon', roman:'यारो मुझे माफ़ रक्खो मैं नशे में हूँ\nअब दो तो जाम ख़ाली ही दो मैं नशे में हूँ', tags:['Wine','Classic'], likes:1560 },
    { id:'mr-7', title:'Mohabbat Karne Waale Kam Na Honge', type:'Sher', text:'Mohabbat karne waale kam na honge\nTeri mehfil mein lekin hum na honge', roman:'मोहब्बत करने वाले कम न होंगे\nतेरी महफ़िल में लेकिन हम न होंगे', tags:['Pride'], likes:3450 },
    { id:'mr-8', title:'Mir In Neem Baaz Aankhon Mein', type:'Sher', text:'Mir in neem baaz aankhon mein\nSaari masti sharaab ki si hai', roman:'मीर इन नीम बाज़ आँखों में\nसारी मस्ती शराब की सी है', tags:['Beauty'], likes:2600 }
  ],
  'faiz-ahmad-faiz': [
    { id:'fz-4', title:'Bol Ke Lab Azaad Hain Tere', type:'Nazm', text:'Bol ke lab azaad hain tere\nBol zabaan ab tak teri hai\nTera sutwan jism hai tera\nBol ke jaan ab tak teri hai\n\nDekh ke aahangar ki dukaan mein\nTund hain shole surkh hai aahan\nKhulne lage quflon ke dahane\nPhaila har ek zanjeer ka daaman\n\nBol ye thoda waqt bahut hai\nJism o zabaan ki maut se pahle\nBol ke sach zinda hai ab tak\nBol jo kuch kehna hai keh le', roman:'बोल कि लब आज़ाद हैं तेरे\nबोल ज़बान अब तक तेरी है', tags:['Freedom','Defiance'], likes:11200 },
    { id:'fz-5', title:'Aaj Bazaar Mein Pa-ba-Jaulan Chalo', type:'Nazm', text:'Aaj bazaar mein pa-ba-jaulan chalo\nChasm-e-nam jaan-e-shoreedaan kaafi nahin\nTohmat-e-ishq poshidaa kaafi nahin\nAaj bazaar mein pa-ba-jaulan chalo\n\nDast-afshaan chalo mast-o-raqsaan chalo\nKhaak bar sar chalo khoon ba-damaan chalo\nRaah taktaa hai sab sheher-e-jaanaan chalo\n\nRakht-e-dil baandh lo dil-figaaro chalo\nPhir hameen qatl ho jaayein ae yaaro chalo', roman:'आज बाज़ार में पा-ब-जौलाँ चलो\nदस्त-अफ़शाँ चलो मस्त-ओ-रक़्साँ चलो', tags:['Revolution','Courage'], likes:7800 },
    { id:'fz-6', title:'Aap Ki Yaad Aati Rahi Raat Bhar', type:'Ghazal', text:'Aap ki yaad aati rahi raat bhar\nChandni dil dukhati rahi raat bhar\n\nGaah jalti hui gaah bujhti hui\nShamma-e-gham jhilmilaati rahi raat bhar\n\nKoi khushboo badalti rahi pairahan\nKoi tasveer gaati rahi raat bhar\n\nJo na aaya use koi zanjeer-e-dar\nHar sadaa par bulaati rahi raat bhar', roman:'आप की याद आती रही रात भर\nचाँदनी दिल दुखाती रही रात भर', tags:['Longing','Night'], likes:6200 },
    { id:'fz-7', title:'Dasht-e-Tanhai Mein', type:'Nazm', text:'Dasht-e-tanhai mein ae jaan-e-jahan larzan hain\nTeri aawaaz ke saaye tere honton ke saraab\nDasht-e-tanhai mein doori ke khas-o-khaak tale\nKhil rahe hain tere pehloo ke saman aur gulaab', roman:'दश्त-ए-तन्हाई में ऐ जान-ए-जहाँ लर्ज़ाँ हैं\nतेरी आवाज़ के साए तेरे होंटों के सराब', tags:['Solitude','Love'], likes:5100 },
    { id:'fz-8', title:'Subh-e-Azadi', type:'Nazm', text:'Ye daagh daagh ujaala ye shab-gazida sehar\nWoh intezaar tha jiska ye woh sehar to nahin\n\nYe woh sehar to nahin jis ki aarzoo lekar\nChale the yaar ke mil jayegi kahin na kahin\nFalak ke dasht mein taaron ki aakhri manzil\nKahin to hoga shab-e-sust mauj ka saahil', roman:'ये दाग़ दाग़ उजाला ये शब-गज़ीदा सहर\nवो इंतज़ार था जिसका ये वो सहर तो नहीं', tags:['Independence','Hope'], likes:8900 }
  ],
  'allama-iqbal': [
    { id:'iq-4', title:'Shikwa (Excerpt)', type:'Nazm', text:'Kyun ziyaan-kaar banoon sood-framosh rahoon\nFikr-e-farda na karoon mehv-e-gham-e-dosh rahoon\n\nNaalein bulbul ki sunoon aur hamaa-tan gosh rahoon\nHum-nawaa main bhi koyi gul hoon ke khamosh rahoon\n\nJurrat-aamooz meri taab-e-sakhun hai mujh ko\nShikwa Allah se khakam-ba-dahan hai mujh ko', roman:'क्यूँ ज़ियाँ-कार बनूँ सूद-फ़रामोश रहूँ\nफ़िक्र-ए-फ़र्दा न करूँ महव-ए-ग़म-ए-दोश रहूँ', tags:['Complaint','Faith'], likes:7600 },
    { id:'iq-5', title:'Jawab-e-Shikwa (Excerpt)', type:'Nazm', text:'Shikwa-allahu-akbar-hai-ye-junoon\nHai-bura-haal-baton-mein-khoya\nMashaallah-maslak-bhi-ibraheem-ka\nAur-haath-mein-but-e-aazar-bhi\n\nAapas mein hain giro-daar-bani-hum\nAur hai zukhm-se-bhi-ye-bhi-anokha\nKya zamane mein panapne ki yehi baat hai\nKya zamane mein rehne ki yehi reet hai', roman:'शिकवा-अल्लाहु-अकबर है ये जुनूँ', tags:['Answer','Faith'], likes:6800 },
    { id:'iq-6', title:'Tulu-e-Islam (Excerpt)', type:'Nazm', text:'Agar chahein to abad-kaar duniya ko bana daalein\nHamaara naala-e-shab gaahi ka andaaz purana hai\n\nIlahi besabab tera musafir hoga haar ka\nSunehra daur ayega tera imaan ka\n\nYe sub kuch din mein hoga hum umeedo waalon ne\nZameenein chhod di hum ne aasmaan hamara hai', roman:'इलाही बेसबब तेरा मुसाफ़िर होगा हार का', tags:['Rise','Unity'], likes:5500 },
    { id:'iq-7', title:'Tere Ishq Ki Intiha Chahta Hoon', type:'Ghazal', text:'Tire ishq ki intiha chahta hoon\nMeri saadhgi dekh kya chahta hoon\n\nSutoon-e-haram toda do in mein agar\nNahi hai koi juz khuda chahta hoon\n\nLabrez hai sharaab-e-haqiqat se jaam\nUja kar main phir nasha chahta hoon', roman:'तिरे इश्क़ की इंतिहा चाहता हूँ\nमिरी सादगी देख क्या चाहता हूँ', tags:['Devotion','Quest'], likes:4900 },
    { id:'iq-8', title:'Khibrad Mandon Se Kya Poochoon', type:'Ghazal', text:'Khirad-mandon se kya poochoon ki meri ibtida kya hai\nKe main is fikr mein rehta hoon meri intiha kya hai\n\nYe paani zar-nigaar abron ka girta hai zameen par\nGaya dekhun to patthar hain bataaon mujh ko kya hai', roman:'ख़िरद-मंदों से क्या पूछूँ कि मेरी इब्तिदा क्या है\nमैं इस फ़िक्र में रहता हूँ मेरी इंतिहा क्या है', tags:['Self','Philosophy'], likes:4100 }
  ],
  'jaun-elia': [
    { id:'je-3', title:'Duniya Ne Teri Yaad Se Begaana Kar Diya', type:'Ghazal', text:'Duniya ne teri yaad se begaana kar diya\nTujh se bhi dil-fareb hai duniya ka mela yaar\n\nSochta hoon waqt ne kya kar diya mujhe\nDil tha mera woh dil na rahaa dard ka maara', roman:'दुनिया ने तेरी याद से बेगाना कर दिया', tags:['Memory','World'], likes:5400 },
    { id:'je-4', title:'Tu Kisi Roz Mere Ghar Aana', type:'Ghazal', text:'Tu kisi roz mere ghar aana\nKhol dena meri aankhon ke kisi darwaze ko\n\nHum bhi bahut rote hain teri yaad mein\nTu bhi kabhi dair se aa kar to sunaana', roman:'तू किसी रोज़ मेरे घर आना\nखोल देना मेरी आँखों के किसी दरवाज़े को', tags:['Waiting','Desire'], likes:6100 },
    { id:'je-5', title:'Wo Log Bahut Khush-Qismat', type:'Ghazal', text:'Wo log bahut khush-qismat the\nJo ishq ko ishq ke naam diya\nHum ne to jab kaliya mangi\nKaanton ka inam diya duniya ne\n\nHum ne jab chaaha apnaana\nDuniya ne begaana kar diya', roman:'वो लोग बहुत ख़ुश-क़िस्मत थे\nजो इश्क़ को इश्क़ के नाम दिया', tags:['Fate','Pain'], likes:7800 },
    { id:'je-6', title:'Kitne Aish Se Rehte Honge', type:'Sher', text:'Kitne aish se rehte honge kitne itraate honge\nJaane kaise log wo honge jo us ko bhaate honge', roman:'कितने ऐश से रहते होंगे कितने इतराते होंगे\nजाने कैसे लोग वो होंगे जो उस को भाते होंगे', tags:['Jealousy'], likes:5600 },
    { id:'je-7', title:'Bekarari Si Bekarari Hai', type:'Sher', text:'Bekarari si bekarari hai\nDil mein kya koi taiyari hai\n\nApne sab yaar ro rahe honge\nYe ghazal un ki yaadgari hai', roman:'बेक़रारी सी बेक़रारी है\nदिल में क्या कोई तैयारी है', tags:['Restlessness'], likes:4300 }
  ],
  'ahmad-faraz': [
    { id:'af-3', title:'Tanha Tanha (Title Poem)', type:'Ghazal', text:'Tanha tanha saheroon mein ye kya rasm-e-safar hai\nHum hain aur raasta hai aur raat bhar hai\n\nKhushbu-e-gul se bhari ye fizaayein hain magar\nDil ke sehra mein koi tanha musafir hai\n\nKoi saathi nahin hai koi hamraah nahin\nBas ek dard hai jo hamaara humsafar hai', roman:'तन्हा तन्हा सहरों में ये क्या रस्म-ए-सफ़र है\nहम हैं और रास्ता है और रात भर है', tags:['Loneliness','Journey'], likes:4800 },
    { id:'af-4', title:'Kisi Ko Ghar Se Nikalte Hi', type:'Sher', text:'Kisi ko ghar se nikalte hi mil gayi manzil\nKoi hamari tarah umr bhar safar mein raha', roman:'किसी को घर से निकलते ही मिल गई मंज़िल\nकोई हमारी तरह उम्र भर सफ़र में रहा', tags:['Destiny'], likes:7200 },
    { id:'af-5', title:'Ab Woh Nashist-o-Barkhast', type:'Ghazal', text:'Ab woh nashist-o-barkhast kaisi kaisi\nAb woh guftaar-o-shuneed kaisi kaisi\n\nMujh ko ab rabt nahin raha zamane se\nYe judaayi bhi ajab cheez hai kaisi kaisi', roman:'अब वो नशिस्त-ओ-बरख़ास्त कैसी कैसी\nअब वो गुफ़्तार-ओ-शुनीद कैसी कैसी', tags:['Nostalgia'], likes:3400 },
    { id:'af-6', title:'Aur Faraz Chahiye', type:'Sher', text:'Aur Faraz chahiye kitni mohabbatein tujhe\nMaaon ne tere naam par bachchon ke naam rakh diye', roman:'और फ़राज़ चाहिए कितनी मोहब्बतें तुझे\nमाओं ने तेरे नाम पर बच्चों के नाम रख दिए', tags:['Fame','Love'], likes:5100 },
    { id:'af-7', title:'Us Se Ek Baar Toh Rootho', type:'Sher', text:'Us se ek baar toh rootho main usi ki maanind\nAur meri tarah se wo mujhko manane aaye', roman:'उस से एक बार तो रूठूँ मैं उसी की मानिंद\nऔर मेरी तरह से वो मुझको मनाने आए', tags:['Romance'], likes:4600 }
  ],
  'parveen-shakir': [
    { id:'ps-3', title:'Main Hijr Ke Aazab Se', type:'Ghazal', text:'Main hijr ke aazab se anjaan bhi na thi\nUs shehr mein rehti thi badnaam bhi na thi\n\nJis roz se dekha hai tumhein door se\nAankhon mein nami hai pe udaas bhi na thi', roman:'मैं हिज्र के अज़ाब से अंजान भी न थी\nउस शहर में रहती थी बदनाम भी न थी', tags:['Separation'], likes:3900 },
    { id:'ps-4', title:'Kuch To Hawa Bhi Sard Thi', type:'Sher', text:'Kuch to hawa bhi sard thi kuch tha tera khayal bhi\nKuch dil udaas udaas tha kuch raah mein bawal bhi', roman:'कुछ तो हवा भी सर्द थी कुछ था तेरा ख़याल भी\nकुछ दिल उदास उदास था कुछ राह में बवाल भी', tags:['Melancholy'], likes:4700 },
    { id:'ps-5', title:'Us Se Ek Baar Toh', type:'Ghazal', text:'Us se ek baar to roothun main usi ki maanind\nAur meri tarah se wo mujhko manaane aaye\n\nGhar ke andar aake meri haathon ko pakde\nPhir meri aankhon mein jhankay mere dil ko jaane', roman:'उस से एक बार तो रूठूँ मैं उसी की मानिंद\nऔर मेरी तरह से वो मुझ को मनाने आए', tags:['Desire','Romance'], likes:3500 },
    { id:'ps-6', title:'Kal Raat Ka Waqia', type:'Nazm', text:'Kal raat ka waqia suno\nMain bahut door tak gayi thi\nUski yaad ke saaye mein\nUski khushboo ke saaye mein\nRaat bhar main chali gayi thi', roman:'कल रात का वाक़िया सुनो\nमैं बहुत दूर तक गई थी', tags:['Night','Memory'], likes:3100 },
    { id:'ps-7', title:'Wo Mera Kuch Nahin Lagta', type:'Sher', text:'Wo mera kuch nahin lagta magar us ke bagair\nMain kisi kaam ki lagti nahin khud ko bhi nazar', roman:'वो मेरा कुछ नहीं लगता मगर उस के बग़ैर\nमैं किसी काम की लगती नहीं ख़ुद को भी नज़र', tags:['Love'], likes:4400 }
  ],
  'gulzar': [
    { id:'gz-2', title:'Chaand Pukhraj Ka', type:'Nazm', text:'Chaand pukhraj ka tha surya mukhi ke phool pe\nEk sitara hi reh gaya tha chhajje ke uss paar\nDheere dheere roshni pighal gayi kitaabon mein\nSab andhera panno mein sama gaya', roman:'चाँद पुखराज का था सूर्यमुखी के फूल पे\nएक सितारा ही रह गया था छज्जे के उस पार', tags:['Night','Imagery'], likes:5600 },
    { id:'gz-3', title:'Kitaabein (Nazm)', type:'Nazm', text:'Kitaabein bahut si padhi hongi tumne\nMagar woh kitab padhi hai kabhi\nJo likhi jaati hai pedon ki chhaaon mein baith kar\nYa nadiyon ke kinare\n\nWoh kitab jismein likha hota hai\nKe kis tarah se roshni dhup mein pighalti hai', roman:'किताबें बहुत सी पढ़ी होंगी तुमने\nमगर वो किताब पढ़ी है कभी', tags:['Nature','Books'], likes:7200 },
    { id:'gz-4', title:'Triveni - 1', type:'Sher', text:'Koi raasta koi gali nahin jaanti\nSab raaste ek mod pe dobara milte hain\nFiraq ka safar gol hota hai', roman:'कोई रास्ता कोई गली नहीं जानती\nसब रास्ते एक मोड़ पे दोबारा मिलते हैं\nफ़िराक़ का सफ़र गोल होता है', tags:['Triveni','Separation'], likes:6800 },
    { id:'gz-5', title:'Triveni - 2', type:'Sher', text:'Wo mere paas baithi rahi der tak\nPhir uthee aur chali gayi khamoshi se\nMain ne socha shayad kuch kehna chahti thi', roman:'वो मेरे पास बैठी रही देर तक\nफिर उठी और चली गई ख़ामोशी से\nमैंने सोचा शायद कुछ कहना चाहती थी', tags:['Triveni','Silence'], likes:5800 },
    { id:'gz-6', title:'Raat Pashmine Ki', type:'Nazm', text:'Raat pashmine ki thi\nChaandni ne bistar lagaya tha\nNeend aayi toh sapna aaya\n\nSapne mein koi tha\nJo dhundhla sa dikhta tha\nPar mehsoos bahut hota tha\nJaise dhadkan hoti hai', roman:'रात पश्मीने की थी\nचाँदनी ने बिस्तर लगाया था\nनींद आई तो सपना आया', tags:['Night','Dreams'], likes:7400 }
  ]
};

// Read current file
const filePath = path.join(__dirname, '..', 'src', 'data', 'poets.js');
let content = fs.readFileSync(filePath, 'utf8');

function getAuthorName(id) {
  const map = {
    'mirza-ghalib': 'Mirza Ghalib',
    'mir-taqi-mir': 'Mir Taqi Mir',
    'faiz-ahmad-faiz': 'Faiz Ahmad Faiz',
    'allama-iqbal': 'Allama Iqbal',
    'jaun-elia': 'Jaun Elia',
    'ahmad-faraz': 'Ahmad Faraz',
    'parveen-shakir': 'Parveen Shakir',
    'gulzar': 'Gulzar'
  };
  return map[id];
}

for (const [poetId, works] of Object.entries(newWorks)) {
  const author = getAuthorName(poetId);
  const poetIdIdx = content.indexOf(`id: '${poetId}'`);
  if (poetIdIdx === -1) { console.log('Poet not found:', poetId); continue; }
  
  const worksIdx = content.indexOf('works: [', poetIdIdx);
  if (worksIdx === -1) { console.log('Works not found for:', poetId); continue; }
  
  let depth = 0;
  let inTemplate = false;
  let bracketIdx = -1;
  for (let i = worksIdx + 7; i < content.length; i++) {
    const ch = content[i];
    if (ch === '`') inTemplate = !inTemplate;
    if (inTemplate) continue;
    if (ch === '[') depth++;
    if (ch === ']') {
      if (depth === 0) { bracketIdx = i; break; }
      depth--;
    }
  }
  
  if (bracketIdx === -1) { console.log('Bracket not found for:', poetId); continue; }
  
  const worksStr = works.map(w => `      {
         id: '${w.id}',
         title: '${w.title.replace(/'/g, "\\'")}',
         type: '${w.type}',
         author: '${author}',
         text: \`${w.text}\`,
         roman: \`${w.roman}\`,
         likes: ${w.likes},
         tags: [${w.tags.map(t => `'${t}'`).join(', ')}]
      }`).join(',\n');
  
  content = content.slice(0, bracketIdx) + ',\n' + worksStr + '\n    ' + content.slice(bracketIdx);
  console.log(`Added ${works.length} works for ${author}`);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('\nDone! poets.js updated with new works.');
console.log('Total file size:', (content.length / 1024).toFixed(1), 'KB');
