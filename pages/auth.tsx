import React from 'react';
import Auth from '../src/components/Auth'; // Adjust the import path if necessary

const AuthPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Auth />
    </div>
  );
};

export default AuthPage;