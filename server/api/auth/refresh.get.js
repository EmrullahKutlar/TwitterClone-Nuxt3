import {sendError} from 'h3'
import { getUserById } from '~~/server/db/users'
import { decodeRefreshToken , generateTokens} from '~~/server/utils/jwt'
import {getRefreshTokenByToken} from '../../db/refreshTokens'

export default defineEventHandler(async(event)=>{
    const cookies=useCookies(event)
    const refreshToken=cookies.refresh_token
    if(!refreshToken){
        return sendError(event, createError({
            statusCode:401,
            statusMessage: 'Refresh token is not available'
        }))
    }
    const rToken=await getRefreshTokenByToken(refreshToken)

    if(!rToken){
        return sendError(event, createError({
            statusCode:401,
            statusMessage: 'Refresh token is not available'
        }))
    }
    const token= decodeRefreshToken(refreshToken)
    try {
        const user= await getUserById(token.userId)
        const {accessToken} =generateTokens(user)
        return {
            access_token:accessToken
        }
    } catch (error) {
        return sendError(event, createError({
            statusCode:500,
            statusMessage: 'Something went wrong'
        }))
    }
})