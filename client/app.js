/* eslint-disable no-undef */
const { createApp } = Vue;

createApp({
    data() {
        return {
            cards: {},
            isPlaying: false,
            isLoadedImage: false,
            selectedCards: []
        };
    },
    methods: {
        playGame: async function () {
            const response = await fetch('http://localhost:8888/poker');
            const cards = await response.json();
            this.isPlaying = true;

            this.cards = cards;
        },
        throwawayCards: async function () {
            const joinSelection = this.selectedCards.join(',');
            const deckId = this.cards.deckId;

            const response = await fetch(
                `http://localhost:8888/poker/${deckId}?cards=${joinSelection}`
            );
            const cards = await response.json();

            this.cards = cards;
            this.isPlaying = false;
        },
        playAgain: function () {
            this.cards = {};
            this.selectedCards = [];
        },
        onImageLoad() {
            this.isLoadedImage = true;
        }
    }
}).mount('#app');