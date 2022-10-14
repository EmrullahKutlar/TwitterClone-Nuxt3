import {removeRefreshToken} from '~~/server/db/refreshTokens'
import { sendRefreshToken } from '~~/server/utils/jwt'
export default defineEventHandler(async (event)=>{
    try {
        const cookie = useCookies(event)
        const refreshToken = cookie.refresh_token
        // removeRefreshToken
       await removeRefreshToken(refreshToken)

    } catch (error) {
        
    }
    sendRefreshToken(event.res, null)
    return{
        message:'Done'
    }
})