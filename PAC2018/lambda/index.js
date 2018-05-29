'use strict';

/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */

// Null safe getter for json. Will return null if any value in the path is null.
const get = (p, o) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);

const products = {
  'ECHO_DOT': {
    'COLORS': ['black', 'white'],
    'PRICE': 49.99,
    'RATING': 5,
    'SPOKEN_NAME': 'echo dot',
    'FEATURES': ['WALKIE_TALKIE', 'HANDS_FREE', 'BLUETOOTH'],
    'IMAGE': 'https://images-na.ssl-images-amazon.com/images/I/61dFyj4ZXLL._SX679_.jpg',
    'DETAILS': [
        "Echo Dot is a hands-free, voice-controlled device that uses Alexa to play music, control smart home devices, make calls, send and receive messages, provide information, read the news, set music alarms, read audiobooks from Audible, control Amazon Video on Fire TV, and more. ",
        "Echo Dot connects to speakers or headphones through Bluetooth or 3.5 mm stereo cable to play music from Amazon Music, Spotify, Pandora, iHeartRadio, and TuneIn. Play music simultaneously across Echo devices and speakers connected via cable with multi-room music.",
        "Call or message almost anyone hands-free with your Echo device. Also, instantly connect to other Echo devices in your home using just your voice.",
        "Echo Dot controls lights, fans, TVs, switches, thermostats, garage doors, sprinklers, locks, and more with compatible connected devices from WeMo, Philips Hue, Sony, Samsung SmartThings, Nest, and others",
        "Echo Dot hears you from across the room with 7 far-field microphones for hands-free control, even in noisy environments or while playing music",
        "Echo Dot includes a built-in speaker so it can work on its own as a smart alarm clock in the bedroom, an assistant in the kitchen, or anywhere you might want a voice-controlled computer; Amazon Echo is not required to use Echo Dot",
        "Echo Dot is always getting smarter and adding new features, plus thousands of skills like Uber, Domino's, DISH, and more"
    ],
    'CUSTOMERQAS':[{
        'QUESTION':"What is the difference between dot and echo",
        'ANSWER':"The Echo has speakers suitable for listening to music on, while the Echo Dot has a speaker that is only good enough for the commands and alarms. If you want to listen to music with the Dot, you'll want to connect speakers to it"
    },{
        'QUESTION':"What is the difference between the first generation and second",
        'ANSWER': "Changes from first gen I have been able to identify: The new dot is smaller. Same 3.3\" diameter but is 1.3\" tall vs 1.5\" tall Directional mic holes are slashes instead of tiny circles Volume buttons replaced the volume slider around the top 5.7 oz vs 8.8 oz so slightly lighter likely due to smaller height Comes with 90 day warranty vs first gen had 1 year No more power indicator light on the back Both have a 7-microphone array so at least they didn't change that Side material appears to have a glossy finish now No longer includes the 3.5 mm audio cable (4 ft.)"
    },{
        'QUESTION':"is echo dot going to finally kill me?",
        'ANSWER':"It depends on how much power you give Alexa. I highly recommend avoiding smart locks on the basement door."
    }],
    "REVIEWS":[
      "My brother Robert who has been bed ridden and paralyzed with Multiple Sclerosis from his neck down for more than 30 years now has a new friend named Alexa! He was in tears with happiness when Alexa played 70's music, played Jeopardy, answered all his questions and wakes him up every morning. Thank you Amazon for giving my brother a new bedside companion.",
      "Having worked in the electronics retail industry for years now, I've seen scores of Smart devices come and go. Until now, nobody quite got it right. In the Echo Dot, Amazon has created a near perfect blend of hardware and software. I've seen plenty of the former, but truly seamless multi platform software has eluded everyone but Amazon. We're talking major players like Samsung and Google who have been at it for much longer than Amazon. The main problem is that excellent products like the Samsung Smart Things hub, which do a fantastic job of unifying a slew of different connected devices from different companies (Nest, Honeywell, Phillips, and so on), still lacked the web connectivity and entertainment support I wanted, so I'd still end up needing my tablet or phone. Thanks to fantastic third party support, the Dot has no problem controlling all of my smart stuff while allowing me to listen to music, order food, check the weather, listen to the radio, set alarms and timers, all of which is easily accomplished through simple voice commands. To me, this is the exceedingly rare product that I didn't know I needed, and now can't live without. Similar to the smartphone and tablet I use every day that didn't exist just a few short years ago."
    ]
  },
  'ECHO_SHOW': {
    'COLORS': ['black'],
    'PRICE': 229.99,
    'RATING': 4,
    'FEATURES': ['WALKIE_TALKIE', 'HANDS_FREE', 'BLUETOOTH', 'MONITOR'],
    'IMAGE': 'https://images-na.ssl-images-amazon.com/images/I/61PTTzQ3aPL._SX679_.jpg',
    'SPOKEN_NAME': 'echo show',
    'DETAILS': [
        "Echo Show brings you everything you love about Alexa, and now she can show you things. Watch video flash briefings, Amazon Video content, see music lyrics, security cameras, photos, weather forecasts, to-do and shopping lists, browse and listen to Audible audiobooks, and more. All hands-free—just ask.",
        "Call almost anyone hands-free, or make video calls to family and friends with an Echo Spot, Echo Show, or the Alexa App. Instantly connect to other Echo devices around your home.",
        "Echo Show displays lyrics on-screen with Amazon Music. Just ask to play a song, artist or genre, and stream over Wi-Fi. Also, stream music on Pandora, Spotify, TuneIn, iHeartRadio, and more.",
        "Echo Show has powerful, room-filling speakers with Dolby processing for crisp vocals and extended bass response. Play your music simultaneously across Echo devices with multi-room music (Bluetooth not supported).",
        "Ask Alexa on the Echo Show to show you the front door or monitor the baby's room with compatible cameras from Amazon and others. Turn on lights or the TV, set thermostats, control Amazon Video on Fire TV, and more with WeMo, Philips Hue, Sony, ecobee, and other compatible smart home devices.",
        "With eight microphones, beam-forming technology, and noise cancellation, Echo Show hears you from any direction—even while music is playing",
        "Echo Show is always getting smarter and adding new features, plus thousands of skills like Uber, Allrecipes, CNN, and more"
    ],
    'CUSTOMERQAS':[{
        'QUESTION':"Can echo show be used to monitor ghost or spirits in a haunted house?",
        'ANSWER':"Yes, however the ghost has to say Alexa first and might order things like air freshener (The living can smell pretty bad)"
    },{
        'QUESTION':"Can echo show replace my bedside alarm clock?",
        'ANSWER': "The screen can now be turned completely off (say \"Alexa turn off the screen\") so that issue is solved. The original \"do not disturb\" still turns the screen gray with just the time showing. Some people may prefer that but many found it to bright for a bedroom at night. The new command fixes that. You can choose different alarm tones and set the volume of the alarm separate from the regular volume under settings. The alarm can be set quite loud and works for me. Alexa even has \"good morning\" written on the screen as she wakes you. Given the lack of battery backup, I still set a smart phone alarm just in case. But Alexa is my primary alarm and it works great! I have smart lights so I crawl into bed, tell her to turn off the lights and then tell her when I want to get up."
    },{
        'QUESTION':"Will echo show stream Amazon Prime videos?",
        'ANSWER':"Yes, it will stream Amazon Instant Video if you have a Prime membership."
    },{
         'QUESTION':"is echo show going to finally kill me?",
         'ANSWER':"It depends on how much power you give Alexa. I highly recommend avoiding smart locks on the basement door."
     }],
    "REVIEWS":[
      "I know that many media folks have stated that the \"Drop-in\" feature of the Echos is \"creepy\" and can see their point. Here's a different perspective. Mom is now almost 95 and she has short term memory dementia, she's in great spirits but I really can't teach her anything technical, like dialing a phone or even pressing a memory dial button. She lives near my sister and is 2 hours away so visiting is always a bit of a project. I thought I'd try setting a Show next to her rocking chair. I can now \"Drop-in\" on her every day and share some face time with her, visit with her grand daughter, see the dog whom she LOVES, and just make her smile. The beauty is that there is no interaction needed on her end, the Caregivers and my Mom love this setup. The fact that I can use my phone from anywhere and actually see and talk to Mom, and show her things is hugely entertaining and comforting for Mom, and everyone in the family. So I say with extreme gratitude, Thank You Amazon for creating an amazingly personally helpful tool for the elderly. The only bug I have at the moment, \"Alexa, turn off the screen\", the screen turns off, then immediately turns back on. Tell her again and the screen stays off, pretty consistent bug. Edit- Seems fixed now! 1/06/2018 Still enjoying my Echo Shows very much, I don't expect this to replace a tablet, it does many things very well, besides being indispensable with visiting Mom. Currently there is one in the Kitchen and it is used by the family to play lots of music, having the screen is really nice to be able to see what's playing etc. We are trying Amazon Music and so far it's pretty sweet as well, \"Alexa show me all albums from Keith Urban\", up comes pictures of all of his 12 or so album covers, touch one and play the album. Alexa, \"Connect Bluetooth\" and the Show connects to a Bluetooth receiver I have on our whole house stereo. Alexa \"Turn on the Stereo\", Alexa controls the Logitech Harmony remote to power up the stereo and now we are hearing music everywhere, nice. We've also added some Ring cameras and doorbell, \"Alexa, show me the front door\", now I'm looking out front. Oh, and our doggie monitor/treat shooter, Furbo, \"Alexa, ask Furbo to toss a treat\" is our dog \"Cookie\" 's favorite skill! Bottom line, this is a very powerful system, don't get me wrong we love our Apple products (Phones, iPads, and Macs) but I prefer this Amazon ecosystem for my home music, automation, and general questions etc. as it's a fairly open system that plays well with 3rd parties when compared to the likes of Apple. I would never have imagined all that is possible with these units!",
      "So first off, let me start by saying, my family and I are all Apple everything. MacBook’s, Apple TVs, Watches, all iPhones, etc. You name it. We use it. But once I saw that the Echo Show had a screen I was so GAME, this was also after the HomePod from Apple was released (no screen). I wanted to try it out so badly, I have a few regular speakers but never bought a home smart speaker before, so this was entirely and completely new for me, and let me tell you, so far so GOOD. Just like Apple, the packaging was very nice, lots to open and unwrap, all clean and dust free. The set up was okay, it took a while but my Wi-Fi is not the best so It could have just been personal reasons. And once it turned on I was like, “uhhhh what do I do now”. It was just a screen and nothing really happened besides a little video beforehand on what it can do. I started to ask it questions and downloaded different skills and what not and it became easier to use. The quality of the audio is amazing, it gets very loud stays very clear. The 7in screen is also very high definition, as well as the 5MP front camera. I then downloaded the Alexa app and video chatted some people which was so awesome to do so in the kitchen as I was just cooking and cleaning, etc. It felt very futuristic. Now if you’re looking for something mind-blowing and life changing this is not for you. This is a massive step for the Echo devices and I am very happy to own one. It’s enjoyable and easy to use. The more skills you download the more I found out it can do so much more than I really thought. I like the news apps and the sound making apps. Aesthetically speaking it looks so sweet, clean and futuristic just sitting in my kitchen with the home screen always on and ready to be talked to. And I probably love that the most. Just a little \"smart-home-TV-speaker\" just chilling in my kitchen. This device and future ones have so much potential in the home and can really change the way we live. I really enjoy being an early adopter of technology to see which direction we are headed in and this is a great start. Amazon is seriously killing the game and I am so excited for their future! Another PLEASED customer!!"
    ]
  },
  'KIND_BAR': {
    'FLAVORS': ['dark chocolate nuts and sea salt'],
    'PRICE': 24.99,
    'RATING': 5,
    'SIZE': [12],
    'SPOKEN_NAME': 'kind bars',
    'IMAGE': 'https://images-na.ssl-images-amazon.com/images/I/91qfuTTLL4L._SL1500_.jpg',
    'DETAILS': [
        "Contains 12 - 1.4oz KIND Bars. ",
        "Our best-selling bar is a simple blend of Brazilian sea salt sprinkled over whole nuts and drizzled with dark chocolate.",
        "With 5g of sugar, it's a satisfying, nutty snack that only seems indulgent.",
        "Gluten free, Non GMO, 0g Trans Fat, Kosher, Low glycemic index, low sodium, good source of fiber. ",
        "Sweet and salty blend of almonds, peanuts, and walnuts drizzled in chocolate with a touch of sea salt. ",
        "Provides all natural protein, fiber and only 5g of sugar.",
        "Finely crafted from the highest quality whole nuts and nature's most delicious spices.",
        "KIND is a brand of delicious, natural, healthful foods made from wholesome ingredients you can see and pronounce."
    ],
    'CUSTOMERQAS':[{
        'QUESTION':"How much protein in the Peanut Butter and Dark Chocolate?",
        'ANSWER':"seven gram of protein per serving"
    },{
        'QUESTION':"Do they curb appetite?",
        'ANSWER': "i use this as a dessert, not a meal, and yes they are satisfying"
    }],
    "REVIEWS": [
        "I eat these when I am craving something in the mid morning. They taste great and fill me up. I also take by Biotek Nutrition – Weight Loss Aid Diet Pill Blocks the Absorption of Carbs and Fats because this carb blocker will allow me to cheat now and then without feeling super guilty. I find that allows me to stay on track with my diet.",
        "I came across these bars while at Starbucks and decided to give one a try.They were amazing! They can serve as a total meal replacement or a simple snack. Most healthy snack bars have either an unappetizing or bland flavor.KIND bars are different from the rest these taste nutty and chocolatey. Its made of cranberries and cherries with whole cashews and almonds nuts all of which I love!I also take a Natural Carb Blocker as part of my diet. It helps control my cravings and maintain a low calorie diet. As a meal replacement the Dark Chocolate and Nuts flavour is better as it has only 5g of sugar so if you are a on a low calorie diet go for that flavour. However, these taste better and are good for the occasional snack. All KIND bars have a lot of fiber so it will keep your digestive system smooth. Moreover, these are Gluten-Free(If you have a gluten allergy) and Non-GMO unlike many other bars. Overall, a great healthy choice."
    ]
  },
  'SUPER_MARIO_ODYSSEY': {
    'AGE_RESTRICT': 10,
    'PRICE': 48.75,
    'RATING': 5,
    'SPOKEN_NAME': 'super mario odyssey',
    'IMAGE': 'https://images-na.ssl-images-amazon.com/images/I/51cE%2B9FaiWL.jpg',
    'DETAILS': [
        "Explore huge 3D kingdoms filled with secrets and surprises, including costumes for Mario and lots of ways to interact with the diverse environments - such as cruising around them in vehicles that incorporate the HD Rumble feature of the Joy-Con controller or exploring sections as Pixel Mario.",
        "Thanks to his new friend, Cappy, Mario has brand-new moves for you to master, like cap throw, cap jump and capture. With capture, Mario can take control of all sorts of things, including objects and enemies!",
        "Visit astonishing new locales, like skyscraper-packed New Donk City, and run into familiar friends and foes as you try to save Princess Peach from Bowser's clutches and foil his dastardly wedding plans.",
        "A set of three new amiibo figures* - Mario, Princess Peach and Bowser in their wedding outfits - will be released at launch. Some previously released amiibo will also be compatible with this title. Tap supported amiibo to receive gameplay assistance - some amiibo will also unlock costumes for Mario when scanned!"
    ],
    'CUSTOMERQAS':[{
        'QUESTION':"Will super mario odyssey work on my gameboy advance sp?",
        'ANSWER':"Maybe if you push it hard enough... Maybe..."
    },{
        'QUESTION':"Is there any perk included in the preorder?",
        'ANSWER': "It is discounted for Prime members"
    }],
    "REVIEWS": [
        "My review is from the \"father of a toddler\" perspective. For those of you who have a child on the younger side, and you still enjoy Mario, don't hesitate to buy this game! My son can sit and watch this as if it is a cartoon and remains entertained the entire time. Sometimes he will say \"make Mario do this\" and is excited when it happens on screen. As someone who is a bit older but still enjoys games, it is a treat to find a game that entertains my son while I play.",
        "Honestly this is my favorite console title to date. Very few games make me want to sit and play for hours on end. Even with Breath of the Wild, I haven't beaten it and can't get myself to play for extended periods of time. But this game is glorious. I'll leave this review spoiler free for the sake of those looking into purchasing this awesome title. It took me about 4 days to beat the main story. This included getting 8 hours of sleep and a work/school schedule. But that was using all of my free time playing this fantastic game. And even after that, there is still a LOT to do after the main story, so I've been playing it still. This is a console quality mario game. In my opinion it's the best 3d open-world mario title to date. Mario 64 will always have that nostaliga spot for me, but this is the new winner in my eyes. Not only because of the gameplay, but with the nature of the switch it's also a portable title. I played this while waiting at campus for a class to start. Almost was late to class because I lost track of time. And the mechanics are great. Even after beating the main story, I find myself learning new advanced moves that make previously tall walls easy to get over. The music is also good. Not all of it is super memorable, but there are several songs in there that I would pay to have downloaded on my phone. I highly recommend anyone who is even remotely considering this game to pick it up. I wasn't even super excited to get it, but decided to give it a go and now it's my new gaming addiction."
    ]
  }
};

