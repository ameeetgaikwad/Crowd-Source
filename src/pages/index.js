import Image from "next/image";
import { Inter } from "next/font/google";
import Card from "@/components/card";
const inter = Inter({ subsets: ["latin"] });
import About from "./about";
import Link from "next/link";
import Head from "next/head";

import { useState, useEffect } from "react";

export default function Home({ data }) {
  return (
    // className="flex min-h-screen flex-col items-center justify-between"
    <>
      <Head>
        <title>Crowd Source</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div className="flex flex-row basis-0 flex-wrap max-w-full justify-center">
          {data.map((record, i) => {
            return (
              <Link key={i} href={`/${record.id}`}>
                <div className="hover:scale-105 transition-all mt-4">
                  <Card key={record.id} record={record.fields} />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const url =
    "https://api.airtable.com/v0/appTeV1ALbXz6aYeh/tblFZaXPBU2yic4Sn/";
  const token = process.env.TOKEN;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data.records);
  const approveData = data.records.filter(
    (data) => data.fields.Status == "Approved"
  );

  return {
    props: {
      data: approveData,
    },
  };
}
