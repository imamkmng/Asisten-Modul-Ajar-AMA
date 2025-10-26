
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-sm py-4 mt-auto">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-gray-500">
          Dibuat oleh{' '}
          <a
            href="https://www.instagram.com/imamkmng"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            @imamkmng
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
