import React from "react";
import { Container } from "@/components/Container";

export const Cta = () => {
  return (
    <Container>
      <div
        id="contact"
        className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-primary-600 px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl scroll-mt-20"
      >
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-medium lg:text-3xl">
            Ready to optimize your IT infrastructure?
          </h2>
          <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
            Let AzCore OutSource handle your technology needs so you can focus on
            your business.
          </p>
        </div>
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
          <a
            href="tel:+994000000000"
            className="inline-block py-3 mx-auto text-lg font-medium text-center text-primary-600 bg-white rounded-md px-7 lg:px-10 lg:py-5 hover:bg-primary-50 transition-colors"
          >
            Call Us Now
          </a>
        </div>
      </div>
    </Container>
  );
};
