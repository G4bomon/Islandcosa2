'use client';

import { useEffect } from "react";
import { useNewsStore } from '@/app/store'; 
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Fullarticle() {
    const { setArticle } = useNewsStore();
    
    useEffect(() => {
        async function loadArticle() {
            try {
                const response = await fetch('/api/articles/677a0181d4112163813309df');
                const article = await response.json();
                
                if (article) {
                    const articleData = {
                        id: article._id.toString(),
                        title: article.title || '',
                        content: article.content || '',
                        category: article.category || '',
                        author: article.author || '',
                        image: article.image || '',
                        youtube: article.youtube || '',
                        tiktok: article.tiktok || ''
                    };
                    
                    setArticle(articleData);
                }
            } catch (error) {
                console.error("Error al cargar el artículo:", error);
            }
        }

        loadArticle();
    }, [setArticle]);

    return (
        <Link href={`/view/677a0181d4112163813309df/edit2`}>
            <Button>si</Button>
        </Link>
    );
}

export default Fullarticle;