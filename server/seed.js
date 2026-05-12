const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Technician = require('./models/Technician');
const bcrypt = require('bcryptjs');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing data
    await User.deleteMany();
    await Technician.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create Admin
    await User.create({
      name: 'Admin User',
      email: 'admin@techfinder.com',
      password: hashedPassword,
      role: 'admin'
    });

    const technicians = [
      {
        name: 'Rajesh Kumar',
        email: 'rajesh@tech.com',
        specialization: ['Electrical Repair', 'Home Repair'],
        bio: 'Professional electrician with 12 years of experience in house wiring and industrial electrical systems.',
        location: 'Lucknow, Uttar Pradesh',
        experience: 12,
        hourlyRate: 350,
        rating: 4.8,
        reviewsCount: 156,
        isVerified: true,
        image: '/images/technicians/tech1.png'
      },
      {
        name: 'Amit Singh',
        email: 'amit@tech.com',
        specialization: ['Plumbing', 'Home Repair'],
        bio: 'Certified plumber specializing in modern bathroom fittings and leak detection.',
        location: 'Patna, Bihar',
        experience: 8,
        hourlyRate: 300,
        rating: 4.7,
        reviewsCount: 92,
        isVerified: true,
        image: '/images/technicians/tech2.png'
      },
      {
        name: 'Vikram Patel',
        email: 'vikram@tech.com',
        specialization: ['AC Repair', 'Appliance Repair'],
        bio: 'Expert in all types of AC servicing, gas filling, and split AC installations.',
        location: 'Ahmedabad, Gujarat',
        experience: 6,
        hourlyRate: 500,
        rating: 4.9,
        reviewsCount: 210,
        isVerified: true,
        image: '/images/technicians/tech3.png'
      },
      {
        name: 'Sanjay Sharma',
        email: 'sanjay@tech.com',
        specialization: ['Computer Repair', 'CCTV Installation'],
        bio: 'IT professional providing laptop, desktop, and networking solutions at your doorstep.',
        location: 'New Delhi, Delhi',
        experience: 10,
        hourlyRate: 450,
        rating: 4.8,
        reviewsCount: 175,
        isVerified: true,
        image: '/images/technicians/tech4.png'
      },
      {
        name: 'Rahul Gupta',
        email: 'rahul@tech.com',
        specialization: ['Carpentry', 'Home Repair'],
        bio: 'Skilled carpenter for modular kitchen work and furniture repair.',
        location: 'Jaipur, Rajasthan',
        experience: 15,
        hourlyRate: 400,
        rating: 4.6,
        reviewsCount: 118,
        isVerified: true,
        image: '/images/technicians/tech5.png'
      },
      {
        name: 'Manoj Tiwari',
        email: 'manoj@tech.com',
        specialization: ['Painting', 'Home Renovation'],
        bio: 'Expert wall painter providing textured designs and waterproof painting services.',
        location: 'Varanasi, Uttar Pradesh',
        experience: 7,
        hourlyRate: 250,
        rating: 4.7,
        reviewsCount: 85,
        isVerified: true,
        image: '/images/technicians/tech6.png'
      },
      {
        name: 'Arjun Reddy',
        email: 'arjun@tech.com',
        specialization: ['Vehicle Repair', 'Mechanic'],
        bio: 'Experienced car mechanic for engine tuning and regular maintenance.',
        location: 'Hyderabad, Telangana',
        experience: 9,
        hourlyRate: 600,
        rating: 4.8,
        reviewsCount: 142,
        isVerified: true,
        image: '/images/technicians/tech7.png'
      },
      {
        name: 'Naveen Jain',
        email: 'naveen@tech.com',
        specialization: ['Appliance Repair', 'Washing Machine'],
        bio: 'Expert in repairing washing machines, microwaves, and refrigerators.',
        location: 'Bangalore, Karnataka',
        experience: 11,
        hourlyRate: 350,
        rating: 4.9,
        reviewsCount: 198,
        isVerified: true,
        image: '/images/technicians/tech8.png'
      },
      {
        name: 'Deepak Mishra',
        email: 'deepak@tech.com',
        specialization: ['Gardening', 'Landscaping'],
        bio: 'Passionate gardener offering terrace garden setup and plant maintenance.',
        location: 'Indore, Madhya Pradesh',
        experience: 5,
        hourlyRate: 200,
        rating: 4.5,
        reviewsCount: 64,
        isVerified: true,
        image: '/images/technicians/tech9.png'
      },
      {
        name: 'Sunil Verma',
        email: 'sunil@tech.com',
        specialization: ['Security Systems', 'Smart Home'],
        bio: 'Certified security specialist for CCTV, alarms, and smart lock installations.',
        location: 'Mumbai, Maharashtra',
        experience: 8,
        hourlyRate: 550,
        rating: 4.8,
        reviewsCount: 130,
        isVerified: true,
        image: '/images/technicians/tech10.png'
      }
    ];

    for (const tech of technicians) {
      const user = await User.create({
        name: tech.name,
        email: tech.email,
        password: hashedPassword,
        role: 'technician'
      });

      await Technician.create({
        user: user._id,
        specialization: tech.specialization,
        bio: tech.bio,
        location: tech.location,
        experience: tech.experience,
        hourlyRate: tech.hourlyRate,
        rating: tech.rating,
        reviewsCount: tech.reviewsCount,
        isVerified: tech.isVerified,
        image: tech.image,
        availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM']
      });
    }

    console.log('Database Seeded Successfully with 10 Indian Technicians!');
    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedData();
