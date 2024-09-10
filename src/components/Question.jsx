import React from "react";

export default function Question({ question, options, onAnswer }) {
  return (
    <div>
      <h2 className="pb-3 underline">{question}</h2>
      {options.map(function (option) {
        return (
          <button
          className="mr-2 bg-white p-2 border-black border-[1px]"
            key={option}
            onClick={function () {
              onAnswer(option);
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}