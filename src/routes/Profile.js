import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyTweets = async () => {
    // 로그인 사용자와 트윗User이 같을때만 가져오기위한 메소드
    //where는 조건문
    //데이터베이스 쿼리와 유사
    const tweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();

    console.log(tweets.docs.map((doc) => doc.data()));
  };

  const onChange = (e) => {
    const { value } = e.target;
    setNewDisplayName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  useEffect(() => {
    getMyTweets();
  }, []);
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>

      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};
export default Profile;
