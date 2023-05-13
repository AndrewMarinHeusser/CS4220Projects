const router = require('express').Router();

const database = require('../db');
const deckofcards = require('deckofcards-api');

/**
 * @description             format the card array response
 * @param {Array} cards     array of card objects
 * @return {Array}          array of card object with formatted name and code
 */
const _formatCards = (cards) => {
    return cards.map((card) => {
        return {
            formatted: `${card.value} of ${card.suit}`,
            code: card.code,
            image: card.image
        };
    });
};

/**
 * @api {Middleware}  /poker        middleware for all routes in poker.js
 */
router.use((req, res, next) => {
    const { headers, originalUrl, query } = req;
    const splitUrl = originalUrl.split('/').filter((str) => str !== '');
    const [first, second] = splitUrl;

    if (splitUrl.length === 1 && first === 'poker') {
        query.metadata = {
            agent: headers['user-agent'],
            gameStart: new Date()
        };
    }

    if (splitUrl.length === 2 && first === 'poker' && second !== undefined) {
        query.metadata = {
            gameEnd: new Date()
        };
    }

    // this middleware is done processing and move on to the next thing in line
    next();
});

/**
 * @api {GET} /poker                start a new poker game by drawing cards
 * @apiQuery {Number} count         deck count
 * @apiQuery {Number} cardCount     number of cards to draw
 * @apiExample                      localhost:8888/poker
 */
router.get('/', async (req, res) => {
    try {
        const { query } = req;
        const { count = 1, cardCount = 5, metadata } = query;

        const deck = await deckofcards.buildDeck(count);
        const draw = await deckofcards.drawCards(deck.deck_id, cardCount);

        const hand = _formatCards(draw.cards);

        const results = { deckId: deck.deck_id, hand };

        res.json(results);

        database.save('Results', { ...results, metadata });
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

/**
 * @api {GET} /poker/:deckId        end poker game by removing cards and redrawing
 * @apiParam {String} deckId        unique id of the deck
 * @apiQuery {String} cards         card codes to discard and replace
 * @apiExample                      localhost:8888/poker/cyiwih4zrvwh?cards=AH,KH
 */
router.get('/:deckId', async (req, res) => {
    try {
        const { params, query } = req;

        const { deckId } = params;
        const { cards = '', metadata } = query;

        const original = await database.find('Results', deckId);

        // if there is already a final hand in the database then this game has previously ended
        if (original.final) {
            return res
                .status(400)
                .json({ error: 'This game has already ended.' });
        }

        const results = {
            deckId,
            hand: original.hand
        };

        // if the cards query param has a length then process the discards
        // otherwise a user has decided to no throwaway cards and final hand = orignal hand
        if (cards.length) {
            const selected = cards.split(',');
            const filtered = original.hand.filter((card) => {
                return !selected.includes(card.code);
            });

            const reDraw = await deckofcards.drawCards(deckId, selected.length);

            const formatted = _formatCards(reDraw.cards);

            results.hand = [...filtered, ...formatted];
        }

        res.json(results);

        database.update('Results', deckId, {
            final: results.hand,
            metadata: { ...original.metadata, gameEnd: metadata.gameEnd }
        });
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;
