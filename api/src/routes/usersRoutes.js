const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/usersControllers")

const cloudinary = require("../utils/clodinary");
const upload = require("../middleware/multer");

router.get("/", async (req, res) => {
    try {
      const users = await getUsers();

      return res.status(200).json(users);
    } catch (error) {
      console.log(error)
      console.error("Kullanici getirme hatası:", error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get("/getUserById/:id", async (req, res) => {
  try{
   const {id} = req.params;
   const findUser = await getUserById(id);
   return res.status(200).json(findUser);
}
catch(error){
    console.log(error)
    console.error("Kullanici getirme hatası:", error.message);
    return res.status(500).json({ error: 'Internal server error' });
}

})

router.post("/createUser", upload.single('photo'), async (req, res) => {
    try {
        const { title, firstName, lastName, gender, email, dateOfBirth, phone, location } = req.body;

        if (!title || !firstName || !lastName || !gender || !email || !dateOfBirth || !phone || !location) {
            return res.status(400).json({ error: 'Tüm alanları doldurun.' });
        }

        let picture;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            picture = result.secure_url;
        }

        const newUser = await createUser(title, firstName, lastName, picture, gender, email, dateOfBirth, phone, location);

        return res.status(201).json(newUser);

    } catch (error) {
        console.error("Kullanıcı oluşturma hatası:", error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Geçersiz giriş. Lütfen tüm alanları doğru bir şekilde doldurun.' });
        }

        return res.status(500).json({ error: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' });
    }
});


router.put("/updateUser/:id", async (req, res) => {
try {
    const { id } = req.params
    const {title, firstName, lastName, phone, location} = req.body;
    const newUser = await updateUser(id, title, firstName, lastName, phone, location)
    return res.status(201).json(newUser);
}

catch(error){
    console.log(error)
    console.error("Kullanici güncelleme hatası:", error.message);
    return res.status(500).json({ error: 'Internal server error' });
}

})

router.delete("/userDelete/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteUsers = await deleteUser(id)
        return res.status(201).json(deleteUsers);
    }
    
    catch(error){
        console.log(error)
        console.error("Kullanici silme hatası:", error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }

})





module.exports = router;