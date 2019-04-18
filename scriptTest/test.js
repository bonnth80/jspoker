/*
   This is a debug script for pkgame.js
   It tests hand rolls and strengths

   btnRollNewHand is meant to continuously roll a new
   hand until it finds a hand within a given strength
*/

console.log("test.js connected");

var btnRollNewHand = document.getElementById("btnRollNewHand");
var card7A = document.getElementById("card7A");
var card7B = document.getElementById("card7B");
var card7C = document.getElementById("card7C");
var card7D = document.getElementById("card7D");
var card7E = document.getElementById("card7E");
var card7F = document.getElementById("card7F");
var card7G = document.getElementById("card7G");
var doc7Hand = [card7A, card7B, card7C, card7D, card7E, card7F, card7G];

var cardA = document.getElementById("cardA");
var cardB = document.getElementById("cardB");
var cardC = document.getElementById("cardC");
var cardD = document.getElementById("cardD");
var cardE = document.getElementById("cardE");
var docHand = [cardA, cardB, cardC, cardD, cardE];

var hStr = document.getElementById("handStrength");
var hType = document.getElementById("handType");

var testfunctions = {
   // rolls a new hand and reports the results
   basicTest: ()=>{
      var mDeck = deck();
      var h = mDeck.getRandomXCardHand();
      var p = player();
      var vhand = p.GetHandStrength(h);
      
      hStr.innerHTML = vhand.handStrength;
   
      switch (vhand.handStrength) {
         case 0: {
            hType.innerHTML = "High Card";
            break;
         }
         case 1: {
            hType.innerHTML = "Pair";
            break;
         }
         case 2: {
            hType.innerHTML = "Two Pair";
            break;
         }
         case 3: {
            hType.innerHTML = "Wheel (5 high straight)";
            break;
         }
         case 4: {
            hType.innerHTML = "Straight";
            break;
         }
         case 5: {
            hType.innerHTML = "Flush";
            break;
         }
         case 6: {
            hType.innerHTML = "3 of a Kind";
            break;
         }
         case 7: {
            hType.innerHTML = "Full House";
            break;
         }
         case 8: {
            hType.innerHTML = "4 of a Kind";
            break;
         }
         case 9: {
            hType.innerHTML = "Steel Wheel (5 high straight flush)";
            break;
         }
         case 10: {
            hType.innerHTML = "Straight Flush";
            break;
         }
         case 11: {
            hType.innerHTML = "Royal Flush";
            break;
         }
         default: {
            hType.innerHTML = "WTF?";
            console.warning("pkgame.js: somehow found a hand higher than royal flush?")
         }
      }
   
      doc7Hand.forEach((x,i) => {
         x.innerHTML = "";
         if (h[i].suit == 'H' || h[i].suit == 'D'){
            x.style.color = "red";
         } else {
            x.style.color = "black";
         }
         
         x.innerHTML = mDeck.cardToString(h[i]);
      })
   
      docHand.forEach((x,i) => {
         x.innerHTML = "";
         if (vhand.hand[i].suit == 'H' || vhand.hand[i].suit == 'D'){
            x.style.color = "red";
         } else {
            x.style.color = "black";
         }
         
         x.innerHTML = mDeck.cardToString(vhand.hand[i]);
      })
   },

   // rolls new hands until either a specified hand strength is reached
   // or a maximum number of hand rolls is reached
   limitedTest: () => {
      var iteration = 0;
      var strDistribution = [0,0,0,0,0,0,0,0,0,0,0,0];
      var mDeck = deck();
      var h = mDeck.getRandomXCardHand();
      var p = player();
      var vhand = p.GetHandStrength(h);
      var maxIteration = 10000;
      var lookupStrength = 8;
   
      while (vhand.handStrength < lookupStrength && iteration < maxIteration) {
         h = mDeck.getRandomXCardHand();
         p = player();
         vhand = p.GetHandStrength(h);
   
         strDistribution[vhand.handStrength]++;
         iteration++;
         
         hStr.innerHTML = vhand.handStrength;
   
         switch (vhand.handStrength) {
            case 0: {
               hType.innerHTML = "High Card";
               break;
            }
            case 1: {
               hType.innerHTML = "Pair";
               break;
            }
            case 2: {
               hType.innerHTML = "Two Pair";
               break;
            }
            case 3: {
               hType.innerHTML = "Wheel (5 high straight)";
               break;
            }
            case 4: {
               hType.innerHTML = "Straight";
               break;
            }
            case 5: {
               hType.innerHTML = "Flush";
               break;
            }
            case 6: {
               hType.innerHTML = "3 of a Kind";
               break;
            }
            case 7: {
               hType.innerHTML = "Full House";
               break;
            }
            case 8: {
               hType.innerHTML = "4 of a Kind";
               break;
            }
            case 9: {
               hType.innerHTML = "Steel Wheel (5 high straight flush)";
               break;
            }
            case 10: {
               hType.innerHTML = "Straight Flush";
               break;
            }
            case 11: {
               hType.innerHTML = "Royal Flush";
               break;
            }
            default: {
               hType.innerHTML = "WTF?";
               console.warning("pkgame.js: somehow found a hand higher than royal flush?")
            }
         }
   
         doc7Hand.forEach((x,i) => {
            x.innerHTML = "";
            if (h[i].suit == 'H' || h[i].suit == 'D'){
               x.style.color = "red";
            } else {
               x.style.color = "black";
            }
            
            x.innerHTML = mDeck.cardToString(h[i]);
         })
   
         docHand.forEach((x,i) => {
            x.innerHTML = "";
            if (vhand.hand[i].suit == 'H' || vhand.hand[i].suit == 'D'){
               x.style.color = "red";
            } else {
               x.style.color = "black";
            }
            
            x.innerHTML = mDeck.cardToString(vhand.hand[i]);
         })
      }
      
      console.log(iteration);
      console.log(strDistribution);   
   }
}

runTestMode();

function runTestMode(mode = 0) {
   if (mode == 0){
      btnRollNewHand.removeEventListener("click", testfunctions.limitedTest );
      btnRollNewHand.addEventListener("click", testfunctions.basicTest );
   }
   else if (mode == 1){
      btnRollNewHand.removeEventListener("click", testfunctions.basicTest );
      btnRollNewHand.addEventListener("click", testfunctions.limitedTest );
   }
}




// function basicTest(){
//    btnRollNewHand.addEventListener("click", () => )
// }

// function limitedTest(){
//    btnRollNewHand.addEventListener("click", () => )
   
// }