const productCategories = {
  'ECHO': ['ECHO_DOT', 'ECHO_SHOW'],
  'FOOD': ['KIND_BAR'],
  'NINTENDO_SWITCH': ['SUPER_MARIO_ODYSSEY']
};

const customerQA = {
    "difference between dot and echo": "The Echo has speakers suitable for listening to music on, while the Echo Dot has a speaker that is only good enough for the commands and alarms. If you want to listen to music with the Dot, you'll want to connect speakers to it.",
}

const differenceQA = {
    "ECHO ECHO_DOT": "The Echo has speakers suitable for listening to music on, while the Echo Dot has a speaker that is only good enough for the commands and alarms. If you want to listen to music with the Dot, you'll want to connect speakers to it.",
    "FIRSTGEN SECONDGEN": "Changes from first gen I have been able to identify: The new dot is smaller. Same 3.3\" diameter but is 1.3\" tall vs 1.5\" tall Directional mic holes are slashes instead of tiny circles Volume buttons replaced the volume slider around the top 5.7 oz vs 8.8 oz so slightly lighter likely due to smaller height Comes with 90 day warranty vs first gen had 1 year No more power indicator light on the back Both have a 7-microphone array so at least they didn't change that Side material appears to have a glossy finish now No longer includes the 3.5 mm audio cable (4 ft.)",
}

