
export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageId: string;
  category: string;
  date: string;
};

export const blogPosts: BlogPost[] = [
    {
        id: 'caring-for-wood',
        title: 'Caring for Your Wood Furniture',
        excerpt: 'Solid wood furniture is an investment. Learn the best practices for cleaning, polishing, and protecting your pieces to ensure they last for generations.',
        content: `
            <p>Solid wood furniture brings warmth and beauty to any home, but it requires proper care to maintain its luster. Here are our top tips for keeping your wood pieces in pristine condition:</p>
            <h4 class="font-headline text-lg font-semibold mt-6 mb-2">Dusting Regularly</h4>
            <p>Dust may seem harmless, but it can build up and create a film that scratches the surface. Use a soft, lint-free cloth (like microfiber) to gently wipe down your furniture at least once a week.</p>
            <h4 class="font-headline text-lg font-semibold mt-6 mb-2">Cleaning Spills Immediately</h4>
            <p>Liquids can damage the finish or even the wood itself. If a spill occurs, blot it immediately with a clean, dry cloth. Avoid wiping, as this can spread the spill.</p>
            <h4 class="font-headline text-lg font-semibold mt-6 mb-2">Avoiding Extreme Temperatures and Sunlight</h4>
            <p>Direct sunlight can fade the finish and dry out the wood. Keep your furniture away from direct heat sources like radiators or fireplaces, as this can cause the wood to crack.</p>
        `,
        imageId: 'blog-post-1',
        category: 'Furniture Care',
        date: '2024-07-15'
    },
    {
        id: 'choosing-a-sofa',
        title: 'How to Choose the Perfect Sofa',
        excerpt: 'The sofa is the heart of the living room. Our guide will walk you through everything from size and material to style and comfort.',
        content: `
            <p>Choosing a sofa is a major decision. It's often the largest piece of furniture in a room and can set the tone for the entire space. Here's what to consider:</p>
            <h4 class="font-headline text-lg font-semibold mt-6 mb-2">1. Size and Proportion</h4>
            <p>Before you fall in love with a sofa, measure your space! Make sure it will not only fit but also be in proportion to other furniture. Use masking tape on the floor to map out its dimensions.</p>
            <h4 class="font-headline text-lg font-semibold mt-6 mb-2">2. Material and Durability</h4>
            <p>Think about your lifestyle. If you have pets or kids, a durable fabric like a tight-weave synthetic or treated leather is a great choice. For a more formal space, you might opt for velvet or linen.</p>
            <h4 class="font-headline text-lg font-semibold mt-6 mb-2">3. Comfort and Support</h4>
            <p>Don't be afraid to test it out. A good sofa should have a sturdy frame and supportive cushions. Feather-filled cushions are soft and luxurious, while foam cushions offer more structure and support.</p>
        `,
        imageId: 'blog-post-2',
        category: 'Buying Guides',
        date: '2024-07-10'
    },
    {
        id: 'small-space-styling',
        title: 'Small Space, Big Style',
        excerpt: 'Living in a smaller home doesn\'t mean you have to compromise on style. Discover our top tips for maximizing space and creating a beautiful, functional home.',
        content: `
            <p>Styling a small space can be a fun challenge. The key is to be intentional with your choices to create a home that feels open, airy, and full of personality.</p>
            <h4 class="font-headline text-lg font-semibold mt-6 mb-2">Go Vertical</h4>
            <p>Utilize your wall space! Tall, narrow bookcases and floating shelves draw the eye upward and provide valuable storage without taking up floor space.</p>
            <h4 class="font-headline text-lg font-semibold mt-6 mb-2">Choose Multi-Functional Furniture</h4>
            <p>Look for pieces that can do double duty. A storage ottoman can be a coffee table, extra seating, and a place to hide away blankets. A dining table that can extend is perfect for when guests come over.</p>
            <h4 class="font-headline text-lg font-semibold mt-6 mb-2">Use Mirrors to Create Depth</h4>
            <p>A large mirror can instantly make a room feel bigger and brighter by reflecting light. Place it opposite a window to maximize its effect.</p>
        `,
        imageId: 'blog-post-3',
        category: 'Styling Tips',
        date: '2024-07-05'
    }
];
