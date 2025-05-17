import React from "react";

export function SectionHeader({ title }: { title: string }) {
  return (
    <>
      <div>
        <h2 className="text-sm sm:text-xl font-medium">{title}</h2>
        <span className="border-b-2 border-primary block mt-2 w-16"></span>
      </div>
    </>
  );
}

export function Header3({ title }: { title: string }) {
    return (
      <>
        <div>
          <h2 className="text-sm sm:text-base font-medium">{title}</h2>
        </div>
      </>
    );
}