import "./PlayVideo.css";
import video1 from "../../assets/video1.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { useEffect, useState } from "react";
import { API_KEY } from "../../data";
import { useParams } from "react-router-dom";
import { value_converter } from "../../data";
import moment from "moment";

const PlayVideo = () => {
  const { videoId } = useParams();

  const [apiData, setApiData] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);

  const fetchVideoData = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setApiData(data.items[0]);
      console.log("dataasss : ", data.items[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchChannelData = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setChannelData(data.items[0]);
      console.log("channelSata: ", data.items[0]);
    } catch (error) {
      console.error("Error:", error);
    }

    // fetch comment Data
    try {
      const commentResponse = await fetch(
        `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
      );
      if (!commentResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const commentData = await commentResponse.json();
      setCommentsData(commentData.items);
      console.log("commentDatas: ", commentData.items);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchChannelData();
  }, [apiData]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>

      {/* <h3>{apiData ? apiData.snippet.title : ""}</h3> */}
      <div className="play-video-info">
        <p>
          {apiData
            ? value_converter(apiData?.statistics?.viewCount) + " Views "
            : " 134 Views "}
          &bull;{" "}
          {apiData ? moment(apiData?.snippet?.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="" />{" "}
            {apiData ? value_converter(apiData?.statistics?.likeCount) : 125}
          </span>

          <span>
            <img src={dislike} alt="" />
          </span>

          <span>
            <img src={share} alt="" /> Share
          </span>

          <span>
            <img src={save} alt="" /> Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={
            channelData ? channelData?.snippet?.thumbnails?.medium?.url : jack
          }
          alt=""
        />
        <div>
          <p>{apiData ? apiData?.snippet?.channelTitle : "FitVineet"}</p>
          <span>
            {channelData
              ? value_converter(channelData?.statistics?.subscriberCount)
              : "1M"}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData ? apiData?.snippet?.description : ""}</p>

        <hr />
        <h4>{value_converter(apiData?.statistics?.commentCount)} comments</h4>
        <div className="comment-section">
          {commentsData.map((item, index) => {
            return (
              <div className="cmt">
                <img
                  src={
                    item
                      ? item?.snippet?.topLevelComment?.snippet
                          ?.authorProfileImageUrl
                      : user_profile
                  }
                  alt=""
                />
                <div>
                  <h3>
                    {item
                      ? item?.snippet?.topLevelComment?.snippet
                          ?.authorDisplayName
                      : ""}
                    <span>{moment(item?.snippet?.publishedAt).fromNow()}</span>
                  </h3>
                  <p>
                    {item
                      ? item?.snippet?.topLevelComment?.snippet?.textDisplay
                      : ""}
                  </p>
                  <div className="comment-action">
                    <img src={like} alt="" />
                    <span>
                      {value_converter(
                        item?.snippet?.topLevelComment?.snippet?.likeCount
                      )}
                    </span>
                    <img src={dislike} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
