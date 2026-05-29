import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

// นำเข้าไฟล์รูปภาพหลัก
import studioLogo from './assets/logo.png'
import customHeroBg from './assets/bg.png'

// นำเข้ารูปภาพของสมาชิกค่าย
import reikiImg from './assets/reiki.png'
import nightsuImg from './assets/nightsu.png'

// ========================================================
// 📰 1. ข้อมูลข่าวสาร
// ========================================================
const NEWS_DATA = [
    {
        id: 1,
        title: "เปิดรับสมัครทีมงานประจำซีซั่นใหม่!",
        date: "28 May 2026",
        tag: "Recruitment",
        desc: "Asteroid Studio กำลังเปิดรับสมัครผู้มีใจรักใน Minecraft ทั้งสายสร้าง (Builder) และสายเขียนบท (Script Writer) มาร่วมสร้างสรรค์ผลงานชิ้นเอกจากคอมมูนิตี้ด้วยกัน"
    },
]

// ========================================================
// 👥 2. ข้อมูลสมาชิก (อัปเดตลำดับและเพิ่ม Hana Chan เรียบร้อยครับ)
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
        img: "", // ยังไม่มีรูป
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
    { name: "Member 04", role: "Cinematic Editor", img: "", discord: "", youtube: "" },
    { name: "Member 05", role: "Voice Actor", img: "", discord: "", youtube: "" },
    { name: "Member 06", role: "Main Artist", img: "", discord: "", youtube: "" }
]

