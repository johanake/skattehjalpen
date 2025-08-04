import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogPosts, getBlogTags, type BlogPost } from "../data/blogPosts";

const BlogList: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [page, setPage] = useState(0);
  const limit = 6;

  const postsData = useMemo(() => {
    return getBlogPosts({
      limit,
      offset: page * limit,
      tag: selectedTag || undefined,
    });
  }, [page, selectedTag, limit]);

  const tagsData = useMemo(() => getBlogTags(), []);
  const postsLoading = false;

  const handlePostClick = (slug: string) => {
    navigate(`/blogg/${slug}`);
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(selectedTag === tag ? "" : tag);
    setPage(0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (postsLoading) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-text-secondary">Laddar blogginlägg...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Skattehjälpens Blogg
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Få de senaste tipsen och råden om svenska privatskatter, deklaration
            och ekonomi
          </p>
        </div>

        {/* Tags Filter */}
        {tagsData && tagsData.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Filtrera efter ämne:
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleTagFilter("")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === ""
                    ? "bg-primary-600 text-white"
                    : "bg-bg-secondary text-text-secondary hover:bg-border-light"
                }`}
              >
                Alla ({postsData?.total || 0})
              </button>
              {tagsData.map((tagInfo: { tag: string; count: number }) => (
                <button
                  key={tagInfo.tag}
                  onClick={() => handleTagFilter(tagInfo.tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                    selectedTag === tagInfo.tag
                      ? "bg-primary-600 text-white"
                      : "bg-bg-secondary text-text-secondary hover:bg-border-light"
                  }`}
                >
                  {tagInfo.tag} ({tagInfo.count})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {postsData?.posts && postsData.posts.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {postsData.posts.map((post: BlogPost) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handlePostClick(post.slug)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.headerImage}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded capitalize"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold text-text-primary mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-text-secondary mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-text-muted">
                      <span>Av {post.author}</span>
                      <div className="flex items-center space-x-2">
                        <span>{formatDate(post.publishedAt)}</span>
                        <span>•</span>
                        <span>{post.readTime} min läsning</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {postsData.hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setPage(page + 1)}
                  className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Ladda fler inlägg
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Inga blogginlägg hittades
            </h3>
            <p className="text-text-secondary">
              {selectedTag
                ? `Det finns inga publicerade inlägg med taggen "${selectedTag}".`
                : "Det finns inga publicerade blogginlägg ännu."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { BlogList };
