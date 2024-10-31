"use client";

import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Nav from "./Nav/Nav";
import Image from "next/image";
import Link from "next/link";

// Імпорт з Firebase
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOutUser } from "@/lib/signOut";
import ProfileInfo from "./ProfileInfo";

const Header = () => {
  const [isUser, setIsUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true); // Користувач увійшов
      } else {
        setIsUser(false); // Користувач не увійшов
      }
    });

    return () => unsubscribe(); // Очищення підписки
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto flex justify-between items-center my-5 px-2">
      {isUser ? (
        <Link href={"/Main"}>
          <div className="text-[#876447] font-bold text-4xl flex">
            CrossWays
            <Image
              src="/airplanw-ico.svg"
              alt="Airplane icon"
              width={30}
              height={30}
            />
          </div>
        </Link>
      ) : (
        <Link href={"/"}>
          <div className="text-[#876447] font-bold text-4xl flex">
            CrossWays
            <Image
              src="/airplanw-ico.svg"
              alt="Airplane icon"
              width={30}
              height={30}
            />
          </div>
        </Link>
      )}

      {isUser ? <Nav /> : ""}

      <div>
        {isUser ? (
          <div className="flex items-center">
            <ProfileInfo />
          </div>
        ) : (
          <div className="">
            <Link href="/Join-Now">
              <Button
                className="mr-5 bg-[#5C6D67] rounded-2xl"
                variant="contained"
              >
                Join Now
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;