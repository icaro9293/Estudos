"use client"
import { api } from "@/utils/api";
// import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const [wallpapers, setWallpapers] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  console.log('lista com wallpapers: ', wallpapers)

  useEffect(() => {
    getAllWallpapers()
  }, [page]) // quando o valor de 'page' alterar, a função é chamada.
  const getAllWallpapers = async () => {
    try {
      const response = await api.get('/api/wallpapers', {
        params: {
          page,
        }
      })
      console.log('response', response)
      const newWallpapers = response?.data?.wallpapers || []
      console.log('newWallpapers', newWallpapers)
      if (newWallpapers.length) {
        setWallpapers([...wallpapers, ...newWallpapers]) // wallpapers da requisição get anterior, mais os 10 dados seguintes da nova requisição da página.
      }
      if (newWallpapers.length < 10) {
        setHasMore(false)
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const fetchMoreData = () => {
    if (hasMore) {
      setPage(page + 1)
    }
  }
  return (
    <main>
      <h1 className="p-5 text-center text-lg font-bold shadow-md">Painel Admin</h1>
      <div className="p-5">
        <Link href={'/add-wallpaper'} className="py-2 px-5 bg-blue-500 rounded text-white hover:bg-blue-600">Adicionar Wallpaper</Link >
      </div>
      <div className="p-6 rounded-lg shadow-lg">
        <InfiniteScroll
          dataLength={wallpapers.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h1>Carregando mais imagens...</h1>}
          endMessage={
            <>
              <p>Todos os Wallpapers Foram Carregados.</p>
            </>
          }
        >
          <div className="grid grid-cols-3 gap-4">
            {
              wallpapers.map((wallpaper) => {
                console.log('item: ', wallpaper)
                return (
                  <div key={wallpaper._id} className="">
                    <img src={wallpaper.image} alt="imagem resgatada da API" className="w-full rounded" />
                  </div>
                )
              })
            }
          </div>
        </InfiniteScroll>
      </div>
    </main>
  );
}
