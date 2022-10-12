<template>
    <div>

        <TweetItemHedar :tweet="props.tweet"></TweetItemHedar>

        <div :class="tweetBodyWrapper">
            <p class="flex-shrink font-medium text-gray-800 dark:text-white pl-1" :class="textSize"  @click.self="redirect(props.tweet)">
                {{props.tweet.text}}
            </p>
            <div v-for="image in tweet.mediaFiles" :key="image.id" class="flex my-3 mr-2 border-2 rounded-2xl "
                :class="twitterBorderColor" @click.self="redirect(props.tweet)">
                <img :src="image.url" alt="" class="w-full rounded-2xl " @click.self="redirect(props.tweet)">
            </div>
            <div class="mt-2" @click.self="redirect(props.tweet)">
                <TweetItemActions :tweet="props.tweet" :compact="props.compact"></TweetItemActions>
            </div>
        </div>
    </div>
</template>

<script setup>
const { twitterBorderColor } = useTailwindConfig()
const props = defineProps({
    tweet: {
        type: Object,
        required: true
    },
    compact: {
        type: Boolean,
        default: false
    }
})
const tweetBodyWrapper = computed(() => props.compact ? 'ml-16' : 'ml-4 mt-4')
const textSize = computed(() => props.compact ? 'text-base' : 'text-2xl')
const redirect=(tweet)=>{
navigateTo(`/status/${tweet.id}`)
}

</script>

<style>

</style>