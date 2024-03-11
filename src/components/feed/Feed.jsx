import "./Feed.css";
import thumbnail1 from "../../assets/thumbnail1.png";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_KEY } from "../../data";
import { value_converter } from "../../data";
import moment from "moment";
// import VideoContext from "../../videoContext";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data.items);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          // <VideoContext.Provider value={item.id}>
          <Link
            to={`video/${item.snippet.categoryId}/${item.id}`}
            className="card"
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {value_converter(item.statistics.viewCount) + " Views"} &bull;{" "}
              {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </Link>
          // </VideoContext.Provider>
        );
      })}
    </div>
  );
};

export default Feed;
