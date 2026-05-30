import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

// นำเข้าไฟล์รูปภาพหลัก
import studioLogo from './assets/logo.png'
import customHeroBg from './assets/bg.png'
// 📸 นำเข้าไฟล์รูปปกโปรเจกต์ Rahan เพิ่มเติมที่นี่
import projectRahanThumb from './assets/ProjectTumb.png'

// นำเข้ารูปภาพของสมาชิกค่าย
import reikiImg from './assets/reiki.png'
import hanaImg from './assets/Hana1.png'
import nightsuImg from './assets/nightsu.png'
import tonmaiImg from './assets/Tonmai.png'
import absImg from './assets/b.png'

// ========================================================
// 📰 1. ข้อมูลข่าวสาร
// ========================================================
const NEWS_DATA = [
    {
        id: 1,
        title: "เปิดรับสมัครทีมงานประจำซีซั่นใหม่!",
        date: "28 May 2026",
        tag: "Recruitment",
        shortDesc: "Asteroid Studio กำลังเปิดรับสมัครผู้มีใจรักใน Minecraft ทั้งสายสร้าง และสายเขียนบท มาร่วมสร้างสรรค์ผลงานด้วยกัน",
        detail: "โอกาสร่วมงานกับพวกเรามาถึงแล้ว! เรากำลังตามหาเพื่อนร่วมอุดมการณ์ในตำแหน่ง Builder, Script Writer และ Voice Actor เพื่อมาร่วมสร้างสรรค์ซีรีส์ Minecraft Cinematic สุดอลังการ หากคุณมีไฟและอยากปล่อยของ มาสมัครกันได้เลย!",
        formUrl: "https://forms.gle/8eb2TXYDBmKysDay8"
    },
]

// ========================================================
// 👥 2. ข้อมูลสมาชิก
// ========================================================
const MEMBERS_DATA = [
    {
        name: "Reiki Fenrir",
        role: "Director / Founder",
        img: reikiImg,
        discord: "https://discord.gg/KNC4wcamaP",
        youtube: "https://www.youtube.com/@ReikiFenrir"
    },
    {
        name: "Hana Chan",
        role: "Secretary",
        img: hanaImg,
        discord: "",
        youtube: ""
    },
    {
        name: "Gakita Nightsu",
        role: "Builder / Actor",
        img: nightsuImg,
        discord: "",
        youtube: "https://www.youtube.com/@nightsu137"
    },
    {
        name: "Ton Mai",
        role: "Actor / Voice Actor",
        img: tonmaiImg,
        discord: "",
        youtube: ""
    },
    {
        name: "ABS",
        role: "Actor / Building / Server Admin",
        img: absImg,
        discord: "",
        youtube: ""
    }
]

// ========================================================
// 🎬 3. ข้อมูลโปรเจกต์ (ใส่รูปปก ProjectTumb.png เข้าไปแล้ว)
// ========================================================
const PROJECTS_DATA = [
    {
        id: 1,
        title: "The beginning of the disaster: Rahan",
        tag: "Zombie Apocalypse",
        date: "Coming Soon",
        image: projectRahanThumb, // ✨ เปลี่ยนจาก "" มารันรูปภาพปกแทนเรียบร้อย
        shortDesc: "ซีรีส์แนวเอาชีวิตรอดในโลกที่ล่มสลายจากไวรัส เน้นเนื้อเรื่องดราม่าเข้มข้นและฉาก Cinematic สุดอลังการ",
        detail: "โปรเจกต์แรกของค่าย Asteroid Studio เป็นซีรีส์แนวเอาชีวิตรอดในโลกที่ล่มสลายจากไวรัส เน้นเนื้อเรื่องดราม่าเข้มข้นและฉาก Cinematic สุดอลังการใน Minecraft เพื่อให้ได้อารมณ์เหมือนดูอนิเมะแนวลึกลับระทึกขวัญ",
        playlistUrl: ""
    },
]

// --- คอมโพเนนต์แอนิเมชันเลื่อนขึ้น ---
function ScrollReveal({ children }) {
    const [isVisible, setIsVisible] = useState(false)
    const domRef = useRef(null)

    useEffect(() => {
        const currentDom = domRef.current
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setIsVisible(true)
            })
        }, { threshold: 0.1 })

        if (currentDom) observer.observe(currentDom)
        return () => {
            if (currentDom) observer.unobserve(currentDom)
        }
    }, [])

    return (
        <div ref={domRef} className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {children}
        </div>
    )
}

