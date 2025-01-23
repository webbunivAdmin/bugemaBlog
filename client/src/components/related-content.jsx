export default function RelatedContent() {
    const articles = [
      {
        title: "Study with us",
        description:
          "Study with the University of London. Prepare yourself for career success with a globally respected degree that fits your lifestyle.",
        image: "/placeholder.svg?height=200&width=300",
        tag: "Landing page",
      },
      {
        title: "Current students",
        description:
          "University of London students have access to a range of resources including libraries and careers services.",
        image: "/placeholder.svg?height=200&width=300",
        tag: "Landing page",
      },
      {
        title: "The Student Insider",
        description: "The online magazine of the University of London spotlighting features, profiles and more...",
        image: "/placeholder.svg?height=200&width=300",
        tag: "Landing page",
      },
      {
        title: "Our blogs",
        description:
          "Blogs at the University of London can cover everything and anything related to student and staff life, research, library, the Institute in Paris and more.",
        image: "/placeholder.svg?height=200&width=300",
        tag: "Landing page",
      },
    ]
  
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-serif mb-8">Related Content</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full aspect-video object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <span className="inline-block px-3 py-1 text-sm border border-[#1C1535] text-[#1C1535]">
                    {article.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  