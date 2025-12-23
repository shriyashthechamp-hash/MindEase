const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const psychologists = [
        {
            name: "Dr. Sarah Chen",
            email: "sarah.chen@mindease.com",
            specialization: "Anxiety & Stress",
            experience: "10 years",
            rating: 4.9,
            image: "👩‍⚕️",
            isVerified: true,
        },
        {
            name: "Dr. James Wilson",
            email: "james.wilson@mindease.com",
            specialization: "Depression & Mood",
            experience: "8 years",
            rating: 4.8,
            image: "👨‍⚕️",
            isVerified: true,
        },
        {
            name: "Dr. Emily Davis",
            email: "emily.davis@mindease.com",
            specialization: "Relationship Counseling",
            experience: "12 years",
            rating: 5.0,
            image: "👩‍💼",
            isVerified: true,
        },
    ];

    console.log('Start seeding...');
    for (const psych of psychologists) {
        const user = await prisma.psychologist.upsert({
            where: { email: psych.email },
            update: {},
            create: psych,
        });
        console.log(`Created psychologist with id: ${user.id}`);
    }
    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
