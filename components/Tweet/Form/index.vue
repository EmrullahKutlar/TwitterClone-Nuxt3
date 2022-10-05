<template>
    <div>
        <div v-if="loading" class="flex items-center justify-center p-8">
            <UISpinner />
        </div>
        <div v-else>
            <TweetFormInput :user="props.user" @on-submit="hadleFormSubmit" />

        </div>
    </div>
</template>

<script setup>
const { postTweet } = useTweets()
const loading = ref(false)

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})
const hadleFormSubmit = async (data) => {
    loading.value = true
    try {
        const response = await postTweet({
            text: data.text,
            mediaFiles: data.mediaFiles
        })
        alert(response)
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false
    }
}
</script>

<style>

</style>