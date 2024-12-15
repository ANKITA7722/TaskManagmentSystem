
const EmpModel = require("../models/empModel");
const taskModel = require("../models/taskModel");


const userRegistration = async (req, res) => {
  const { name, email, password } = req.body;
  const empdata = await EmpModel.create({
    name: name,
    email: email,
    password: password
  })

  res.send("succesfully registered!");
}
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const empdata = await EmpModel.find({ email: email });
  if (empdata.length < 1) {
    res.status(401).send("Invalid Email!")
  }
  else {
    if (empdata[0].password != password) {
      res.status(401).send("Invalid Credentials!");
    }
    else {
      res.status(200).send(empdata);
    }
  }
}

const displayUsersData = async (req, res) => {
  const data = await EmpModel.find();
  res.send(data);
  console.log(data);

}

const display = async (req, res) => {
  try {
    const users = await EmpModel.find(); // Fetch all users
    
    const responseData = await Promise.all(
      users.map(async (user) => {
        const tasks = await taskModel.find({ userId: user._id }); // Fetch tasks for each user
        
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          tasks: tasks.map((task) => ({
            title: task._id.title,
            description: task.description,
          })),
        };
      })
    );

    // Send the structured response
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = {
  userRegistration,
  userLogin,
  displayUsersData,
  display

}
