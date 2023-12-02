import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(30);
  const [offset, setOffset] = useState(1);

  async function fetchData() {
    try {
      const response = await fetch(
        `https://api.mangadex.dev/manga?limit=${limit}&offset=${offset}&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&order%5BlatestUploadedChapter%5D=desc&includes%5B%5D=manga&includes%5B%5D=cover_art&includes%5B%5D=author&includes%5B%5D=tag&hasAvailableChapters=1`
      );
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [offset, limit]);

  return (
    <>
      <div>Home</div>
      <div>
        {data.map((item) => (
          <div key={item.id}>
            <h2>{item.attributes.title.en}</h2>
            <Link key={item.id} to={`/${item.id}`}>
              <div>
                {item.relationships.map((relationship) =>
                  relationship.type === 'cover_art' ? (
                    <div key={relationship.id}>
                      <img
                        src={`https://uploads.mangadex.org/covers/${item.id}/${relationship.attributes.fileName}.256.jpg`}
                        alt="Cover Art"
                      />
                    </div>
                  ) : null
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
