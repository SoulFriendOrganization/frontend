import { useState, useEffect } from 'react';
import { IoReturnDownBack } from "react-icons/io5";
import { Link } from "react-router";
import { courseModules } from '../utils';
import { IoIosArrowDown, IoIosArrowForward, IoIosClose } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaBookOpen, FaGraduationCap } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";

function EducationPage() {
    const [selectedModule, setSelectedModule] = useState(0);
    const [selectedSubmodule, setSelectedSubmodule] = useState(0);
    const [expandedModules, setExpandedModules] = useState([0]);
    const [content, setContent] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        const savedPreference = localStorage.getItem('educationSidebarOpen');
        return savedPreference !== null ? JSON.parse(savedPreference) : true;
    });
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setIsLoading(true);
        if (courseModules.length > 0 && courseModules[0].submodules.length > 0) {
            setContent(courseModules[0].submodules[0].content);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        } else {
            setIsLoading(false);
        }
    }, []);

    const handleModuleClick = (moduleIndex) => {
        if (expandedModules.includes(moduleIndex)) {
            setExpandedModules(expandedModules.filter(idx => idx !== moduleIndex));
        } else {
            setExpandedModules([...expandedModules, moduleIndex]);
        }

        setSelectedModule(moduleIndex);
        setSelectedSubmodule(0);
        setContent(courseModules[moduleIndex].submodules[0].content);
    };
    
    const handleSubmoduleClick = (moduleIndex, submoduleIndex) => {
        setIsLoading(true);
        setSelectedModule(moduleIndex);
        setSelectedSubmodule(submoduleIndex);
        
        setTimeout(() => {
            setContent(courseModules[moduleIndex].submodules[submoduleIndex].content);
            setIsLoading(false);
        }, 300);
    };
    
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        localStorage.setItem('educationSidebarOpen', !sidebarOpen);
    };
    
    const formatContent = (content) => {
        if (!content) return null;
        
        return content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-6 leading-relaxed text-gray-700">{paragraph}</p>
        ));
    };
    
    return (        
        <div className="w-full min-h-svh bg-[#FFEBC8] flex relative">              
            <div className="fixed top-0 left-0 w-full h-16 z-10 bg-white shadow-sm flex items-center justify-between px-6">
                <Link to="/home" className="flex items-center gap-2 text-orange-500">
                    <IoReturnDownBack className="cursor-pointer w-5 h-5" />
                    <span className="font-medium">Kembali</span>
                </Link>
                
                <h3 className="font-medium text-gray-700">Platform Pembelajaran</h3>
                <button 
                    className={`flex items-center justify-center p-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 shadow-md transform hover:scale-105 ${sidebarOpen ? 'animate-pulse' : ''}`}
                    onClick={toggleSidebar}
                    aria-label={sidebarOpen ? "Sembunyikan sidebar" : "Tampilkan sidebar"}
                >
                    {sidebarOpen ? 
                        <IoIosClose className="w-5 h-5 transform transition-transform duration-300" /> : 
                        <HiMenuAlt2 className="w-5 h-5 transform transition-transform duration-300" />}
                    <span className="text-sm ml-1.5 hidden md:inline">{sidebarOpen ? "Sembunyikan" : "Menu"}</span>
                </button>
            </div>
            
            <div className={`flex-1 flex flex-col pt-24 px-4 md:px-8 pb-16 overflow-y-auto transition-all duration-300 ${sidebarOpen ? 'mr-0 md:mr-72' : 'mr-0'}`}>
                <div className="max-w-3xl mx-auto w-full">
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <div className="flex items-center mb-2 text-orange-500">
                            <FaGraduationCap className="w-6 h-6 mr-2" />
                            <h1 className="text-3xl font-bold text-gray-800">
                                {courseModules[selectedModule]?.moduleTitle}
                            </h1>
                        </div>
                        
                        <div className="flex items-center mb-4">
                            <FaBookOpen className="w-5 h-5 mr-2 text-orange-400" />
                            <h2 className="text-xl font-semibold text-gray-700">
                                {courseModules[selectedModule]?.submodules[selectedSubmodule]?.title}
                            </h2>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-6">
                            <MdOutlineWatchLater className="w-4 h-4 mr-1" />
                            <span>Estimasi waktu baca: {Math.ceil(content?.length / 1000)} menit</span>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
                                    <p className="text-orange-500">Memuat konten...</p>
                                </div>
                            ) : (
                                formatContent(content)
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <div 
                className={`fixed top-0 right-0 h-full z-10 bg-white overflow-y-auto transition-transform duration-300 ease-in-out shadow-lg ${
                    sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                } w-full sm:w-72`}
            >
                <button 
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 transform hover:rotate-90 hover:scale-110 z-20 shadow-md"
                    onClick={toggleSidebar}
                    aria-label="Tutup sidebar"
                >
                    <IoIosClose className="w-6 h-6" />
                </button>

                <div className="p-4 pt-20">
                    <div className="mb-8 text-center">
                        <FaBookOpen className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-2">Materi Pembelajaran</h2>
                    </div>
                    
                    <div className="space-y-1.5">
                        {courseModules.map((module, moduleIndex) => (
                            <div key={moduleIndex} className="mb-3">
                                <div 
                                    className={`flex items-center justify-between p-2 cursor-pointer rounded-md ${
                                        selectedModule === moduleIndex
                                        ? 'text-orange-500 font-medium' 
                                        : 'text-gray-700 hover:text-orange-500'
                                    }`}
                                    onClick={() => handleModuleClick(moduleIndex)}
                                >
                                    <span>{module.moduleTitle}</span>
                                    <div className="text-sm">
                                        {expandedModules.includes(moduleIndex) ? (
                                            <IoIosArrowDown className={selectedModule === moduleIndex ? "text-orange-500" : "text-gray-400"} />
                                        ) : (
                                            <IoIosArrowForward className={selectedModule === moduleIndex ? "text-orange-500" : "text-gray-400"} />
                                        )}
                                    </div>
                                </div>
                            
                                {expandedModules.includes(moduleIndex) && (
                                    <div className="ml-3 pl-2 border-l border-gray-100">
                                        {module.submodules.map((submodule, subIndex) => (
                                            <div 
                                                key={subIndex}
                                                className={`py-2 px-3 cursor-pointer text-sm rounded-md my-0.5 ${
                                                    selectedModule === moduleIndex && selectedSubmodule === subIndex
                                                    ? 'text-orange-600 font-medium bg-orange-50' 
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                                onClick={() => handleSubmoduleClick(moduleIndex, subIndex)}
                                            >
                                                {submodule.title}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EducationPage;