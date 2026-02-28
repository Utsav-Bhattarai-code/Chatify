import express from "express";

const router = express.Router();

router.get("/contacts" , getAllContacts);
router.get("/chat" , getAllChatPartners);
router.get("/messages/:id" , getMessages);

router.post("/send/:id" , send);

export default router;
