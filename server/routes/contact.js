import express from 'express';
import Contact from '../models/Contact.js';
import { Resend } from 'resend';

const router = express.Router();

// Resend Email Client setup
const resend = new Resend(process.env.RESEND_API_KEY);

// Get all contact submissions (admin route - no auth for now)
router.get('/submissions', async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(100);
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions',
      error: error.message,
    });
  }
});

// Get contact submission by ID
router.get('/submission/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found',
      });
    }

    // Mark as read
    contact.status = 'read';
    await contact.save();

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching submission',
      error: error.message,
    });
  }
});

// Create new contact submission
router.post('/submit', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check for duplicate submissions within 1 minute
    const recentSubmission = await Contact.findOne({
      email,
      createdAt: {
        $gte: new Date(Date.now() - 5000), // Last 5 seconds (reduced for testing)
      },
    });

    if (recentSubmission) {
      return res.status(429).json({
        success: false,
        message: 'Please wait before submitting another message. Try again in a minute.',
      });
    }

    // Create contact
    const contact = await Contact.create({
      name,
      email,
      phone: phone || null,
      message,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent'),
    });

    // Send Email Notification via Resend (admin only — free plan)
    if (process.env.RESEND_API_KEY) {
      const adminEmail = process.env.ADMIN_EMAIL || 'devikakg07@gmail.com';

      // Send only admin notification (Resend free plan restricts sending to unverified emails)
      resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: adminEmail,
        subject: `New Portfolio Contact: ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #7e22ce;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin-top: 15px;">
              <p style="margin-top: 0; font-weight: bold;">Message:</p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        `,
      })
      .then(() => {
        console.log('✅ Admin notification sent successfully via Resend');
      })
      .catch((error) => {
        console.error('❌ Error sending email via Resend:', error);
      });
    } else {
      console.warn('RESEND_API_KEY is not set. Email notification skipped.');
    }

    res.status(201).json({
      success: true,
      message: 'Thanks for reaching out! I will get back to you soon.',
      data: {
        id: contact._id,
        timestamp: contact.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message,
    });
  }
});

// Update contact status (admin)
router.patch('/submission/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating submission',
      error: error.message,
    });
  }
});

// Delete contact submission
router.delete('/submission/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Submission deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting submission',
      error: error.message,
    });
  }
});

// Get statistics
router.get('/stats', async (req, res) => {
  try {
    const totalSubmissions = await Contact.countDocuments();
    const newSubmissions = await Contact.countDocuments({ status: 'new' });
    const readSubmissions = await Contact.countDocuments({ status: 'read' });
    const repliedSubmissions = await Contact.countDocuments({ status: 'replied' });

    res.status(200).json({
      success: true,
      data: {
        total: totalSubmissions,
        new: newSubmissions,
        read: readSubmissions,
        replied: repliedSubmissions,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message,
    });
  }
});

export default router;
