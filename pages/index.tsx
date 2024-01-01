import Image from "next/image";
import { Inter } from "next/font/google";
import { getSession, signOut } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal, { ModalStoreInterface } from "@/hooks/useInfoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        pernament: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModal();

  const { data: user } = useCurrentUser();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
