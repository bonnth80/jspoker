console.log("pk engine started");

var gameController = function(){
   var gcObj = {
      deckObj: new deck,
      numPlayers: 4,
      round: 0,
      blinds: [5,10],
      ante: 0,
      minBet: 10,
      playerPosition: [],           // list of players that started game
      inGamePosition: [],           // list of players still in game
      inRoundPositions: [],         // list of players still in round
      activePosition: 0,            // player to act
      currentBet: 10,               // current high bet to call
      playerBets: [],
      betSetter: 0,
      dealerPosition: 0,
      communityCards: [],
      phase: 0,                     //-1: setup, 0: preflop, 1: flop, 2: turn, 3: river
      flop: [],
      turn: [],
      river: [],
      playerNames: ["Aaron","Ben","Charlie","Dan","Eric","Frank","George","Hector","Isaac","Jack","Kyle","Luke","Mike","Nate","Oscar","Paul","Quincy","Rick","Sam","Tom","Ulysses","Victor","William","Xavier","Young","Zach"],
      pot: 15,
      setActiveAsBetter: function(){
         this.activePlayer;
      },
      setNumPlayers: function(i){
         this.numPlayers = i;
      },
      setBlinds: function(b = [5,10]){
         this.blinds = b;
      },
      setPlayerNames: function(j = []){         
         this.inGamePosition = this.playerPosition.map(x => x);
      },
      setDefaultPlayers: function(x = []){
         this.playerPosition = x;
         this.inGamePosition = x;
      },
      generateDefaultPlayers: function(n = this.numPlayers){
         // initialize default player list
         var pList = []

         for (var i = 0; i < n; i++){
            pList[i] = player();
            plist[i].Name = i;
         }

         this.setDefaultPlayers(pList);
      },
      setDealerPosition: function(i){
         this.dealerPosition = i;
      },
      // Game Cycle Methods
      startNewGame: function(){
         dealerPosition = Math.floor(Math.random()*this.numPlayers());  // assign a random dealer position
         this.round = 0;
         while (this.numPlayers > 1)
            this.advanceRound();
      },
      advanceRound: function(){
         this.phase = -1;
         this.round++;
         this.sund(); // shuffle up and deal;
         
         this.inHandPositions = []; // move this to round end step
         
         // set all players still in the game to players currently in Hand
         this.playerPositions.forEach( x => {
            if (playerPositions(x).inGame)
               this.inHandPositions.push(x);
         })
         
         this.activePosition = (this.dealerPosition+2) % this.inHandPositions.length;  // sets activePosition info

         this.inHandPositions[(this.dealerPosition+1) % this.numPlayers].postBet(this.blinds[0]); // post small blind
         this.currentBet = this.inHandPositions[(this.dealerPosition+2) % this.numPlayers].postBet(this.blinds[1]); // post big blind
         this.betSetter = (this.dealerPosition+2) % this.numPlayers; // set the current high better as big blind position

         this.advancePhase();
      },
      advancePhase: function(){
         this.phase++;

         this.advanceActivePlayer();
      },
      advanceActivePlayer: function(){
         // set the next player in the round as the current active position
         this.activePosition = (this.activePosition + 1) % this.inHandPositions;
         this.playerAct(activePosition, this);
      },
      playerAct: function(p = 0, gc = this) {
         var action = this.playerPosition[p].runAction(this);         
         // play types:
         // 0 check
         // 1 raise
         // 2 call
         // 3 fold

         if (action = 0) { // check

         }
      },
      endRound: function() {
         return 0;
      },
      // shuffle up and deal
      sund: function(d = this.deckObj){
         console.log(d);
         d.shuffle();
         var e = 0;

         // deal hole cards
         for (x = 0; x < 2; x++)
            for (var i = 0; i < this.numPlayers; i++)
               this.playerPosition[(this.dealerPosition + i) % this.numPlayers].Hole[x] = d.cards[e++];

         // deal community cards
         e++; // burn
         this.flop[0] = d.cards[e++];
         this.flop[1] = d.cards[e++];
         this.flop[2] = d.cards[e++];

         e++; // burn
         this.turn[0] = d.cards[e++];

         e++; // burn
         this.river[0] = d.cards[e];
      } 
   }

   return gcObj;
}

