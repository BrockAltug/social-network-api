const mongoose = require("mongoose");
const User = require("./models/User");
const Thought = require("./models/Thought");

mongoose
  .connect("mongodb://localhost/socialNetworkDB")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

const userData = [
  {
    username: "Emma_Writer",
    email: "emma.writer@example.com",
  },
  {
    username: "Lucas_Explorer",
    email: "lucas.explorer@example.com",
  },
  {
    username: "Sophia_Thinker",
    email: "sophia.thinker@example.com",
  },
];

const thoughtData = [
  {
    thoughtText: "Just finished writing my first short story! Feeling accomplished. ✍️",
    username: "Emma_Writer",
    reactions: [{ reactionBody: "That’s amazing, congrats!", username: "Sophia_Thinker" }],
  },
  {
    thoughtText: "Went hiking today and found a hidden waterfall. Nature is incredible! 🌿",
    username: "Lucas_Explorer",
    reactions: [{ reactionBody: "Sounds breathtaking!", username: "Emma_Writer" }],
  },
  {
    thoughtText: "Pondering life’s biggest questions today. What’s your purpose? 🤔",
    username: "Sophia_Thinker",
    reactions: [{ reactionBody: "Deep thoughts! Keep reflecting.", username: "Lucas_Explorer" }],
  },
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log("Database cleared");

    // Create users
    const createdUsers = await User.create(userData);
    console.log(`Created ${createdUsers.length} users`);

    // Create thoughts and associate with users
    for (const thought of thoughtData) {
      const user = await User.findOne({ username: thought.username });
      if (user) {
        const newThought = await Thought.create(thought);
        user.thoughts.push(newThought._id);
        await user.save();
      }
    }

    console.log("Seeded database successfully");
  } catch (err) {
    console.error("Error with seeding:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();