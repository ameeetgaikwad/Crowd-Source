import React from "react";

function Details({ data }) {
  console.log(data);
  let lines = [
    data.fields["How to become a contributor in this program?"].split("\n"),
    data.fields["Important timeline for the program"].split("\n"),
  ];
  let paragraph = lines[0].map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
  let timeline = lines[1].map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
  return (
    <main className="flex justify-center">
      <div className="max-w-6xl mb-5 w-15 mr-3 ml-3 rounded overflow-hidden shadow-lg">
        <img
          className="max-w-md w-40 px-6"
          src={data.fields?.["Logo of the program"]?.[0]?.thumbnails.large.url}
          alt="Program image"
        />

        <div className="px-6 py-4 mt-6">
          <div className="font-bold text-xl mb-2">
            <a href={data.fields["Website of the program"]} target="_blank">
              {data.fields["Name of the program"]}
            </a>
          </div>
          <p className="text-gray-700 text-base px-1">
            {data.fields["What is this program about?"]}
          </p>
        </div>

        <div className="px-6 py-4">
          <h1 className="font-bold text-xl mb-2">
            How to be a contributor in this program?
          </h1>
          <p className="px-1 text-gray-700 text-base">{paragraph}</p>
        </div>

        <div className="px-6 py-4">
          <h1 className="font-bold text-xl mb-2">
            Important timeline of the program
          </h1>
          <p className="px-1 text-gray-700 text-base">{timeline}</p>
        </div>

        <div className="bg-gray-100 text-gray-800 text-xs font-medium ml-4 mb-50 px-2.5 py-0.5 rounded inline dark:bg-gray-700 dark:text-gray-300 mx-6">
          Contributor: {data.fields.Name}
        </div>
      </div>
    </main>
  );
}

export default Details;

export async function getStaticPaths() {
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

  const allPaths = data.records.map((record) => {
    return {
      params: {
        details: record.id,
      },
    };
  });

  console.log(allPaths);

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.details;

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

  const info = data.records.filter((record) => record.id == id);

  return {
    props: {
      data: info[0],
    },
    revalidate: 10,
  };
}
