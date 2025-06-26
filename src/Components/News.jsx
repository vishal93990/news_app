import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loading";
const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

 const searchCategoreis = ["Politics", "Sport", "Entertainment", "Health", "Finance"];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await getNewsByCategory(category);
        setArticles(res.data.articles);
      } catch (err) {
        console.error("Failed to load news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  const searchNews = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=97a02259fbe543c5b78d34990d471adc`
      );
      setNewsData(res.data.articles);
    } catch (error) {
      console.error("Error searching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const getNewsData = async () => {
    try {
      const res = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=97a02259fbe543c5b78d34990d471adc"
      );
      if (res) {
        setNewsData(res.data.articles);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewsData();
  }, []);

  return (
    <div className="overflow-hidden min-h-screen w-screen bg-black text-white ">
      {/* NAVIGATION BAR */}
      <nav className="flex flex-wrap items-center justify-between gap-4 px-[4vw] py-[4vh]">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-300">Trendy News</h1>
        </div>

        {/* INPUT & BUTTON */}
        <div className="flex flex-wrap sm:flex-col md:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-white border border-gray-400 px-5 py-2 rounded-full w-full sm:w-auto"
            type="text"
            onKeyDown={(e) => e.key === "Enter" && searchNews()}
            placeholder="Search News"
          />
          <button
            onClick={searchNews}
            className="text-white border border-gray-400 px-5 py-2 rounded-full hover:text-black hover:bg-gray-300"
          >
            Search
          </button>
        </div>
      </nav>

      {/* CATEGORIES BUTTONS */}

      <div className="flex flex-wrap items-center justify-center gap-3 mt-4 px-4">
        {searchCategoreis.map((category, index) => (
         <button  onClick={() => setCategory(searchCategoreis[category])} className="text-white border border-gray-400 px-3 py-1 rounded-full hover:text-black hover:bg-gray-300" key={index}>{category}</button>
        ))}
      </div>

      {/* NEWS GRID */}
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 px-4 pb-10 m-4">
          {newsData.map((article, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt="news"
                  className="h-40 w-full object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-white line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                  {article.description}
                </p>
                <div className="mt-3">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white border border-gray-400 px-3 py-1 rounded-full hover:text-black hover:bg-gray-300 mt-3"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
