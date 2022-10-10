<template>
  <div>
    <MainSection title="Tweet" :loading="loading">

            <Head>
                <Title>
                </Title>
            </Head>
            <TweetDetails :tweet="tweet" :user="user"></TweetDetails>
            
        </MainSection>
  </div>
</template>

<script setup>
const {getTweetById} = useTweets()
const loading = ref(false)
const tweet= ref(null)
const {useAuthUser}= useAuth()
const user= useAuthUser()

watch(()=> useRoute().fullPath,()=> getTweet())

const getTweetIdFromUrl=()=>{
  const url= useRoute().params.id
  console.log(url);
  return url

}

const getTweet= async()=>{
  loading.value = true
  try {
    const response = await getTweetById(getTweetIdFromUrl())
    tweet.value = response.tweet
  } catch (error) {
    console.log(error);
  }finally{
    loading.value = false
  }
}



onBeforeMount(()=>{
  
  getTweet()
})
</script>

<style>

</style>