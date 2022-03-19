import React from 'react';

import { MdArrowForward } from 'react-icons/md';

const Blog: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center py-12 mt-16">
      <div
        style={{ zIndex: -1, height: '60%' }}
        className="absolute top-0 w-full bg-accent-2"
      />
      <h3 className="font-semibold text-2xl">BLOG</h3>

      <ul className="flex mt-4 px-6 max-w-full overflow-x-scroll no-scroll">
        <li style={{ maxWidth: 192 }} className="text-center mr-6">
          <div
            style={{ width: 192, height: 192 }}
            className="bg-accent-3 rounded-sm"
          />
          <span className="text-lg mt-2">lorem ipsum dolot et doted</span>
        </li>
        <li style={{ maxWidth: 192 }} className="text-center mr-6">
          <div
            style={{ width: 192, height: 192 }}
            className="bg-accent-3 rounded-sm"
          />
          <span className="text-lg mt-2">lorem ipsum dolot et doted</span>
        </li>
        <li
          style={{ maxWidth: 192 }}
          className="text-center mr-6 hidden lg:block"
        >
          <div
            style={{ width: 192, height: 192 }}
            className="bg-accent-3 rounded-sm"
          />
          <span className="text-lg mt-2">lorem ipsum dolot et doted</span>
        </li>
        <li>
          <div
            style={{ width: 192, height: 192 }}
            className="flex items-center justify-center bg-accent-0 rounded-sm border border-accent-3"
            role="button"
            onClick={() => ({})}
            onKeyDown={() => ({})}
            tabIndex={0}
          >
            <span className="text-lg text-primary text-center">
              ver mais&nbsp;&nbsp;
            </span>
            <MdArrowForward className="text-primary" />
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Blog;
