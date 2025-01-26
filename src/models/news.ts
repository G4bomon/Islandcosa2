import { Schema, model, models } from "mongoose";

const SchemaNews = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: String, required: true },
        image: { type: String, required: true },
        youtube: { type: String },
        tiktok: { type: String },
        date: { type: Date, default: Date.now },
        category: { type: String, required: true },
    },
    {timestamps: true}
);

const News = models.News || model("News", SchemaNews);
export default News;

