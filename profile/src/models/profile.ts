import mongoose from "mongoose";

interface ProfileAttrs {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  location: string;
  biography: string;
  portfolio: Array<PortfolioItem>;
  role: "artisan" | "client" | "admin";
  belongsTo: mongoose.Types.ObjectId;
  createdTheProfile: mongoose.Types.ObjectId;
  banned: boolean;
}

interface ProfileModel extends mongoose.Model<ProfileDoc> {
  build(attrs: ProfileAttrs): ProfileDoc;
}

interface ProfileDoc extends mongoose.Document {
  email: string;
  belongsTo: mongoose.Types.ObjectId;
  role: ["admin", "aritisan", "client"];
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  location: string;
  portfolio: Array<PortfolioItem>;
  createdTheProfile: mongoose.Types.ObjectId;
  biography: string;
  banned: boolean;
}

interface PortfolioItem {
  image: string;
  description: string;
}

const profileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    belongsTo: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    role: {
      type: String,
      enum: ["artisan", "client", "admin"],
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
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
    createdTheProfile: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    biography: {
      type: String,
      required: true,
    },
    banned: {
      type: Boolean,
      required: true,
      default: false,
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
