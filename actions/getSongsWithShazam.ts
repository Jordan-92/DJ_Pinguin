import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getSongsWithShazam = async (title: string) => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    if (!title) {
        const allSongs = await getSongs();
        return allSongs;
    }

    try {
        const response = await fetch(`https://www.shazam.com/services/amapi/v1/catalog/BE/search?types=songs&term=${title}`);
        const data = await response.json();
        const names = [];
        for (const song of data.results.songs.data) {
            names.push({ id: 4, created_at: '2024-04-29T16:51:55.85275+00:00', title: song.attributes.name, song_path: 'song-Locked Away-lvl75q7n',
            image_path: 'image-Locked Away-lvl75q7n',
            author: song.attributes.artistName,
            user_id: '44e1979f-cbcb-420a-a433-a633f4b9953c'});
        }
        console.log(names);
        return names || [];
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
};

export default getSongsWithShazam;
