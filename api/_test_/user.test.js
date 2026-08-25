import { userHandler } from "../handlers/users.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";

jest.mock("../models/User.js");
jest.mock("../models/Booking.js");

describe("userHandler - get users", () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        jest.clearAllMocks();
    });

    it("should fetch non-admin users and enhance them with booking information", async () => {
        const mockUsers = [
            {
                _id: "user1",
                username: "johndoe",
                email: "john@example.com",
                account_type: "Guest"
            }
        ];

        const mockBookings = [
            {
                _id: "b1",
                user_id: "user1",
                check_in: "2025-01-01",
                check_out: "2025-01-05",
                createdAt: "2025-01-01T10:00:00Z",
                review: { rating: 5, comment: "Great stay!" }
            }
        ];

        User.find.mockReturnValue({
            lean: jest.fn().mockResolvedValue(mockUsers)
        });
        Booking.find.mockResolvedValue(mockBookings);

        await userHandler(req, res);

        expect(User.find).toHaveBeenCalledWith({ account_type: { $ne: 'admin' } });
        expect(Booking.find).toHaveBeenCalledWith({ user_id: "user1" });
        expect(res.json).toHaveBeenCalledWith([
            {
                _id: "user1",
                username: "johndoe",
                email: "john@example.com",
                account_type: "Guest",
                hasBookings: true,
                lastReservationDate: "2025-01-01T10:00:00Z",
                checkIn: "2025-01-01",
                checkOut: "2025-01-05",
                reviews: { rating: 5, comment: "Great stay!" }
            }
        ]);
    });

    it("should handle users without bookings correctly", async () => {
        const mockUsers = [
            {
                _id: "user2",
                username: "janedoe",
                email: "jane@example.com",
                account_type: "Guest"
            }
        ];

        User.find.mockReturnValue({
            lean: jest.fn().mockResolvedValue(mockUsers)
        });
        Booking.find.mockResolvedValue([]);

        await userHandler(req, res);

        expect(res.json).toHaveBeenCalledWith([
            {
                _id: "user2",
                username: "janedoe",
                email: "jane@example.com",
                account_type: "Guest",
                hasBookings: false,
                lastReservationDate: null,
                checkIn: null,
                checkOut: null,
                reviews: null
            }
        ]);
    });

    it("should return empty array when no non-admin users exist", async () => {
        User.find.mockReturnValue({
            lean: jest.fn().mockResolvedValue([])
        });

        await userHandler(req, res);

        expect(res.json).toHaveBeenCalledWith([]);
        expect(Booking.find).not.toHaveBeenCalled();
    });

    it("should select the latest booking when multiple bookings exist", async () => {
        const mockUsers = [
            {
                _id: "user3",
                username: "alex",
                account_type: "Guest"
            }
        ];

        const mockBookings = [
            {
                _id: "b_older",
                user_id: "user3",
                check_in: "2024-05-01",
                check_out: "2024-05-05",
                createdAt: "2024-05-01T00:00:00Z",
                review: "Old review"
            },
            {
                _id: "b_newer",
                user_id: "user3",
                check_in: "2025-06-01",
                check_out: "2025-06-10",
                createdAt: "2025-06-01T00:00:00Z",
                review: "New review"
            }
        ];

        User.find.mockReturnValue({
            lean: jest.fn().mockResolvedValue(mockUsers)
        });
        Booking.find.mockResolvedValue(mockBookings);

        await userHandler(req, res);

        expect(res.json).toHaveBeenCalledWith([
            {
                _id: "user3",
                username: "alex",
                account_type: "Guest",
                hasBookings: true,
                lastReservationDate: "2025-06-01T00:00:00Z",
                checkIn: "2025-06-01",
                checkOut: "2025-06-10",
                reviews: "New review"
            }
        ]);
    });

    it("should use check_in as fallback for date sorting when createdAt is missing", async () => {
        const mockUsers = [
            {
                _id: "user4",
                username: "sam",
                account_type: "Guest"
            }
        ];

        const mockBookings = [
            {
                _id: "b_older_checkin",
                user_id: "user4",
                check_in: "2024-01-10",
                check_out: "2024-01-15",
                review: "First stay"
            },
            {
                _id: "b_newer_checkin",
                user_id: "user4",
                check_in: "2024-12-20",
                check_out: "2024-12-25",
                review: "Holiday stay"
            }
        ];

        User.find.mockReturnValue({
            lean: jest.fn().mockResolvedValue(mockUsers)
        });
        Booking.find.mockResolvedValue(mockBookings);

        await userHandler(req, res);

        expect(res.json).toHaveBeenCalledWith([
            {
                _id: "user4",
                username: "sam",
                account_type: "Guest",
                hasBookings: true,
                lastReservationDate: "2024-12-20",
                checkIn: "2024-12-20",
                checkOut: "2024-12-25",
                reviews: "Holiday stay"
            }
        ]);
    });

    it("should respond with status 500 when User.find fails", async () => {
        const errorMessage = "Database connection error";
        User.find.mockReturnValue({
            lean: jest.fn().mockRejectedValue(new Error(errorMessage))
        });

        await userHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});