import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createPostSchema, createReactionSchema } from '../utils/validationSchemas';

const prisma = new PrismaClient();

export const createPost = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const validation = createPostSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ error: validation.error.format() });
        }

        const post = await prisma.communityPost.create({
            data: {
                userId,
                content: validation.data.content,
                isAnonymous: validation.data.isAnonymous,
            },
        });

        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
};

export const getFeed = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.communityPost.findMany({
            take: 50,
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { reactions: true },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        profile: { select: { isAnonymous: true } }
                    }
                }
            },
        });

        const sanitizedPosts = posts.map(post => {
            const isAnon = post.isAnonymous || post.user?.profile?.isAnonymous;
            return {
                ...post,
                user: isAnon ? { name: 'Anonymous' } : post.user
            };
        });

        res.json(sanitizedPosts);
    } catch (error) {
        console.error('Error fetching feed:', error);
        res.status(500).json({ error: 'Failed to fetch feed' });
    }
};

export const reactToPost = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const validation = createReactionSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ error: validation.error.format() });
        }

        const { postId, type } = validation.data;

        const reaction = await prisma.reaction.create({
            data: {
                userId,
                postId,
                type
            }
        });

        res.status(201).json(reaction);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Already reacted with this type' });
        }
        console.error('Error reacting:', error);
        res.status(500).json({ error: 'Failed to react' });
    }
}
