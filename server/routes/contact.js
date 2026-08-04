import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

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
        $gte: new Date(Date.now() - 60000), // Last 1 minute
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
