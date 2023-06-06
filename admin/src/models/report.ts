import mongoose from "mongoose";

interface ReportAttrs {
  userId: string;
  gigId: string;
  reason: string;
  createdAt: Date;
}

interface ReportModel extends mongoose.Model<ReportDoc> {
  build(attrs: ReportAttrs): ReportDoc;
}

interface ReportDoc extends mongoose.Document {
  userId: string;
  gigId: string;
  reason: string;
  createdAt: Date;
}

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    gigId: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
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

reportSchema.statics.build = (attrs: ReportAttrs) => {
  return new Report(attrs);
};

const Report = mongoose.model<ReportDoc, ReportModel>("Report", reportSchema);

export { Report };
