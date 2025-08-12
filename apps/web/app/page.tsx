import { motion } from "framer-motion";
import TopNav from "../components/TopNav";
import FooterBar from "../components/FooterBar";
import { Button } from "../components/ui/button";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <main className="flex flex-1 flex-col items-center justify-center bg-gradient-to-r from-fuchsia-500 to-cyan-400 p-8 text-center text-white">
        {/* @ts-ignore */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-4">
          مرحباً بكم في تفصيل
        </motion.h1>
        {/* @ts-ignore */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
          مول افتراضي ثلاثي الأبعاد وسوق NFT للأزياء.
        </motion.p>
        <div className="flex gap-4">
          <Button>استكشف السوق</Button>
          <Button variant="outline">Mall 3D</Button>
        </div>
      </main>
      <FooterBar />
    </div>
  );
}
