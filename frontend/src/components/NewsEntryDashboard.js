import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 1rem;
  padding-bottom: 2rem;
  margin-bottom: 3rem;
`;

const WelcomeTitle = styled.h2`
  font-size: 1.5rem;
`;

const LeadText = styled.p`
  font-size: 1.2rem;
`;

const StyledCard = styled.div`
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const OutfitEntry = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 1rem;
`;

const OutfitImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
`;

const OutfitDetails = styled.div`
  flex: 1;
`;

const OutfitTitle = styled.h6`
  margin-bottom: 8px;
`;

const OutfitDescription = styled.p`
  margin-bottom: 16px;
`;

const OutfitDate = styled.p`
  color: #999;
`;

const LikeCount = styled.span`
  margin-left: 4px;
`;

const OwnerName = styled.span`
  margin-left: 4px;
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
`;

const NewsEntryDashboard = () => {
  const userRole = localStorage.getItem("userRole");

  if (userRole !== "NewsEntry") {
    return <div>You don't have access to this page.</div>;
  }

  return (
    <Container className="container-fluid">
      <div className="row">
        <Sidebar userRole={userRole} />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Container>
            <WelcomeTitle>Welcome to Sync Digital Solution</WelcomeTitle>
            <LeadText>This is your technical test</LeadText>
            <StyledCard>
              <div className="card-body">
                <h5 className="card-title">Today's exam </h5>
                <OutfitEntry>
                  <OutfitImage
                    src="https://media.licdn.com/dms/image/D4E03AQEdsy1k5d3a8A/profile-displayphoto-shrink_800_800/0/1689766487942?e=2147483647&v=beta&t=7xlvpVcv8NPjWfCiWwBfV1-_6l41nGa4vFJAqL1K2Q4"
                    alt="Outfit"
                  />
                  <OutfitDetails>
                    <OutfitTitle>Tony Kalalian</OutfitTitle>
                    <OutfitDescription>
                      I'm a full stack developer
                    </OutfitDescription>
                    <OutfitDate>August 1, 2023</OutfitDate>
                    <CardActions>
                      <span className="outfit-like">
                        <FontAwesomeIcon icon={faHeart} />
                        <LikeCount>24</LikeCount>
                      </span>
                    </CardActions>
                  </OutfitDetails>
                </OutfitEntry>
              </div>
            </StyledCard>

            {/* Clothing entries */}
            <div className="row mt-4">
              <div className="col-md-4 mb-4">
                <StyledCard>
                  <div className="card-body">
                    <h5 className="card-title">Lebanon,Jbeil</h5>
                    <p className="card-text">Hope I will be accepted</p>
                    <p className="card-text text-muted">July 30, 2023</p>
                    <CardActions>
                      <span className="clothing-like">
                        <FontAwesomeIcon icon={faHeart} />
                        <LikeCount>10</LikeCount>
                      </span>
                      <span className="clothing-owner">
                        <FontAwesomeIcon icon={faUser} />
                        <OwnerName>Fouad Kilani </OwnerName>
                      </span>
                    </CardActions>
                  </div>
                </StyledCard>
              </div>
              <div className="col-md-4 mb-4"></div>
            </div>
          </Container>
        </main>
      </div>
    </Container>
  );
};

export default NewsEntryDashboard;