ScrollReveal.propTypes = {
    children: PropTypes.node.isRequired
}

export default function App() {
    const [activeProject, setActiveProject] = useState(null)
    const [activeNews, setActiveNews] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [animateModal, setAnimateModal] = useState(false)

    const [logoError, setLogoError] = useState(false)
    const memberSliderRef = useRef(null)

    const openModal = () => {
        setIsModalOpen(true)
        setTimeout(() => setAnimateModal(true), 10)
    }

    const closeModal = () => {
        setAnimateModal(false)
        setTimeout(() => setIsModalOpen(false), 300)
    }

    const slideMembers = (direction) => {
        if (memberSliderRef.current) {
            const scrollAmount = 360
            memberSliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="min-h-screen bg-[#1E2022] text-[#D2E4F1] overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans Thai', sans-serif" }}>

            {/* สไตล์ Scrollbar ซ่อนแถบเลื่อนบนส่วนสไลด์ */}
            <style>{`
                .custom-dark-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-dark-scrollbar::-webkit-scrollbar-track {
                    background: #25282B;
                    border-radius: 999px;
                }
                .custom-dark-scrollbar::-webkit-scrollbar-thumb {
                    background: #484D51;
                    border-radius: 999px;
                }
                .custom-dark-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #8FACC0;
                }
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-none {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* SECTION 1: Welcome Hero Screen */}
            <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center blur-md scale-105 transform transition-transform duration-1000"
                    style={{ backgroundImage: `url(${customHeroBg})` }}
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
                    <div className="w-40 h-40 md:w-48 md:h-48 mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                        {!logoError ? (
                            <img
                                src={studioLogo}
                                alt="Asteroid Studio Logo"
                                className="w-full h-full object-contain rounded-full border-4 border-[#8FACC0]/20 bg-[#2D3135]/40 p-2"
                                onError={() => setLogoError(true)}
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-[#8FACC0] text-[#1E2022] flex items-center justify-center font-black text-4xl shadow-2xl">
                                AS
                            </div>
                        )}
                    </div>
                    <p className="text-zinc-300 text-xs tracking-[0.4em] uppercase mb-2 font-medium opacity-90">Presented By</p>
                    <h1 className="text-4xl md:text-6xl font-black tracking-wider text-white drop-shadow-md">ASTEROID STUDIO</h1>
                    <p className="text-[#8FACC0] text-sm md:text-base font-semibold tracking-[0.2em] mt-2 opacity-90">แอสเทอร์รอยด์ สตูดิโอ</p>

                    <div className="flex flex-wrap gap-4 mt-8 justify-center">
                        <a href="https://discord.gg/JtKhFZuyte" target="_blank" rel="noopener noreferrer" className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold px-6 py-2.5 rounded-full shadow-lg transition-all duration-300 ease-out hover:scale-110 active:scale-95 hover:-translate-y-0.5 text-sm cursor-pointer tracking-wider">Discord</a>
                        <a href="https://www.youtube.com/channel/UCzYrtWeDw3AYP3V4RNQpnOw" target="_blank" rel="noopener noreferrer" className="bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold px-6 py-2.5 rounded-full shadow-lg transition-all duration-300 ease-out hover:scale-110 active:scale-95 hover:-translate-y-0.5 text-sm cursor-pointer tracking-wider">Youtube</a>
                    </div>
                </div>

                <div className="absolute bottom-8 z-10 animate-bounce opacity-60">
                    <p className="text-xs uppercase tracking-widest text-zinc-400 mb-1 font-light">Scroll Down</p>
                    <div className="w-1 h-6 bg-gradient-to-b from-white to-transparent mx-auto rounded-full" />
                </div>
            </section>

            {/* SECTION 2: About Us */}
            <section className="max-w-7xl mx-auto px-6 py-28 border-t border-[#484D51]/20">
                <ScrollReveal>
                    <div className="grid md:grid-cols-2 gap-14 items-center">
                        <div>
                            <p className="text-[#8FACC0] uppercase tracking-[0.2em] text-xs mb-3 font-semibold">About Us</p>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-wide">Creating stories beyond blocks.</h2>
                            <p className="text-zinc-300 leading-relaxed mb-6 font-light">We are building original Minecraft roleplay and cinematic projects with a focus on atmosphere, storytelling, world building, and emotional character development.</p>
                            <p className="text-zinc-300 leading-relaxed font-light">Our goal is to create experiences that feel like real anime and drama series inside Minecraft.</p>
                        </div>

                        <div className="bg-[#25282B]/80 border border-[#484D51]/50 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
                            <h3 className="text-xl font-semibold mb-6 text-[#8FACC0] tracking-wide">Current Project</h3>
                            <div className="space-y-5">
                                <div>
                                    <p className="text-zinc-400 text-[10px] uppercase tracking-wider mb-1">Project Name</p>
                                    <h4 className="text-lg font-bold text-white tracking-wide">The beginning of the disaster: Rahan</h4>
                                </div>
                                <div>
                                    <p className="text-zinc-400 text-[10px] uppercase tracking-wider mb-1">Genre</p>
                                    <p className="text-zinc-200 font-medium text-sm">Zombie Apocalypse / Survival / Cinematic Drama</p>
                                </div>
                                <div>
                                    <p className="text-zinc-400 text-[10px] uppercase tracking-wider mb-1">Status</p>
                                    <p className="text-red-400 text-sm font-semibold flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>Currently in Development
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* SECTION 3: Latest News */}
            <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#484D51]/20">
                <ScrollReveal>
                    <div className="mb-10">
                        <p className="text-[#8FACC0] uppercase tracking-[0.2em] text-xs mb-3 font-semibold">Updates</p>
                        <h2 className="text-3xl font-bold text-white tracking-wide">Latest News</h2>
                        <p className="text-zinc-400 text-xs mt-2 font-light">คลิกที่การ์ดข่าวสารเพื่อเปิดอ่านรายละเอียด</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {NEWS_DATA.map((news) => (
                            <div
                                key={news.id}
                                onClick={() => setActiveNews(activeNews === news.id ? null : news.id)}
                                className={`bg-[#25282B]/50 border rounded-3xl p-6 transition-all duration-300 shadow-lg cursor-pointer select-none ${
                                    activeNews === news.id ? 'border-[#8FACC0] ring-2 ring-[#8FACC0]/20' : 'border-[#484D51]/30 hover:border-[#8FACC0]/40'
                                }`}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-bold px-2.5 py-1 bg-[#8FACC0]/10 text-[#8FACC0] rounded-md tracking-wider uppercase">{news.tag}</span>
                                    <span className="text-xs text-zinc-500 font-light">{news.date}</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 tracking-wide">{news.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed font-light">{news.shortDesc}</p>

                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                    activeNews === news.id ? 'max-h-[25rem] opacity-100 mt-4 pt-4 border-t border-[#484D51]/40' : 'max-h-0 opacity-0'
                                }`}>
                                    <p className="text-[#8FACC0] text-[10px] font-bold uppercase tracking-wider mb-2">ข้อมูลเบื้องต้น:</p>
                                    <p className="text-zinc-300 text-sm leading-relaxed bg-[#1E2022]/60 p-4 rounded-xl font-light mb-4">{news.detail}</p>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openModal();
                                            }}
                                            className="bg-[#2D3135] hover:bg-[#3A3F44] text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 text-xs tracking-wide text-center border border-[#484D51]"
                                        >
                                            ดูคุณสมบัติทีมงาน 📄
                                        </button>

                                        {news.formUrl && (
                                            <a
                                                href={news.formUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="block text-center bg-[#8FACC0] hover:bg-[#A3BFD3] text-[#1E2022] font-bold py-2.5 px-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 text-xs tracking-wide"
                                            >
                                                กรอกใบสมัคร 📝
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="text-right mt-4">
                                    <span className="text-xs font-medium text-[#8FACC0] hover:underline">
                                        {activeNews === news.id ? "ปิดแถบเครื่องมือ ▲" : "ดูตัวเลือกเพิ่มเติม ▼"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* POPUP MODAL SCREEN */}
            {isModalOpen && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity duration-300 ease-out ${
                        animateModal ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={closeModal}
                >
                    <div
                        className={`bg-[#25282B] border border-[#8FACC0]/30 rounded-[2rem] w-full max-w-xl h-[85vh] flex flex-col overflow-hidden shadow-2xl relative transition-all duration-300 ease-out transform ${
                            animateModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-5 text-zinc-400 hover:text-white text-xl font-bold p-1 bg-[#1E2022]/60 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 z-10"
                            onClick={closeModal}
                        >
                            ✕
                        </button>

                        <div className="flex-1 overflow-y-auto p-6 md:p-8 pt-12 custom-dark-scrollbar scroll-smooth text-center">
                            <div className="text-[#D2E4F1] font-light space-y-4 text-sm md:text-base selection:bg-[#8FACC0]/30 pr-1">
                                <div className="space-y-1">
                                    <h2 className="text-xl md:text-2xl font-black text-white tracking-widest">ASTEROID STUDIO</h2>
                                    <p className="text-xs text-[#8FACC0] tracking-wider uppercase font-semibold">Minecraft Story & Cinematic Production</p>
                                    <p className="text-zinc-600 font-medium opacity-60">━━━━━━━━━━━━━━━━━━</p>
                                    <h3 className="text-base md:text-lg font-bold text-amber-400 tracking-wider">RECRUITMENT ANNOUNCEMENT</h3>
                                    <p className="text-sm font-bold text-white">ประกาศรับสมัครทีมงาน</p>
                                    <p className="text-zinc-600 font-medium opacity-60">━━━━━━━━━━━━━━━━━━</p>
                                </div>

                                <p className="text-zinc-200 py-2 font-normal">
                                    Asteroid Studio กำลังเปิดรับสมาชิกใหม่<br/>
                                    สำหรับโปรเจกต์ Minecraft Story Series
                                </p>

                                <div className="bg-[#1E2022]/80 p-4 rounded-2xl border border-[#484D51]/40 inline-block px-6">
                                    <span className="text-xs text-zinc-400 block font-semibold uppercase tracking-wider mb-0.5">Project:</span>
                                    <span className="text-white font-bold text-base block">“The beginning of the disaster: Rahan”</span>
                                    <span className="text-xs text-[#8FACC0] block mt-1.5 font-medium">แนว: Zombie Apocalypse / Survival / Drama / Cinematic</span>
                                </div>

                                <div className="space-y-1 pt-2">
                                    <p className="text-zinc-600 font-medium opacity-60">──────────────────</p>
                                    <h4 className="text-xs font-bold tracking-widest text-[#8FACC0] uppercase">POSITIONS OPEN (ตำแหน่งที่เปิดรับ)</h4>
                                    <p className="text-zinc-600 font-medium opacity-60">──────────────────</p>
                                </div>

                                <div className="text-left max-w-md mx-auto space-y-4 bg-[#1E2022]/40 p-5 rounded-2xl border border-[#484D51]/20">
                                    <div>
                                        <h5 className="font-bold text-amber-300 text-sm md:text-base">[ Artist ]</h5>
                                        <ul className="list-disc pl-5 text-zinc-300 text-xs md:text-sm mt-1 space-y-1">
                                            <li>วาดภาพประกอบ</li>
                                            <li>ทำโปสเตอร์ / ปกคลิป</li>
                                            <li>ออกแบบคอนเซปต์ตัวละคร</li>
                                        </ul>
                                    </div>
                                    <div className="border-t border-[#484D51]/20 pt-3.5">
                                        <h5 className="font-bold text-amber-300 text-sm md:text-base">[ Actor ]</h5>
                                        <ul className="list-disc pl-5 text-zinc-300 text-xs md:text-sm mt-1 space-y-1">
                                            <li>แสดงบทบาทภายใน Minecraft</li>
                                            <li>เข้า Roleplay ตามบท</li>
                                            <li>สามารถทำงานร่วมกับทีมได้</li>
                                        </ul>
                                    </div>
                                    <div className="border-t border-[#484D51]/20 pt-3.5">
                                        <h5 className="font-bold text-amber-300 text-sm md:text-base">[ Builder ]</h5>
                                        <ul className="list-disc pl-5 text-zinc-300 text-xs md:text-sm mt-1 space-y-1">
                                            <li>สร้างแมพและฉากต่างๆ</li>
                                            <li>ออกแบบเมือง อาคาร และบรรยากาศ</li>
                                            <li>มีความเข้าใจเรื่อง Detail และ Composition</li>
                                        </ul>
                                    </div>
                                    <div className="border-t border-[#484D51]/20 pt-3.5">
                                        <h5 className="font-bold text-amber-300 text-sm md:text-base">[ Script Writer ]</h5>
                                        <ul className="list-disc pl-5 text-zinc-300 text-xs md:text-sm mt-1 space-y-1">
                                            <li>เขียนเนื้อเรื่องและบทพูด</li>
                                            <li>วางโครงเรื่องและลำดับเหตุการณ์</li>
                                            <li>สามารถเขียนบทดราม่า/เอาตัวรอดได้</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-1 pt-2">
                                    <p className="text-zinc-600 font-medium opacity-60">──────────────────</p>
                                    <h4 className="text-xs font-bold tracking-widest text-[#8FACC0] uppercase">QUALIFICATIONS (คุณสมบัติ)</h4>
                                    <p className="text-zinc-600 font-medium opacity-60">──────────────────</p>
                                </div>

                                <ul className="text-center inline-block text-zinc-200 text-xs md:text-sm space-y-2 font-normal">
                                    <li>• อายุ 13 ปีขึ้นไป</li>
                                    <li>• มีความรับผิดชอบ</li>
                                    <li>• สามารถทำงานเป็นทีมได้</li>
                                    <li>• มีเวลาว่างพอสำหรับโปรเจกต์</li>
                                    <li>• ใช้งาน Discord ได้</li>
                                    <li>• รับฟังความคิดเห็นและแก้งานได้</li>
                                </ul>

                                <div className="space-y-1 pt-2">
                                    <p className="text-zinc-600 font-medium opacity-60">──────────────────</p>
                                    <h4 className="text-xs font-bold tracking-widest text-red-400 uppercase">IMPORTANT (หมายเหตุ)</h4>
                                    <p className="text-zinc-600 font-medium opacity-60">──────────────────</p>
                                </div>

                                <ul className="text-left max-w-md mx-auto text-zinc-300 text-xs md:text-sm space-y-1.5 bg-red-950/20 border border-red-900/20 p-4 rounded-xl">
                                    <li>📌 โปรเจกต์นี้เป็น Minecraft Story Series แบบ Cinematic</li>
                                    <li>📌 ทีมงานจะทำงานร่วมกันผ่าน Discord</li>
                                    <li>📌 หากมีผลงานเก่าจะพิจารณาเป็นพิเศษ</li>
                                    <li>📌 บางตำแหน่งอาจมีการทดลองงานก่อนเข้าทีมจริง</li>
                                </ul>

                                <div className="space-y-1 pt-4">
                                    <p className="text-zinc-600 font-medium opacity-60">━━━━━━━━━━━━━━━━━━</p>
                                    <h4 className="text-base font-black text-white tracking-widest">ASTEROID STUDIO</h4>
                                    <p className="text-xs text-[#8FACC0] italic font-medium">“Creating stories beyond blocks.”</p>
                                    <p className="text-zinc-600 font-medium opacity-60">━━━━━━━━━━━━━━━━━━</p>
                                </div>
                            </div>

                            <button
                                onClick={closeModal}
                                className="mt-8 w-full bg-[#8FACC0] hover:bg-[#A3BFD3] text-[#1E2022] font-bold py-3 px-6 rounded-2xl transition-all duration-200 text-xs tracking-wider uppercase cursor-pointer mb-2"
                            >
                                ปิดหน้าต่างรายละเอียด
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* SECTION 4: Studio Projects (แสดงภาพปกจากไฟล์ที่เชื่อมต่อสำเร็จ) */}
            <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#484D51]/20">
                <ScrollReveal>
                    <div className="mb-10">
                        <p className="text-[#8FACC0] uppercase tracking-[0.2em] text-xs mb-3 font-semibold">Our Production</p>
                        <h2 className="text-3xl font-bold text-white tracking-wide">Studio Projects</h2>
                        <p className="text-zinc-400 text-xs mt-2 font-light">คลิกที่การ์ดโปรเจกต์เพื่อเปิดอ่านรายละเอียดเพิ่มเติมและรับชมซีรีส์</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 items-start">
                        {PROJECTS_DATA.map((project) => (
                            <div
                                key={project.id}
                                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                                className={`bg-[#25282B]/80 border rounded-3xl overflow-hidden shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-2 select-none ${
                                    activeProject === project.id ? 'border-[#8FACC0] ring-2 ring-[#8FACC0]/20' : 'border-[#484D51]/50 hover:border-[#8FACC0]/50'
                                }`}
                            >
                                <div className="w-full aspect-video bg-[#1A1C1E] overflow-hidden relative border-b border-[#484D51]/40 flex items-center justify-center">
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 brightness-90 hover:scale-[1.02]"
                                        />
                                    ) : (
                                        <div className="text-zinc-600 text-xs font-bold tracking-widest uppercase bg-[#131416] w-full h-full flex items-center justify-center border border-dashed border-[#484D51]/40 rounded-t-3xl">
                                            ⚡ No Image
                                        </div>
                                    )}
                                    <div className="absolute top-3 left-3">
                                        <span className="text-[9px] font-bold px-2.5 py-1 bg-black/60 backdrop-blur-md text-[#8FACC0] rounded-full uppercase tracking-wider">{project.tag}</span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-2 gap-2">
                                        <h3 className="text-xl font-bold text-white hover:text-[#8FACC0] transition-colors tracking-wide break-words max-w-[70%]">{project.title}</h3>
                                        <span className="text-xs text-zinc-500 font-light shrink-0">{project.date}</span>
                                    </div>
                                    <p className="text-zinc-300 text-sm leading-relaxed mb-4 font-light">{project.shortDesc}</p>

                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                        activeProject === project.id ? 'max-h-80 opacity-100 mt-4 pt-4 border-t border-[#484D51]/40' : 'max-h-0 opacity-0'
                                    }`}>
                                        <p className="text-[#8FACC0] text-[10px] font-bold uppercase tracking-wider mb-2">More Details:</p>
                                        <p className="text-zinc-300 text-sm leading-relaxed bg-[#1E2022]/60 p-3 rounded-xl font-light mb-4">{project.detail}</p>

                                        {project.playlistUrl && project.playlistUrl.trim() !== "" ? (
                                            <a
                                                href={project.playlistUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="block text-center bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 text-xs tracking-wider uppercase shadow-md"
                                            >
                                                รับชมซีรีส์ (Watch Series) 🎬
                                            </a>
                                        ) : (
                                            <button
                                                disabled
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-full text-center bg-[#2D3135] text-zinc-500 border border-[#484D51]/60 font-bold py-2.5 px-4 rounded-xl text-xs tracking-widest uppercase cursor-not-allowed"
                                            >
                                                Coming Soon 🕒
                                            </button>
                                        )}
                                    </div>

                                    <div className="text-right mt-3">
                                        <span className="text-xs font-medium text-[#8FACC0] hover:underline">
                                            {activeProject === project.id ? "ปิดรายละเอียด ▲" : "ดูรายละเอียดเพิ่มเติม ▼"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* SECTION 5: Meet Our Members */}
            <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#484D51]/20 relative">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                        <div>
                            <p className="text-[#8FACC0] uppercase tracking-[0.2em] text-xs mb-3 font-semibold">Our Community</p>
                            <h2 className="text-3xl font-bold text-white tracking-wide">Meet Our Members</h2>
                        </div>
                        <div className="flex gap-2 self-end">
                            <button onClick={() => slideMembers('left')} className="w-10 h-10 rounded-full border border-[#484D51]/60 hover:border-[#8FACC0] text-zinc-400 hover:text-white flex items-center justify-center transition-all bg-[#25282B]/40 active:scale-90 cursor-pointer">◀</button>
                            <button onClick={() => slideMembers('right')} className="w-10 h-10 rounded-full border border-[#484D51]/60 hover:border-[#8FACC0] text-zinc-400 hover:text-white flex items-center justify-center transition-all bg-[#25282B]/40 active:scale-90 cursor-pointer">▶</button>
                        </div>
                    </div>

                    <div ref={memberSliderRef} className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory">
                        {MEMBERS_DATA.map((member, idx) => (
                            <div key={idx} className="w-[340px] shrink-0 bg-[#25282B]/40 border border-[#484D51]/30 rounded-3xl p-5 shadow-lg hover:border-[#8FACC0]/30 transition-all duration-300 group snap-start flex flex-col justify-between">
                                <div>
                                    <div className="w-full aspect-[4/3] mb-4 rounded-2xl overflow-hidden bg-[#1A1C1E] border border-[#484D51]/40 flex items-center justify-center relative shadow-md">
                                        {member.img ? (
                                            <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="text-zinc-500 text-xs font-semibold flex flex-col items-center gap-1 uppercase tracking-wider">
                                                <span>👤 No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-white tracking-wide mb-1 px-1">{member.name}</h3>
                                    <p className="text-xs text-zinc-400 font-medium tracking-wide mb-5 px-1">{member.role}</p>
                                </div>

                                <div className="flex justify-center gap-3 pt-3 border-t border-[#484D51]/20">
                                    {member.discord ? (
                                        <a href={member.discord} target="_blank" rel="noopener noreferrer" className="flex-1 text-center text-xs font-bold py-2.5 bg-[#2D3135] hover:bg-[#3A3F44] text-white rounded-xl border border-[#484D51] transition-all tracking-wider">Discord</a>
                                    ) : (
                                        <span className="flex-1 text-center text-xs font-bold py-2.5 bg-[#1E2022]/40 text-zinc-600 rounded-xl border border-[#484D51]/10 cursor-not-allowed select-none">No Discord</span>
                                    )}

                                    {member.youtube ? (
                                        <a href={member.youtube} target="_blank" rel="noopener noreferrer" className="flex-1 text-center text-xs font-bold py-2.5 bg-[#2D3135] hover:bg-[#3A3F44] text-white rounded-xl border border-[#484D51] transition-all tracking-wider">Youtube</a>
                                    ) : (
                                        <span className="flex-1 text-center text-xs font-bold py-2.5 bg-[#1E2022]/40 text-zinc-600 rounded-xl border border-[#484D51]/10 cursor-not-allowed select-none">No Channel</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* SECTION 6: Recruitment Roles */}
            <section className="max-w-7xl mx-auto px-6 py-24 border-t border-[#484D51]/20">
                <ScrollReveal>
                    <div className="mb-14">
                        <p className="text-[#8FACC0] uppercase tracking-[0.2em] text-xs mb-3 font-semibold">Recruitment</p>
                        <h2 className="text-3xl font-bold text-white tracking-wide">Meet Our Team Roles.</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Artist', desc: 'Character concepts, posters, thumbnails, and visual design.' },
                            { title: 'Actor', desc: 'Roleplay acting and cinematic performance inside Minecraft.' },
                            { title: 'Builder', desc: 'Creating immersive maps, cities, interiors, and environments.' },
                            { title: 'Script Writer', desc: 'Writing stories, dialogue, lore, and emotional scenes.' }
                        ].map((role) => (
                            <div key={role.title} className="bg-[#2D3135]/80 border border-[#484D51]/50 rounded-3xl p-6 transition-all duration-300 group hover:border-[#8FACC0] hover:scale-105 hover:shadow-xl">
                                <h3 className="text-xl font-semibold mb-3 text-[#8FACC0] group-hover:text-white transition-colors duration-300 tracking-wide">{role.title}</h3>
                                <p className="text-zinc-300 leading-relaxed text-sm font-light">{role.desc}</p>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* SECTION 7: Contact / Apply Area */}
            <section className="max-w-7xl mx-auto px-6 py-24 border-t border-[#484D51]/20">
                <ScrollReveal>
                    <div className="bg-gradient-to-br from-[#25282B] to-[#1A1C1E] border border-[#484D51]/60 rounded-[2rem] p-10 shadow-2xl">
                        <p className="text-[#8FACC0] uppercase tracking-[0.2em] text-xs mb-3 font-semibold">Contact</p>
                        <h2 className="text-3xl font-bold mb-6 text-white tracking-wide">Asteroid Studio Contact</h2>
                        <div className="space-y-4 text-zinc-300 mb-8 font-light text-sm">
                            <p className="flex items-center gap-2"><span className="text-[#8FACC0] font-normal">Email:</span> contact.asteroidstudio@gmail.com</p>
                            <p className="flex items-center gap-2"><span className="text-[#8FACC0] font-normal">Discord:</span> Asteroid Studio</p>
                        </div>
                        <a href="https://discord.gg/JtKhFZuyte" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#8FACC0] hover:bg-[#A3BFD3] text-[#1E2022] font-bold px-8 py-3 rounded-2xl shadow-lg transition-all duration-300 ease-out hover:scale-110 active:scale-95 hover:-translate-y-1 text-sm cursor-pointer tracking-wider">Join Discord</a>
                    </div>
                </ScrollReveal>
            </section>

            {/* Footer */}
            <footer className="border-t border-[#484D51]/20 py-8 text-center text-zinc-500 text-xs font-light">
                © 2026 Asteroid Studio — Minecraft Story & Cinematic Production.
            </footer>

        </div>
    )
}