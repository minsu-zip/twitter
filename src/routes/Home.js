import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  //db에 데이터 가져오는 첫번째 방법
  //새로고침해야함

  // const getTweets = async () => {
  //   const dbTweets = await dbService.collection("tweets").get();

  //   //dbService에서 forEach 제공해줘서 사용( map은 제공 x)
  //   dbTweets.forEach((document) => {
  //     const newObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setTweets((prev) => [newObject, ...prev]);
  //   });
  // };

  useEffect(() => {
    //getTweets();

    //db에 데이터 가져오는 두번째 방법
    //db의 변화를 감지하는 메소드 이것을 통해
    //실시간 변화 이용 새로고침 필요없다.
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(nweetArray);
    });
  }, []);

  return (
    <div className="container">
      <TweetFactory userObj={userObj}></TweetFactory>

      <div style={{ marginTop: 30 }}>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          ></Tweet>
        ))}
      </div>
    </div>
  );
};
export default Home;
