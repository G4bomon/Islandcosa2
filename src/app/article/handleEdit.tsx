"use client"

import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';

export const useUpdateNews = (id: string) => {
  const [error, setError] = useState<string | null>(null);

  const handlerUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);

    try {
      const Newsres = await axios.post('api/update', {
        _id: id,
        title: formdata.get('title'),
        content: formdata.get('content'),
        category: formdata.get('category'),
        image: formdata.get('image'),
        youtube: formdata.get('youtube'),
        tiktok: formdata.get('tiktok')
      });
      console.log(Newsres);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  return { handlerUpdate, error };
};