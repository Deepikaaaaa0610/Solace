export const poets = [
  {
    id: 'mirza-ghalib',
    name: 'Mirza Ghalib',
    nameUrdu: 'مرزا غالب',
    era: '1797–1869',
    birthPlace: 'Agra, Mughal Empire',
    shortBio: 'The most revered classical Urdu and Persian poet, known for his unmatched depth and profound philosophical insights.',
    fullBio: 'Mirza Asadullah Baig Khan, known as Ghalib, is the undisputed master of classical Urdu and Persian poetry. His profound understanding of human emotions, philosophical depth, and unparalleled poetic structure make him the most widely read and quoted poet in South Asia. His works continuously transcend time.\n\nGhalib lived during a period of tumultuous transition as the Mughal Empire declined and British rule took over India. Despite personal tragedies and financial difficulties throughout his life, his ghazals reflect a remarkable resilience, wit, and a universal understanding of pain, love, and existence.',
    image: 'https://rekhta.pc.cdn.bitgravity.com/Images/Shayar/mirza-ghalib.jpg',
    works: [
      {
        id: 'gh-1',
        title: 'Dil-e-Nadaan Tujhe Hua Kya Hai',
        type: 'Ghazal',
        author: 'Mirza Ghalib',
        text: `Dil-e-nadaan tujhe hua kya hai
Aakhir is dard ki dawa kya hai

Hum hain mushtaq aur wo bezaar
Ya ilahi ye maajra kya hai

Main bhi munh mein zaban rakhta hoon
Kaash poocho ki muddaa kya hai

Jab ki tujh bin nahin koi maujood
Phir ye hangama ae khuda kya hai

Ye pari-chehra log kaise hain
Ghamza-o-ishwa-o-ada kya hai

Humko unse wafa ki hai umeed
Jo nahin jaante wafa kya hai

Jaan tum par nisaar karta hoon
Main nahin jaanta dua kya hai`,
        roman: `दिल-ए-नादाँ तुझे हुआ क्या है, आख़िर इस दर्द की दवा क्या है? \nहम हैं मुश्ताक़ और वो बेज़ार, या इलाही ये माजरा क्या है?`,
        likes: 1540,
        tags: ['Classic', 'Philosophy']
      },
      {
        id: 'gh-2',
        title: 'Koi Ummeed Bar Nahin Aati',
        type: 'Ghazal',
        author: 'Mirza Ghalib',
        text: `Koi ummeed bar nahin aati
Koi soorat nazar nahin aati

Maut ka ek din muayyan hai
Neend kyun raat bhar nahin aati

Aage aati thi haal-e-dil pe hansi
Ab kisi baat par nahin aati

Jaanta hoon sawab-e-taaat-o-zohad
Par tabiyat idhar nahin aati

Marte hain arzoo mein marne ki
Maut aati hai par nahin aati

Kaaba kis munh se jaoge Ghalib
Sharm tumko magar nahin aati`,
        roman: `कोई उम्मीद बर नहीं आती, कोई सूरत नज़र नहीं आती। \nमौत का एक दिन मुअय्यन है, नींद क्यूँ रात भर नहीं आती?`,
        likes: 2130,
        tags: ['Sorrow', 'Classic']
      },
      {
        id: 'gh-3',
        title: 'Aah Ko Chahiye',
        type: 'Ghazal',
        author: 'Mirza Ghalib',
        text: `Aah ko chahiye ik umar asar hone tak
Kaun jeeta hai teri zulf ke sar hone tak

Hum ne maana ki taghaful na karoge lekin
Khaak ho jayenge hum tumko khabar hone tak

Gham-e-hasti ka asad kis se ho juz marg ilaaj
Shamma har rang mein jalti hai sehar hone tak`,
        roman: `आह को चाहिए एक उम्र असर होने तक, कौन जीता है तिरी ज़ुल्फ़ के सर होने तक। \nशम्मा हर रंग में जलती है सहर होने तक।`,
        likes: 1890,
        tags: ['Patience', 'Love']
      },
      {
         id: 'sh-1',
         title: 'Hazaaron Khwahishein',
         type: 'Sher',
         author: 'Mirza Ghalib',
         text: `Hazaaron khwahishein aisi ki har khwahish pe dum nikle\nBahut niklay mere armaan lekin phir bhi kam nikle`,
         roman: `हज़ारों ख़्वाहिशें ऐसी कि हर ख़्वाहिश पे दम निकले \nबहुत निकले मेरे अरमान लेकिन फिर भी कम निकले`,
         likes: 5690,
         tags: ['Desire']
      },
      {
         id: 'sh-2',
         title: 'Bazicha-e-Atfal',
         type: 'Sher',
         author: 'Mirza Ghalib',
         text: `Baazeecha-e-atfaal hai duniya mere aage\nHota hai shab-o-roz tamasha mere aage`,
         roman: `बाज़ीचा-ए-अतफ़ाल है दुनिया मेरे आगे \nहोता है शब-ओ-रोज़ तमाशा मेरे आगे`,
         likes: 4200,
         tags: ['Life']
      },
      {
         id: 'sh-3',
         title: 'Ishq Ne Ghalib',
         type: 'Sher',
         author: 'Mirza Ghalib',
         text: `Ishq ne Ghalib nikamma kar diya\nWarna hum bhi aadmi the kaam ke`,
         roman: `इश्क़ ने 'ग़ालिब' निकम्मा कर दिया \nवर्ना हम भी आदमी थे काम के`,
         likes: 3850,
         tags: ['Love']
      }
      ,
      {
         id: 'sh-22',
         title: 'Na Tha Kuchh To Khuda Tha',
         type: 'Sher',
         author: 'Mirza Ghalib',
         text: `Na tha kuchh to Khuda tha, kuchh na hota to Khuda hota\nDuboya mujh ko hone ne, na hota main to kya hota`,
         roman: '',
         likes: 4480,
         tags: ['Philosophy', 'Existence']
      },
      {
         id: 'sh-23',
         title: 'Dil Hi To Hai',
         type: 'Sher',
         author: 'Mirza Ghalib',
         text: `Dil hi to hai na sang-o-khisht, dard se bhar na aaye kyun\nRoenge hum hazar baar, koi hamein satae kyun`,
         roman: '',
         likes: 4725,
         tags: ['Pain', 'Heart']
      },
      {
         id: 'sh-24',
         title: 'Ragon Mein Daudte Phirne',
         type: 'Sher',
         author: 'Mirza Ghalib',
         text: `Ragon mein daudte phirne ke hum nahin qail\nJab aankh hi se na tapka to phir lahu kya hai`,
         roman: '',
         likes: 4310,
         tags: ['Pain', 'Intensity']
      }
    ]
  },
  {
    id: 'mir-taqi-mir',
    name: 'Mir Taqi Mir',
    nameUrdu: 'میر تقی میر',
    era: '1723–1810',
    birthPlace: 'Agra, Mughal Empire',
    shortBio: 'Often hailed as "Khuda-e-Sukhan" (The God of Poetry), he is one of the principal architects of the Urdu language.',
    fullBio: 'Mir Taqi Mir, often hailed as "Khuda-e-Sukhan" (The God of Poetry), was the leading Urdu poet of the 18th century, and one of the pioneers who gave shape to the Urdu language itself. He was one of the principal poets of the Delhi School of the Urdu ghazal and remains arguably the foremost name in Urdu poetry.\n\nOperating primarily in 18th-century Delhi, his poetry captures the tragic decline of the Mughal Empire intertwined with profound personal sorrow, melancholia, and romantic yearning. His works laid the aesthetic foundations that Ghalib and others would build upon.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mir%20Taqi%20Mir,%20Lucknow,%201800-10.jpg',
    works: [
      {
        id: 'mr-1',
        title: 'Hasti Apni Habab',
        type: 'Ghazal',
        author: 'Mir Taqi Mir',
        text: `Hasti apni habab ki si hai
Ye numaaish saraab ki si hai

Nazuki uske lab ki kya kahiye
Pankhuri ik gulaab ki si hai

Chashm-e-dil khol is bhi aalam par
Yaan ki auqaat khwaab ki si hai

Baar baar uske dar pe jaata hoon
Haalat ab iztiraab ki si hai`,
        roman: `हस्ती अपनी हबाब की सी है, ये नुमाइश सराब की सी है \nनाज़ुकी उस के लब की क्या कहिए, पंखुड़ी इक गुलाब की सी है`,
        likes: 1845,
        tags: ['Classic', 'Melancholy']
      },
      {
        id: 'mr-2',
        title: 'Dikhai Diye Yun',
        type: 'Ghazal',
        author: 'Mir Taqi Mir',
        text: `Dikhai diye yun ki bekhud kiya
Hamein aap se bhi juda kar chale

Jabeen sajda karte hi karte gayi
Haq-e-bandagi hum ada kar chale

Parastish ki yaan tayin ki ae but tujhe
Nazar mein sabhon ki khuda kar chale`,
        roman: `दिखाई दिए यूँ कि बेखुद किया, हमें आप से भी जुदा कर चले \nजबीं सजदा करते ही करते गई, हक़-ए-बंदगी हम अदा कर चले`,
        likes: 1200,
        tags: ['Devotion']
      },
      {
        id: 'mr-3',
        title: 'Patta Patta Boota Boota',
        type: 'Ghazal',
        author: 'Mir Taqi Mir',
        text: `Patta patta boota boota haal hamara jaane hai
Jaane na jaane gul hi na jaane baagh to saara jaane hai

Aashiq sa to saada koi aur na hoga duniya mein
Jee ke ziyan ko ishq mein uske apna waara jaane hai

Aashiq to murda hai hamesha jee uthta hai dekhe usay
Yaar ke aa jaane ko yak-a-yak umar dobara jaane hai`,
        roman: `पत्ता-पत्ता बूटा-बूटा हाल हमारा जाने है \nजाने न जाने गुल ही न जाने बाग़ तो सारा जाने है`,
        likes: 1650,
        tags: ['Nature', 'Love']
      },
      {
         id: 'sh-4',
         title: 'Ashk Aankhon Mein',
         type: 'Sher',
         author: 'Mir Taqi Mir',
         text: `Ashk aankhon mein kab nahin aata\nLahoo aata hai jab nahin aata`,
         roman: `अश्क आँखों में कब नहीं आता \nलहू आता है जब नहीं आता`,
         likes: 2100,
         tags: ['Sorrow']
      },
      {
         id: 'sh-5',
         title: 'Subah Hoti Hai',
         type: 'Sher',
         author: 'Mir Taqi Mir',
         text: `Subah hoti hai shaam hoti hai\nUmar yunhi tamaam hoti hai`,
         roman: `सुब्ह होती है शाम होती है \nउम्र यूँही तमाम होती है`,
         likes: 3105,
         tags: ['Time']
      }
      ,
      {
         id: 'sh-25',
         title: 'Dekh To Dil Ki Jaan Se',
         type: 'Sher',
         author: 'Mir Taqi Mir',
         text: `Dekh to dil ki jaan se uthta hai\nYe dhuan sa kahan se uthta hai`,
         roman: '',
         likes: 3640,
         tags: ['Melancholy', 'Heart']
      },
      {
         id: 'sh-26',
         title: 'Rah-e-Dur-e-Ishq',
         type: 'Sher',
         author: 'Mir Taqi Mir',
         text: `Rah-e-dur-e-ishq mein rota hai kya\nAage aage dekhiye hota hai kya`,
         roman: '',
         likes: 3890,
         tags: ['Love', 'Journey']
      }
    ]
  },
  {
    id: 'faiz-ahmad-faiz',
    name: 'Faiz Ahmad Faiz',
    nameUrdu: 'فیض احمد فیض',
    era: '1911–1984',
    birthPlace: 'Narowal, Punjab',
    shortBio: 'A revolutionary poet, intellectual, and one of the most celebrated writers of the Urdu language in the 20th century.',
    fullBio: 'Faiz Ahmad Faiz was an intellectual, revolutionary poet, and one of the most celebrated writers of the Urdu language in the 20th century. Nominated for the Nobel Prize and a recipient of the Lenin Peace Prize, his work famously links the romantic with the political, turning the beloved into a metaphor for the homeland.\n\nHis poetry inspired generations to rise against oppression. His words transcend boundaries, resonating with both lovers of classic ghazals and champions of social justice alike.',
    image: 'https://rekhta.pc.cdn.bitgravity.com/Images/Shayar/faiz-ahmad-faiz.jpg',
    works: [
      {
        id: 'fz-1',
        title: 'Mujh Se Pehli Si Mohabbat',
        type: 'Nazm',
        author: 'Faiz Ahmad Faiz',
        text: `Mujh se pehli si mohabbat mere mehboob na maang
Maine samjha tha ki tu hai to darakhshan hai hayat

Tera gham hai to gham-e-dahar ka jhagda kya hai
Teri soorat se hai aalam mein baharon ko sabaat
Teri aankhon ke siva duniya mein rakha kya hai
Tu jo mil jaye to taqdir nigoon ho jaye

An-ginat sadiyon ke tareek bahimana tilism
Resham-o-atlas-o-kamkhwab mein bunvaye hue
Ja-ba-ja bikte hue kucha-o-bazaar mein jism
Khaak mein lithde hue khoon mein nehalaye hue

Aur bhi dukh hain zamane mein mohabbat ke siva
Rahatein aur bhi hain wasl ki raahat ke siva
Mujh se pehli si mohabbat mere mehboob na maang`,
        roman: `मुझ से पहली सी मोहब्बत मिरे महबूब न माँग \nमैंने समझा था कि तू है तो दरख़्शाँ है हयात \nऔर भी दुख हैं ज़माने में मोहब्बत के सिवा`,
        likes: 9540,
        tags: ['Revolution', 'Love']
      },
      {
        id: 'fz-2',
        title: 'Hum Dekhenge',
        type: 'Nazm',
        author: 'Faiz Ahmad Faiz',
        text: `Hum dekhenge
Lazim hai ki hum bhi dekhenge
Wo din ke jis ka wada hai
Jo lauh-e-azal mein likha hai

Jab zulm-o-sitam ke koh-e-giraan
Rui ki tarah udd jayenge
Hum mehkoomon ke paaon-tale
Jab dharti dhar dhar dhadkegi

Jab arz-e-khuda ke Kaabe se
Sab but uthvaye jayenge
Hum ahl-e-safa mardood-e-haram
Masnad pe bithaye jayenge

Bas naam rahega Allah ka
Jo ghayab bhi hai hazir bhi
Uthega an-al-haq ka naara
Jo main bhi hoon aur tum bhi ho`,
        roman: `हम देखेंगे, लाज़िम है कि हम भी देखेंगे \nवो दिन कि जिस का वादा है, जो लौह-ए-अज़ल में लिक्खा है`,
        likes: 12450,
        tags: ['Anthem', 'Defiance']
      },
      {
        id: 'fz-3',
        title: 'Gulon Mein Rang Bhare',
        type: 'Ghazal',
        author: 'Faiz Ahmad Faiz',
        text: `Gulon mein rang bhare baad-e-nau-bahaar chale
Chale bhi aao ki gulshan ka kaarobar chale

Qafas udaas hai yaaron saba se kuch to kaho
Kahin to bahr-e-khuda aaj zikr-e-yaar chale

Bada hai dard ka rishta ye dil ghareeb sahi
Tumhare naam pe aayenge ghamgusar chale

Jo hum pe guzri so guzri magar shab-e-hijran
Hamare ashk teri aaqibat sanwar chale`,
        roman: `गुलों में रंग भरे बाद-ए-नौ-बहार चले \nचले भी आओ कि गुलशन का कारोबार चले`,
        likes: 8520,
        tags: ['Hope', 'Love']
      },
      {
         id: 'sh-6',
         title: 'Dono Jahan Teri',
         type: 'Sher',
         author: 'Faiz Ahmad Faiz',
         text: `Dono jahan teri mohabbat mein haar ke\nWo jaa raha hai koi shab-e-gham guzaar ke`,
         roman: `दोनों जहान तेरी मोहब्बत में हार के \nवो जा रहा है कोई शब-ए-ग़म गुज़ार के`,
         likes: 5600,
         tags: ['Love']
      },
      {
         id: 'sh-7',
         title: 'Makaam Faiz Khoi',
         type: 'Sher',
         author: 'Faiz Ahmad Faiz',
         text: `Makaam Faiz koi raah mein jacha hi nahi\nJo koo-e-yaar se nikle to soo-e-daar chale`,
         roman: `मुक़ाम 'फ़ैज़' कोई राह में जचा ही नहीं \nजो कू-ए-यार से निकले तो सू-ए-दार चले`,
         likes: 4120,
         tags: ['Path']
      }
    ]
  },
  {
    id: 'allama-iqbal',
    name: 'Allama Iqbal',
    nameUrdu: 'علامہ اقبال',
    era: '1877–1938',
    birthPlace: 'Sialkot, Punjab',
    shortBio: 'Extraordinary poet, philosopher, and visionary. He is hailed as the spiritual father of Pakistan and known for his concept of Khudi.',
    fullBio: 'Muhammad Iqbal, widely known as Allama Iqbal, was an extraordinary poet, philosopher, and visionary. He is hailed as the spiritual father of Pakistan. Earning knighthood for his profound intellect, Iqbal\'s poetry spans Urdu and Persian, focusing intensely on the revival of the Islamic world, the concept of "Khudi" (Selfhood), and humanity\'s untamed potential.\n\nHis works, including "Bang-e-Dara" and "Bal-e-Jibril", invoke deep passion and urge the youth (whom he affectionately addressed as "Shaheen" or eagles) to strive for greatness.',
    image: 'https://rekhta.pc.cdn.bitgravity.com/Images/Shayar/allama-iqbal.jpg',
    works: [
      {
        id: 'iq-1',
        title: 'Sitaaron Se Aage',
        type: 'Ghazal',
        author: 'Allama Iqbal',
        text: `Sitaaron se aage jahan aur bhi hain
Abhi ishq ke imtihan aur bhi hain

Tahi zindagi se nahin ye fazaayein
Yahan saikdon karwaan aur bhi hain

Qanaat na kar aalam-e-rang-o-boo par
Chaman aur bhi ashiyan aur bhi hain

Tu shaheen hai parwaaz hai kaam tera
Tere samne aasman aur bhi hain

Isi roz-o-shab mein ulajh kar na reh ja
Ki tere zamaan-o-makaan aur bhi hain`,
        roman: `सितारों से आगे जहाँ और भी हैं, अभी इश्क़ के इम्तिहाँ और भी हैं \nतू शाहीं है परवाज़ है काम तेरा, तिरे सामने आसमाँ और भी हैं`,
        likes: 13200,
        tags: ['Ambition', 'Philosophy']
      },
      {
        id: 'iq-2',
        title: 'Sare Jahan Se Achha',
        type: 'Nazm',
        author: 'Allama Iqbal',
        text: `Sare jahan se achha Hindostan hamara
Hum bulbulein hain iski yeh gulsitan hamara

Ghurbat mein hon agar hum rehta hai dil watan mein
Samjho wahin hamein bhi dil ho jahan hamara

Parbat woh sabse uncha hum-saya asman ka
Woh santari hamara woh pasban hamara

Mazhab nahin sikhata aapas mein bair rakhna
Hindi hain hum watan hai Hindostan hamara

Yunan-o-Misr-o-Roma sab mit gaye jahan se
Ab tak magar hai baaqi naam-o-nishan hamara`,
        roman: `सारे जहाँ से अच्छा हिन्दोस्ताँ हमारा \nमज़हब नहीं सिखाता आपस में बैर रखना \nहिन्दी हैं हम वतन है हिन्दोस्ताँ हमारा`,
        likes: 15400,
        tags: ['Patriotism', 'Anthem']
      },
      {
        id: 'iq-3',
        title: 'Lab Pe Aati Hai Dua',
        type: 'Nazm',
        author: 'Allama Iqbal',
        text: `Lab pe aati hai dua ban ke tamanna meri
Zindagi shamma ki soorat ho khudaya meri

Door duniya ka mere dam se andhera ho jaye
Har jagah mere chamakne se ujala ho jaye

Ho mere dam se yunhi mere watan ki zeenat
Jis tarah phool se hoti hai chaman ki zeenat

Ho mera kaam ghareebon ki himayat karna
Dard-mandon se zayeefon se mohabbat karna`,
        roman: `लब पे आती है दुआ बनके तमन्ना मेरी, \nज़िन्दगी शमअ की सूरत हो ख़ुदाया मेरी`,
        likes: 9800,
        tags: ['Prayer', 'Life']
      },
      {
         id: 'sh-8',
         title: 'Khudi Ko Kar Buland',
         type: 'Sher',
         author: 'Allama Iqbal',
         text: `Khudi ko kar buland itna ke har taqdeer se pehle\nKhuda bande se khud pooche bata teri raza kya hai`,
         roman: `ख़ुदी को कर बुलंद इतना कि हर तक़दीर से पहले \nख़ुदा बंदे से ख़ुद पूछे बता तेरी रज़ा क्या है`,
         likes: 19500,
         tags: ['Selfhood']
      }
    ]
  },
  {
    id: 'jaun-elia',
    name: 'Jaun Elia',
    nameUrdu: 'جون ایلیا',
    era: '1931–2002',
    birthPlace: 'Amroha, Uttar Pradesh',
    shortBio: 'Arguably the most widely read and recited modern Urdu poet among youth today. Known for unconventional, raw emotional verses.',
    fullBio: 'Jaun Elia was an Indo-Pakistani poet, philosopher, and revolutionary. He is arguably the most widely read and recited modern Urdu poet among youth today. Known for his unconventional, dramatic recitations and intensely emotional, raw verses, his work strips away traditional romanticism to expose the painful realities of modern existence.\n\nHis poetry often explores themes like "hijr" (separation), "tanhai" (loneliness), and heartbreak, expressed with a biting sarcasm and deep melancholy that resonates strongly with contemporary readers.',
    image: 'https://rekhta.pc.cdn.bitgravity.com/Images/Shayar/jaun-eliya.jpg',
    works: [
      {
        id: 'je-1',
        title: 'Naya Ik Rishta Paida',
        type: 'Ghazal',
        author: 'Jaun Elia',
        text: `Naya ik rishta paida kyun karein hum
Bichhadna hai to jhagda kyun karein hum

Khamoshi se ada ho rasm-e-doori
Koi hungama barpa kyun karein hum

Ye qaafi hai ki hum dushman nahin hain
Wafadari ka daawa kyun karein hum

Wafa ikhlaas qurbani mohabbat
Ab in lafzon ka peecha kyun karein hum

Humein gila nahi hai be-rukhi ka
Zamane se tamasha kyun karein hum`,
        roman: `नया इक रिश्ता पैदा क्यूँ करें हम \nबिछड़ना है तो झगड़ा क्यूँ करें हम`,
        likes: 10450,
        tags: ['Separation', 'Modern']
      },
      {
        id: 'je-2',
        title: 'Bahut Nazdeek Aati Ja Rahi Ho',
        type: 'Ghazal',
        author: 'Jaun Elia',
        text: `Shayad is zindagi ki qeemat hai
Jisko de rahe hain maza samajh kar

Bahut nazdeek aati ja rahi ho
Bichhadne ka iraada kar liya kya

Ab meri koi zindagi hi nahi
Ab bhi tum meri zindagi ho kya

Tum haqeeqat nahi ho hasrat ho
Ye jo milte nahi ganeemat ho

Main bhi kitna ajeeb hoon itna ajeeb hoon
Khud ko tabah kar liya aur malaal bhi nahi`,
        roman: `बहुत नज़दीक आती जा रही हो, बिछड़ने का इरादा कर लिया क्या \nअब मेरी कोई ज़िंदगी ही नहीं, अब भी तुम मेरी ज़िंदगी हो क्या`,
        likes: 11200,
        tags: ['Heartbreak', 'Loneliness']
      },
      {
         id: 'sh-10',
         title: 'Naam Kar Rahay Hain',
         type: 'Sher',
         author: 'Jaun Elia',
         text: `Apne sab yaar kaam kar rahay hain\nAur hum hain ki naam kar rahay hain`,
         roman: `अपने सब यार काम कर रहे हैं \nऔर हम हैं कि नाम कर रहे हैं`,
         likes: 8500,
         tags: ['Irony']
      },
      {
         id: 'sh-11',
         title: 'Kya Takalluf Karein',
         type: 'Sher',
         author: 'Jaun Elia',
         text: `Kya takalluf karein ye kehne mein\nJo bhi khush hai hum us se jalte hain`,
         roman: `क्या तकल्लुफ़ करें ये कहने में \nजो भी ख़ुश है हम उस से जलते हैं`,
         likes: 7200,
         tags: ['Honesty']
      },
      {
         id: 'sh-12',
         title: 'Dil Ki Aadat',
         type: 'Sher',
         author: 'Jaun Elia',
         text: `Ye gham kya dil ki aadat hai? Nahi to\nKisi se kuch shikayat hai? Nahi to`,
         roman: `ये ग़म क्या दिल की आदत है ? नहीं तो \nकिसी से कुछ शिकायत है ? नहीं तो`,
         likes: 6780,
         tags: ['Melancholy']
      }
    ]
  },
  {
    id: 'ahmad-faraz',
    name: 'Ahmad Faraz',
    nameUrdu: 'احمد فراز',
    era: '1931–2008',
    birthPlace: 'Kohat, NWFP',
    shortBio: 'Regarded as one of the greatest modern Urdu poets, matching classic romanticism with firm political resistance.',
    fullBio: 'Syed Ahmad Shah, commonly known as Ahmad Faraz, is viewed as one of the greatest modern Urdu poets of the 20th century. Strongly influenced by Faiz Ahmad Faiz, his verses seamlessly bind classic romanticism, profound melancholia, and firm political resistance, appealing to an immense global fan base.\n\nHis poetry remains extraordinarily popular due to its accessible, yet deeply moving lyrical qualities, particularly famous couplets about love, waiting, and heartbreak.',
    image: 'https://rekhta.pc.cdn.bitgravity.com/Images/Shayar/ahmad-faraz.jpg',
    works: [
      {
        id: 'af-1',
        title: 'Ranjish Hi Sahi',
        type: 'Ghazal',
        author: 'Ahmad Faraz',
        text: `Ranjish hi sahi dil hi dukhane ke liye aa
Aa phir se mujhe chhod ke jaane ke liye aa

Kuch to mere pindar-e-mohabbat ka bharam rakh
Tu bhi to kabhi mujhko manane ke liye aa

Pehle se maraasim na sahi phir bhi kabhi to
Rasm-o-rah-e-duniya hi nibhane ke liye aa

Kis kis ko batayenge judai ka sabab hum
Tu mujh se khafa hai to zamane ke liye aa

Ik umr se hoon lazzat-e-girya se bhi mehroom
Ae raahat-e-jaan mujhko rulane ke liye aa`,
        roman: `रंजिश ही सही दिल ही दुखाने के लिए आ \nआ फिर से मुझे छोड़ के जाने के लिए आ`,
        likes: 12500,
        tags: ['Waiting', 'Romance']
      },
      {
        id: 'af-2',
        title: 'Ab Ke Hum Bichhre',
        type: 'Ghazal',
        author: 'Ahmad Faraz',
        text: `Ab ke hum bichhre to shayad kabhi khwabon mein milen
Jis tarah sookhe hue phool kitabon mein milen

Dhoondh ujde hue logon mein wafa ke moti
Ye khazane tujhe mumkin hai kharabon mein milen

Gham-e-duniya bhi gham-e-yaar mein shamil kar lo
Nasha badhta hai sharabein jo sharabon mein milen

Tu khuda hai na mera ishq farishton jaisa
Donon insaan hain to kyon itne hijabon mein milen`,
        roman: `अब के हम बिछड़े तो शायद कभी ख़्वाबों में मिलें \nजिस तरह सूखे हुए फूल किताबों में मिलें`,
        likes: 9550,
        tags: ['Separation']
      },
      {
         id: 'sh-13',
         title: 'Aankh Se Door',
         type: 'Sher',
         author: 'Ahmad Faraz',
         text: `Aankh se door na ho dil se utar jayega\nWaqt ka kya hai guzarta hai guzar jayega`,
         roman: `आँख से दूर न हो दिल से उतर जाएगा \nवक़्त का क्या है गुज़रता है गुज़र जाएगा`,
         likes: 6700,
         tags: ['Time']
      },
      {
         id: 'sh-14',
         title: 'Suna Hai Log Usay',
         type: 'Sher',
         author: 'Ahmad Faraz',
         text: `Suna hai log usay aankh bhar ke dekhte hain\nSo us ke shehar mein kuch din thehar ke dekhte hain`,
         roman: `सुना है लोग उसे आँख भर के देखते हैं \nसो उस के शहर में कुछ दिन ठहर के देखते हैं`,
         likes: 5400,
         tags: ['Beauty']
      }
    ]
  },
  {
    id: 'parveen-shakir',
    name: 'Parveen Shakir',
    nameUrdu: 'پروین شاکر',
    era: '1952–1994',
    birthPlace: 'Karachi, Pakistan',
    shortBio: 'A prominent Pakistani poet who brought a uniquely emotional and feminist perspective to modern Urdu poetry.',
    fullBio: 'Parveen Shakir blazed a trail for feminist expression in Urdu poetry. Bursting onto the literary scene with her groundbreaking collection "Khushboo", her verses eloquently articulate the feminine perspective, intricately detailing the nuances of romantic love, heartbreak, and emotional vulnerability with unprecedented honesty.\n\nHer language was famously simple yet exceptionally evocative, bringing the "fragrance" of emotions to the Urdu literary world.',
    image: 'https://rekhta.pc.cdn.bitgravity.com/Images/Shayar/parveen-shakir.jpg',
    works: [
      {
        id: 'ps-1',
        title: 'Ku-Ba-Ku Phail Gayi',
        type: 'Ghazal',
        author: 'Parveen Shakir',
        text: `Ku-ba-ku phail gayi baat shanasai ki
Usne khushboo ki tarah meri pazirai ki

Kaise keh doon ki mujhe chhod diya hai usne
Baat to sach hai magar baat hai ruswai ki

Wo kahin bhi gaya lauta to mere paas aaya
Bas yahi baat hai achi mere harjai ki

Tera pehloo tere dil ki tarah aabaad rahay
Tujh pe guzre na qayamat shab-e-tanhayi ki

Usne jalti hui peshani pe jab haath rakha
Rooh tak aa gayi taseer maseehai ki`,
        roman: `कू-ब-कू फैल गई बात शनासाई की \nउस ने ख़ुशबू की तरह मेरी पज़ीराई की`,
        likes: 8900,
        tags: ['Romance', 'Feminine Voice']
      },
      {
        id: 'ps-2',
        title: 'Wo To Khushboo Hai',
        type: 'Ghazal',
        author: 'Parveen Shakir',
        text: `Wo to khushboo hai hawaon mein bikhar jayega
Masla phool ka hai phool kidhar jayega

Hum to samjhe the ki ik zakhm hai bhar jayega
Kya khabar thi ki rag-e-jaan mein utar jayega

Apne ahd-e-wafa mein hum rahenge qayam
Aadmi apne iradon mein agar jayega`,
        roman: `वो तो ख़ुशबू है हवाओं में बिखर जाएगा \nमसअला फूल का है फूल किधर जाएगा`,
        likes: 6750,
        tags: ['Sorrow']
      },
      {
         id: 'sh-16',
         title: 'Kamal-e-Zabt',
         type: 'Sher',
         author: 'Parveen Shakir',
         text: `Kamal-e-zabt ko khud bhi to aazmaungi\nMain apne haath se uski tasveer jalaungi`,
         roman: `कमाल-ए-ज़ब्त को ख़ुद भी तो आज़माऊँगी \nमैं अपने हाथ से उस की तस्वीर जलाऊँगी`,
         likes: 5400,
         tags: ['Pain']
      },
      {
         id: 'sh-17',
         title: 'Khwab Rezah',
         type: 'Sher',
         author: 'Parveen Shakir',
         text: `Jis tarah khwab mere ho gaye rezah rezah\nIs tarah se na kabhi toot kar bikhre koi`,
         roman: `जिस तरह ख़्वाब मिरे हो गए रेज़ा रेज़ा \nइस तरह से न कभी टूट कर बिखरे कोई`,
         likes: 4200,
         tags: ['Heartbreak']
      }
    ]
  },
  {
    id: 'gulzar',
    name: 'Gulzar',
    nameUrdu: 'گلزار',
    era: '1934–Present',
    birthPlace: 'Dina, Jhelum District',
    shortBio: 'Oscar-winning Indian poet, lyricist, and film director known for his profound introspection on the human condition.',
    fullBio: 'Sampooran Singh Kalra, known globally by his pen name Gulzar, is an Oscar-winning Indian poet, lyricist, and film director. His poetry is characterized by a unique visual imagery, striking simple metaphors from daily life, and a quiet, profound introspection on the human condition that connects instantly with the masses.\n\nWhether writing "Nazm" or "Triveni" (a 3-line poetry form he popularized), his work beautifully bridges the gap between classic literature and modern cinematic storytelling.',
    image: 'https://rekhta.pc.cdn.bitgravity.com/Images/Shayar/gulzar.jpg',
    works: [
      {
        id: 'gz-1',
        title: 'Waqt Rehta Nahin',
        type: 'Nazm',
        author: 'Gulzar',
        text: `Waqt rehta nahin kahin tik kar
Aadat is ki bhi aadmi si hai

Ek saaya sa dikhta hai mujhko 
Bhari duniya mein kitni tanhai hai

Kitni lambi khamoshi se guzra hoon
Un se kitna kuch kehne ki koshish ki

Aaina dekh kar tasalli hui
Hum ko is ghar mein jaanta hai koi

Zindagi yun hui basar tanha
Qafila saath aur safar tanha`,
        roman: `वक़्त रहता नहीं कहीं टिक कर \nआदत इस की भी आदमी सी है \nएक साया सा दिखता है मुझको \nभरी दुनिया में कितनी तन्हाई है`,
        likes: 18500,
        tags: ['Time', 'Loneliness']
      },
      {
         id: 'sh-19',
         title: 'Milta Toh Bahut Kuch',
         type: 'Sher',
         author: 'Gulzar',
         text: `Milta toh bahut kuch hai zindagi mein\nBas hum ginti usi ki karte hain jo haasil na ho saka`,
         roman: `मिलता तो बहुत कुछ है ज़िंदगी में \nबस हम गिनती उसी की करते हैं जो हासिल न हो सका`,
         likes: 9500,
         tags: ['Regret']
      },
      {
         id: 'sh-20',
         title: 'Umr Kehti Hai',
         type: 'Sher',
         author: 'Gulzar',
         text: `Umr kehti hai ab sanjeeda hua jaaye\nDil kehta hai kuch naadaaniyan aur sahi`,
         roman: `उम्र कहती है अब संजीदा हुआ जाए \nदिल कहता है कुछ नादानियाँ और सही`,
         likes: 12100,
         tags: ['Youth']
      },
      {
         id: 'sh-21',
         title: 'Aaina Dekh Kar',
         type: 'Sher',
         author: 'Gulzar',
         text: `Aaina dekh kar tasalli hui\nHamko is ghar mein jaanta hai koi`,
         roman: `आईना देख कर तसल्ली हुई \nहम को इस घर में जानता है कोई`,
         likes: 8900,
         tags: ['Self']
      }
    ]
  }
];
export const getAllWorks = () => {
  let allWorks = [];
  poets.forEach(poet => {
    allWorks = [
      ...allWorks,
      ...poet.works.map(work => ({
        ...work,
        poetId: poet.id,
        poetName: poet.name,
      })),
    ];
  });
  return allWorks.sort((a, b) => b.likes - a.likes);
};

export const getPoetById = (id) => {
  return poets.find(poet => poet.id === id);
};
