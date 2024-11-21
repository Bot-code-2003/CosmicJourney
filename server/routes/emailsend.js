import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Subscription from "../models/Subscription.js";

dotenv.config();

const router = express.Router();

// POST route to send emails
router.post("/send-email", async (req, res) => {
  const { from, title, imageLink, description, articleLink, subject } =
    req.body;

  if (
    !from ||
    !title ||
    !imageLink ||
    !description ||
    !articleLink ||
    !subject
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Fetch the email list from the database
    const subscription = await Subscription.findOne();
    const emailList = subscription?.email_list || [];

    if (emailList.length === 0) {
      return res.status(400).json({ message: "No emails to send." });
    }

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email provider
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // Fetch user from env
        pass: process.env.EMAIL_PASS, // Fetch pass from env
      },
    });

    const mailOptions = {
      from: `${from}>`, // Add a name for better deliverability
      subject: `${subject}`,
      text: `Hello, \n\nHere's a new article from Cosmic Journey!\n\nTitle: ${title}\n\nDescription: ${description}\n\nRead Full Article: ${articleLink}\n\nIf you no longer wish to receive updates, you can unsubscribe here: https://cosmicjourney.vercel.app/profile`,
      html: `
        <div style="background-color: #f0f0f0; padding: 40px 20px; font-family: 'Arial', sans-serif; color: #333; font-size: 16px;">
  <!-- Main content container -->
  <div style="background-color: #fff; padding: 30px; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1); max-width: 650px; margin: 0 auto; text-align: left;">

    <!-- Article Thumbnail & Title -->
    <div style="margin-bottom: 20px;">
      <a href=${articleLink}>
        <img src=${imageLink} alt="Article Thumbnail"
             style="width: 100%; height: auto; border-bottom: 3px solid #333;">
      </a>
    </div>

    <h3 style="font-size: 22px; color: #333; font-weight: normal; margin-bottom: 15px;">
      ${title}
    </h3>

    <!-- Short Description -->
    <p style="font-size: 16px; color: #555; line-height: 1.6; margin-bottom: 30px;">
      ${description}
    </p>

    <!-- Call to Action -->
    <div style="text-align: left; margin-bottom: 30px;">
      <a target="_blank" href=${articleLink} 
         style="background-color: #333; color: #fff; padding: 12px 25px; font-size: 16px; text-decoration: none; display: inline-block; font-weight: bold;">
        Read Full Article
      </a>
    </div>

    <!-- Unsubscribe link -->
    <p style="font-size: 14px; color: #777; margin-top: 40px; text-align: center;">
      If you no longer wish to receive updates, you can <a href="https://cosmicjourney.vercel.app/profile" style="color: #333; font-weight: bold; text-decoration: none;">unsubscribe here</a>.
    </p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 40px; font-size: 14px; color: #999;">
    <p>&copy; 2024 Cosmic Journey | All rights reserved</p>
    <img src="https://i.ibb.co/5K5hfg7/Favicon.jpg" alt="Cosmic Journey Logo" style="width: 80px; height: auto; margin-top: 10px;">
  </div>
</div>

<style>
  /* Add responsiveness */
  @media (max-width: 600px) {
    div {
      padding: 20px;
    }

    h2 {
      font-size: 20px;
    }

    h3 {
      font-size: 18px;
    }

    p {
      font-size: 14px;
    }

    a {
      font-size: 14px;
    }
  }
</style>

      `, // HTML version of the message
      headers: {
        "X-Priority": "3",
        "X-Mailer": "Nodemailer",
      },
    };

    // Send emails to each address in the list
    for (const email of emailList) {
      await transporter.sendMail({ ...mailOptions, to: email });
    }

    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ message: "Failed to send emails." });
  }
});

export default router;