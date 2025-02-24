import { useState } from "react";
import FloatingImage from "./components/FloatingImage";
import InputBox from "./components/InputBox";
import "./components/style.css";
import Button from "./components/Button";
import Logo from"./assets/Logo.png";

function App() {
  const [url,setUrl]=useState("");

  const handleSubmit =async()=>{
    console.log("url:", url); 
    if(!url){
      alert("유튜브 링크를 입력하세요!")
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/receive-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }), // 입력된 URL을 Flask 서버로 전송
      });

      const data = await response.json();
      alert(data.message); // 서버 응답 메시지 출력
    } catch (error) {
      console.error("서버 요청 오류:", error);
      alert("서버에 연결할 수 없습니다.");
    }

  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div>
      <img className="Logo" src={Logo} alt="로고이미지" width="300px" />
      <h2 className='logo2'>PLAYLIST_ LIFTER_</h2>


      <InputBox value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={handleKeyDown} />

      <FloatingImage/>

      <Button text="GO" onClick={handleSubmit} />
    </div>
  );
}

export default App;

