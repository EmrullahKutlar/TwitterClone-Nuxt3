<template>
  <div :class="{'dark':darkMode}">
    <div class="bg-white dark:bg-dim-900">
      <!-- App -->
      <LoadingPage v-if="isAuthLoading" />

      <div v-else-if="user" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
          <div class="hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft @onTweet="handleOpenTweetModal" />
            </div>
          </div>
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <NuxtPage />
          </main>
          <div class=" hidden col-span-12  md:block md-col-span-3 xl:col-span-4 ">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
        <UIModal  :isOpen="postTweetModal" @onClose="handleModalClose" >
          <TweetForm :reply-to="replyTweet" showReply :user="user" @onSuccess="handleFormSuccess" />
        </UIModal>
      </div>
      <AuthPage v-else />
    </div>
  </div>
</template>

<script setup>
const darkMode = ref(false)
const { useAuthUser, initAuth, useAuthloading } = useAuth()
const isAuthLoading = useAuthloading()
const user = useAuthUser()
const {closePostTweetModal, usePostTweetModal, openPostTweetModal, useReplyTweet}= useTweets()
const postTweetModal= usePostTweetModal()
const replyTweet= useReplyTweet()
const emitter= useEmitter()
emitter.$on('replyTweet' , (tweet)=>{
  openPostTweetModal(tweet)
})
onBeforeMount(() => {
  initAuth()
})
const {getHomeTweets} = useTweets()
const handleFormSuccess = async () => {
  closePostTweetModal()
  emitter.$emit('handleFormSuccess')
}
const handleModalClose=()=>{
  closePostTweetModal()
}
const handleOpenTweetModal = () => {
  openPostTweetModal(null)
}

</script>

<style>

</style>