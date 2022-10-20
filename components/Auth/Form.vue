<template>
    <div class="w-full">
        <div class="flex justify-center">
            <div class="w-10 h-10">
                <LogoTwitter />
            </div>
        </div>
        <div class="flex justify-around ">
            <p class="text-gray-400">
                Username: emrullah
            </p>
            <p class="text-gray-400">
                Password: 123456
            </p>

        </div>
        <form action="" @submit.prevent="handleLogin" class="pt-5 space-y-6">
            <UIInput v-model="data.username" label="Username" placeholder="@username" />

            <UIInput label="Password" placeholder="********" type="password" v-model="data.password" />

            <UIButton liquid :disabled="isButtonDisabled" @click="handleLogin"> Login</UIButton>

        </form>
        <div class="flex justify-center mt-2 " v-if="isMessageDisabled">
            <p class="text-sm text-red-500" > {{message}}</p>
        </div>
    </div>
</template>
<script setup>
const data = reactive({
    username: '',
    password: '',
    loading: false
})
const isButtonDisabled = computed(() => {
    return (!data.username || !data.password) || data.loading
})
const message=ref('Kullanıcı adı yada şifre hatalı.')
const isMessageDisabled = ref(false)
const handleLogin = async () => {
    const { login } = useAuth()
    data.loading = true
    try {
        await login({
            username: data.username,
            password: data.password
        })
    } catch (error) {
        console.log(error)
        data.username=""
        data.password=""
        isMessageDisabled.value=true
    } finally {
        data.loading = false
    }
}
</script>