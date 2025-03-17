import { Router } from "express";
import {
  moderatePost,
  flagUser,
  getPostById,
  getUserProfile,
  getFlaggedContentStats,
} from "../controllers/moderationController";

const router: Router = Router();

/**
 * @route GET /post/:id
 * @description Gets a post based on an Id - PUBLIC
 *
 * @openapi
 * /api/v1/moderation/post/{id}:
 *   get:
 *     summary: retrieves a post by id
 *     tags: [Moderation, Public]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       description: id of post to retrieve
 *     responses:
 *       200:
 *         description: post was successfully retrieved
 *         content:
 *           application/json:
 *             example:
 *               message: "Post retrieved successfully"
 *               data:
 *                 id: "123"
 *                 content: "Sample post content here..."
 *                 author: "Author ID or Name"
 *                 isFlagged: false
 *                 createdAt: "2023-10-01T12:34:56Z"
 *                 updatedAt: "2023-10-02T08:00:00Z"
 *       404:
 *         description: post was not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Endpoint not found"
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Server Error"
 */
router.get("/post/:id", getPostById);

/**
 * @route POST /api/v1/moderation/post/:id/moderate
 * @description Moderate a post by ID
 *
 * @openapi
 * /api/v1/moderation/post/{id}/moderate:
 *   post:
 *     summary: Flags and hides a post
 *     tags: [Moderation, Private]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: id of the post
 *     responses:
 *       200:
 *         description: Post moderated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Post moderated successfully"
 *               data:
 *                 id: "123e4567-e89b-12d3-a456-426614174000"
 *                 status: "Moderated"
 *                 actionTaken: "Content flagged and hidden"
 *                 moderatedAt: "2025-03-17T12:34:56Z"
 *       404:
 *         description: Post not found.
 *         content:
 *           application/json:
 *             example:
 *               message: "Endpoint not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Server Error"
 */
router.post("/post/:id/moderate", moderatePost);

/**
 * @route GET /user/:id/profile
 * @description Gets a post based on an Id - PUBLIC
 *
 * @openapi
 * /api/v1/moderation/user/{id}/profile:
 *   get:
 *     summary: retrieves a user's profile by id
 *     tags: [Moderation, Public]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       description: user id of profile to retrieve
 *     responses:
 *       200:
 *         description: profile was successfully retrieved
 *         content:
 *           application/json:
 *             example:
 *               message: "User profile retrieved successfully"
 *               data:
 *                 id: "123"
 *                 username: "sampleUser123"
 *                 bio: "This is a sample bio for the user profile."
 *                 isFlagged: false
 *                 joinedAt: "2023-01-15T09:00:00Z"
 *                 postsCount: 45
 *       404:
 *         description: user profile was not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Endpoint not found"
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Server Error"
 */
router.get("/user/:id/profile", getUserProfile);

/**
 * @route POST /api/v1/moderation/user/:id/flag
 * @description flags a user by id
 *
 * @openapi
 * /api/v1/moderation/user/{id}/flag:
 *   post:
 *     summary: flags a user by id
 *     description: Flags a user for violating rules
 *     tags: [Moderation, Private]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: id of the user to be flagged
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 description: "reason for flagging user"
 *                 example: "Said bad words"
 *     responses:
 *       200:
 *         description: user was successfully flagged
 *         content:
 *           application/json:
 *             example:
 *               message: "User flagged successfully"
 *               data:
 *                 userId: "123"
 *                 reason: "Said bad words"
 *                 flaggedAt: "2025-03-17T12:34:56Z"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               message: "Endpoint not found."
 *       500:
 *         description: server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "server error"
 */
router.post("/user/:id/flag", flagUser);

/**
 * @route GET /api/v1/moderation/content/flags/stats
 * @description gets stats on flagged content
 *
 * @openapi
 * /api/v1/moderation/content/flags/stats:
 *   get:
 *     summary: retrieve statistics on flagged content
 *     description: Fetches statistics on flagged posts and users
 *     tags: [Moderation, Private]
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Flagged content statistics"
 *               data:
 *                 totalFlaggedPosts: 120
 *                 totalFlaggedUsers: 15
 *                 mostCommonFlagReason: "Spam"
 *                 flaggedContentByCategory:
 *                   spam: 75
 *                   hateSpeech: 30
 *                   inappropriateContent: 15
 */
router.get("/content/flags/stats", getFlaggedContentStats);

export default router;
