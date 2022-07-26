import styled from "styled-components";
import mikkisGuyHead from "../../assets/images/mikkisguyHead.png";
import { colors } from "../../styles/variables";
import useLatest from "../../hooks/useLatest";
import { useEffect } from "react";
import { toast } from "react-toastify";

const HeaderBar = () => {
  const { latestSub, latestFollow } = useLatest();

  useEffect(() => {
    if (latestSub !== undefined || latestFollow !== undefined) {
      if (latestSub.isNew) {
        toast(`Uusi tilaus! ${latestSub.displayName}`);
      }
      if (latestFollow.isNew) {
        toast(`Uusi seuraus! ${latestFollow.displayName}`);
      }
    }
  }, [latestSub, latestFollow]);

  return (
    <HeaderBarContainer>
      <div>
        <p>Viimeisin tilaaja</p>
        <p>{latestSub && latestSub.displayName}</p>
      </div>
      <div>
        <p>Viimeisin hosti</p>
        {/* Comes from StreamElements for now */}
      </div>
      <div>
        <MikkisGuyHead src={mikkisGuyHead} alt="" />
      </div>
      <div>
        <p>Viimeisin seuraaja</p>
        <p>{latestFollow && latestFollow.displayName}</p>
      </div>
      <div>
        <p>Seuraajatavoite</p>
        <p>{latestFollow && latestFollow.otherData.count} / 200</p>
      </div>
    </HeaderBarContainer>
  );
};

export default HeaderBar;

const HeaderBarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  position: relative;
  align-self: center;
  height: 50px;
  width: 1100px;
  margin-top: 30px;
  background-color: ${colors.gray};
`;

const MikkisGuyHead = styled.img`
  position: absolute;
  top: -25%;
  left: 47%;
  height: 78px;
`;

const EventNotification = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  background-color: ${colors.gray};
  color: ${colors.peach};
`;
