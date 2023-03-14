//Currently Just copied from the week 8 example



// ---------- TODO - Week 08 - refactor this portion below into api.js

// build a deck of cards that are shuffled
const superagent = require('superagent');
const base = 'https://deckofcardsapi.com/api/deck';

const buildDeck = async (deckCount) => {
    // https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
    try {
        const deckURL = `${base}/new/shuffle/?deck_count=${deckCount}`;
        const res = await superagent.get(deckURL);

        return res.body;
    } catch (error) {
        console.log(error);
    }
};

// draw/deal from a specificed deck and with a specificed number of cards
const drawCards = async (deckId, cardCount) => {
    // https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
    try {
        const drawURL = `${base}/${deckId}/draw/?count=${cardCount}`;
        const res = await superagent.get(drawURL);

        return res.body;
    } catch (error) {
        console.log(error);
    }
};
// ----------

// application logic
// get a deck, draw original hand from deck, prompt user to discard, replace discarded cards by drawing again
const playPoker = async (args) => {
    // hard code the deck count due to rules of poker
    const deckCount = 1;

    // get a deck of cards
    const deckOfCards = await buildDeck(deckCount);
    console.log(deckOfCards);

    // get the number of cards request from the args passed in
    const { cardCount } = args;

    // deal cards to a player from the deck that was requested above
    const originalHand = await drawCards(deckOfCards.deck_id, cardCount);
    console.log(originalHand);

    // TODO (Week 08) prompt the user to select cards to discard
    // TODO (Week 08) draw cards to replace the discarded ones
    // TODO (Week 08) print the updated player hand
};

module.exports = {
    playPoker
};
