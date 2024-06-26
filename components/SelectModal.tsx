"use client";

import useSelectModal from "@/hooks/useSelectModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";


const SelectModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const selectModal = useSelectModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            selectModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true)

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile || !user) {
                toast.error('Missing fields');
                return;
            }

            const uniqueID = uniqid();

            // Upload song
            const {
                data: songData,
                error: songError,
            } = await supabaseClient
                .storage
                .from('songs')
                .upload(`song-${values.title}-${uniqueID}`, songFile, {
                    cacheControl: '3600',
                    upsert: false
                });
            
            if (songError) {
                setIsLoading(false);
                return toast.error('Failed song upload.');
            }

            // Upload song from youtube

            // Upload image
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false
                });
            
            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed image upload');
            }

            const {
                error: supabaseError
            } = await supabaseClient
                .from('songs')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path
                });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Song created!');
            reset();
            selectModal.onClose();
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Add a song"
            description="Select a way to add a song"
            isOpen={selectModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                <Button disabled={isLoading} type="submit">
                    Upload from youtube
                </Button>
                <Button disabled={isLoading} type="submit">
                    Upload from your files
                </Button>
            </form>
        </Modal>
    );
}

export default SelectModal;