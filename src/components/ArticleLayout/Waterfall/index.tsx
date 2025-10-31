'use client';

import Link from 'next/link';
import { useConfigStore } from '@/stores';
import { Article } from '@/types/app/article';
import { getRandom } from '@/utils';
import Masonry from 'react-masonry-css';

interface WaterfallProps {
  data: Paginate<Article[]>;
}

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  700: 2,
};

export default ({ data }: WaterfallProps) => {
  const { theme } = useConfigStore();
  const covers = theme.covers || [];

  return (
    <>
      <Masonry breakpointCols={breakpointColumnsObj} className="masonry-grid mb-12" columnClassName="masonry-grid_column">
        {data.result.map((item) => (
          <div key={item.id} className="group overflow-hidden mt-2.5 rounded-xl bg-white dark:bg-black-b border dark:border-black-b hover:shadow-[0_10px_20px_1px_rgb(83,157,253,.1)]   cursor-pointer">
            <Link href={`/article/${item.id}`}>
              <div className="overflow-hidden h-32">
                <div className="relative h-full bg-cover bg-no-repeat bg-center scale-100 hover:scale-125 z-10 transition-transform" style={{ backgroundImage: `url(${item.cover || covers[getRandom(0, covers.length - 1)]})` }} />
              </div>

              <div className="py-2 px-4">
                <h1 className="mb-2 text-black dark:text-white group-hover:text-primary line-clamp-2  ">{item.title}</h1>

                <div className="text-sm text-gray-500 dark:text-[#8c9ab1] line-clamp-4">{item.description}</div>
              </div>
            </Link>
          </div>
        ))}
      </Masonry>
    </>
  );
};
