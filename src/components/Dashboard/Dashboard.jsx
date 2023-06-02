import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardText,
  Container,
} from "reactstrap";
import axios from "axios";
import "./Dashboard.scss";
import myImage from "../Dashboard/alt.jpg";
import Confetti from "react-confetti";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import { MyContext } from "../../Context/MyContext";


function Dashboard() {
  const {loginData,setLoginData}=useContext(MyContext);
  const [celebrate, setCelebrate] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });



  const getUserDetails = async () => {
    try {
      const connResponse = await axios.get(
        `http://localhost:4000/auth/success`,
        { withCredentials: true }
      );
      if (connResponse.status === 201) {
        const { createdAt, updatedAt, _id, __v, ...otherDetails } =
          connResponse.data.data;
        setLoginData({ ...otherDetails });
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    setCelebrate(true);

    setTimeout(() => {
      setCelebrate(false);
    }, 5000);
 
    if(!Object.keys(loginData).length>0){
      getUserDetails();
    }
    

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
            <CardHeader tag="h3">Welcome {loginData.username}!</CardHeader>

            <CardBody>
              <CardImg
                src={loginData.image ? loginData.image : myImage}
                alt={myImage}
                className="card-image"
              />
              <CardText tag="h6">
                Please find your login details below:
              </CardText>
              <hr className="space" />

              {loginData
                ? Object.entries(loginData).map(([key, value]) => {
                    if (key === "image") {
                      return null;
                    }

                    return (
                      <CardText key={key}>
                        <span>{key} - </span>
                        <span>{value}</span>
                      </CardText>
                    );
                  })
                : null}
            </CardBody>
          </Card>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
