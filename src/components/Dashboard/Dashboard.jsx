import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardText,
  Container,
} from "reactstrap";
import "./Dashboard.scss";
import myImage from "../Dashboard/alt.jpg";
import Confetti from "react-confetti";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import { MyContext } from "../../Context/MyContext";
import { useSearchParams } from "react-router-dom";


function Dashboard() {

  const [searchParams]=useSearchParams();
  const id = searchParams.get("id");
  const displayName = searchParams.get("displayName");
  const image = searchParams.get("image");
  const [celebrate, setCelebrate] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });



  useEffect(() => {
    setCelebrate(true);

    setTimeout(() => {
      setCelebrate(false);
    }, 5000);

  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
    <Navigation />
      <div className="dash-wrapper">
        <Container className="dash-container">
          {celebrate && (
            <div className="celebration-container">
              <Confetti
                width={windowSize.width}
                height={windowSize.height}
                numberOfPieces={1200}
                recycle={false}
                run={celebrate}
                gravity={0.15}
              />
            </div>
          )}

          <Card
            className="card"
            color="dark"
            inverse
            style={{
              width: "auto",
            }}
          >
            <CardHeader tag="h3">Welcome {displayName}!</CardHeader>

            <CardBody>
              <CardImg
                src={image}
                alt={myImage}
                className="card-image"
              />
              <CardText tag="h6">
                Please find your login details below:
              </CardText>
              <hr className="space" />

             {
              id ? (<p>Id: {id}</p>):(<p>No id</p>)
             }
             {
              displayName ? (<p>Username: {displayName}</p>):(<p>No display name</p>)
             }
            </CardBody>
          </Card>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
