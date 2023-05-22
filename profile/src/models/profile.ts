import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new User
interface ProfileAttrs {
  email: string;
  password: string;
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
  email: string;
  password: string;
}

const profileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

profileSchema.statics.build = (attrs: ProfileAttrs) => {
  return new Profile(attrs);
};

const Profile = mongoose.model<ProfileDoc, ProfileModel>('Profile', profileSchema);

export { Profile };
