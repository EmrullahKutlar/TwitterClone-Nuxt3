import { getTweetById } from "~~/server/db/tweets";
import { tweetTransformer } from "../../transformes/tweet";

export default eventHandler(async (event) => {
  const { id } = event.context.params;

  const tweet = await getTweetById(id, {
    include: {
      author: true,
      mediaFiles: true,
      replyTo: {
        include: {
          author: true,
        },
      },
      replies: {
        include: {
          author: true,
          replyTo: {
            include: {
              author: true,
            },
          },
        },
      },
    },
  });
  return {
    tweet: tweetTransformer(tweet),
  };
});