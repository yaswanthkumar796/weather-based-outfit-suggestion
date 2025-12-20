
const blogPosts = [
  {
    id: 1,
    title: "Transitioning Your Wardrobe for Fall",
    excerpt: "As the leaves change, so should your layers. Here is how to keep warm without sacrificing style.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    date: "Oct 12, 2024",
    readTime: "5 min read",
    link: "https://www.whowhatwear.com/how-to-transition-summer-wardrobe-to-fall"
  },
  {
    id: 2,
    title: "The Ultimate Guide to Rainy Day Fashion",
    excerpt: "Don't let the drizzle dull your shine. Essential waterproof gear that looks great.",
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80",
    date: "Nov 05, 2024",
    readTime: "4 min read",
    link: "https://www.instyle.com/fashion/clothing/rainy-day-outfit-ideas"
  },
  {
    id: 3,
    title: "Summer Essentials You Need Now",
    excerpt: "Beat the heat with breathable fabrics and timeless cuts. Our top picks for the season.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
    date: "Jun 20, 2024",
    readTime: "3 min read",
    link: "https://www.theeverygirl.com/summer-wardrobe-essentials/"
  },
  {
    id: 4,
    title: "Smart Casual: The Modern Work Code",
    excerpt: "Navigating the gray area between business professional and weekend comfort.",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80",
    date: "Sep 15, 2024",
    readTime: "6 min read",
    link: "https://www.masterclass.com/articles/smart-casual-guide"
  },
  {
    id: 5,
    title: "Winter Layering 101",
    excerpt: "Stay cozy and chic. The art of layering textures and tones for freezing temperatures.",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80",
    date: "Dec 01, 2024",
    readTime: "7 min read",
    link: "https://www.masterclass.com/articles/how-to-layer-clothes"
  },
  {
    id: 6,
    title: "Travel in Style: Airport Outfits",
    excerpt: "Comfort meets class. What to wear for long-haul flights and city breaks.",
    image: "https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&w=800&q=80",
    date: "Aug 10, 2024",
    readTime: "4 min read",
    link: "https://www.cntraveler.com/story/what-to-wear-on-a-plane"
  }
];

const Blog = ({ onPostClick }) => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-16 fade-in-up">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">The Edit</h1>
        <p className="text-xl opacity-75 max-w-2xl mx-auto">
          Style guides, weather tips, and inspiration for your daily wardrobe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, idx) => (
          <div
            key={post.id}
            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 fade-in-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Image Container */}
            <div className="h-64 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex justify-start items-center text-xs font-bold tracking-widest opacity-60 mb-4 uppercase">
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:text-indigo-300 transition-colors">
                {post.title}
              </h3>
              <p className="opacity-75 leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <button
                onClick={() => onPostClick && onPostClick(post.id)}
                className="inline-block text-sm font-bold tracking-widest uppercase border-b border-white/20 pb-1 group-hover:border-indigo-400 group-hover:text-indigo-300 transition-all"
              >
                Read Article
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
