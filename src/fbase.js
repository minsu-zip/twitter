// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/auth"; //로그인 기능
import "firebase/firestore"; //데이터베이스 
import "firebase/storage"; //파일(이미지) 저장을 위한 스토리지

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfvsTPImrVfYZJ_B3JADLcsQ_iaMA84vw",
  authDomain: "twitter-b8dbd.firebaseapp.com",
  databaseURL: "https://twitter-b8dbd.firebaseio.com",
  projectId: "twitter-b8dbd",
  storageBucket: "twitter-b8dbd.appspot.com",
  messagingSenderId: "873019174526",
  appId: "1:873019174526:web:da6f6d768e58e08f70322f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
//로컬 로그인 기능만 사용하기위해

export const firebaseInstance = firebase;
//깃허브, 구글 로그인 기능사용하기위해

export const dbService = firebase.firestore(); 
//db를 사용하기 위해

export const storageService = firebase.storage();
//파일(이미지) 등록을 위한 스토리지