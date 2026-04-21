import React from "react";

function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-title-wrap">
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle">{subtitle}</p>
    </div>
  );
}

export default SectionHeader;