var deck = function (){
   var deckObj = {
      cards: [
         {val: 2, suit: 'S'}, {val: 3, suit: 'S'}, {val: 4, suit: 'S'}, {val: 5, suit: 'S'}, {val: 6, suit: 'S'}, {val: 7, suit: 'S'}, {val: 8, suit: 'S'}, {val: 9, suit: 'S'}, {val: 10, suit: 'S'}, {val: 11, suit: 'S'}, {val: 12, suit: 'S'}, {val: 13, suit: 'S'}, {val: 14, suit: 'S'},
         {val: 2, suit: 'D'}, {val: 3, suit: 'D'}, {val: 4, suit: 'D'}, {val: 5, suit: 'D'}, {val: 6, suit: 'D'}, {val: 7, suit: 'D'}, {val: 8, suit: 'D'}, {val: 9, suit: 'D'}, {val: 10, suit: 'D'}, {val: 11, suit: 'D'}, {val: 12, suit: 'D'}, {val: 13, suit: 'D'}, {val: 14, suit: 'D'},
         {val: 2, suit: 'C'}, {val: 3, suit: 'C'}, {val: 4, suit: 'C'}, {val: 5, suit: 'C'}, {val: 6, suit: 'C'}, {val: 7, suit: 'C'}, {val: 8, suit: 'C'}, {val: 9, suit: 'C'}, {val: 10, suit: 'C'}, {val: 11, suit: 'C'}, {val: 12, suit: 'C'}, {val: 13, suit: 'C'}, {val: 14, suit: 'C'},
         {val: 2, suit: 'H'}, {val: 3, suit: 'H'}, {val: 4, suit: 'H'}, {val: 5, suit: 'H'}, {val: 6, suit: 'H'}, {val: 7, suit: 'H'}, {val: 8, suit: 'H'}, {val: 9, suit: 'H'}, {val: 10, suit: 'H'}, {val: 11, suit: 'H'}, {val: 12, suit: 'H'}, {val: 13, suit: 'H'}, {val: 14, suit: 'H'}
      ],
      shuffle: function(cDeck = this.cards){
         var nCards = [];
         var i = 0;

         while (cDeck.length) {
            nCards[i] = cDeck.splice(Math.floor(Math.random()*cDeck.length),1)[0];
            i++;
         }

         return nCards;
      },
      getRandomXCardHand: function(sizeX = 7){
         var d = this.cards.map(m => m);
         var h = [];

         for (var i = 0; i < sizeX; i++) {
            d = this.shuffle(d);
            h.push(d.pop());
         }

         return h;
      },
      cardToString: function(c) {
         var str = "";

         if (c.val >= 2 && c.val <=10){
            str += c.val;
         } else {
            switch (c.val) {
               case 11: {
                  str += 'J';
                  break;
               }
               case 12: {
                  str += 'Q';
                  break;
               }
               case 13: {
                  str += 'K';
                  break;
               }
               case 14: {
                  str += 'A';
                  break;
               }
               default: {
                  console.warning("cardToString(): cannot interpret val property in card " + c);
               }
            }
         }

         switch (c.suit) {
            case 'H': {
               str += '♥';
               break;
            }
            case 'D': {
               str += '♦';
               break;
            }
            case 'S': {
               str += '♠';
               break;
            }
            case 'C': {
               str += '♣';
               break;
            }
            default: {
               console.warning("cardToString(): cannot interpret suit property in card " + c);
            }

         }

         return str;
      }
   }

   return deckObj;
}

