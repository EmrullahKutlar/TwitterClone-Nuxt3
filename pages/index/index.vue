<template>
    <div>

        <MainSection title="Home" :loading="loading">
            <!-- {{user}} -->

            <Head>
                <Title>
                    Home / Twitter
                </Title>
            </Head>
            <div class="border-b" :class="twitterBorderColor">
                <TweetForm :user="user" />
            </div>
            <TweetListFeed :tweets="homeTweets"/>
        </MainSection>

    </div>

</template>

<script setup>
const { useAuthUser } = useAuth()
const loading = ref(false)
const user = useAuthUser()
const {twitterBorderColor} = useTailwindConfig()
const {getHomeTweets} = useTweets()

const homeTweets=ref([])

onBeforeMount(async ()=>{
    loading.value = true
     try {
      const {tweets} = await getHomeTweets() 
      homeTweets.value = tweets
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false
    }
})

</script>

<style>

</style>