<template>
  <div>

    <TweetItem :tweet="props.tweet" :compact="false"/>

    <TweetForm placeholder="Tweet Your Reply" :replyTo="props.tweet" :user="props.user" @onSuccess="handleFormSuccess"/>

    <TweetListFeed :tweets="replies" />

  </div>
</template>

<script setup>
const props= defineProps({
    tweet:{
        type:Object,
        required:true
    },
    user:{
        type:Object,
        required:true
    }
})

const replies= computed(() => props.tweet?.replies||[])
const handleFormSuccess=(tweeet)=>{
  navigateTo({
    path:'/status/'+tweeet.id
  })
}
</script>

<style>

</style>