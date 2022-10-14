<template>
    <div>

        <MainSection title="Search" :loading="loading">
            <!-- {{user}} -->

            <Head>
                <Title>
                    Search
                </Title>
            </Head>
            <TweetListFeed :tweets="searchTweets"/>
        </MainSection>
    </div>

</template>

<script setup>
const loading = ref(false)
const {getTweets} = useTweets()
const searchTweets=ref([])
const searchQuery= computed(()=>useRoute().query.q) 
watch(()=> useRoute().fullPath,()=> getTweet())

const getTweet=async()=>{
    loading.value = true
     try {
      const {tweets} = await getTweets({
        query:searchQuery.value
      }) 
      searchTweets.value = tweets
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false
    }
}




onBeforeMount(async ()=>{
    await getTweet()
})

</script>

<style>

</style>