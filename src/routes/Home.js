import { dbService } from "fbase";
import { useEffect, useState } from "react";
import Yweet from "components/Yweet";
import YweetFactory from "components/YweetFactory";

const Home = ({ userObj }) => {
  const [yweets, setYweets] = useState([]);

  useEffect(() => {
    dbService.collection("yweets").onSnapshot((snapshot) => {
      const yweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setYweets(yweetArray);
    });
  }, []);
  return (
    <div className="container">
      <YweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {yweets.map((yweet) => (
          <Yweet
            key={yweet.id}
            yweetObj={yweet}
            isOwner={yweet.createrId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
