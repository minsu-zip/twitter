import { dbService, storageService } from "fbase";
import React, { useState } from "react";

//아이콘css작업
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

//랜덤값을 주기위해 npm install uuid함
import { v4 as uuidv4 } from "uuid";

//tweets 생성 담당
const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (tweet === "") {
      return;
    }

    let attachmentUrl = "";
    if (attachment !== "") {
      //파일 이미지를 스토리지에 등록하고 해당 url을 리턴받음
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl, //이미지 파일 Url
    };

    // //firebase에 db에 테이블 생성
    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setAttachment("");
  };

  const onChange = (e) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e) => {
    const { files } = e.target;
    const theFile = files[0]; //파일 이미지 정보들을 가지고 있음
    const reader = new FileReader(); //file 정보를 읽을 수 있도록 도와주는 객체
    //이미지 파일을 url로 만들어줘서 사용할수있게끔...
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    setAttachment("");
  };

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />

        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        {/* <input type="file" accept="image/*" onChange={onFileChange} /> */}
      </div>

      <label htmlfor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>

      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />

      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default TweetFactory;
