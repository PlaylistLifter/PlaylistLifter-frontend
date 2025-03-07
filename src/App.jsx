import React, { useState } from "react";
import FloatingImage from "./components/FloatingImage";
import InputBox from "./components/InputBox";
import "./components/style.css";
import Button from "./components/Button";
import {ScaleLoader} from "react-spinners";

const SPRING_API = "http://localhost:5000";

function App() {
    const [youtubeLink, setYoutubeLink] = useState("");
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);//로딩 설정

    const sendYouTubeLink = async () => {
        if (!youtubeLink) {
            alert("유튜브 링크를 입력하세요!");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/link/send-link", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ youtubeUrl: youtubeLink })
            });

            const data = await response.json();
            setSongs(data.songs || []);
        } catch (error) {
            console.error("에러 발생:", error);
            alert("서버 요청 중 에러 발생!");
        } finally {
            setLoading(false);//이쯤에서 로딩 종료
        }
    };

    const searchSpotifyMatch = (artist, title) => {
        const url = `${SPRING_API}/spotify/match?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`;
        window.open(url, "_blank");
    };

    //실제 화면구성
    return (
        <div>

            <img className="main-logo" src="/Logo.png" alt="메인로고"/>
            <img className="sub-logo" src="/Logo2.png" alt="서브로고"/>

            <InputBox
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendYouTubeLink()}
            />

            <FloatingImage />

            <Button text="GO" onClick={sendYouTubeLink} />

            <div>

                {loading ? (
                    <div className="spinner-container">
                        <p className="loading-txt">Extracting...</p>
                        <ScaleLoader className="custom-spinner" color="#ffffff" />
                    </div>
                ) : (
                    songs.length > 0 ? (
                        songs.map((song, index) => (
                            <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                <p style={{ marginRight: "10px" }}>🎵 {song.artist} - {song.title}</p>
                                <button onClick={() => searchSpotifyMatch(song.artist, song.title)}>매칭하기</button>
                            </div>
                        ))
                    ) : (
                        <p></p>
                    )
                )}
            </div>
        </div>
    );
}

export default App;
