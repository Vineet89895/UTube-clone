import "./Recommended.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import { useEffect, useState } from "react";
import { API_KEY, value_converter } from "../../data";
import { moment } from "moment";
import { Link } from "react-router-dom";

const Recommended = () => {
  const [recommendedData, setRecommendedData] = useState([]);

  const fetchRecommendedApis = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=US&key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setRecommendedData(data.items);
      console.log("recommendedData : ", data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecommendedApis();
  }, []);

  return (
    <div className="recommended">
      {recommendedData.map((item, inndex) => {
        return (
          <div className="side-video-list">
            <Link
              to={`/video/${item.snippet.categoryId}/${item.id}`}
              key={inndex}
              className="side-video-list"
            >
              <img
                src={
                  item ? item?.snippet?.thumbnails?.default?.url : thumbnail1
                }
                alt=""
              />
              <div className="video-info">
                <h4>{item ? item?.snippet?.title : ""}</h4>
                <p>{item ? item?.snippet?.channelTitle : ""}</p>
                <p>
                  {item ? value_converter(item?.statistics?.viewCount) : "120k"}{" "}
                  Views
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Recommended;
