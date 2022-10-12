<template>
    <div>
        <div v-if="loading" class="flex items-center justify-center p-8">
            <UISpinner />
        </div>
        <div v-else>
            <TweetItem :tweet="props.replyTo" v-if="props.replyTo && props.showReply" hideActions/>
            <TweetFormInput :placeholder="props.placeholder" :user="props.user" @on-submit="hadleFormSubmit" />

        </div>
    </div>
</template>

<script setup>
const { postTweet } = useTweets()
const loading = ref(false)

const emits = defineEmits(['onSuccess'])

const props = defineProps({
    user: {
        type: Object,
        required: true
    },
    placeholder:{
        type: String,
    },
    replyTo:{
        type:Object,
        default:null
    },
    showReply:{
        type:Boolean,
        default:false
    }
})
const hadleFormSubmit = async (data) => {
    loading.value = true
    try {
        const response = await postTweet({
            text: data.text,
            mediaFiles: data.mediaFiles,
            replyTo : props.replyTo?.id
        })
        emits('onSuccess',response.tweet)
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false
    }
}
</script>

<style>

</style>