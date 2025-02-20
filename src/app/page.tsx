"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const checkLogin = async () => {
    const token = sessionStorage.getItem("Token");
    if (!token) {
      window.location.href = `${process.env.NEXT_PUBLIC_AUTH_URL}`;
    } else {
      router.push(`/dashboard`);
    }
  };

  const connectBot = () => {
    const url = "https://discord.com/oauth2/authorize?client_id=1340725673056010291";
    window.open(url, "popupWindow", "width=600,height=800,scrollbars=yes,resizable=yes");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white px-6">
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img className="w-20 mx-auto mb-4" src="https://cliply.co/wp-content/uploads/2021/08/372108630_DISCORD_LOGO_400.gif" alt="Discord Logo" />
        <h1 className="text-5xl font-bold">Bienvenue sur <span className="text-[#5865F2]">DAB</span> 🎉</h1>
        <p className="text-gray-300 mt-3 text-lg">Stockage illimité & sécurisé via Discord</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {[
            {
              icon: <Database className="w-8 h-8" />,
              title: "Stockage Illimité",
              description: "Profitez d'un espace de stockage sans limite grâce à Discord"
            },
            {
              icon: <Cloud className="w-8 h-8" />,
              title: "Accès Cloud",
              description: "Accédez à vos fichiers n'importe où, n'importe quand"
            },
            {
              icon: <Lock className="w-8 h-8" />,
              title: "Sécurisé",
              description: "Vos données sont protégées par la sécurité de Discord"
            },
            {
              icon: <FileText className="w-8 h-8" />,
              title: "Tous Formats",
              description: "Stockez tous types de fichiers sans restriction"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white hover:bg-white/20 transition-all"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="flex flex-col gap-4 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <button
          className="bg-[#5865F2] hover:bg-[#3b4aed] transition-all ease-in duration-200 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 shadow-lg"
          onClick={checkLogin}
        >
          <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path d="M39.248,10.177c-2.804-1.287-5.812-2.235-8.956-2.778..." className="fill-white"></path>
          </svg>
          Login avec Discord
        </button>

        <button
          className="bg-green-500 hover:bg-green-600 transition-all ease-in duration-200 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 shadow-lg"
          onClick={connectBot}
        >
          <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path d="M39.248,10.177c-2.804-1.287-5.812-2.235-8.956-2.778..." className="fill-white"></path>
          </svg>
          Ajouter le bot
        </button>
      </motion.div>
    </div>
  );
}