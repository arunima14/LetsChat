import express from "express";
import axios from "axios";

const router = express.Router();

//login
router.post("/login", async (req, res) => {
    try{
        const { username, password } = req.body;
        const chatEngineResponse = await axios.get(
            "https://api.chatengine.io/users/me",
            {
                headers:{
                    "Project-Id" : process.env.PROJECT_ID,
                    "User-Name": username,
                    "User-Secret": password,
                    // "Private-Key": process.env.PRIVATE_KEY,

                }
            },
        );
        res.status(200).json({ response: chatEngineResponse.data });
    } catch (error) {
        console.log("error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


//signup
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const chatEngineResponse = await axios.post(
      "https://api.chatengine.io/users/",
      {
        username: username,
        secret: password,
      },
      {
        headers: { "Private-Key": process.env.PRIVATE_KEY },
      }
    );

    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error("error", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;