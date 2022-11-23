import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: "#000",
                secondary: "#818383",
                accent: "#2178ff",
                footer: "#3788FF",
            },
        },
    },
    icons: {
        iconfont: "mdi",
    },
});
