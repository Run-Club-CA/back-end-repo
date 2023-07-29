// Import User model, to create functionality with them
const {User} = require("../models/UserModel");
const { hashString, generateUserJWT } = require("../services/auth_services");

// Function to fetch user details from database
// Code will take authorization headers of JWT and match with ID within database
const getUser = async (request, response) => {
    try {
        let user = await User.findOne({_id: request.params.id}).exec();

        response.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email
        })
    } catch(error) {
        console.log(error)
        response.status(400).json({
            message: "Error occurred while fetching user"
        })
    }
    
}



// Sign up function 
const createUser = async (request, response) => {

    // Hash and salt password
    let hashedPassword = await hashString(request.body.password);

    let user = new User({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        username: request.body.username,
        email: request.body.email,
        password: hashedPassword,
        isAdmin: false,
        isTrainer: false
    })

    // Generate JWT to send back to client for authentication in other parts of the application
    let encryptedToken = await generateUserJWT({
        userID: user.id,
        username: user.username,
        email: user.email
    });

    await user.save().then((user) => {
        response.json({message: "User saved successfully", token: encryptedToken});
        console.log(user.email);
    }).catch((error) => {
        console.log(`Error occurred when saving user, error:\n` + error);
    })
}

// Function to log user in and return valid userJWT to client
const loginUser = async (request, response) => {
    try {
        let savedUser = await User.findOne({email: request.body.email}).exec()

        let encryptedToken = await generateUserJWT({
            userID: savedUser.id,
            username: savedUser.username,
            email: savedUser.email 
        })

        response.json({message: "successful login", token: encryptedToken})
    } catch (error) {
        console.log(`Error occured: \n ${error}`);
    }
}


// Function to allow user to update their details
const editUser = async (request, response) => {
    // Overall design of function (Including Middleware parts),
    // Route takes users request header for authorization and 
    // Checks that user is authorized to make request, 
    // 2 functions? Send user details to front end for display on 
    // Edit profile form
    // Take edited details (any non edits will stay the same)
    // Return success response and new valid token
    // Is this then 2 routes, one get request with a post request 

}


module.exports = { getUser, createUser, loginUser};