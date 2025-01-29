import React from 'react'
import Image from "next/image";
const page = () => {
  return (
    <>




      <footer className="bg-amber-400 rounded-lg shadow-sm dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <Image
                src="/img/logo-round.png"
                alt="PreDespacho Logo"
                width={80}
                height={80}
              />
            </div>
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="flex mt-4 sm:justify-center sm:mt-0">
                <span className="text-xl text-black sm:text-center dark:text-gray-400 mr-4">
                  Sigue nuestras redes sociales
                </span>
                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <Image
                    src="/img/instagram.png"
                    alt="instagram"
                    width={32}
                    height={32}
                  />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <Image
                    src="/img/facebook.png"
                    alt="facebook"
                    width={32}
                    height={32}
                  />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <Image
                    src="/img/tik-tok.png"
                    alt="tiktok"
                    width={32}
                    height={32}
                  />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                  <Image
                    src="/img/gmail.png"
                    alt="gmail"
                    width={32}
                    height={32}
                  />
                </a>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="flex-col mt-4 sm:flex">
            <div className="flex">
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white mr-4">
                Condiciones de uso
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white mr-4">
                Politica de privacidad
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white mr-4">
                Notificacion de cookies
              </a>
            </div>
            <span className="pt-4 text-sm text-gray-700 font-bold dark:text-gray-400">
              © 2025 NiceTrip. Todos los derechos reservados.
            </span>
          </div>

        </div>

      </footer>


    </>
  )
}

export default page