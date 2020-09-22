import React, {useEffect, useState}  from 'react';
import AppRouter from 'components/AppRouter';
import {authService} from "fbase";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  //(authService.currentUser); 로그인 여부체크 true,false

  useEffect(()=>{
    //로그인의 변화를 체크해주는 메소드
    //로그인을 하던 안하던 실행
    //이렇게 안하면 auth 로그인기능을 가져오기 전에 리액트가 초기화 한다.
    //쉽게말해 몇초있다 실행시킨다라는 의미..
    //다른 component에서 로그인해도 알아서 변화를 가짐(상위컴포넌트이기 때문에?)
    authService.onAuthStateChanged((user)=>{
      //로그인했을때
      if(user){
        //setIsLoggedIn(true);
        //setUserObj(user);
        
        //Profile에서 user이름 바꾸기 위한 문장
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile:(args) => user.updateProfile(args),
        });
      }
      else{
        //setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    })

  },[])

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
        uid: user.uid,
        updateProfile:(args) => user.updateProfile(args),
    })
  }
  return (
    <>
    {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}></AppRouter> : "Initializing"} 
    {/* <footer>&copy; {new Date().getFullYear()} Twitter</footer> */}
    </>
  );
}

export default App;
