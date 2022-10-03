import { getUserByUsername } from "../../db/users";
import bcrypt from "bcrypt";
import { generateTokens, sendRefreshToken } from "../../utils/jwt.js";
import { userTransformer } from "~~/server/transformes/user";
import { createRefreshToken } from "~~/server/db/refreshTokens";
import { sendError } from "h3";

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const { username, password } = body;

  if (!username || !password) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }

  // Kullanıcı Kayıtlımı
  const user = await getUserByUsername(username);
  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or Password invalid",
      })
    );
  }
  //Şifreler Uyuşuyormu

  const doesThePasswordMatch = await bcrypt.compare(password, user.password);
  if (!doesThePasswordMatch) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or Password invalid",
      })
    );
  }
  //Token Oluşturma
  //Access Token
  //Refresh Token
  const { accessToken, refreshToken } = generateTokens(user);

  //database'e kaydet
  await createRefreshToken({ token: refreshToken, userId: user.id });

  // add http only cookie
  sendRefreshToken(event,refreshToken)
  return {
    // user:user,
    // doesThePasswordMatch
    access_Token: accessToken,
    user: userTransformer(user),
  };
});
