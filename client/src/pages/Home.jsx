import { useEffect, useState } from "react";
import Header from "../components/Header";
import VisionSection from "../components/VisionSection";
import SaleSection from "../components/SaleSection";
import RentSection from "../components/RentSection";
import OfferSection from "../components/OfferSection";
import PartnersSection from "../components/PartnersSection";
const Home = () => {
  const [offerList, setOfferList] = useState([]);
  const [saleList, setSaleList] = useState([]);
  const [rentList, setRentList] = useState([]);

  const fetchSaleListings = async () => {
    try {
      const res = await fetch("/api/listing/get?type=sale&limit=3");
      const data = await res.json();
      setSaleList(data);
      fetchRentListings();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRentListings = async () => {
    try {
      const res = await fetch("/api/listing/get?type=rent&limit=3");
      const data = await res.json();
      setRentList(data);
      fetchOfferListings();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchOfferListings = async () => {
    try {
      const res = await fetch("/api/listing/get?offer=true&limit=2");
      const data = await res.json();
      setOfferList(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSaleListings();
  }, []);
  return (
    <div className="flex flex-col w-screen ">
      <Header />
      <VisionSection />
      <SaleSection saleList={saleList} />
      <RentSection rentList={rentList} />
      <OfferSection offerList={offerList} />
      <PartnersSection />
    </div>
  );
};

export default Home;
