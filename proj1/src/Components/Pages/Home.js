import React from "react";
import HeroMain from "../../HeroMain";
import HeroSec from "../../HeroSec";
import SLForm from "../../SLForm";
import BookingForm from "../../BookingForm";
import AccountDetail from "../../AccountDetail";
import { dataDentists, HSdata2 } from "../Data";

function Home() {
  const styles = "login";
  const login = window.sessionStorage.getItem("cust_id");

  return (
    <>
      <HeroMain {...dataDentists} />
      <HeroSec {...HSdata2} />
      {login ? (
        <>
          <BookingForm /> <AccountDetail />
        </>
      ) : (
        <SLForm styleSLForm={styles} />
      )}
    </>
  );
}

export default Home;
