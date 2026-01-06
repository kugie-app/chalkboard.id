'use client'
import React, { createContext, useState, useEffect } from 'react';

import { PostType, profiledataType } from '@/app/[locale]/(DashboardLayout)/types/apps/userProfile';
import { getFetcher, postFetcher } from '@/app/api/globalFetcher';
import useSWR from 'swr';

// Define context type
export type UserDataContextType = {
    posts: PostType[];
    users: any[];
    gallery: any[];
    loading: boolean;
    profileData: profiledataType;
    followers: any[];
    search: string;
    error:null;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    addGalleryItem: (item: any) => void;
    addReply: (postId: number, commentId: number, reply: string) => void;
    likePost: (postId: number) => void;
    addComment: (postId: number, comment: string) => void;
    likeReply: (postId: number, commentId: number) => void;
    toggleFollow: (id: number) => void;
};

// Create context
export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

// Default config values
const config = {
    posts: [],
    users: [],
    gallery: [],
    followers: [],
    search: '',
    loading: true,
};

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<PostType[]>(config.posts);
    const [users, setUsers] = useState<any[]>(config.users);
    const [gallery, setGallery] = useState<any[]>(config.gallery);
    const [followers, setFollowers] = useState<any[]>(config.followers);
    const [search, setSearch] = useState<string>(config.search);
    const [error , setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(config.loading);
    const [profileData, setProfileData] = useState<profiledataType>({
        name: 'Mathew Anderson',
        role: 'Designer',
        avatar: '/images/profile/user-1.jpg',
        coverImage: '/images/backgrounds/profilebg.jpg',
        postsCount: 938,
        followersCount: 3586,
        followingCount: 2659,
    });

    const {data:postsData, isLoading:isPostsLoading , error:postsError,mutate} = useSWR("/api/userprofile",getFetcher);
    const {data:usersData, isLoading:isUsersLoading , error:usersError} = useSWR("/api/userprofile/get-users",getFetcher);
    const {data:galleryData, isLoading:isGalleryLoading , error:galleryError} = useSWR("/api/userprofile/get-gallery",getFetcher);

    useEffect(() => {
        if(postsData && usersData && galleryData){
            setPosts(postsData.data);
            setLoading(isPostsLoading)
            setUsers(usersData.data);
            setLoading(isUsersLoading);
            setFollowers(usersData.data);
            setGallery(galleryData.data);
            setLoading(isGalleryLoading);
        }
        else if (postsError){
            setError(postsError);
            setLoading(isPostsLoading)
        }else if (usersError){
            setError(usersError);
            setLoading(isUsersLoading)
        }else if(galleryError){
            setError(galleryError);
            setLoading(isGalleryLoading)
        }else{
            setLoading(isGalleryLoading);
        }

    }, [postsData,usersData,galleryData]);


    // Function to add a new item to the gallery
    const addGalleryItem = (item: any) => {
        setGallery((prevGallery) => [...prevGallery, item]);
    };

    // Function to toggle follow/unfollow status of a user
    const toggleFollow = (id: number) => {
        setFollowers((prevFollowers) =>
            prevFollowers.map((follower) =>
                follower.id === id ? { ...follower, isFollowed: !follower.isFollowed } : follower
            )
        );
    };

    // Function to filter followers based on search input
    const filterFollowers = () => {
        if (followers) {
            return followers.filter((t) =>
                t.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        return followers;
    };

    // Add comment to a post
    const addComment = async (postId: number, comment: string) => {
        try {
            await mutate(postFetcher('/api/userprofile/add-comments', {
                postId,
                comment,
            }))
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    // Add reply to a comment
    const addReply = async (postId: number, commentId: number, reply: string) => {
        try {
            await mutate(postFetcher('/api/userprofile/add-replies', {
                postId,
                commentId,
                reply,
            }))
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };

    // Function to toggle like/unlike a post
    const likePost = async (postId: number) => {
        try {
            await mutate(postFetcher('/api/userprofile', { postId }))
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    // Function to toggle like/unlike a reply to a comment
    const likeReply = async (postId: number, commentId: number) => {
        try {
            await mutate(postFetcher('/api/userprofile/replies-like', { postId, commentId }))
        } catch (error) {
            console.error('Error liking reply:', error);
        }
    };

    return (
        <UserDataContext.Provider value={{
            posts,
            users,
            error,
            gallery,
            loading,
            profileData,
            addGalleryItem,
            addReply,
            likePost,
            addComment,
            likeReply,
            followers: filterFollowers(),
            toggleFollow,
            setSearch,
            search
        }}>
            {children}
        </UserDataContext.Provider>
    );
};


