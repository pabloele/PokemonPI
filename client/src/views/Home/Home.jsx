import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokes } from "../../redux/actions";
import { useUserAuth } from "../../context/authContext";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokes());
  }, [dispatch]);

  return (
    <>
      <CardsContainer />
    </>
  );
};

export default Home;
