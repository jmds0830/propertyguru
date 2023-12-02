import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function MangaPage() {
  const [data, setData] = useState({});
  const { mangaId } = useParams();

  async function fetchData() {
    try {
      const response = await fetch(
        `https://api.mangadex.org/manga/${mangaId}/aggregate?translatedLanguage%5B%5D=en`
      );
      const result = await response.json();

      setData(result.volumes);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [mangaId]);

  return (
    <>
      <div>
        {Object.keys(data).map((volumeId) => (
          <div key={volumeId}>
            {Object.keys(data[volumeId].chapters).map((chapterId) => (
              <div key={chapterId}>
                <Link to={`/${mangaId}/read`}>
                  <p>Chapter {data[volumeId].chapters[chapterId].chapter}</p>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default MangaPage;
