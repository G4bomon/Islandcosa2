import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const useHandleCreate = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession(); 

  const handler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    const author = session?.user.fullname || "Anonymous"; // Use the session data here

    try {
      const Newsres = await axios.post("api/news", {
        title: formdata.get("title"),
        content: formdata.get("content"),
        category: formdata.get("category"),
        image: formdata.get("image"),
        youtube: formdata.get("youtube"),
        tiktok: formdata.get("tiktok"),
        author: author,
      });
      console.log(Newsres);
      router.push("/");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  return { handler, error };
};
