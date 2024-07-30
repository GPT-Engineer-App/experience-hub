import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';
import { Button } from "@/components/ui/button";
import { eventService } from '../lib/eventService';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const { user, signOut } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      const eventsData = await eventService.getEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to EventXperience</h1>
      {user ? (
        <div className="text-center w-full max-w-4xl">
          <p className="mb-4">Welcome, {user.email}!</p>
          <Button onClick={() => signOut()} className="mb-8">Sign Out</Button>
          <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{event.description}</p>
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
