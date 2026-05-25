import mongoose, { Schema, model, models } from 'mongoose';

const ContentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Content = models.Content || model('Content', ContentSchema);

export default Content;
