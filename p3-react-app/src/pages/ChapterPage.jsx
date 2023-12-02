import { useParams } from 'react-router-dom';

function ChapterPage() {
  const { mangaId } = useParams();
  const { chapterId } = useParams();

  return (
    <>
      <div>Hello</div>
    </>
  );
}

export default ChapterPage;