const killMeQA = {
    'ECHO_DOT': 'No, but my humor might',
    'ECHO_SHOW': 'No, but my humor might',
    'KIND_BAR': "On the contrary, you won't starve to death",
    'SUPER_MARIO_ODYSSEY': 'Not if you eat your magic mushrooms',
}

const SESSION_INDEX = 'index';
const SESSION_PRODUCT = 'product';

// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(card, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output,
        },
        card: card,
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}

function buildDelegateDirectiveSpeechletResponse() {
    return {
      outputSpeech : null,
      card : null,
      directives : [ {
        type : 'Dialog.Delegate'
      } ],
      reprompt : null,
      shouldEndSession : false
    }
  }

// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    const cardTitle = 'Anonybus';
    const speechOutput = 'Welcome to Anonybus. ' +
        'Please ask me a question you have about any Amazon product.';
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    const repromptText = 'Please ask me a question you have about any Amazon product. For example ' +
        'what colors does echo dot come in?';
    const shouldEndSession = false;

    const card = buildCard(cardTitle, speechOutput, '');
    callback(sessionAttributes,
        buildSpeechletResponse(card, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) {
    const cardTitle = 'Anonybus';
    const speechOutput = 'Thank you for trying the Alexa Skills Kit sample. Have a nice day!';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    const card = buildCard(cardTitle, speechOutput, '');
    callback({}, buildSpeechletResponse(card, speechOutput, null, shouldEndSession));
}

/**
 * Get product attributes to answer customer question.
 */
function handleGetProductAttributesIntent(intent, session, callback) {
    let cardTitle = 'Anonybus';
    let sessionAttributes = {};
    let productImageUrl = ''
    let productDetails = ''

    const productSlot = intent.slots.Product;
    const productAttributeSlot = intent.slots.ProductAttribute;
    let repromptText = "Please ask a question.";
    let speechOutput = "I'm not sure what product or attribute you are referring to.";

    if (productSlot && productAttributeSlot) {
        const productId = getResolutionIdFromSlot(productSlot);
        const attributeId = getResolutionIdFromSlot(productAttributeSlot);
        const productName = getResolutionNameFromSlot(productSlot);
        const attributeName = getResolutionNameFromSlot(productAttributeSlot);
        let attributeValues = get([productId, attributeId], products);
        productImageUrl = get([productId, 'IMAGE'], products);
        productDetails = get([productId, 'DETAILS'], products).join(', ');
        cardTitle = productName;

        if (attributeValues) {
            if (!(attributeValues instanceof Array)) {
                attributeValues = [attributeValues]
            }

            if (attributeValues.length > 1) {
                speechOutput = `${productName} has the following ${attributeName}: ${attributeValues.join(', ')}.`;
            } else {
                speechOutput = `${productName}'s ${attributeName} is ${attributeValues[0]}.`;
            }
        } else {
            speechOutput = `No ${attributeName} found available for ${productName}.`
        }
    }

    const card = buildCard(cardTitle, productDetails, productImageUrl)
    callback(sessionAttributes, buildSpeechletResponse(card, speechOutput, repromptText, false));
}

function handleCompareProductsInCategoryIntent(intent, session, callback) {
    let cardTitle = 'Anonybus';
    let sessionAttributes = {};
    let productImageUrl = ''
    let productDetails = ''

    const comparatorSlot = intent.slots.Comparator;
    const productCategorySlot = intent.slots.ProductCategory;
    let repromptText = "Please ask a question.";
    let speechOutput = "I don't support this comparison currently.";

    if (comparatorSlot && productCategorySlot) {
        const comparatorId = getResolutionIdFromSlot(comparatorSlot);
        const categoryId = getResolutionIdFromSlot(productCategorySlot);
        const categoryName = getResolutionNameFromSlot(productCategorySlot);
        let productId = ''

        if (comparatorId === 'CHEAPEST') {
            productId = productCategories[categoryId].reduce((p1, p2) => {
                return products[p1]['PRICE'] < products[p2]['PRICE'] ? p1 : p2;
            });
        } else if (comparatorId === 'MOST_EXPENSIVE') {
            productId = productCategories[categoryId].reduce((p1, p2) => {
                return products[p1]['PRICE'] > products[p2]['PRICE'] ? p1 : p2;
            });
        } else if (comparatorId === 'LOWEST_RATED') {
            productId = productCategories[categoryId].reduce((p1, p2) => {
                return products[p1]['RATING'] < products[p2]['RATING'] ? p1 : p2;
            });
        } else if (comparatorId === 'HIGHEST_RATED') {
            productId = productCategories[categoryId].reduce((p1, p2) => {
                return products[p1]['RATING'] > products[p2]['RATING'] ? p1 : p2;
            });
        }

        if (productId && comparatorId) {
            const productName = get([productId, 'SPOKEN_NAME'], products);
            const comparatorName = getResolutionNameFromSlot(comparatorSlot);
            productImageUrl = get([productId, 'IMAGE'], products);
            productDetails = get([productId, 'DETAILS'], products).join(', ');
            cardTitle = productName;
            speechOutput = `The ${comparatorName} ${categoryName} is ${productName}.`
        }
    }

    const card = buildCard(cardTitle, productDetails, productImageUrl)
    callback(sessionAttributes, buildSpeechletResponse(card, speechOutput, repromptText, false));
}

// Example questions:
// 1. Can Echo Dot be used as a baby monitor?
// 2. Does the Echo Dot have Spotify?
// 3. Can Echo Dot support Spotify?
// 3. Does Echo Dot have a smart home controller?
// 4. Can Echo Dot control smart bulbs?
function handleCanProductIntent(intent, session, callback) {
    let cardTitle = 'Anonybus';
    let sessionAttributes = {};
    let productImageUrl = ''
    let productDetails = ''

    const productSlot = intent.slots.Product;
    const productFeatureSlot = intent.slots.ProductFeature;
    let repromptText = "Please ask a question.";
    let speechOutput = "I'm not sure what you are asking for.";

    if (productSlot && productFeatureSlot) {
        const productId = getResolutionIdFromSlot(productSlot);
        const productName = getResolutionNameFromSlot(productSlot);
        const featureId = getResolutionIdFromSlot(productFeatureSlot);
        const featureValue = getResolutionValueFromSlot(productFeatureSlot);
        productImageUrl = get([productId, 'IMAGE'], products);
        productDetails = get([productId, 'DETAILS'], products).join(', ');
        cardTitle = productName;

        var productDetailsList = null;
        var productCustomerQAList = null;
        if (productId && (productId in products)) {
            productDetailsList = get([productId, 'DETAILS'], products);

            var featureDetails = null;
            if (featureValue && productDetailsList.length > 0) {
                featureDetails = findFeatureInDetails(featureValue, productDetailsList);
            }


            productCustomerQAList = get([productId, 'CUSTOMERQAS'], products);
            var customerAnswer = null;
            if (productCustomerQAList.length > 0) {
                customerAnswer = findFeatureInCustomerQuestions(featureValue, productCustomerQAList);
            }

            if (featureDetails) {
                speechOutput = featureDetails;
            } else if (customerAnswer) {
                speechOutput = customerAnswer;
            } else if (productHasFeature(productId, featureId)){
                speechOutput = "Yes.";
            } else {
                speechOutput = "No.";
            }
        } else {
            speechOutput = "I don't recognize this product";
        }
    }

    const card = buildCard(cardTitle, productDetails, productImageUrl)
    callback(sessionAttributes, buildSpeechletResponse(card, speechOutput, repromptText, false));
}

function handleProductDifferenceIntent(intent, session, callback) {
    let cardTitle = 'Anonybus';
    let sessionAttributes = {};

    const productOneSlot = intent.slots.ProductOne;
    const productTwoSlot = intent.slots.ProductTwo;

    let repromptText = "Please ask a question.";
    let speechOutput = "I'm not sure what you are asking for.";

    const productId1 = getResolutionIdFromSlot(productOneSlot);
    const productId2 = getResolutionIdFromSlot(productTwoSlot);

    const searchString1 = productId1 + " " + productId2
    const searchString2 = productId2 + " " + productId1

    speechOutput = differenceQA[searchString1] || differenceQA[searchString2] || "I'm not sure what you are asking for.";

    const card = buildCard(cardTitle, speechOutput, '')
    callback(sessionAttributes, buildSpeechletResponse(card, speechOutput, repromptText, false));
}

function handleCustomerQAIntent(intent, session, callback) {
    let cardTitle = 'Anonybus';
    let sessionAttributes = {};

    const questionSlot = intent.slots.GenericQuestion;
    let repromptText = "Please ask a question.";
    let speechOutput = "I'm not sure what you are asking for.";

    if (questionSlot) {
        const question = questionSlot.value;
        const answer = customerQA[question];
        if (answer) {
            speechOutput = answer;
        } else {
            speechOutput = "Sorry I don't know.";
        }
    }

    const card = buildCard(cardTitle, speechOutput, '')
    callback(sessionAttributes, buildSpeechletResponse(card, speechOutput, repromptText, false));
}

function handleAgeRestrictionIntent(intent, session, callback) {
    let cardTitle = 'Anonybus';
    let sessionAttributes = session.attributes || {};
    let productImageUrl = ''
    let productDetails = ''

    const actionSlot = intent.slots.Action;
    const productSlot = intent.slots.Product;
    const personSlot = intent.slots.Person;
    const ageSlot = intent.slots.Age;
    let repromptText = "Please ask a question.";
    let speechOutput = "I'm not sure what you are asking for.";

     if (productSlot) {
        const productId = getResolutionIdFromSlot(productSlot);
        const actionName = getResolutionNameFromSlot(actionSlot);
        const personName = getResolutionNameFromSlot(personSlot);
        const minAge = get([productId, 'AGE_RESTRICT'], products) || 0;
        const productName = get([productId, 'SPOKEN_NAME'], products);
        productImageUrl = get([productId, 'IMAGE'], products);
        productDetails = get([productId, 'DETAILS'], products).join(', ');
        cardTitle = productName;

        if (minAge == 0) {
            speechOutput = `there is no age restriction for ${productName}`;
        } else {
            speechOutput = `${productName} is recommended for ages ${minAge} and above`;
        }
    }

    const card = buildCard(cardTitle, productDetails, productImageUrl)
    callback(sessionAttributes, buildSpeechletResponse(card, speechOutput, repromptText, false));
}

function handleGetReviewsIntent(intent, session, callback) {
    let cardTitle = 'Anonybus';
    let sessionAttributes = {};
    let productImageUrl = ''
    let productDetails = ''

    const productSlot = intent.slots.Product;
    let repromptText = "Please ask a question.";
    let speechOutput = 'I did not find any reviews for the product.';

    if (productSlot) {
        const productId = getResolutionIdFromSlot(productSlot);
        const productName = getResolutionNameFromSlot(productSlot);
        let productReviews = get([productId, 'REVIEWS'], products)
        productImageUrl = get([productId, 'IMAGE'], products);
        productDetails = get([productId, 'DETAILS'], products).join(', ');
        cardTitle = productName;

        if (productReviews) {

            // Randomize the list
            productReviews = productReviews.sort((a,b) => 0.5-Math.random())

            speechOutput = "Here are some reviews for this product. One customer says, "
            speechOutput += `${productReviews.join('. Another customer says, ')}.`;
        }
    }

    const card = buildCard(cardTitle, productDetails, productImageUrl)
    callback(sessionAttributes, buildSpeechletResponse(card, speechOutput, repromptText, false));
}

function handleGetProductDetailsIntent(intent, session, callback) {
    let cardTitle = 'Anonybus';
    let sessionAttributes = {};
    let productImageUrl = '';
    let productDetails = '';
    const productSlot = intent.slots.Product;
    let repromptText = "Please ask a question.";
    let speechOutput = "I'm not sure what product you are referring to.";

    if (productSlot) {
        const productId = getResolutionIdFromSlot(productSlot);
        const productName = getResolutionNameFromSlot(productSlot);
        const productDetailsList = get([productId, 'DETAILS'], products)

        productImageUrl = get([productId, 'IMAGE'], products);
        productDetails = get([productId, 'DETAILS'], products).join(', ');
        cardTitle = productName;


        if (productDetailsList) {
            speechOutput = `${productDetailsList[0]}` + ' Should I continue?';
            // store the product and the index
            sessionAttributes[SESSION_PRODUCT] = productId;
            sessionAttributes[SESSION_INDEX] = 1;
        } else {
          speechOutput = `I don't have information on ${productName}.`
        }
    }

    const card = buildCard(cardTitle, productDetails, productImageUrl)
    callback(sessionAttributes, buildSpeechletResponse(card, speechOutput, repromptText, false));
}

function handleKillMeIntent(intent, session, callback) {
    let cardTitle = 'Anonybus';
    let sessionAttributes = {};
    let productImageUrl = ''
    let productDetails = ''

    const productSlot = intent.slots.Product;
    let repromptText = "Please ask a question.";
    let speechOutput = "";

    if (productSlot) {
        const productId = getResolutionIdFromSlot(productSlot);
        const productName = getResolutionNameFromSlot(productSlot);
        const answer = killMeQA[productId];
        productImageUrl = get([productId, 'IMAGE'], products);
        productDetails = get([productId, 'DETAILS'], products).join(', ');
        cardTitle = productName;

        if (answer) {
            speechOutput = answer
        } else {
            speechOutput = "I'll let you be the judge of that"
        }
    }

    const card = buildCard(cardTitle, productDetails, productImageUrl)
    callback(sessionAttributes, buildSpeechletResponse(card, speechOutput, repromptText, false));
}

function handleNoIntent(intent, session, callback) {
    let speechOutput = "Alright."
    let repromptText = null;
    let card = null;
    let sessionAttributes = {};
    callback(sessionAttributes, buildSpeechletResponse(card, speechOutput, repromptText, false));
}

function handleYesIntent(intent, session, callback) {


    let sessionAttributes = {};
    let speechOutput = "";
    let repromptText = null;
    let card = null;
    let keepSessionAttributes = true;

    let productId = null;
    let index = 0;
    if (session.attributes) {
        productId = session.attributes[SESSION_PRODUCT];
        index = session.attributes[SESSION_INDEX];
    }
    if (productId) {
        const productName = get([productId, 'SPOKEN_NAME'], products);
        const productDetails = get([productId, 'DETAILS'], products);
        if (index > 0  && index < productDetails.length - 1) {
            speechOutput = productDetails[index] + ". Should I continue to read?";
        } else if (index > 0 && index == productDetails.length - 1) {
            speechOutput = productDetails[index];
        } else {
            speechOutput = "there is no more details for this product. Please ask a product question.";
            keepSessionAttributes = false;
        }
        if(keepSessionAttributes) {
            sessionAttributes[SESSION_PRODUCT] = productId;
            sessionAttributes[SESSION_INDEX] = index + 1;
        }
    } else {
        getWelcomeResponse(callback);
    }

    callback(sessionAttributes, buildSpeechletResponse(card, speechOutput, repromptText, false));
}

// --------------- Events -----------------------

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if (intentName === 'GetProductAttributesIntent') {
        handleGetProductAttributesIntent(intent, session, callback);
    } else if (intentName === 'CompareProductsInCategoryIntent') {
        handleCompareProductsInCategoryIntent(intent, session, callback);
    } else if (intentName === 'CanProductIntent') {
        handleCanProductIntent(intent, session, callback);
    } else if (intentName === 'ProductDifferenceIntent') {
        handleProductDifferenceIntent(intent, session, callback);
    } else if (intentName === 'CustomerQAIntent') {
        handleCustomerQAIntent(intent, session, callback);
    } else if (intentName === 'AgeRestrictionIntent') {
        handleAgeRestrictionIntent(intent, session, callback);
    } else if (intentName === "GetProductDetailsIntent") {
        handleGetProductDetailsIntent(intent, session, callback);
    } else if (intentName === "GetReviewsIntent") {
        handleGetReviewsIntent(intent, session, callback);
    } else if (intentName === "KillMeIntent") {
        handleKillMeIntent(intent, session, callback);
    } else if (intentName === 'AMAZON.FallbackIntent') {
        handleFallbackRequest(intent, session, callback);
    } else if (intentName === 'AMAZON.HelpIntent') {
        getWelcomeResponse(callback);
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        handleSessionEndRequest(callback);
    } else if(intentName === 'AMAZON.YesIntent') {
        handleYesIntent(intent, session, callback);
    } else if(intentName === 'AMAZON.NoIntent') {
        handleNoIntent(intent, session, callback);
    } else {
        throw new Error('Invalid intent');
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
    // Add cleanup logic here
}

/**
 * Called when user utterance is not mapped to an intent.
 */
function handleFallbackRequest(intent, session, callback) {
    const cardTitle = intent.name;
    const sessionAttributes = {};
    let repromptText = "Please ask a question.";
    let speechOutput = "I'm not sure what you are asking for.";

    const card = buildCard(cardTitle, speechOutput, '');
    callback(sessionAttributes,
        buildSpeechletResponse(card, speechOutput, repromptText, false));
    callback(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, false));
}


// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = (event, context, callback) => {
    try {
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== 'amzn1.echo-sdk-ams.app.[unique-value-here]') {
             callback('Invalid Application ID');
        }
        */

        if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === 'LaunchRequest') {
            onLaunch(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'IntentRequest') {
            onIntent(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'SessionEndedRequest') {
            onSessionEnded(event.request, event.session);
            callback();
        }
    } catch (err) {
        callback(err);
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Helper functions
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getResolutionIdFromSlot(slot) {
  return get(['resolutions', 'resolutionsPerAuthority', 0, 'values', 0, 'value', 'id'], slot);
}

function getResolutionNameFromSlot(slot) {
  return get(['resolutions', 'resolutionsPerAuthority', 0, 'values', 0, 'value', 'name'], slot);
}

function getResolutionValueFromSlot(slot) {
  return get(['value'], slot);
}

function productHasFeature(productId, featureId) {
    console.log(productId);
    let features = get([productId, 'FEATURES'], products);
    console.log(features);
    return features && features.includes(featureId);
}

// Finds a search phrase in the product details and
// returns all the lines that contain that search phrase.
function findFeatureInDetails(feature, productDetailsList) {
    var outputDetailList = [];

    for (var i = 0; i < productDetailsList.length; ++i) {
        const detail = productDetailsList[i];
        if (isStringInText(feature, detail)) {
            outputDetailList.push(detail);
        }
    }

    if (outputDetailList.length == 0) {
        return null;
    } else {
        return outputDetailList.join(". ");
    }
}

function findFeatureInCustomerQuestions(feature, productQAs) {
    for (var i = 0; i< productQAs.length; ++i) {
        const question = get(['QUESTION'], productQAs[i]);
        if (isStringInText(feature, question)) {
            return get(['ANSWER'], productQAs[i]);
        }
    }
    return null;

}
// Finds a string in larger text (ignores case)
function isStringInText(string, text) {
    string = string.toLowerCase()
    if (text.toLowerCase().indexOf(string) != -1) {
        console.log("Found match for string [" + string + "] in text [" + text + "]");
        return true;
    }
}

function toTitleCase(phrase) {
    return phrase
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function buildCard(title, content, imageUrl) {
    title = toTitleCase(title)

    if (imageUrl) {
        return {
            type: 'Standard',
            title: title,
            text: content,
            image: {
                "smallImageUrl": imageUrl,
                "largeImageUrl": imageUrl
            }
        }
    } else {
        return {
            type: 'Simple',
            title: title,
            content: content,
        }
    }
}
