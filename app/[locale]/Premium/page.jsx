"use client";

import CardPremium from "@/components/Card/CardPremium";
import CardStandard from "@/components/Card/CardStandard";
import Header from "@/components/Header/Header";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

// firebase
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import CardThank from "@/components/Card/CardThank";
const PremiumPage = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, "Users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            console.log("User Data: ", userDoc.data());
            setIsPremium(userDoc.data().isPremium);
          }
        } else {
          console.log("No user signed in");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Header />
      {isPremium ? (
        <div className="max-w-screen-lg mx-auto mt-32">
          <h2 className="text-[#876447] text-6xl text-center font-bold">
            {"Premium status is active :)"}
          </h2>
        </div>
      ) : (
        <div className="max-w-screen-lg mx-auto mt-32">
          <h2 className="text-[#876447] text-6xl font-bold">Available plans</h2>
          <h3 className="text-[#876447] text-3xl mt-3">
            There are several plans for using CrossWays. Please choose the one
            that suits you best.
          </h3>
        </div>
      )}

      <div className="flex justify-between max-w-screen-lg mx-auto">
        {isPremium ? (
          <CardThank />
        ) : (
          <>
            <CardStandard />
            <CardPremium />
          </>
        )}
      </div>
    </>
  );
};

export default PremiumPage;
