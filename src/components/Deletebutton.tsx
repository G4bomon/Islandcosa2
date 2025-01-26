"use client";

import React from 'react';
import { Button } from './ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export function Deletebutton({ articleId }: { articleId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await axios.post('/api/delete', { _id: articleId });
      console.log(response.data);
      router.push('/'); // Redirect to homepage
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  );
}
