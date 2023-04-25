import Image from "next/image";
import { Inter } from "next/font/google";
import Card from "@/components/card";
const inter = Inter({ subsets: ["latin"] });
import About from "./about";
import Link from "next/link";

import { useState, useEffect } from "react";

export default function Home({ data }) {
  return (
    // className="flex min-h-screen flex-col items-center justify-between"
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
  );
}

export async function getServerSideProps() {
  const url =
    "https://api.airtable.com/v0/appr0xSKd3TeDCKhI/tblbyU6xGfJKyCWgt/";
  const token =
    "patuYSb1TiUfIJZ6d.2df1b08d28aebc0caa42fd9c630eabad2601a2b1a0135887a9f4ad2e1d50355a";

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  const approveData = data.records.filter(
    (data) => data.fields.Status == "Approved"
  );

  return {
    props: {
      data: approveData,
    },
  };
}
