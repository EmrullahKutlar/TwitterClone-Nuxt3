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

        </MainSection>

    </div>

</template>

<script setup>
const { useAuthUser } = useAuth()
const loading = ref(false)
const user = useAuthUser()
const {twitterBorderColor} = useTailwindConfig()
</script>

<style>

</style>