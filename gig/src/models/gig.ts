import mongoose from "mongoose";

interface GigAttrs {
  title: string;
  description: string;
  budget: number;
  location: string;
  user: string;
  category: string;
  requirements: string[];
}

interface GigModel extends mongoose.Model<GigDoc> {
  build(attrs: GigAttrs): GigDoc;
}

interface GigDoc extends mongoose.Document {
  title: string;
  description: string;
  budget: number;
  location: string;
  user: string;
  category: string;
  requirements: string[];
}

const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

gigSchema.statics.build = (attrs: GigAttrs) => {
  return new Gig(attrs);
};

const Gig = mongoose.model<GigDoc, GigModel>("Gig", gigSchema);

export { Gig };
