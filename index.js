const mongoose = require("mongoose");
require("dotenv").config();

//connect server to database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//create mongoose Schema
let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

//create model
const Person = mongoose.model("Person", personSchema);

// //create first person model and save it
const firstPerson = new Person({
  name: "Abdelsattar",
  age: 99,
  favoriteFoods: ["charmoula", "7out mela7", "9addid"],
});

firstPerson.save((err, data) => {
  err
    ? console.error(err)
    : console.log(`${firstPerson.name} successfully added to your data`);
});

// //creating several persons
Person.create(
  [
    {
      name: "monjia",
      age: 62,
      favoriteFoods: ["batti5", "jelbena", "lablebi", "hargma"],
    },
    {
      name: "Mary",
      age: 23,
      favoriteFoods: ["Lasagne", "ravioli"],
    },
    {
      name: "Harry",
      age: 13,
      favoriteFoods: ["tacos", "Poutine"],
    },
  ],
  (err) =>
    err
      ? console.error(err)
      : console.log("data successfully added to database")
);

// searching for Mary
Person.find({ name: "Mary" }, (err, data) => {
  err ? console.log(err) : console.log(`this is Mary's info : ${data}`);
});

// searching for people whose favorite food is tacos
Person.findOne({ favoriteFoods: "tacos" }, (err, data) =>
  err ? console.log(err) : console.log(data.name)
);

// searching a person with this id:600c20ec818add1074df5bca
Person.findById("600c20ec818add1074df5bca", (err, data) => {
  err ? console.log(err) : console.log(data.name);
});

// searching a person with this id:600c20ec818add1074df5bcb and adding burger to it's favorite food
Person.findByIdAndUpdate(
  "600c20ec818add1074df5bcb",
  { $push: { favoriteFoods: "hamburger" } },
  (err, data) => {
    if (err) {
      console.error(err);
    } else {
      data.save((err, data1) => {
        err
          ? console.error(err)
          : console.log(
              `Data Updated. ${data1.name}'s favorite food : ${data1.favoriteFoods}`
            );
      });
    }
  }
);

// searching for harry and setting his age to 20
Person.findOneAndUpdate(
  { name: "Harry" },
  { age: 20 },
  { new: true },
  (err, data) => {
    err
      ? console.error(err)
      : console.log(`${data.name} is ${data.age} years old`);
  }
);

//removing abdelsattar
Person.findByIdAndRemove("600c20ec818add1074df5bc9", (err, data) => {
  err
    ? console.log(err)
    : console.log(data.name + " " + "removed successfully");
});

//Delete Many persons with the same name Mary

Person.remove({ name: "Mary" }, (err) => {
  err
    ? console.error(err)
    : console.log("All document with name Mary are remved");
});

//Find people who like lablebi

Person.find({ favoriteFoods: "lablebi" })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec((err, data) => {
    err ? console.error(err) : console.log(data);
  });
