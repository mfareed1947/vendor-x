import React from "react";
import CardTag from "./CardTag";

const SideBarTags = ({ name, tags }) => {
  const renderTags = () => {
    if (typeof tags === "string") {
      return <CardTag key={tags} country={tags} />;
    }

    if (Array.isArray(tags)) {
      return tags.map((tag) =>
        Array.isArray(tag) ? (
          tag.map(({ label, value }) => <CardTag key={value} country={label} />)
        ) : (
          <CardTag key={tag.value} country={tag.label} />
        )
      );
    }

    return <CardTag key={tags.value} country={tags.label} />;
  };

  return (
    <>
      <div className="mt-10">
        <div className="bg-[#DADADA] mx-auto mt-5 h-[2px]"></div>
        <p className="text-[18px] font-light mt-3 ">{name}</p>
        <div className="flex flex-wrap text-[12px] mt-5 font-light tracking-wide text-[#626973]">
          {renderTags()}
        </div>
      </div>
    </>
  );
};

export default SideBarTags;
