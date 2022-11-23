<script>
import { useTheme } from "vuetify";

export default {
  setup() {
    const theme = useTheme();

    return {
      theme,
      toggleTheme: () =>
        (theme.global.name.value = theme.global.current.value.dark
          ? "light"
          : "dark"),
    };
  },
  data() {
    return {
      deckData: null,
      cardData: null,
      deckCardsData: [],
    };
  },
  methods: {
    fetchDeck() {
      const Url =
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
      fetch(Url)
        .then((response) => response.json())
        .then((data) => {
          this.deckData = data;
          this.deckCards = null;
          this.deckCardsData = [];
        });
    },
    fetchCard(deckId) {
      const Url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
      fetch(Url)
        .then((response) => response.json())
        .then((data) => {
          this.cardData = data;
          this.deckCardsData = [];
        });
    },
    fetchAllCards(deckId, remaining) {
      const Url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=
        ${remaining}`;
      fetch(Url)
        .then((response) => response.json())
        .then((data) => {
          this.deckCardsData = data.cards;
        });
    },
  },
};
</script>

<template>
  <v-app>
    <v-navigation-drawer>...</v-navigation-drawer>
    <v-app-bar title="My Deck">
      <v-btn @click="toggleTheme">Toggle Theme</v-btn>
    </v-app-bar>

    <v-main>
      <v-btn @click="fetchDeck"
        >Get my Deck <v-icon icon="mdi-plus"></v-icon
      ></v-btn>
      <div v-if="deckData">
        <v-btn variant="outlined" @click="fetchCard(deckData.deck_id)"
          >Get my Card<v-icon icon="mdi-atom"></v-icon
        ></v-btn>
        <div v-if="cardData">
          <v-img
            class="bg-white"
            width="100"
            :aspect-ratio="1"
            :src="cardData.cards[0].image"
          />
        </div>
        <v-btn
          variant="tonal"
          @click="fetchAllCards(deckData.deck_id, deckData.remaining)"
        >
          Get all Cards <v-icon icon="mdi-auto-fix"></v-icon>
        </v-btn>
        <v-row v-if="deckCardsData.length > 0">
          <v-col
            v-for="(card, index) in deckCardsData"
            :key="index"
            class="d-flex child-flex"
            cols="3"
          >
            <v-img
              class="bg-grey-lighten-2"
              cover
              :aspect-ratio="0"
              :src="card.image"
            />
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey-lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
img {
  float: left;
  margin-right: -160px;
}
</style>
