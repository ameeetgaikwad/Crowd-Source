import React from "react";

function About() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-3xl flex justify-center pt-5 mb-12">
        How this works?
      </h1>
      <div className="max-w-screen rounded overflow-hidden shadow-lg mr-3 ml-3 mb-6 w-1/2 text-md pl-10">
        <p className="mb-5">
          This is a platform where you can find open source programs you can
          participate to. And if there is a program which is not included in
          this list you can add it yourself and earn CROWDSOURCE tokens. You can
          redeem these tokens in many ways:
        </p>
        <ul className="list-disc">
          <li>You can get usdt in return of those tokens</li>
          <li>You can use these tokens to get access to IRL events</li>
          <li>You can use these tokens to get access to our discord server</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
