import Image from 'next/image';

import avatarBg from '@/assets/image/avatar_bg.jpg';
import CSDN from '@/assets/svg/socializing/CSDN.svg';
import Douyin from '@/assets/svg/socializing/Douyin.svg';
import GitHub from '@/assets/svg/socializing/GitHub.svg';
import Gitee from '@/assets/svg/socializing/Gitee.svg';
import Juejin from '@/assets/svg/socializing/Juejin.svg';
import QQ from '@/assets/svg/socializing/QQ.svg';
import Weixin from '@/assets/svg/socializing/Weixin.svg';

import { getAuthorDataAPI } from '@/api/user';
import { getWebConfigDataAPI } from '@/api/config';
import { User } from '@/types/app/user';
import { Social, Theme } from '@/types/app/config';

const Author = async () => {
  const { data: user } = (await getAuthorDataAPI()) || { data: {} as User };
  const {
    data: { value: theme },
  } = (await getWebConfigDataAPI<{ value: Theme }>('theme')) || { data: { value: {} as Theme } };

  const socialList = theme?.social || [];

  // 图标列表
  const images: { [string: string]: string } = {
    CSDN: CSDN,
    Douyin: Douyin,
    GitHub: GitHub,
    Gitee: Gitee,
    Juejin: Juejin,
    QQ: QQ,
    Weixin: Weixin,
  };

  const getIcon = (name: string) => images[name];

  return (
    <div
      className="flex flex-col items-center pt-16 bg-no-repeat bg-white dark:bg-black-b w-full h-[350px] mb-5 tw_container"
      style={{
        backgroundSize: `100% 35%`,
        backgroundImage: `url(${avatarBg.src})`,
      }}
    >
      {/* 作者头像 */}
      <div className="avatar flex justify-center items-center w-[90px] h-[90px] rounded-full bg-white shadow-md overflow-hidden">
        <img src={user?.avatar} alt="" className="w-[90%] h-[90%] rounded-full transition-transform hover:scale-110" />
      </div>

      {/* 作者介绍 */}
      <div className="info text-center mt-4">
        <h3 className="text-lg text-[#333] dark:text-white">{user?.name}</h3>
        <p className="w-[90%] mx-auto mt-2 text-sm text-[#686868] dark:text-[#cecece]">{user?.info}</p>
      </div>

      {/* 社交账号 */}
      <div className="socializing w-full pt-8">
        <div className="title relative w-full h-[1px] bg-[#eee] dark:bg-black-a">
          <span className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-[110px] bg-white dark:bg-black-b text-center text-sm text-[#666] dark:text-[#979797]  ">社交账号</span>
        </div>

        <div className="list flex justify-evenly w-[70%] mx-auto pt-6">
          {socialList?.map((item: Social, index: number) => (
            <a key={index} href={item?.url} target="_blank" rel="noopener noreferrer">
              <Image src={getIcon(item?.name)} alt={item?.name} title={item?.name} className="w-[23px] h-[23px]" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Author;
