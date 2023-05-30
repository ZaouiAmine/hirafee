import mongoose from "mongoose";

interface ProfileAttrs {
  name: string;
  phoneNumber: string;
  location: string;
  portfolio: Array<PortfolioItem>;
  user: string;
  biography: string;
}

interface ProfileModel extends mongoose.Model<ProfileDoc> {
  build(attrs: ProfileAttrs): ProfileDoc;
}

interface ProfileDoc extends mongoose.Document {
  name: string;
  phoneNumber: string;
  location: string;
  portfolio: Array<PortfolioItem>;
  user: string;
  biography: string;
}

interface PortfolioItem {
  image: string;
  description: string;
}

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    portfolio: [
      {
        image: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
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

profileSchema.statics.build = (attrs: ProfileAttrs) => {
  return new Profile(attrs);
};

const Profile = mongoose.model<ProfileDoc, ProfileModel>(
  "Profile",
  profileSchema
);

export { Profile };