// ========================================================
// 🎬 3. ข้อมูลโปรเจกต์
// ========================================================
const PROJECTS_DATA = [
    {
        id: 1,
        title: "The beginning of the disaster: Rahan",
        tag: "Zombie Apocalypse",
        date: "Coming Soon",
        image: "",
        shortDesc: "ซีรีส์แนวเอาชีวิตรอดในโลกที่ l่มสลายจากไวรัส เน้นเนื้อเรื่องดราม่าเข้มข้นและฉาก Cinematic สุดอลังการ",
        detail: "โปรเจกต์แรกของค่าย Asteroid Studio เป็นซีรีส์แนวเอาชีวิตรอดในโลกที่ l่มสลายจากไวรัส เน้นเนื้อเรื่องดราม่าเข้มข้นและฉาก Cinematic สุดอลังการใน Minecraft เพื่อให้ได้อารมณ์เหมือนดูอนิเมะแนวลึกลับระทึกขวัญ"
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
    const [logoError, setLogoError] = useState(false) // เช็กโลโก้เสีย
    const memberSliderRef = useRef(null)

    const slideMembers = (direction) => {
        if (memberSliderRef.current) {
            const scrollAmount = 340
            memberSliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="min-h-screen bg-[#1E2022] text-[#D2E4F1] overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans Thai', sans-serif" }}>

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
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {NEWS_DATA.map((news) => (
                            <div key={news.id} className="bg-[#25282B]/50 border border-[#484D51]/30 rounded-3xl p-6 transition-all duration-300 hover:border-[#8FACC0]/40 shadow-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-bold px-2.5 py-0.5 bg-[#8FACC0]/10 text-[#8FACC0] rounded-md tracking-wider uppercase">{news.tag}</span>
                                    <span className="text-xs text-zinc-500 font-light">{news.date}</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 tracking-wide">{news.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed font-light">{news.desc}</p>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* SECTION 4: Studio Projects */}
            <section className="max-w-7xl mx-auto px-6 py-20 border-t border-[#484D51]/20">
                <ScrollReveal>
                    <div className="mb-10">
                        <p className="text-[#8FACC0] uppercase tracking-[0.2em] text-xs mb-3 font-semibold">Our Production</p>
                        <h2 className="text-3xl font-bold text-white tracking-wide">Studio Projects</h2>
                        <p className="text-zinc-400 text-xs mt-2 font-light">คลิกที่การ์ดโปรเจกต์เพื่อเปิดอ่านรายละเอียดเพิ่มเติม</p>
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
                                        activeProject === project.id ? 'max-h-60 opacity-100 mt-4 pt-4 border-t border-[#484D51]/40' : 'max-h-0 opacity-0'
                                    }`}>
                                        <p className="text-[#8FACC0] text-[10px] font-bold uppercase tracking-wider mb-2">More Details:</p>
                                        <p className="text-zinc-300 text-sm leading-relaxed bg-[#1E2022]/60 p-3 rounded-xl font-light">{project.detail}</p>
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

            {/* SECTION 5: Members Horizontal Slider */}
            <section className="bg-[#25282B]/40 border-y border-[#484D51]/30 py-24 relative">
                <div className="max-w-7xl mx-auto px-6">

                    <ScrollReveal>
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <p className="text-[#8FACC0] uppercase tracking-[0.2em] text-xs mb-3 font-semibold">Our Community</p>
                                <h2 className="text-3xl font-bold text-white tracking-wide">Meet Our Members</h2>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => slideMembers('left')}
                                    className="w-11 h-11 rounded-full bg-[#2D3135] hover:bg-[#8FACC0] text-white hover:text-[#1E2022] border border-[#484D51] transition-all duration-300 flex items-center justify-center active:scale-90 shadow-md cursor-pointer group"
                                    aria-label="Slide Left"
                                >
                                    <span className="w-2.5 h-2.5 border-b-2 border-l-2 border-current transform rotate-45 translate-x-0.5 transition-transform duration-200 group-hover:-translate-x-0.5"></span>
                                </button>
                                <button
                                    onClick={() => slideMembers('right')}
                                    className="w-11 h-11 rounded-full bg-[#2D3135] hover:bg-[#8FACC0] text-white hover:text-[#1E2022] border border-[#484D51] transition-all duration-300 flex items-center justify-center active:scale-90 shadow-md cursor-pointer group"
                                    aria-label="Slide Right"
                                >
                                    <span className="w-2.5 h-2.5 border-t-2 border-r-2 border-current transform rotate-45 -translate-x-0.5 transition-transform duration-200 group-hover:translate-x-0.5"></span>
                                </button>
                            </div>
                        </div>
                    </ScrollReveal>

                    <div
                        ref={memberSliderRef}
                        className="flex gap-6 overflow-x-auto pb-6 overflow-y-hidden"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {MEMBERS_DATA.map((member, idx) => (
                            <div
                                key={idx}
                                className="min-w-[280px] md:min-w-[300px] bg-[#2D3135]/90 border border-[#484D51]/60 rounded-3xl p-5 transition-all duration-300 hover:border-[#8FACC0] group hover:scale-[1.02]"
                            >
                                <div className="w-full h-48 bg-[#1A1C1E] rounded-2xl mb-4 overflow-hidden relative border border-[#484D51]/30 flex items-center justify-center">
                                    {member.img ? (
                                        <img
                                            src={member.img}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="text-zinc-600 text-xs font-bold tracking-widest uppercase bg-[#131416] w-full h-full flex items-center justify-center border border-dashed border-[#484D51]/40 rounded-2xl">
                                            👤 No Image
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-lg font-bold text-white group-hover:text-[#8FACC0] transition-colors mb-1 tracking-wide">{member.name}</h3>
                                <p className="text-zinc-400 text-xs mb-4 font-normal">{member.role}</p>

                                <div className="flex gap-2 border-t border-[#484D51]/40 pt-3">
                                    {member.discord ? (
                                        <a
                                            href={member.discord}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-center font-light bg-[#1E2022] hover:bg-[#5865F2] text-[#D2E4F1] hover:text-white px-3 py-1.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex-1"
                                        >
                                            Discord
                                        </a>
                                    ) : (
                                        <button
                                            disabled
                                            className="text-xs text-center font-light bg-[#1E2022]/40 text-zinc-600 px-3 py-1.5 rounded-xl flex-1 cursor-not-allowed"
                                        >
                                            No Discord
                                        </button>
                                    )}

                                    {member.youtube ? (
                                        <a
                                            href={member.youtube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-center font-light bg-[#1E2022] hover:bg-[#FF0000] text-[#D2E4F1] hover:text-white px-3 py-1.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex-1"
                                        >
                                            Youtube
                                        </a>
                                    ) : (
                                        <button
                                            disabled
                                            className="text-xs text-center font-light bg-[#1E2022]/40 text-zinc-600 px-3 py-1.5 rounded-xl flex-1 cursor-not-allowed"
                                        >
                                            No Channel
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
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