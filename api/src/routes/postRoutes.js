const express = require('express');
const router = express.Router();
const {
    getPost,
    getPostById,
} = require("../controllers/postControllers")


router.get("/", async (req, res) => {
    try {
      const posts = await getPost();

      return res.status(200).json(posts);
    } catch (error) {
      console.log(error)
      console.error("Post getirme hatası:", error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get("/getPostById/:id", async (req, res) => {
  try{
   const {id} = req.params;
   const findPost = await getPostById(id);
   return res.status(200).json(findPost);
}
catch(error){
    console.log(error)
    console.error("Post getirme hatası:", error.message);
    return res.status(500).json({ error: 'Internal server error' });
}

})

module.exports = router;

