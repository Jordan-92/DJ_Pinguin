import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import Link from 'next/link';

interface LinkButtonProps {
    href: string
    icon: React.ReactNode;
}

export default function NaviguationBar() {

    const LinkButton = ({href, icon}: LinkButtonProps) => (
        <Link href={href}>
            <button className="bouton-NaviguationBar">
                {icon}
            </button>
        </Link>
    );

    return (
        <>
            <div className="container-NaviguationBar">
                <LinkButton href="/download" icon={<DownloadIcon />} />
                <LinkButton href="/" icon={<MusicNoteIcon />} />
                <LinkButton href="/download" icon={<QueueMusicIcon />} />
            </div>
        </>
    );
}
