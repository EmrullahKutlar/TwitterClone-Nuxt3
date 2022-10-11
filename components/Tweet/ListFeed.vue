<template>
  <div>

    <div v-if="isEmptyArray" class="p-4">
      <p class="text-medium text-center text-gray-500 "> No Tweets Yet</p>
    </div>

    <div v-else class=" pb-4 border-b hover:bg-gray-100 cursor-pointer dark:hover:bg-dim-300"
      :class="[twitterBorderColor, defaultTransition]" v-for=" tweet in props.tweets" :key="tweet.id" @click.prevent="redirect(tweet)">
      <TweetItem :tweet="tweet" :compact="true">
      </TweetItem>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tweets: {
    tpye: Array,
    required: true
  }
})
const { twitterBorderColor, defaultTransition } = useTailwindConfig()
const isEmptyArray = computed(() => props.tweets.length == 0)
const redirect=(tweet)=>{
navigateTo(`/status/${tweet.id}`)
}
</script>

<style>

</style>