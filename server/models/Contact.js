import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      minlength: [1, 'Name must be at least 1 character'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      trim: true,
      default: null,
      maxlength: [20, 'Phone number cannot exceed 20 characters'],
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
      trim: true,
      minlength: [1, 'Message must be at least 1 character'],
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    ip: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied'],
      default: 'new',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for quick queries
contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ status: 1, createdAt: -1 });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
