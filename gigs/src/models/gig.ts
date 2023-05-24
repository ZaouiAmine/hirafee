import mongoose from "mongoose";

interface gigAttrs {
  userId: string;
  title : string ;
  content: string;
  viewCount: string;
  budget : number
}

interface GigDoc extends mongoose.Document {
    userId: string;
    title : string ;
    content: string;
    viewCount: string;
    budget : number
}

interface GigModel extends mongoose.Model<GigDoc> {
    build(attrs: gigAttrs): GigDoc;
  }

const gigSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
        type: String,
        required: true,
      },
      viewCount: {
        type: String,
        required: false,
      },
      budget: {
        type: Number,
        required: true,
      },

  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);


gigSchema.statics.build = (attrs: gigAttrs) => {
  return new Gig(attrs);
};

const Gig = mongoose.model<GigDoc, GigModel>("Gig", gigSchema);

export { Gig };
