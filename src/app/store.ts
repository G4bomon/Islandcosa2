import { create } from "zustand";

type NewsStore = {
    // Estados
    id: string;
    title: string;
    content: string;
    category: string;
    author: string;
    image: string;
    youtube: string;
    tiktok: string;

    // Acciones
    setArticle: (article: {
        id: string;
        title: string;
        content: string;
        category: string;
        author: string;
        image: string;
        youtube: string;
        tiktok: string;
    }) => void;
    resetStore: () => void;
}

export const useNewsStore = create<NewsStore>((set) => ({
    // Estados iniciales
    id: '',
    title: '',
    content: '',
    category: '',
    author: '',
    image: '',
    youtube: '',
    tiktok: '',

    // Función para establecer todos los valores del artículo
    setArticle: (article) => {
        set({
            id: article.id,
            title: article.title,
            content: article.content,
            category: article.category,
            author: article.author,
            image: article.image,
            youtube: article.youtube,
            tiktok: article.tiktok
        });
    },

    // Función para resetear el store
    resetStore: () => {
        set({
            id: '',
            title: '',
            content: '',
            category: '',
            author: '',
            image: '',
            youtube: '',
            tiktok: ''
        });
    }
}));