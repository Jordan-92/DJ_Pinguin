"use client";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { AiOutlinePlus } from "react-icons/ai";
import { TbDownload } from "react-icons/tb";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({
  songs
}) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    return uploadModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div
        className="
                    flex
                    items-center
                    justify-between
                    px-5
                    pt-4
                "
      >
        <div
          className="
                        inline-flex
                        items-center
                        gap-x-2
                    "
        >
          <TbDownload className="text-neutral-400" size={26} />
          <p
            className="
                            text-neutral-400
                            font-medium
                            text-md
                        "
          >
            Add a song //to be improved (API)
          </p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
        />
      </div>
      <div
        className="
                    flex
                    flex-col
                    gap-y-2
                    mt-4
                    px-3
                "
      >
        {songs.map((item) => (
          <MediaItem
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;