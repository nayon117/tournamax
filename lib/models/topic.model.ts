import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this topic.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this topic.'],
  },
});

export default mongoose.models.Topic || mongoose.model('Topic', TopicSchema);