var player = function(){
   var playerObj = {
      Name: 0,
      Hole: [],
      Hand: [],
      FiveCardHand: [],
      HandStrength: 0,
      chipStack: 0,
      bet: 0,
      aiProfile: {},
      inHand: true,
      inGame: true,
      active: true,
      setProfile: function(p = {fullRandom: true}){
         this.aiProfile = p;
      },
      runAction: function(gc){
         // play types:
         // 0 check
         // 1 raise
         // 2 call
         // 3 fold
         if (this.aiProfile.fullRandom) { //random play

            // check or raise?
            if (gc.currentBet == this.bet){
               var play = Math.floor(Math.random()*2);

               if ( play == 0){ //check
                  this.playCheck();
               } else { //raise
                  this.playRaise(gc);
               }
            }

            // call, raise, or fold
            if (gc.currentBet > this.bet) {
               var play = Math.floor(Math.random()*3);

               if (play == 0){ //call
                  this.playCall(gc);
               } else if (play == 1) {
                  this.playFold();
               } else {
                  this.playRaise(gc);
               }
            }
         }
      },
      playCheck: function(){
         return 0;
      },
      playRaise: function(gc){
         var minBet = gc.minBet;

         bet = (bet > this.chipStack)?bet:this.chipStack;   // don't bet more than you have
         this.postBet(Math.floor(Math.random()*(Math.floor(this.chipStack/minBet)))*minBet);
         
         return 1;
      },
      playCall: function(gc){
         this.bet == gc.currentBet;
         return 2;
      },
      playFold: function(){
         return 3;
      },
      postBet: function(a = 1){         
         this.bet += a;
         return this.bet;
      },
      resetBet: function(){
         this.bet = 0;
      },
      addStack: function(a = 0){
         this.chipStack += a;
      },
      GetHand: function(gc){
         this.Hand = this.Hole.concat(gc.flop.concat(gc.turn.concat(gc.river)));
      },
      SetFiveCardHand(h){
         this.FiveCardHand = h;
      },
      SortHand: function(h = this.Hand) {
         // sort Hand
         var flag = true;
         var tempObj = {};
         var i = 0;

         while (flag) {
            flag = false;
            i = 0;
            while (i < h.length-1){
               if (h[i].val > h[i+1].val){
                  flag = true;
                  tempObj = h[i+1];
                  h[i+1] = h[i];
                  h[i] = tempObj;
               }
               i++;
            }
         }

         this.Hand = h;
      },
      findPair: function(h = this.Hand){

         var pair = [h[h.length-1]];

         for (var i = h.length-2; i >=0 ; i--){
            if (pair[0].val == h[i].val){
               pair.unshift(h[i]);
               for (i = h.length-1; i >= 0; i--){
                  if (pair[pair.length-1].val != h[i].val) {
                     pair.unshift(h[i]);
                     if (pair.length == 5)
                        return pair;
                  }
               }
            }
            else {
               pair = [h[i]];
            }
         }

         return null;
      },
      findTwoPair: function(h = this.Hand) {
         var twoPair = [h[h.length-1]];

         for (var i = h.length-2; i >= 0; i--) {
            if (h[i].val == twoPair[0].val) {
               twoPair.unshift(h[i]);
               twoPair.unshift(h[i-1]);
               for (var j = i-2; j >= 0; j--) {
                  if (h[j].val == twoPair[0].val) {
                     twoPair.unshift(h[j]);

                     if (twoPair.length == 4) {
                        for (var i = h.length-1; i >= 0; i--) {
                           if (h[i].val != twoPair[0].val && h[i].val != twoPair[3].val){
                              twoPair.unshift(h[i]);
                              return twoPair;
                           }
                        }
                     }

                  } else {
                     twoPair[0] = h[j];
                  }
               }
            } else {
               twoPair = [h[i]];
            }
         }

         return null;
      },
      findWheel: function(h = this.Hand){
         var straight = [];

         for (var i = h.length-1; i >= 0; i--){
            if (h[i].val == 14){
               for (var j = i-1; j >=0; j--) {
                  if (h[j].val == 5) {
                     straight.unshift(h[j]);
                     for (var k = j-1; k >= 0; k--) {
                        if (h[k].val == 4) {
                           straight.unshift(h[k]);
                           for (var l = k-1; l>= 0; l--){
                              if (h[l].val == 3) {
                                 straight.unshift(h[l]);
                                 for (var m = l-1; m >= 0; m--)
                                 if (h[m].val == 2) {
                                    straight.unshift(h[m]);
                                    straight.unshift(h[h.length-1]);
                                    return straight;
                                 }
                              }
                           }
                        }
                     }
                  }
               }
            }
         }

         return null;
      },
      findStraight: function(h = this.Hand){
         var straight = [h[h.length-1]];

         for (var i = h.length-2; i >= 0; i--){
            if (h[i].val == straight[0].val)
               continue;

            if (h[i].val == straight[0].val-1) {
               straight.unshift(h[i]);
            } else if (h[i].val < straight[0].val-1) {
               straight = [h[i]];
            }

            if (straight.length == 5)
               return straight;
         }

         return null;
      },
      findFlush: function(hand = this.Hand){
         var h = [], s = [], d = [], c =[];
         
         hand.forEach(function(x) {
            if (x.suit == 'H')
               h.push(x);
            if (x.suit == 'S')
               s.push(x);
            if (x.suit == 'C')
               c.push(x);
            if (x.suit == 'D')
               d.push(x);
         })

         if (s.length >= 5) {
            return ([s[s.length-5],s[s.length-4],s[s.length-3],s[s.length-2],s[s.length-1]]);
         }
         if (h.length >= 5) {
            return ([h[h.length-5],h[h.length-4],h[h.length-3],h[h.length-2],h[h.length-1]]);
         }
         if (c.length >= 5) {
            return ([c[c.length-5],c[c.length-4],c[c.length-3],c[c.length-2],c[c.length-1]]);
         }
         if (d.length >= 5) {
            return ([d[d.length-5],d[d.length-4],d[d.length-3],d[d.length-2],d[d.length-1]]);
         }

         return null;
      },
      findTrips: function(h = this.Hand){
         var trips = [null, null, h[h.length-1]];

         for (var i = h.length-2; i >= 0; i--){
            if (trips[trips.length-1].val == h[i].val) {
                  trips.push(h[i]);
                  if (trips.length == 5) {
                     for (var j = h.length-1; j >= 0; j--){
                        if (h[j].val != trips[2].val){
                           trips[1] = h[j];
                           for (var k = j-1; k >=0; k--) {
                              if (h[k].val != trips[2].val) {
                                 trips[0] = h[k];
                                 return trips;
                              }
                           }
                        }
                     }
                  }
            } else {
               trips = [undefined,undefined,h[i]];
            }
         }

         return null;
      },
      findFullHouse: function(h = this.Hand){
         // test case:
         // 3♦ 6♠ 6♥ 6♦ 7♣ 11♠ 11♥

         var matches = [];
         var pair = [];
         var trips = [];

         for (var i = h.length-1; i >= -1; i--){
            if (matches.length > 0){
               if (i != -1 && h[i].val == matches[matches.length-1].val) {
                  matches.push(h[i]);
               } else {
                  // Not a match, what did we find
                  if (matches.length == 3 && !trips.length) {
                     // Found a trip
                     trips = matches.map(x => x);
                  } else if (matches.length >= 2 && !pair.length) {
                     // Found a pair
                     while (matches.length > 2) { matches.pop(); } // In case of hand with 2 triples (might be infinite loop..? check .pop())
                     pair = matches.map(x => x);
                  }
                  // Check if full house
                  if (pair.length == 2 && trips.length == 3){
                     return pair.concat(trips);
                  }
                  // Start over
                  matches = [];
                  matches.push(h[i]);
               }
            } else {
               matches.push(h[i]);
            }
         }

         return null;
      },
      findQuads: function(h = this.Hand){
         var quads = [null,h[h.length-1]];

         for (var i = h.length-2; i >= 0; i--){
            if (quads[quads.length-1].val == h[i].val) {
               quads.push(h[i]);
               if (quads.length == 5) {
                  if (quads[4].val == h[h.length-1].val){
                     quads[0] = h[i-1];
                  } else {
                     quads[0] = h[h.length-1];
                  }
                  return quads;
               }
            } else {
               quads = [null, h[i]];
            }
         }

         return null;
      },
      findSteelWheel: function(h = this.Hand){
         var hand = this.findFlush(h);
         if (hand != null)
            return (
               hand[0].val == 2 &&
               hand[1].val == 3 &&
               hand[2].val == 4 &&
               hand[3].val  == 5 &&
               hand[4].val == 14
               ) ? hand : null;

         return null;
      },
      findStraightFlush: function(h = this.Hand){
         var handA = this.findStraight(h);
         var handB = this.findFlush(h);

         if (handA != null && handB != null){
            for (var i = 0; i < 5; i++) {
               if (handA[i].val != handB[i].val || handA[i].suit != handB[i].suit)
               return null;
            }
         } else {
            return null;
         }

         return handA;
      },
      findRoyalFlush: function(h = this.Hand) {
         var hand = this.findStraightFlush(h);

         if (hand != null)
            return (hand[4].val == 14) ? hand : null;

         return null;
      },
      GetHandStrength: function(h = this.GetHand()){
         var hand = null;
         // sort Hand for searching
         this.SortHand(h);

         // hand strength chart:
         // 0: high card
         // 1: pair
         // 2: two pair
         // 3: wheel (5 high straight) -need exception since Ace is considered a 15 rather than 1
         // 4: straight
         // 5: flush
         // 6: 3 of a kind
         // 7: full house
         // 8: 4 of a kind
         // 9: steel wheel (5 high straight flush)
         // 10: straight flush
         // 11: royal flush

         hand = this.findRoyalFlush(h);
         if (hand != null ){
            this.SetFiveCardHand(hand);
            return {handStrength: 11, hand: hand};
         }

         hand = this.findStraightFlush(h);
         if (hand != null ){
            this.SetFiveCardHand(hand);
            return {handStrength: 10, hand: hand};
         }

         hand = this.findSteelWheel(h);
         if (hand != null ){
            this.SetFiveCardHand(hand);
            return {handStrength: 9, hand: hand};
         }

         hand = this.findQuads(h);
         if (hand != null ){
            this.SetFiveCardHand(hand);
            return {handStrength: 8, hand: hand};
         }

         hand = this.findFullHouse(h);
         if (hand != null ){
            this.SetFiveCardHand(hand);
            return {handStrength: 7, hand: hand};
         }

         hand = this.findTrips(h);
         if (hand != null ){
            this.SetFiveCardHand(hand);
            return {handStrength: 6, hand: hand};
         }

         hand = this.findFlush(h);
         if (hand != null ){
            this.SetFiveCardHand(hand);
            return {handStrength: 5, hand: hand};
         }

         hand = this.findStraight(h);
         if (hand != null ){
            this.SetFiveCardHand(hand);
            return {handStrength: 4, hand: hand};
         }

         hand = this.findWheel(h);
         if (hand != null ){
            this.SetFiveCardHand(hand);
            return {handStrength: 3, hand: hand};
         }

         hand = this.findTwoPair(h);
         if (hand != null ){
            this.SetFiveCardHand(hand);
            return {handStrength: 2, hand: hand};
         }

         hand = this.findPair(h);
         if (hand != null ){
            this.SetFiveCardHand(hand);
            return {handStrength: 1, hand: hand};
         }

         hand = [h[h.length-5],h[h.length-4],h[h.length-3],h[h.length-2],h[h.length-1]];

         this.SetFiveCardHand(hand);
         return {handStrength: 0, hand: hand};
      }
   }

   return playerObj;
}