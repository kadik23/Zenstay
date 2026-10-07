import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import RoomModel from './models/Room.js';
import UserModel from './models/User.js';
import BookingModel from './models/Booking.js';
import RatingModel from './models/Rating.js';
import { createAdmin } from './create_admin.mjs';

export const clientUsersData = [
    {
        email: 'sarah.jenkins@example.com',
        username: 'sarahj',
        firstname: 'Sarah',
        lastname: 'Jenkins',
        location: 'London, United Kingdom',
        nationality: 'United Kingdom',
        account_type: 'Guest',
        telephone: 447911123456,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
        date_of_birth: { day: 15, month: 6, year: 1994 }
    },
    {
        email: 'alex.dubois@example.com',
        username: 'alexdubois',
        firstname: 'Alexandre',
        lastname: 'Dubois',
        location: 'Paris, France',
        nationality: 'France',
        account_type: 'Guest',
        telephone: 33612345678,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
        date_of_birth: { day: 22, month: 11, year: 1989 }
    },
    {
        email: 'elena.rostova@example.com',
        username: 'elenar',
        firstname: 'Elena',
        lastname: 'Rostova',
        location: 'Barcelona, Spain',
        nationality: 'Spain',
        account_type: 'Guest',
        telephone: 34600112233,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        date_of_birth: { day: 8, month: 3, year: 1996 }
    },
    {
        email: 'david.kim@example.com',
        username: 'davidk',
        firstname: 'David',
        lastname: 'Kim',
        location: 'Vancouver, Canada',
        nationality: 'Canada',
        account_type: 'Guest',
        telephone: 16045550199,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
        date_of_birth: { day: 30, month: 9, year: 1992 }
    },
    {
        email: 'amira.benali@example.com',
        username: 'amirab',
        firstname: 'Amira',
        lastname: 'Benali',
        location: 'Algiers, Algeria',
        nationality: 'Algeria',
        account_type: 'Guest',
        telephone: 213550123456,
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
        date_of_birth: { day: 12, month: 1, year: 1995 }
    }
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/Zenstay';

export const roomsData = [
    // ----------------------------------------------------
    // Single Bed Rooms (4 rooms)
    // ----------------------------------------------------
    {
        name: '101 - Cozy Standard Single',
        space: '22',
        bed_type: 'single bed',
        price: '45',
        status: 'Available',
        places: '1',
        guests_number: '1',
        bathrrom: true,
        bathroom: true,
        key_card_access: true,
        air_conditioning: true,
        smart_tv: true,
        free_wifi: true,
        rating: 6.8,
        viewers: 12,
        images: [
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: '102 - Deluxe Solo Studio',
        space: '26',
        bed_type: 'single bed',
        price: '65',
        status: 'Available',
        places: '1',
        guests_number: '1',
        bathrrom: true,
        bathroom: true,
        key_card_access: true,
        air_conditioning: true,
        smart_tv: true,
        free_wifi: true,
        rating: 7.2,
        viewers: 18,
        images: [
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: '103 - Urban Business Single',
        space: '24',
        bed_type: 'single bed',
        price: '55',
        status: 'Available',
        places: '1',
        guests_number: '1',
        bathrrom: true,
        bathroom: true,
        key_card_access: true,
        air_conditioning: true,
        smart_tv: false,
        free_wifi: true,
        rating: 7.0,
        viewers: 9,
        images: [
            'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: '104 - Minimalist Garden Single',
        space: '21',
        bed_type: 'single bed',
        price: '48',
        status: 'Available',
        places: '1',
        guests_number: '1',
        bathrrom: true,
        bathroom: true,
        key_card_access: false,
        air_conditioning: true,
        smart_tv: false,
        free_wifi: true,
        rating: 6.5,
        viewers: 6,
        images: [
            'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
        ]
    },

    // ----------------------------------------------------
    // Two Bed Rooms (4 rooms)
    // ----------------------------------------------------
    {
        name: '201 - Classic Twin Comfort',
        space: '32',
        bed_type: 'two bed',
        price: '85',
        status: 'Available',
        places: '2',
        guests_number: '2',
        bathrrom: true,
        bathroom: true,
        key_card_access: true,
        air_conditioning: true,
        smart_tv: true,
        free_wifi: true,
        rating: 7.8,
        viewers: 24,
        images: [
            'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: '202 - Superior Twin Studio',
        space: '38',
        bed_type: 'two bed',
        price: '110',
        status: 'Available',
        places: '2',
        guests_number: '2',
        bathrrom: true,
        bathroom: true,
        key_card_access: true,
        air_conditioning: true,
        smart_tv: true,
        free_wifi: true,
        rating: 8.4,
        viewers: 31,
        images: [
            'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: '203 - Family Quad Twin Suite',
        space: '46',
        bed_type: 'two bed',
        price: '135',
        status: 'Available',
        places: '4',
        guests_number: '4',
        bathrrom: true,
        bathroom: true,
        key_card_access: true,
        air_conditioning: true,
        smart_tv: true,
        free_wifi: true,
        rating: 8.7,
        viewers: 45,
        images: [
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: '204 - Urban Double-Twin Loft',
        space: '35',
        bed_type: 'two bed',
        price: '95',
        status: 'Available',
        places: '2',
        guests_number: '2',
        bathrrom: true,
        bathroom: true,
        key_card_access: false,
        air_conditioning: true,
        smart_tv: true,
        free_wifi: true,
        rating: 7.5,
        viewers: 19,
        images: [
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
        ]
    },

    // ----------------------------------------------------
    // Queen Size Bed Rooms (4 rooms)
    // ----------------------------------------------------
    {
        name: '301 - Executive Queen Suite',
        space: '40',
        bed_type: 'queen size bed',
        price: '125',
        status: 'Available',
        places: '2',
        guests_number: '2',
        bathrrom: true,
        bathroom: true,
        key_card_access: true,
        air_conditioning: true,
        smart_tv: true,
        free_wifi: true,
        rating: 8.9,
        viewers: 52,
        images: [
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: '302 - Sunset Queen with Balcony',
        space: '42',
        bed_type: 'queen size bed',
        price: '140',
        status: 'Available',
        places: '2',
        guests_number: '2',
        bathrrom: true,
        bathroom: true,
        key_card_access: true,
        air_conditioning: true,
        smart_tv: true,
        free_wifi: true,
        rating: 9.1,
        viewers: 64,
        images: [
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: '303 - Cozy Queen Garden Retreat',
        space: '34',
        bed_type: 'queen size bed',
        price: '90',
        status: 'Available',
        places: '2',
        guests_number: '2',
        bathrrom: true,
        bathroom: true,
        key_card_access: false,
        air_conditioning: true,
        smart_tv: true,
        free_wifi: true,
        rating: 7.9,
        viewers: 28,
        images: [
            'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: '304 - Modern Queen Deluxe',
        space: '36',
        bed_type: 'queen size bed',
        price: '115',
        status: 'Available',
        places: '2',
        guests_number: '2',
        bathrrom: true,
        bathroom: true,
        key_card_access: true,
        air_conditioning: true,
        smart_tv: true,
        free_wifi: true,
        rating: 8.5,
        viewers: 37,
        images: [
            'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
        ]
    },

    // ----------------------------------------------------
    // King Size Bed Rooms (4 rooms)
    // ----------------------------------------------------
    {
        name: '401 - Presidential King Suite',
        space: '65',
        bed_type: 'king size bed',
        price: '260',
        status: 'Available',
        places: '2',
        guests_number: '2',
        bathrrom: true,
        bathroom: true,
        key_card_access: true,
        air_conditioning: true,
        smart_tv: true,
        free_wifi: true,
        rating: 9.7,
        viewers: 88,
        images: [
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: '402 - Penthouse Royal King',
        space: '75',
        bed_type: 'king size bed',
        price: '320',
        status: 'Available',
        places: '3',
        guests_number: '3',
        bathrrom: true,
        bathroom: true,
        key_card_access: true,
        air_conditioning: true,
        smart_tv: true,
        free_wifi: true,
        rating: 9.9,
        viewers: 120,
        images: [
            'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: '403 - Panoramic Ocean King',
        space: '58',
        bed_type: 'king size bed',
        price: '220',
        status: 'Available',
        places: '2',
        guests_number: '2',
        bathrrom: true,
        bathroom: true,
        key_card_access: true,
        air_conditioning: true,
        smart_tv: true,
        free_wifi: true,
        rating: 9.4,
        viewers: 72,
        images: [
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: '404 - Grand Luxury King',
        space: '50',
        bed_type: 'king size bed',
        price: '185',
        status: 'Available',
        places: '2',
        guests_number: '2',
        bathrrom: true,
        bathroom: true,
        key_card_access: true,
        air_conditioning: true,
        smart_tv: true,
        free_wifi: true,
        rating: 9.2,
        viewers: 58,
        images: [
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
        ]
    }
];

export async function seed() {
    console.log('----------------------------------------------------');
    console.log('🌿 Starting Zenstay Database Seeder...');
    
    let needDisconnect = false;
    try {
        if (mongoose.connection.readyState !== 1) {
            console.log('🔌 Connecting to MongoDB:', mongoUrl);
            await mongoose.connect(mongoUrl);
            needDisconnect = true;
            console.log('✅ Connected successfully to MongoDB!\n');
        } else {
            console.log('✅ Using active MongoDB connection.\n');
        }

        // 1. Execute create_admin.mjs before seeding rooms
        console.log('👑 Ensuring admin account is created via create_admin.mjs...');
        await createAdmin();

        // 2. Clear old rooms and seed 16 curated rooms
        console.log('\n🧹 Clearing existing rooms...');
        await RoomModel.deleteMany({});

        console.log('🏨 Inserting 16 curated rooms with photos and metadata...');
        const insertedRooms = await RoomModel.insertMany(roomsData);
        console.log(`✨ Successfully inserted ${insertedRooms.length} rooms!\n`);

        // 3. Seed Client / Guest Users (The customers who actually make bookings)
        console.log('👤 Seeding client guests (customers)...');
        const clientPassword = 'password123';
        const clientSalt = bcrypt.genSaltSync(10);
        const hashedClientPassword = bcrypt.hashSync(clientPassword, clientSalt);

        const clients = [];
        for (const c of clientUsersData) {
            let clientDoc = await UserModel.findOne({ email: c.email });
            if (!clientDoc) {
                clientDoc = await UserModel.create({
                    ...c,
                    password: hashedClientPassword
                });
            }
            clients.push(clientDoc);
        }
        console.log(`✅ Seeded ${clients.length} client guests (Sarah, Alexandre, Elena, David, Amira).\n`);

        // 4. Seed Bookings MADE BY CLIENTS (not admin!)
        console.log('📅 Seeding reservations made by real CLIENTS (guests)...');
        await BookingModel.deleteMany({});
        await RatingModel.deleteMany({});

        const clientBookingsData = [
            {
                user_id: clients[0]._id.toString(), // Sarah Jenkins
                room_id: insertedRooms[1]._id.toString(), // Room 102 - Deluxe Solo Studio
                check_in: '2026-10-10',
                check_out: '2026-10-14',
                numberOfGuests: 1,
                status: 'confirmed',
                totalPrice: 260,
                review: 8.0,
                ratingInfo: {
                    overallRating: 8.0,
                    ratings: { cleanliness: 9, comfort: 8, air_conditioning: 8, free_wifi: 9, smart_tv: 7, key_card_access: 9, bathroom: 8 },
                    comment: 'Loved my solo trip stay! The room was very modern, clean, and quiet.'
                }
            },
            {
                user_id: clients[1]._id.toString(), // Alexandre Dubois
                room_id: insertedRooms[4]._id.toString(), // Room 201 - Classic Twin Comfort
                check_in: '2026-10-12',
                check_out: '2026-10-15',
                numberOfGuests: 2,
                status: 'confirmed',
                totalPrice: 255,
                review: 9.0,
                ratingInfo: {
                    overallRating: 9.0,
                    ratings: { cleanliness: 9, comfort: 9, air_conditioning: 8, free_wifi: 9, smart_tv: 8, key_card_access: 9, bathroom: 9 },
                    comment: 'Great twin beds, friendly staff and fast wifi connection.'
                }
            },
            {
                user_id: clients[2]._id.toString(), // Elena Rostova
                room_id: insertedRooms[8]._id.toString(), // Room 301 - Executive Queen Suite
                check_in: '2026-10-02',
                check_out: '2026-10-06',
                numberOfGuests: 2,
                status: 'checked-out',
                totalPrice: 500,
                review: 9.5,
                ratingInfo: {
                    overallRating: 9.5,
                    ratings: { cleanliness: 10, comfort: 10, air_conditioning: 9, free_wifi: 10, smart_tv: 9, key_card_access: 10, bathroom: 9 },
                    comment: 'Exceptional queen suite! Stunning interior and very comfortable bed.'
                }
            },
            {
                user_id: clients[3]._id.toString(), // David Kim
                room_id: insertedRooms[13]._id.toString(), // Room 402 - Penthouse Royal King
                check_in: '2026-10-18',
                check_out: '2026-10-22',
                numberOfGuests: 2,
                status: 'confirmed',
                totalPrice: 1280,
                review: null
            },
            {
                user_id: clients[4]._id.toString(), // Amira Benali
                room_id: insertedRooms[6]._id.toString(), // Room 203 - Family Quad Twin Suite
                check_in: '2026-10-20',
                check_out: '2026-10-25',
                numberOfGuests: 4,
                status: 'pending',
                totalPrice: 675,
                review: null
            }
        ];

        const insertedBookings = [];
        for (const item of clientBookingsData) {
            const { ratingInfo, ...bookingFields } = item;
            const bDoc = await BookingModel.create(bookingFields);
            insertedBookings.push(bDoc);

            if (ratingInfo) {
                await RatingModel.create({
                    booking_id: bDoc._id.toString(),
                    room_id: bDoc.room_id,
                    user_id: bDoc.user_id,
                    ...ratingInfo
                });
            }
        }
        console.log(`✨ Successfully created ${insertedBookings.length} reservations booked by real clients!\n`);

        // Print Summary Tables
        console.log('\n📋 Seeded Rooms Overview:');
        console.table(
            insertedRooms.map((r, i) => ({
                '#': i + 1,
                Name: r.name,
                BedType: r.bed_type,
                'Price/Night': `$${r.price}`,
                Space: `${r.space}m²`,
                Guests: r.guests_number,
                Rating: r.rating,
                Photos: r.images?.length || 0
            }))
        );

        console.log('\n📋 Seeded Client Bookings Overview (None by Admin):');
        console.table(
            insertedBookings.map((b, i) => {
                const client = clients.find(c => c._id.toString() === b.user_id);
                const room = insertedRooms.find(r => r._id.toString() === b.room_id);
                return {
                    '#': i + 1,
                    'Booked By (Client)': `${client?.firstname} ${client?.lastname}`,
                    'Client Email': client?.email,
                    'Room': room?.name,
                    'Dates': `${b.check_in} -> ${b.check_out}`,
                    'Guests': b.numberOfGuests,
                    'Total Price': `$${b.totalPrice}`,
                    'Status': b.status,
                    'Review': b.review ? `${b.review}/10` : 'None'
                };
            })
        );

        console.log('🎉 Seeding completed successfully!');
        console.log('----------------------------------------------------');
        return insertedRooms;
    } catch (err) {
        console.error('❌ Error during seeding:', err);
        throw err;
    } finally {
        if (needDisconnect) {
            await mongoose.disconnect();
            console.log('🔌 Disconnected from MongoDB.');
        }
    }
}

// Automatically seeds if there are currently no rooms in the database
export async function seedIfEmpty() {
    try {
        const roomCount = await RoomModel.countDocuments();
        if (roomCount === 0) {
            console.log('🌱 No rooms found in database. Auto-seeding 16 rooms for Render deployment...');
            return await seed();
        } else {
            console.log(`ℹ️ Database already has ${roomCount} rooms. Skipping auto-seed.`);
        }
    } catch (err) {
        console.error('⚠️ Auto-seed check failed:', err.message);
    }
}

// Allow direct execution: `node seed.mjs`
if (process.argv[1] && (process.argv[1].endsWith('seed.mjs') || process.argv[1].endsWith('seed'))) {
    seed().catch(() => process.exit(1));
}

export default seed;
