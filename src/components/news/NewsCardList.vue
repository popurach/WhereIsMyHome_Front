<template>
    <div style="padding-top: 50px; padding-bottom: 50px; height:70%; width:100%">
        <span style="font-style: italic; font-size: 2.5rem;">최신 부동산 news</span>
        
        <carousel-3d :disabled="true" :space="365" :clickable="false" :controls-visible="true" v-images-loaded="imageLoaded" style="width:100%">
            <slide v-for="(news, i) in newsList" :index='i' :key='i'>
                <span style="background-color:white; font-style: italic; font-size: 1.3rem; font-weight: bold;" @click='move(news.newsUrl)'>{{news.title}}</span><br>
                <span style="font-size: 1rem;">{{news.preview}}</span><br>
                <img :src="news.imgUrl" alt="이미지" style="height:50%; width:100%;">
            </slide> 
        </carousel-3d>
    </div>
</template>

<script>
import {Carousel3d, Slide } from 'vue-carousel-3d';
import { createSimpleTransition } from 'vuetify/lib/components/transitions/createTransition'
export default {
    props:{
        newsList: Array,
    },
    components: {
        Carousel3d,
        Slide
    },
    methods: {
        move(url){
            console.log(url);
            window.open(url);
        },
        imageLoaded() {
            console.log('force load');
            this.$refs.carousel.$forceUpdate()
        },
    },
    mounted() {
        setTimeout(() => {
        this.$forceUpdate()
        }, 6000)
    }
    // mounted() {
    //     const newTransition = createSimpleTransition('new-transition');
    //     this.$once("hook:components", () => {
    //         newTransition
    //     })
        
    // }
}
</script>

<style>
</style>