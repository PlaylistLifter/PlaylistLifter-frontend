import "./style.css"; // 스타일 불러오기

function ImageComponent({ src, alt }) {
  return <img className="Logo" src={src} alt={alt} />;
}

export default ImageComponent;
