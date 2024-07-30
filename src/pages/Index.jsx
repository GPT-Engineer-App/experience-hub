import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to EventXperience</h1>
      {user ? (
        <div className="text-center">
          <p className="mb-4">Welcome, {user.email}!</p>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <SignIn />
          <SignUp />
        </div>
      )}
    </div>
  );
};

export default Index;