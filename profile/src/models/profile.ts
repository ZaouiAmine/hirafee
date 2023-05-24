import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new User
interface ProfileAttrs {
  userId: string ;
  name: string;
  email: string;
  phone: string;
}

// An interface that describes the properties
// that a User Model has
interface ProfileModel extends mongoose.Model<ProfileDoc> {
  build(attrs: ProfileAttrs): ProfileDoc;
}

// An interface that describes the properties
// that a User Document has
//here we can add some othr properties that mongo can generate automatically for us 
//such as UdatedAt or CreatedAt
interface ProfileDoc extends mongoose.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
}

const profileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

profileSchema.statics.build = (attrs: ProfileAttrs) => {
  return new Profile(attrs);
};

const Profile = mongoose.model<ProfileDoc, ProfileModel>('Profile', profileSchema);

export { Profile };
